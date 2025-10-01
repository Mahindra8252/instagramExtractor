export const calculateMetrics = ({enhancedPosts, profile}) => {
  try {
    let totalEngagement = enhancedPosts.reduce(
      (sum, post) => sum + (post.postLikes || 0) + (post.postComments || 0),
      0
    );
    totalEngagement = ((totalEngagement / profile.followersCount) * 100).toFixed(1);

    const avgLikes =
      enhancedPosts.reduce((sum, post) => sum + (post.postLikes || 0), 0) /
      enhancedPosts.length;
    const avgComments =
      enhancedPosts.reduce((sum, post) => sum + (post.postComments || 0), 0) /
      enhancedPosts.length;

    const allVibes = enhancedPosts.flatMap((post) => post.postVibe || []);
    const allQualities = enhancedPosts.flatMap(
      (post) => post.postQuality || []
    );

    const vibeFrequency = allVibes.reduce((acc, vibe) => {
      acc[vibe] = (acc[vibe] || 0) + 1;
      return acc;
    }, {});

    const qualityFrequency = allQualities.reduce((acc, quality) => {
      acc[quality] = (acc[quality] || 0) + 1;
      return acc;
    }, {});

    const topVibes = Object.entries(vibeFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([vibe, count]) => ({ vibe, count }));

    const topQualities = Object.entries(qualityFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([quality, count]) => ({ quality, count }));

    const allMoods = enhancedPosts
      .map((post) => post.imageLevelAnalysis?.mood)
      .filter(Boolean);

    const allColors = enhancedPosts.flatMap(
      (post) => post.imageLevelAnalysis?.colors || []
    );

    const colorFrequency = allColors.reduce((acc, color) => {
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {});

    const topColors = Object.entries(colorFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([color, count]) => ({ color, count }));

    return {
      totalEngagement,
      avgLikes: Math.round(avgLikes),
      avgComments: Math.round(avgComments),
      topVibes,
      topQualities,
      allMoods,
      topColors,
    };
  } catch (error) {
    console.error(" Error calculating metrics in AnalyticsDashboard:", error);
    return {
      totalEngagement: 0,
      avgLikes: 0,
      avgComments: 0,
      topVibes: [],
      topQualities: [],
      allMoods: [],
      topColors: [],
    };
  }
};

export const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};
