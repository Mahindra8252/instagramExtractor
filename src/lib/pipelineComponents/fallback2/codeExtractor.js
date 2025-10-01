export class CodeExtractor {
  constructor() {
    this.patterns = this.buildPatterns();
  }

  buildPatterns() {
    return [
      /following\s+code\s+to\s+confirm\s+your\s+identity[:\s]+(\d{6})/i,
      
      /use\s+the\s+following\s+code[:\s]+(\d{6})/i,
      
      /confirm\s+your\s+identity[:\s]+(\d{6})/i,
      
      /(?:confirmation|verification|security)\s+code\s+is\s+(\d{6})/i,
      
      /(\d{6})\s+is\s+your\s+instagram\s+code/i,
      
      /enter\s+this\s+code\s*[:]\s*(\d{6})/i,
      
      /code\s*[:]\s*(\d{6})/i,
      
      /^\s*(\d{6})\s*$/m,
      
      /\b(\d{6})\b/,
      
      /instagram.*?(\d{6})/i,
      
      /your\s+code\s+is\s+(\d{6})/i
    ];
  }

  extractVerificationCode(email) {
    
    const sender = email.parsed?.from?.text || email.from || 'unknown';
    const subject = email.parsed?.subject || email.subject || 'unknown';
    const textPreview = (email.parsed?.text || email.text || '').substring(0, 200);
    const date = new Date(email.parsed?.date || email.date || 0);
    
    
    const isVerifyAccountEmail = subject.includes('Verify your account');
    const isFromSecurityInstagram = sender.includes('security@mail.instagram.com');
    
    if (isVerifyAccountEmail && isFromSecurityInstagram) {
    }
    
    if (!this.isFromInstagram(sender)) {
      return null;
    }
    
    
    if (!this.hasEmailContent(email)) {
      return null;
    }

    return this.extractFromAllTextSources(email);
  }

  isFromInstagram(sender) {
    return sender.toLowerCase().includes('instagram.com') || 
           sender.toLowerCase().includes('security@mail.instagram.com') ||
           sender.toLowerCase().includes('mail.instagram.com');
  }

  hasEmailContent(email) {
    return !!(email.text || email.html || email.parsed?.text);
  }

  extractFromAllTextSources(email) {
    const textSources = [
      email.parsed?.text,
      email.text,
      email.parsed?.html,
      email.html
    ].filter(Boolean);

    for (const text of textSources) {
      const code = this.extractCodeFromText(text);
      if (code) {
        return code;
      }
    }

    return null;
  }

  extractCodeFromText(text) {
    if (!text) return null;

    
    for (let i = 0; i < this.patterns.length; i++) {
      const pattern = this.patterns[i];
      const match = text.match(pattern);
      
      if (match && match[1]) {
        const code = match[1];
        
        if (/^\d{6}$/.test(code)) {
          return code;
        }
      }
    }

    return null;
  }
}