import { USER_AGENTS } from './constants.js';

export const getRandomUserAgent = () => {
  const randomIndex = Math.floor(Math.random() * USER_AGENTS.length);
  return USER_AGENTS[randomIndex];
};

export const validateUsername = (username) => {
  if (!username) {
    return { isValid: false, error: 'Username is required' };
  }
  
  const usernameRegex = /^[a-zA-Z0-9._]+$/;
  if (!usernameRegex.test(username)) {
    return { isValid: false, error: 'Invalid username format' };
  }
  
  return { isValid: true };
};

export const isMobileUserAgent = (userAgent) => {
  return userAgent.includes('Mobile') || 
         userAgent.includes('iPhone') || 
         userAgent.includes('Android');
};

export const getViewportConfig = (userAgent) => {
  const isMobile = isMobileUserAgent(userAgent);
  
  return isMobile 
    ? { width: 375, height: 812, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
    : { width: 1920, height: 1080, isMobile: false, hasTouch: false, deviceScaleFactor: 1 };
};

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));