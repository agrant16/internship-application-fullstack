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

/**
 * Returns a random index for the variant URLS array.
 *
 * Allows for approximately equal probabilty of choosing either
 * URL 1 or URL 2. Especially as the number of requests grows large.
 */
function chooseRandomIndex() {
  let x = random(2),
    y = random(2);
  if (x === y) return x;
  else return chooseRandomIndex();
}

/**
 * Helper function for chooseRandomIndex. Returns an int in [0, max).
 * @param {int} max
 */
function random(max) {
  return Math.floor(Math.random() * max);
}

/*
Class for modifying the HTML elements on the returned website. Used by an
HTMLRewriter instance to modify HTML on the served website.
*/
class elementHandler {
  element(element) {
    if (element.tagName === "title") {
      element.setInnerContent("Alan Grant's Cloudflare Internship App");
    } else if (element.tagName === "h1") {
      element.setInnerContent(
        "Welcome to Alan Grant's Cloudflare Internship App!"
      );
    } else if (
      element.tagName === "a" &&
      element.getAttribute("id") === "url"
    ) {
      element.setAttribute("href", "http://www.github.com/agrant16");
      element.setInnerContent("Take a look at my Github profile!");
    } else if (
      element.tagName === "p" &&
      element.getAttribute("id") === "description"
    ) {
      element.setInnerContent(
        `Hello there! My name is Alan Grant and you're currently viewing one
          of two variants for this website. The page is built for the Cloudflare
          fullstack development internship application. This app stores the url
          of this variant in a cookie and then uses that cookie to return the
          same variant back to you for your viewing pleasure. This cookie
          persists for five minutes, after which you can refresh the page and
          possibly get the other variant.`
      );
    }
  }
}

/**
 * Parses the request's cookies looking for a cookie with "name". If
 * "name" is found it returns the value of that cookie, else it returns
 * null.
 *
 * Taken from the Cloudflare Worker recipe found at
 * https://developers.cloudflare.com/workers/archive/recipes/setting-a-cookie/.
 *
 * @param {Request} request The incoming request
 * @param {String} name The name of the cookie to retrieve.
 */
function getCookie(request, name) {
  let result = null;
  let cookieString = request.headers.get("Cookie");
  if (cookieString) {
    let cookies = cookieString.split(";");
    cookies.forEach(cookie => {
      let cookieName = cookie.split("=")[0].trim();
      if (cookieName === name) {
        let cookieVal = cookie.split("=")[1];
        result = cookieVal;
      }
    });
  }
  return result;
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {}
