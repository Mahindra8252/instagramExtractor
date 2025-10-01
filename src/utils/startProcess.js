import { toast } from "react-toastify";

export const handleSubmit = async (
  username,
  setLoading,
  setLoadingMessage,
  setError,
  setData,
  setFinalResult
) => {
  setLoading(true);
  setError("");
  setData(null);
  setFinalResult(null);
  setLoadingMessage("");

  let step1Toast;


  try {
    step1Toast = toast.loading("Step 1/2: Scraping Instagram profile...");
    setLoadingMessage("Step 1/2: Scraping Instagram profile...");

    const scrapeRes = await fetch("/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (!scrapeRes.ok) throw new Error("Failed to scrape");
    const scrapeResult = await scrapeRes.json();

    // console.log(" Step 1 Complete - Scrape Result:", scrapeResult);

    if (!scrapeResult.success) {
      setError(scrapeResult.error || "Failed to scrape profile");
      setLoading(false);
      setLoadingMessage("");
      return;
    }
    toast.update(step1Toast, {
      render: "Step 2/2: Processing scraped data with AI",
      type: "loading",
    });
    setLoadingMessage("Step 2/2:  Processing scraped data with AI");

    // console.log(" Step 2: Processing data through AI detail extraction...");

    const detailRes = await fetch("/api/AI/detailExtraction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scrapeResult),
    });

    if (!detailRes.ok) throw new Error("Failed to process details");
    const finalResult = await detailRes.json();

    // console.log(" Step 2 Complete - Final Processed Result:", finalResult);

    if (finalResult.enhancedPosts) {
      // console.log(
      //   " analyzed posts returned:",
      //   finalResult.enhancedPosts.length
      // );
      finalResult.enhancedPosts.forEach((post, i) => {
        // console.log(`Enhanced Post ${i}:`, {
        //   likes: post.postLikes,
        //   comments: post.postComments,
        //   analysis: post.analysis?.substring(0, 50) + "...",
        //   vibes: post.postVibe,
        // });
      });
    }

    setData(scrapeResult);
    setFinalResult(finalResult); 

    if (!finalResult.success) {
      setError(finalResult.error || "Failed to process data");
    }

    toast.update(step1Toast, {
      render: "Analysis complete! AI insights ready.",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
  } catch (err) {
    console.error("Fetch error:", err);

    if (err.name === "TypeError" && err.message.includes("fetch")) {
      setError(
        "Network error: Please check your internet connection and try again."
      );
    } else if (err.message.includes("Failed to scrape")) {
      setError(
        "Failed to scrape Instagram profile. The profile might be private or the username is incorrect."
      );
    } else if (err.message.includes("Failed to process")) {
      setError(
        "AI processing failed. Showing basic results without AI analysis."
      );
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
    if (step1Toast) {
      toast.update(step1Toast, {
        render: " Processing failed. ",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } else {
      toast.error(" Processing failed.");
    }
  } finally {
    setLoading(false);
    setLoadingMessage("");
  }
};
