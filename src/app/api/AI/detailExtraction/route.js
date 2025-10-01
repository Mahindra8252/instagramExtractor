import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log(" [DetailExtraction] Starting AI detail extraction...");

    const body = await req.json();
    console.log(" [DetailExtraction] Received data keys:", Object.keys(body));

    
    const scrapeResult = body.scrapeResult || body;

    if (!scrapeResult.success) {
      return NextResponse.json({
        success: false,
        error: "Invalid scrape result provided",
      });
    }

    const { posts } = scrapeResult;

    if (!posts || !Array.isArray(posts)) {
      console.log("!!!! [DetailExtraction] No posts found  !!!!");
      return NextResponse.json({
        success: false,
        error: "No posts found in scrape result",
      });
    }

    console.log(
      ` [DetailExtraction] Processing ${posts.length} posts with AI`
    );

   
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.log(
        "[DetailExtraction] No Gemini API key found, using fallback processing"
      );
      return processFallback(scrapeResult, posts);
    }

    const ai = new GoogleGenAI({});

    const enhancedPosts = [];
    // Cap MAX_POSTS at 10
    let maxPosts = parseInt(process.env.MAX_POSTS) || 6;
    maxPosts = Math.min(maxPosts, 10);
    // Processing each post 
    for (let i = 0; i < Math.min(posts.length, maxPosts); i++) {
      const post = posts[i];
      console.log(
        `[DetailExtraction] Processing post ${i + 1}/${
          posts.length
        } with image analysis...`
      );

      try {
        const enhancedPost = await processPostComprehensive(ai, post, i);
        enhancedPosts.push(enhancedPost);

        // Rate limiting - wait between requests (longer for image analysis)
        if (i < posts.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(
          `!!!! [DetailExtraction] Error processing post ${i + 1}:`,
          error.message
        );
        // Fallback for failed posts
        enhancedPosts.push(createFallbackPost(post));
      }
    }

    console.log(
      ` [DetailExtraction] Completed processing ${enhancedPosts.length} posts`
    );

    // demographic data for username
    console.log(
      ` [DetailExtraction] Generating demographic insights for username: ${scrapeResult.profile.username}`
    );
    let demographicData = null;

    try {
      demographicData = await generateDemographicData(
        ai,
        scrapeResult.profile.username
      );
      console.log(
        ` [DetailExtraction] Demographic data extracted successfully`
      );
    } catch (error) {
      console.error(
        " [DetailExtraction] Failed to extract demographic data:",
        error
      );
      demographicData = createFallbackDemographicData();
    }

    return NextResponse.json({
      success: true,
      ...scrapeResult,
      enhancedPosts: enhancedPosts,
      demographicData: demographicData,
      processedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(" [DetailExtraction] API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

async function processPostComprehensive(ai, post, index) {
  const prompt = `
You are an expert Instagram content analyst. Analyze this post comprehensively and provide detailed insights.

POST DATA:
- Type: ${post.type || "unknown"}
- URL: ${post.url || "No URL"}
- Description: ${post.description || "No description provided"}
- Caption: ${post.caption || "No caption provided"}

TASKS:
1. EXTRACT ENGAGEMENT: Look for likes/comments in description (formats like "64K likes", "1.2M likes", "234 comments")
2. IMAGE ANALYSIS: Analyze the image at the URL for content, quality, mood, objects, people, setting
3. CONTENT ANALYSIS: Understand the post's message, theme, and purpose
4. GENERATE MISSING DATA: Create caption, hashtags, vibe, quality if not provided

Return ONLY a valid JSON object with this structure:
{
  "postLikes": number,
  "postComments": number,
  "postCaption": "extracted or generated caption text",
  "postHashtags": ["hashtag1", "hashtag2", "hashtag3"],
  "postVibe": ["vibe", "words", "describing", "mood"],
  "postQuality": ["quality", "assessment", "words"],
  "analysis": "Comprehensive analysis of the post content, message, and effectiveness (2-3 sentences)",
  "imageLevelAnalysis": {
    "objects": ["list", "of", "objects", "seen"],
    "people": "description of people if any",
    "setting": "description of location/environment",
    "colors": ["dominant", "colors"],
    "mood": "overall visual mood",
    "composition": "assessment of visual composition",
    "brandElements": ["visible", "brand", "elements"],
    "textInImage": "any text visible in the image",
    "imageQuality": "technical quality assessment",
    "engagementPotential": "prediction of how engaging this image is"
  }
}

RULES:
- Extract numbers intelligently: "64K" = 64000, "1.2M" = 1200000
- Generate 3 relevant hashtags if none exist
- Create engaging caption if none provided (based on image analysis)
- Be specific in image analysis - describe what you actually see
- Analysis should explain why this post works or doesn't work
- Return ONLY valid JSON, no extra text
`;

  try {
    // @google/genai API
    console.log(`... [DetailExtraction] Initialization`);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log(` [DetailExtraction] Successful analysis`);

    const text = response.text;

    // extracting JSON from response
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);

        // field checks
        const enhancedData = {
          postLikes:
            parsed.postLikes ||
            extractLikesFromDescription(post.description) ||
            0,
          postComments:
            parsed.postComments ||
            extractCommentsFromDescription(post.description) ||
            0,
          postCaption:
            parsed.postCaption || post.caption || "No caption available",
          postHashtags: parsed.postHashtags || generateFallbackHashtags(post),
          postVibe: parsed.postVibe || ["general", "content"],
          postQuality: parsed.postQuality || ["standard", "quality"],
          analysis: parsed.analysis || "Content analysis not available",
          imageLevelAnalysis:
            parsed.imageLevelAnalysis || createFallbackImageAnalysis(),
        };

        return {
          ...post, // original post data
          ...enhancedData, // Adding AI-extracted data
        };
      }
    } catch (parseError) {
      console.log(
        ` [DetailExtraction] JSON parse failed for post ${index + 1}: ${
          parseError.message
        }`
      );
    }
  } catch (error) {
    console.log(
      ` [DetailExtraction] analysis failed for post ${index + 1}: ${
        error.message
      }`
    );
  }

  // Fallback if AI analysis fails
  return createFallbackPost(post);
}

// Helper function to extract likes from description
function extractLikesFromDescription(description) {
  if (!description) return 0;

  const likesMatch = description.match(
    /(\d+(?:,\d{3})*|\d+(?:\.\d+)?[KM]?)\s*likes?/i
  );
  if (likesMatch) {
    const likesStr = likesMatch[1].replace(/,/g, "").toLowerCase();
    if (likesStr.includes("k")) {
      return Math.round(parseFloat(likesStr.replace("k", "")) * 1000);
    } else if (likesStr.includes("m")) {
      return Math.round(parseFloat(likesStr.replace("m", "")) * 1000000);
    } else {
      return parseInt(likesStr);
    }
  }
  return 0;
}

// Helper function to extract comments from description
function extractCommentsFromDescription(description) {
  if (!description) return 0;

  const commentsMatch = description.match(
    /(\d+(?:,\d{3})*|\d+(?:\.\d+)?[KM]?)\s*comments?/i
  );
  if (commentsMatch) {
    const commentsStr = commentsMatch[1].replace(/,/g, "").toLowerCase();
    if (commentsStr.includes("k")) {
      return Math.round(parseFloat(commentsStr.replace("k", "")) * 1000);
    } else if (commentsStr.includes("m")) {
      return Math.round(parseFloat(commentsStr.replace("m", "")) * 1000000);
    } else {
      return parseInt(commentsStr);
    }
  }
  return 0;
}

// Helper function to generate fallback hashtags
function generateFallbackHashtags(post) {
  const hashtags = [];

  // Extracting existing hashtags from description or caption
  const text = (post.description || "") + " " + (post.caption || "");
  const hashtagMatches = text.match(/#[\w]+/g);
  if (hashtagMatches) {
    hashtags.push(...hashtagMatches.slice(0, 5));
  }

  // generic hashtags if none found
  if (hashtags.length === 0) {
    hashtags.push("#instagram", "#content", "#post");
  }

  return hashtags;
}

// Helper function to create fallback image analysis
function createFallbackImageAnalysis() {
  return {
    objects: ["unknown"],
    people: "Unable to analyze",
    setting: "Unknown setting",
    colors: ["unknown"],
    mood: "neutral",
    composition: "standard",
    brandElements: ["none detected"],
    textInImage: "Unable to detect text",
    imageQuality: "standard quality",
    engagementPotential: "moderate",
  };
}

function createFallbackPost(post) {
  // Extracting hashtags from description or caption
  const text = (post.description || "") + " " + (post.caption || "");
  const hashtags = generateFallbackHashtags(post);

  // Extracting caption 
  let caption = post.description || post.caption || "";
  caption = caption.replace(
    /^\d+[KM]?\s*likes?,\s*\d+\s*comments?\s*-\s*\w+\s+on\s+\w+\s+\d+,\s*\d+:\s*"?/,
    ""
  );
  caption = caption.replace(/"$/, ""); 

  return {
    ...post,
    postLikes: extractLikesFromDescription(post.description) || post.likes || 0,
    postComments:
      extractCommentsFromDescription(post.description) || post.comments || 0,
    postCaption: caption.substring(0, 300) || "No caption available",
    postHashtags: hashtags,
    postVibe: ["general", "content"],
    postQuality: ["standard", "quality"],
    analysis:
      "Basic post analysis - analysis not available without API key.",
    imageLevelAnalysis: createFallbackImageAnalysis(),
  };
}

function processFallback(scrapeResult, posts) {
  console.log(" [DetailExtraction] Using fallback processing (no AI)");

  const enhancedPosts = posts.map((post, index) => {
    return createFallbackPost(post);
  });

  return NextResponse.json({
    success: true,
    ...scrapeResult,
    enhancedPosts: enhancedPosts,
    demographicData: createFallbackDemographicData(),
    processedAt: new Date().toISOString(),
    processingMethod: "fallback",
  });
}

//  demographic data
async function generateDemographicData(ai, username) {
  const demographicPrompt = `Analyze the Instagram username "${username}" and provide demographic assumptions about their audience. Use your knowledge of public figures, celebrities, influencers, and username patterns. If possible, search the web for more information about the username.

Instructions:
- If the username belongs to a known public figure, celebrity, or influencer, use their real-world popularity, niche, and audience data to inform your assumptions.
- If the username is not recognized, analyze the username pattern and make reasonable assumptions based on typical Instagram demographics.
- If you cannot find any clue, assume the username is an Indian male, likely an IT professional, and base your demographic assumptions accordingly.

For your response:
- Provide ONLY a valid JSON object with this exact structure (all values must be numbers that add up to 100):

{
  "audienceGeography": {
    "USA": 30,
    "UK": 15,
    "India": 20,
    "Canada": 8,
    "Australia": 7,
    "Others": 20
  },
  "genderDistribution": {
    "male": 65,
    "female": 30,
    "other": 5
  },
  "ageGroups": {
    "13-17": 10,
    "18-24": 25,
    "25-34": 35,
    "35-44": 20,
    "45+": 10
  }
}

Rules:
- All percentages in each category must sum to 100.
- Do not include any extra text, explanation, or comments—return only the JSON object.
- Make your assumptions as accurate as possible based on available information or web search.
`;

  try {
      // Use the same Gemini API call as post analysis
      console.log(` [Demographics] initialization`);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: demographicPrompt,
      });
      console.log(`[Demographics] Success `);

      const responseText = response.text || response.response?.text || "";
      console.log(
        " [Demographics] Response:",
        responseText.substring(0, 200) + "..."
      );

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in AI response");
      }

    const demographicData = JSON.parse(jsonMatch[0]);

    // Validating the structure
    if (
      !demographicData.audienceGeography ||
      !demographicData.genderDistribution ||
      !demographicData.ageGroups
    ) {
      throw new Error("Invalid demographic data structure");
    }

    return demographicData;
  } catch (error) {
    console.error(
      " [Demographics] Error extracting demographic data:",
      error
    );
    throw error;
  }
}

// Fallback demographic data
function createFallbackDemographicData() {
  return {
    audienceGeography: {
      USA: 25,
      UK: 10,
      India: 15,
      Canada: 8,
      Australia: 5,
      Brazil: 7,
      Others: 30,
    },
    genderDistribution: {
      male: 55,
      female: 40,
      other: 5,
    },
    ageGroups: {
      "13-17": 15,
      "18-24": 30,
      "25-34": 25,
      "35-44": 20,
      "45+": 10,
    },
  };
}
