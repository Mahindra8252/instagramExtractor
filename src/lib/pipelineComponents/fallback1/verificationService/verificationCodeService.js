export class VerificationCodeService {
  constructor(gmailReader) {
    this.gmailReader = gmailReader;
  }

  async getVerificationCode(loginStartTime) {
    
    const indiaOffset = 5.5 * 60 * 60 * 1000;
    const searchTime = new Date(loginStartTime - 60000);
    
    
    const verificationCode = await this.gmailReader.waitForVerificationCode({
      timeout: 120000,
      pollInterval: 5000,
      since: searchTime
    });

    
    return verificationCode;
  }

  disconnect() {
    try {
      this.gmailReader.disconnect();
    } catch (e) {
    }
  }
}