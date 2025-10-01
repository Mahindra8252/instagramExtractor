import { delay } from "@/utils/utils";


export class PopupHandler {
  constructor(page, debugScreenshot) {
    this.page = page;
    this.debugScreenshot = debugScreenshot;
  }

  async handlePostLoginPopups() {
    console.log(" [PopupHandler] Handling popups...");

    try {
      await delay(3000);
      await this._handleSaveLoginInfoPopup();
      await this._handleNotificationPopup();
      await this._handleGenericPopups();
      
      console.log(" [PopupHandler]  popups handled");
    } catch (error) {
      console.log(` [PopupHandler] Error handling popups: ${error.message}`);
    }
  }

  async _handleSaveLoginInfoPopup() {
    try {
      const elements = await this.page.$x(`//button[contains(text(), 'Not Now')]`);
      if (elements.length > 0) {
        console.log('[PopupHandler] Dismissing " Login Info" popup...');
        await elements[0].click();
        await delay(2000);
      }
    } catch (e) {
      console.log(' [PopupHandler] Could not handle login info popup');
    }
  }

  async _handleNotificationPopup() {
    try {
      const notificationElements = await this.page.$x(
        `//button[contains(text(), 'Not Now') or contains(text(), 'Turn on')]`
      );
      
      for (const element of notificationElements) {
        const text = await this.page.evaluate(el => el.textContent, element);
        if (text.includes("Not Now")) {
          console.log(" [PopupHandler] Dismissing notifications popup...");
          await element.click();
          await delay(2000);
          break;
        }
      }
    } catch (e) {
      console.log(" [PopupHandler] Could not handle notification popup");
    }
  }

  async _handleGenericPopups() {
    try {
      const genericDismissSelectors = [
        'button[aria-label="Close"]',
        'button[aria-label="Dismiss"]',
        'svg[aria-label="Close"]',
      ];

      for (const selector of genericDismissSelectors) {
        const element = await this.page.$(selector);
        if (element) {
          console.log(` [PopupHandler] Dismissing popup with: ${selector}`);
          await element.click();
          await delay(1000);
        }
      }
    } catch (e) {
      // Ignore
    }
  }
}