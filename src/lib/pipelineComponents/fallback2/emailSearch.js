import { simpleParser } from 'mailparser';

export class EmailSearch {
  constructor(imapConnection) {
    this.imapConnection = imapConnection;
  }

  buildSearchCriteria(searchSince) {
    const now = new Date();
    const twentyMinutesAgo = new Date(now.getTime() - 20 * 60 * 1000);
    const since = searchSince || twentyMinutesAgo;
    
    
    const criteria = [
      ['FROM', 'security@mail.instagram.com'],
      ['SINCE', since] 
    ];
    
    
    return criteria;
  }

  async searchEmails(searchCriteria) {
    return new Promise((resolve, reject) => {
      const imap = this.imapConnection.getImap();
      
      if (!this.imapConnection.isConnected) {
        reject(new Error('Not connected to Gmail'));
        return;
      }


      imap.search(searchCriteria, (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        if (!results || results.length === 0) {
          resolve([]);
          return;
        }

        this.fetchEmailResults(results, resolve, reject);
      });
    });
  }

  fetchEmailResults(results, resolve, reject) {
    const imap = this.imapConnection.getImap();
    const fetch = imap.fetch(results, { 
      bodies: ['HEADER', 'TEXT', ''],
      struct: true
    });
    
    const emails = [];
    
    fetch.on('message', (msg, seqno) => {
      this.processEmailMessage(msg, seqno, emails);
    });
    
    fetch.once('error', (err) => {
      reject(err);
    });
    
    fetch.once('end', () => {
      const sortedEmails = this.sortEmailsByDate(emails);
      resolve(sortedEmails);
    });
  }

  processEmailMessage(msg, seqno, emails) {
    let emailData = { seqno };
    let bufferComplete = '';
    
    msg.on('body', (stream, info) => {
      let buffer = '';
      
      stream.on('data', (chunk) => {
        buffer += chunk.toString('utf8');
      });
      
      stream.once('end', async () => {
        if (info.which === '') {
          bufferComplete = buffer;
          try {
            const parsed = await simpleParser(buffer);
            emailData.parsed = parsed;
            emailData.subject = parsed.subject;
            emailData.from = parsed.from?.text || '';
            emailData.date = parsed.date;
            emailData.html = parsed.html;
            emailData.text = parsed.text;
          } catch (err) {
          }
        }
      });
    });
    
    msg.once('end', () => {
      emails.push(emailData);
    });
  }

  sortEmailsByDate(emails) {
    const sorted = emails.sort((a, b) => {
      const dateA = new Date(a.parsed?.date || a.date || 0);
      const dateB = new Date(b.parsed?.date || b.date || 0);
      return dateB.getTime() - dateA.getTime(); 
    });
    
    sorted.forEach((email, index) => {
      const date = new Date(email.parsed?.date || email.date || 0);
      const subject = email.parsed?.subject || email.subject || 'No subject';
      const from = email.parsed?.from?.text || email.from || 'Unknown sender';
      console.log(`   ${index + 1}. ${date.toISOString()} - "${subject}" from ${from}`);
    });
    
    return sorted;
  }
}