export function parseNumber(str) {
  if (!str) return null;
  
  let cleanStr = str.replace(/,/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  
  const match = cleanStr.match(/(\d+(?:\.\d+)?[km]?)/);
  if (!match) return null;
  
  let numStr = match[1];
  let multiplier = 1;
  
  if (numStr.includes('k')) {
    multiplier = 1000;
    numStr = numStr.replace('k', '');
  } else if (numStr.includes('m')) {
    multiplier = 1000000;
    numStr = numStr.replace('m', '');
  }
  
  const num = parseFloat(numStr);
  return isNaN(num) ? null : Math.round(num * multiplier);
}