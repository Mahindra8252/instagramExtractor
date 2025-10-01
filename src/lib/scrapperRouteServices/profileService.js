export class ProfileService {
  constructor(profileScraper, postScraper, popupHandler) {
    this.profileScraper = profileScraper;
    this.postScraper = postScraper;
    this.popupHandler = popupHandler;
  }

  async handlePopupsAndExtract(navigationService) {
    console.log(` Step 5/8: Handling popups and continue buttons...`);
    await navigationService.logCurrentLocation('Before Popups');
    await this.popupHandler.handleAllPopups();
    await navigationService.logCurrentLocation('After Popups');
    console.log(` Popup handling completed`);

    await this.postScraper.debugScreenshot.capture('api-workflow', 'after', 'popups-handled');

    console.log(`Skipping private profile check - treating all profiles as public`);

    console.log(`Step 6/8: Extracting profile information...`);
    await navigationService.logCurrentLocation('Profile Extraction');
    const profileData = await this.profileScraper.scrapeProfileData();
    
    console.log(` Profile data extracted:`);
    console.log(`    Username: ${profileData?.username || 'unknown'}`);
    console.log(`     Display Name: ${profileData?.influencerName || 'not found'}`);
    console.log(`    Followers: ${profileData?.followersCount || 'unknown'}`);
    console.log(`    Posts: ${profileData?.postsCount || 'unknown'}`);
    
    return profileData;
  }
}