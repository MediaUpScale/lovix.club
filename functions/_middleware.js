import { lowercaseRedirect } from "./lowercase.js";

export async function onRequest(context) {
  const redirect = lowercaseRedirect(context.request);
  if (redirect) return redirect;
  return context.next();
}
