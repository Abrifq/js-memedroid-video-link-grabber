export * from "./minimal.js";

//sample text:
//By <a href="{author-link}" class="dyn-link" data-title-container="#user-profile-section" rel="author">{author-name}</a>
const getAuthorRegExp = /<a id="detailed-item-author" href="(.+?)" .+?>(.+?)<\/a/;

/**
 * Scraps the author data from the webpage.
 * @returns {import('../index').Author}
 * @param {string} webpage 
 */
export function getAuthor(webpage) {
    const scrapeResult = getAuthorRegExp.exec(webpage);
    const name = scrapeResult && scrapeResult[2] || "";
    const url = scrapeResult && "https://www.memedroid.com" + scrapeResult[1] || "";
    return { name, url };
}

//sample text:
//<meta property="og:title" content="{title}" />
const getTitleRegExp = /<meta property="og:title" content="(.+?)" \/>/;

/**
 * Scrapes the title of the post from the webpage.
 * @param {string} webpage 
 * @returns {string}
 */
export function getTitle(webpage) {
    const scrapeResult = getTitleRegExp.exec(webpage);
    return scrapeResult && scrapeResult[1] || "";
}
