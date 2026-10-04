import { lowercaseRedirect } from "./functions/lowercase.js";

export default {
  async fetch(request, env) {
    const redirect = lowercaseRedirect(request);
    if (redirect) return redirect;
    if (env && env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("Not found", { status: 404 });
  }
};
