import { delay } from "@/utils/utils";

export class VerificationStatusChecker {
  constructor(page, debugScreenshot) {
    this.page = page;
    this.debugScreenshot = debugScreenshot;
  }

  async waitForCompletion() {
    
    let verificationSuccess = false;
    let attempts = 0;
    const maxAttempts = 2;
    
    while (!verificationSuccess && attempts < maxAttempts) {
      attempts++;
      const waitTime = Math.min(4000 * attempts, 8000);
      
      await delay(waitTime);
      await this.debugScreenshot.capture('email-verification', `step3-attempt${attempts}`, 'verification-check');

      verificationSuccess = await this.checkVerificationSuccess();
      
      if (verificationSuccess) {
        break;
      }
    }

    return verificationSuccess;
  }

  async checkVerificationSuccess() {
    return await this.page.evaluate(() => {
      const currentUrl = window.location.href;
      const bodyText = document.body.innerText.toLowerCase();
      
      const successIndicators = {
        redirectedFromChallenge: !currentUrl.includes('/challenge/'),
        redirectedFromCodeentry: !currentUrl.includes('/codeentry/'),
        redirectedFromAuthPlatform: !currentUrl.includes('/auth_platform/'),
        noErrorMessage: !bodyText.includes('incorrect code') && 
                       !bodyText.includes('invalid code') && 
                       !bodyText.includes('wrong code') &&
                       !bodyText.includes('please try again') &&
                       !bodyText.includes('code expired'),
        onInstagramDomain: currentUrl.includes('instagram.com'),
        notOnVerificationFlow: !currentUrl.includes('challenge') && 
                              !currentUrl.includes('codeentry') && 
                              !currentUrl.includes('auth_platform/codeentry')
      };
      
      return successIndicators.redirectedFromChallenge && 
             successIndicators.redirectedFromCodeentry && 
             successIndicators.redirectedFromAuthPlatform &&
             successIndicators.noErrorMessage &&
             successIndicators.onInstagramDomain &&
             successIndicators.notOnVerificationFlow;
    });
  }
}