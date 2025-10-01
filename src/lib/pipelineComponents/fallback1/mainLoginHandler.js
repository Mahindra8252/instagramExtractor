import { delay } from "@/utils/utils";
import GmailReader from "../fallback2/main.js";
import { EmailVerificationHandler } from "./emailVerificationHandler.js";
import { PopupHandler } from "./popupHandler.js";
import { LoginFormHandler } from "./loginFormHandler.js";

export class MainLoginHandler {
  constructor(page, username = "unknown", gmailCredentials = {}) {
    this.page = page;
    this.username = username;
    
    this._initializeConfiguration(gmailCredentials);
    this._initializeComponents();
    
    this.isLoggedIn = false;
  }

  _initializeConfiguration(gmailCredentials) {
    this.credentials = {
      username: "DarkKnight82522",
      password: "Mahindra8252@"
    };
    
    this.gmailConfig = {
      email: "mahindrayadav8252@gmail.com",
      appPassword: "zxbh opih zfll gehe",
      ...gmailCredentials
    };
  }

  _initializeComponents() {
    const { DebugScreenshot } = require("../../../utils/debugScreenshot.js");
    this.debugScreenshot = new DebugScreenshot(this.page, `login-${this.username}`);
    
    this.gmailReader = new GmailReader(this.gmailConfig);
    this.emailVerificationEnabled = true;
    
    this.emailVerificationHandler = new EmailVerificationHandler(
      this.page,
      this.gmailReader,
      this.debugScreenshot,
      this.username
    );
    
    this.popupHandler = new PopupHandler(this.page, this.debugScreenshot);
    this.loginFormHandler = new LoginFormHandler(this.page, this.debugScreenshot, this.credentials);
  }

  async isLoginRequired() {

    try {
      const currentUrl = this.page.url();

      const loginRequired = currentUrl.includes("accounts/login");
     

      return loginRequired;
    } catch (error) {
      return false;
    }
  }

  async performLogin() {
    
    this.loginStartTime = Date.now();

    try {
      await this._navigateToLoginPage();
      
      const formSubmitted = await this.loginFormHandler.fillAndSubmit();
      if (!formSubmitted) return false;

      const verificationSuccess = await this._handleEmailVerificationIfRequired();
      if (!verificationSuccess) return false;

      const loginSuccess = await this.checkLoginSuccess();
      
      if (loginSuccess) {
        await this._handleSuccessfulLogin();
        return true;
      } else {
        await this._handleFailedLogin();
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async _navigateToLoginPage() {
    const currentUrl = this.page.url();
    if (!currentUrl.includes("/accounts/login/")) {
      await this.page.goto("https://www.instagram.com/accounts/login/", {
        waitUntil: "networkidle2",
        timeout: 30000,
      });
      await delay(3000);
    }
  }

  async _handleEmailVerificationIfRequired() {
    const emailVerificationRequired = await this.emailVerificationHandler.isRequired();
    
    if (emailVerificationRequired) {
      return await this.emailVerificationHandler.handle(this.loginStartTime);
    }
    
    return true;
  }

  async _handleSuccessfulLogin() {
    this.isLoggedIn = true;
    await this.popupHandler.handlePostLoginPopups();
  }

  async _handleFailedLogin() {
    await this.logLoginErrors();
  }

  async checkLoginSuccess() {
    try {
      const currentUrl = this.page.url();

      const loginSuccess = await this.page.evaluate(() => {
        const indicators = {
          notOnLoginPage: !window.location.href.includes("/accounts/login/"),
          noErrorMessage: !document.querySelector('[role="alert"]'),
        };

        return indicators.notOnLoginPage && indicators.noErrorMessage;
      });

      return loginSuccess;
    } catch (error) {
      return false;
    }
  }

  async navigateToProfile(targetUsername) {

    try {
      const profileUrl = `https://www.instagram.com/${targetUsername}/`;

      await this.page.goto(profileUrl, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      await delay(3000);
      return true;
    } catch (error) {
      return false;
    }
  }

  async loginWithRetry(targetUsername, maxAttempts = 2) {

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {

      const success = await this._attemptLoginWithNavigation(targetUsername);
      if (success) return true;

      if (attempt < maxAttempts) {
        await delay(5000);
      }
    }

    return false;
  }

  async _attemptLoginWithNavigation(targetUsername) {
    try {
      const loginSuccess = await this.performLogin();
      if (loginSuccess) {
        const navSuccess = await this.navigateToProfile(targetUsername);
        if (navSuccess) {
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async logLoginErrors() {
    try {
      const errorMessages = await this.page.evaluate(() => {
        const errors = [];
        const errorSelectors = [
          '[role="alert"]',
          ".error",
          '[id*="error"]',
          ".invalid-feedback",
          '[data-testid="login-error"]',
        ];

        errorSelectors.forEach((selector) => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el) => {
            if (el.textContent && el.textContent.trim()) {
              errors.push(el.textContent.trim());
            }
          });
        });

        const bodyText = document.body.innerText.toLowerCase();
        if (bodyText.includes("incorrect username") || bodyText.includes("wrong password")) {
          errors.push("Invalid credentials detected in page content");
        }
        if (bodyText.includes("try again later")) {
          errors.push("Rate limit or temporary block detected");
        }

        return errors;
      });

      if (errorMessages.length > 0) {
        errorMessages.forEach((msg, i) => console.log(`   ${i + 1}. ${msg}`));
      }
    } catch (error) {
    }
  }

  async testGmailConnection() {
    if (!this.emailVerificationEnabled) {
      return false;
    }

    try {
      const result = await this.gmailReader.testConnection();
     
      return result;
    } catch (error) {
      return false;
    }
  }

  getLoginStatus() {
    return {
      isLoggedIn: this.isLoggedIn,
      username: this.credentials.username,
      emailVerificationEnabled: this.emailVerificationEnabled
    };
  }
}