export class ResponseFormatter {
  static formatSuccess(posts, profileData, analytics) {
    return {
      success: true,
      profile: profileData,
      
      analytics: {
        postsCount: analytics.postsCount,
        totalLikes: analytics.totalLikes,         
        totalComments: analytics.totalComments,    
        totalViews: analytics.totalViews,         
        averageLikes: analytics.averageLikes,
        averageComments: analytics.averageComments,
        averageViews: analytics.averageViews,      
        totalEngagement: analytics.totalEngagement,
        engagementRate: analytics.engagementRate,
        engagementCategory: analytics.engagementCategory,
        postsAnalyzed: analytics.postsAnalyzed
      },
      
      posts: posts.map((post, index) => ({
        postIndex: index + 1,
        type: post.type,
        url: post.url,
        description: post.description,
        postLink: post.postLink,
        engagement: {         
          likes: post.likes || 0,
          comments: post.comments || 0,
          views: post.views || null
        }
      })),
      
      postEngagementDetails: posts.map((post, index) => ({
        postIndex: index + 1,
        type: post.type,
        url: post.url,
        description: post.description,
        postLink: post.postLink,
        likes: post.likes || 0,
        comments: post.comments || 0,
        views: post.views
      })),
      
      scrapedAt: new Date().toISOString()  
    };
  }
}