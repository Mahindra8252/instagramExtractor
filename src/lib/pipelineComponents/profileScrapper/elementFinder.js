export function findElementWithSelectors(selectors, options = {}) {
  const {
    minLength = 0,
    maxLength = Infinity,
    excludePatterns = []
  } = options;

  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);
    
    for (const element of elements) {
      const text = element.textContent?.trim();
      
      if (text && 
          text.length > minLength && 
          text.length < maxLength &&
          !excludePatterns.some(pattern => pattern.test(text))) {
        return text;
      }
    }
  }
  
  return null;
}

export function findTextInDocument(patterns) {
  const allText = document.body.innerText || document.body.textContent || '';
  
  for (const pattern of patterns) {
    const match = allText.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}