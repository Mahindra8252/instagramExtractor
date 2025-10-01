import { delay } from "@/utils/utils";

export class CodeInputHandler {
  constructor(page, debugScreenshot) {
    this.page = page;
    this.debugScreenshot = debugScreenshot;
  }

  async enterVerificationCode(verificationCode) {
    
    const codeField = await this.findCodeInputField();
    await codeField.click();
    await codeField.type(verificationCode, { delay: 200 });
    await delay(1000);

    await this.debugScreenshot.capture('email-verification', 'step2', 'code-entered');
    
    return codeField;
  }

  async findCodeInputField() {
    const codeInputSelectors = [
      'input[name="verificationCode"]',
      'input[aria-label*="confirmation code"]',
      'input[aria-label*="verification code"]',
      'input[placeholder*="confirmation code"]',
      'input[placeholder*="verification code"]',
      'input[placeholder*="code"]',
      'input[name="email"][type="text"]',
      'input[autocomplete="off"][type="text"]',
      'input[dir="ltr"][type="text"]',
      'input[type="text"][maxlength="6"]',
      'input[type="text"][maxlength="8"]',
      'input[aria-label*="code"]',
      'input[class*="code"]',
      'input[data-testid*="code"]',
      'input[type="text"]'
    ];

    await this.debugScreenshot.capture('email-verification', 'step2', 'searching-for-input');
    
    for (const selector of codeInputSelectors) {
      const field = await this.trySelector(selector);
      if (field) return field;
    }

    throw new Error('error');
  }

  async trySelector(selector) {
    try {
      const candidates = await this.page.$$(selector);
      console.log(` [CodeInputHandler] Trying selector "${selector}" - found ${candidates.length} candidates`);
      
      for (const candidate of candidates) {
        const isValidField = await this.isValidCodeField(candidate);
        if (isValidField) {
          return candidate;
        }
      }
    } catch (e) {
    }
    return null;
  }

  async isValidCodeField(field) {
    const fieldInfo = await field.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return {
        visible: rect.width > 0 && rect.height > 0,
        name: el.getAttribute('name'),
        placeholder: el.getAttribute('placeholder'),
        type: el.getAttribute('type'),
        maxLength: el.getAttribute('maxlength'),
      };
    });
    
    return fieldInfo.visible && fieldInfo.type === 'text';
  }
}