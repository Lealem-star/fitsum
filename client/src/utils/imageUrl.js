/**
 * Converts relative image URLs to absolute URLs
 * If the URL is already absolute (starts with http), returns as is
 * If the URL is relative (starts with /), prepends the API base URL
 */
export const getImageUrl = (url) => {
  if (!url) return url;
  
  // If already absolute URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If relative URL starting with /, prepend API base URL
  if (url.startsWith('/')) {
    const apiUrl = process.env.REACT_APP_API_URL || '';
    // In development, apiUrl might be empty (using proxy), so return relative URL
    // In production, apiUrl will be set, so prepend it
    return apiUrl ? apiUrl + url : url;
  }
  
  // Otherwise return as is
  return url;
};

