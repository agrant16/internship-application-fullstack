/*
Author: Alan Grant
Date: 04/15/2020
Project: Cloudflare Fullstack Development Internship Application

This application queries a URL for JSON containing two URLS representing
variants of the same website. It then selects one of those variants at random,
modifies the HTML of that variant, and serves it to the client, along with a
cookie storing the URL of the variant they were served. This cookie has it's
max-age set 300 seconds. Upon subsequent visits to the application, if the
cookie has not reached it's max age, the URL stored in the cookie will be
retrieved and that same variant will be served to the client. If the max age
has been reached they will be randomly served one of the two variants again.
*/

/*
Constants
*/
const VARIANTS_URL = "https://cfw-takehome.developers.workers.dev/api/variants";
const VARIANT_COOKIE_NAME = "variant_url";
const REWRITER = new HTMLRewriter().on("*", new elementHandler());

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const variantURL = "https://cfw-takehome.developers.workers.dev/api/variants";
}
