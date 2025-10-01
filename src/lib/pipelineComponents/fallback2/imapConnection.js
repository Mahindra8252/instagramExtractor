import Imap from 'node-imap';

export class ImapConnection {
  constructor(credentials) {
    this.credentials = {
      user: credentials.email || process.env.GMAIL_EMAIL,
      password: credentials.appPassword || process.env.GMAIL_APP_PASSWORD,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      authTimeout: 10000,
      connTimeout: 10000,
      tlsOptions: { 
        rejectUnauthorized: false 
      }
    };
    
    this.imap = null;
    this.isConnected = false;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      
      this.imap = new Imap(this.credentials);
      
      this.imap.once('ready', () => {
        this.isConnected = true;
        resolve();
      });
      
      this.imap.once('error', (err) => {
        this.isConnected = false;
        reject(err);
      });
      
      this.imap.once('end', () => {
        this.isConnected = false;
      });
      
      this.imap.connect();
    });
  }

  disconnect() {
    if (this.imap && this.isConnected) {
      this.imap.end();
      this.isConnected = false;
    }
  }

  openInbox() {
    return new Promise((resolve, reject) => {
      this.imap.openBox('INBOX', true, (err, box) => {
        if (err) reject(err);
        else resolve(box);
      });
    });
  }

  getImap() {
    return this.imap;
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      hasCredentials: !!(this.credentials.user && this.credentials.password)
    };
  }
}