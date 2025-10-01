export class CodeWaiter {
  constructor(emailSearch, codeExtractor) {
    this.emailSearch = emailSearch;
    this.codeExtractor = codeExtractor;
    this.lastCheckedCode = null; 
    this.processedEmailIds = new Set(); 
  }

  async waitForVerificationCode(options = {}) {
    const {
      timeout = 120000, 
      pollInterval = 5000, 
      maxRetries = 24, 
      onCodeFound = null 
    } = options;

    
    let retries = 0;
    const startTime = Date.now();

    while (this.shouldContinueWaiting(retries, maxRetries, startTime, timeout)) {
      try {
        
        const code = await this.pollForCode(options.since);
        
        if (code) {
          
          if (onCodeFound) {
            const verificationResult = await onCodeFound(code);
            
            if (verificationResult.success) {
              return code;
            } else {
              
              this.lastCheckedCode = code;
              
              retries++;
              await this.delay(pollInterval);
              continue;
            }
          } else {
            return code;
          }
        }

        retries++;
        await this.delay(pollInterval);

      } catch (error) {
        retries = await this.handlePollError(error, retries, maxRetries, pollInterval);
      }
    }

    throw new Error('Timeout waiting for Instagram verification code');
  }

  shouldContinueWaiting(retries, maxRetries, startTime, timeout) {
    return retries < maxRetries && (Date.now() - startTime) < timeout;
  }

  async pollForCode(searchSince) {
    const now = new Date();
    const twentyMinutesAgo = new Date(now.getTime() - 20 * 60 * 1000);
    const since = searchSince || twentyMinutesAgo;
    
    
    await this.ensureGmailConnection();
    
    const emails = await this.emailSearch.searchEmails(
      this.emailSearch.buildSearchCriteria(since)
    );
    

    return this.findCodeInEmails(emails);
  }

  findCodeInEmails(emails) {
    const priorityEmails = emails.filter(email => {
      const subject = email.parsed?.subject || email.subject || '';
      const from = email.parsed?.from?.text || email.from || '';
      const isVerifyAccount = subject.toLowerCase().includes('verify your account');
      const isFromSecurity = from.toLowerCase().includes('security@mail.instagram.com');
      return isVerifyAccount && isFromSecurity;
    });
    
    const otherEmails = emails.filter(email => {
      const subject = email.parsed?.subject || email.subject || '';
      const from = email.parsed?.from?.text || email.from || '';
      const isVerifyAccount = subject.toLowerCase().includes('verify your account');
      const isFromSecurity = from.toLowerCase().includes('security@mail.instagram.com');
      return !(isVerifyAccount && isFromSecurity);
    });
    
    const orderedEmails = [...priorityEmails, ...otherEmails];
    
    
    for (const email of orderedEmails) {
      const subject = email.parsed?.subject || email.subject || 'unknown';
      const from = email.parsed?.from?.text || email.from || 'unknown';
      const date = email.parsed?.date || 'unknown';
      const emailId = `${from}-${subject}-${date}`;
      
      
      if (this.processedEmailIds.has(emailId)) {
        continue;
      }
      
      const code = this.codeExtractor.extractVerificationCode(email);
      
      if (code) {
        if (code === this.lastCheckedCode) {
          this.processedEmailIds.add(emailId);
          continue;
        }
        
        
        this.processedEmailIds.add(emailId);
        
        return code;
      } else {
      }
    }

    return null;
  }

  async handlePollError(error, retries, maxRetries, pollInterval) {
    retries++;
    
    if (retries < maxRetries) {
      await this.delay(pollInterval);
    }
    
    return retries;
  }

  async ensureGmailConnection() {
    const connection = this.emailSearch.imapConnection;
    
    if (!connection.isConnected) {
      await connection.connect();
      await connection.openInbox();
    }
  }

  resetTracking() {
    this.lastCheckedCode = null;
    this.processedEmailIds.clear();
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}