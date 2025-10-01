import { VerificationCodeService } from './verificationService/verificationCodeService.js';
import { CodeInputHandler } from './handlers/codeInputHandler.js';
import { SubmitButtonHandler } from './handlers/submitButtonHandler.js';
import { VerificationStatusChecker } from './handlers/verificationStatusChecker.js';

export class EmailVerificationHandler {
  constructor(page, gmailReader, debugScreenshot, username) {
    this.page = page;
    this.debugScreenshot = debugScreenshot;
    this.username = username;
    
    this.verificationCodeService = new VerificationCodeService(gmailReader);
    this.codeInputHandler = new CodeInputHandler(page, debugScreenshot);
    this.submitButtonHandler = new SubmitButtonHandler(page);
    this.verificationStatusChecker = new VerificationStatusChecker(page, debugScreenshot);
  }

  async isRequired() {
    try {
      const verificationRequired = await this.page.evaluate(() => {
        const currentUrl = window.location.href.toLowerCase();
        const bodyText = document.body.innerText.toLowerCase();
        
        const verificationIndicators = {
          challengeUrl: currentUrl.includes('challenge'),
          codeEntryUrl: currentUrl.includes('/auth_platform/codeentry/'),
          verificationText: (
            bodyText.includes('enter confirmation code') ||
            bodyText.includes('verification code') ||
            bodyText.includes('security code') ||
            bodyText.includes('we sent you an email') ||
            bodyText.includes('enter the 6-digit code') ||
            bodyText.includes('confirm your email')
          ),
          verificationInput: (
            document.querySelector('input[name="verificationCode"]') !== null ||
            document.querySelector('input[type="text"][maxlength="6"]') !== null ||
            document.querySelector('input[aria-label*="code"]') !== null
          )
        };
        
        
        return verificationIndicators.challengeUrl || 
               verificationIndicators.codeEntryUrl ||
               verificationIndicators.verificationText || 
               verificationIndicators.verificationInput;
      });

      

      return verificationRequired;

    } catch (error) {
      return false;
    }
  }

  async handle(loginStartTime) {
    
    try {
      await this.debugScreenshot.capture('email-verification', 'step1', 'verification-requested');
      
      const verificationCode = await this.verificationCodeService.getVerificationCode(loginStartTime);
      
      const codeField = await this.codeInputHandler.enterVerificationCode(verificationCode);
      await this.submitButtonHandler.submitVerification(codeField);
      
      const success = await this.verificationStatusChecker.waitForCompletion();
      
   
      
      return success;

    } catch (error) {
      await this.debugScreenshot.capture('email-verification', 'error', 'verification-failed');
      throw error;
    } finally {
      this.verificationCodeService.disconnect();
    }
  }
}