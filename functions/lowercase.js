/* 301 any path that is not already lowercase.
   /LADA, /Lada/ and /LADA/Watch all land on the lowercase path.
   The query string stays as it was. */
export function lowercaseRedirect(request) {
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  const url = new URL(request.url);
  let decoded = url.pathname;
  try {
    decoded = decodeURI(url.pathname);
  } catch (e) {
    return null;
  }
  const lower = decoded.toLowerCase();
  if (lower === decoded) return null;
  url.pathname = lower;
  return Response.redirect(url.toString(), 301);
}
