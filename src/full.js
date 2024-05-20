import { getMediaBase, getAuthor, getTitle, isVideoMeme } from './core.js';

const ALLOWED_HOSTS = [
    "https://www.memedroid.com",
    "https://es.memedroid.com",
    "https://pt.memedroid.com",
    "https://fr.memedroid.com",
    "https://it.memedroid.com"
];

/**
 * Checks if the url's host is a known one.
 * @todo Use `URL.prototype.hostname` instead of splitting the url string.
 * @returns {boolean}
 * @param {string} url 
 */
export function isAllowedHost(url) {
    url = url.toLowerCase();
    if (url.startsWith("http://")) url = "https:" + url.split("http:")[1];
    return ALLOWED_HOSTS.some(host => url.startsWith(host));
}



/**
 * Builds the metadata object with the scrapped data from the webpage.
 * @param {string} baseLink 
 * @param {import('../index').Author} author 
 * @param {string} title 
 * @param {boolean} hasVideo 
 * @returns {import('../index').MemeMetadata}
 */
export function buildMetadata(baseLink, author, title, hasVideo) {
    return {
        baseLink, author, title, hasVideo
    };
}

/**
 * Automatic version of {@link buildMetadata}.
 * @param {string} webpage 
 */
export function makeMetadata(webpage) {
    return buildMetadata(getMediaBase(webpage), getAuthor(webpage), getTitle(webpage), isVideoMeme(webpage));
}

const isInvalidMemeIDRegExp = /\D/;

/**
 * @param {string} memeID 
 * @returns {boolean}
 */
const isInvalidMemeID = memeID => isInvalidMemeIDRegExp.test(memeID);

const isInvalidSlugNameRegExp = /[^a-zA-Z\-]/;

/**
 * @param {string} slugName 
 * @returns {boolean}
 */
const isInvalidSlugName = slugName => isInvalidSlugNameRegExp.test(slugName);

/**
 * Checks the url's path and sees if the url can point to a meme.
 * @returns {boolean}
 * @param {string} url 
 */
export function isValidURL(url) {
    //assume it's a valid host
    const urlParts = url.split("/").slice(3); //"https:", "", "memedroid.com", "memes", "detail", "{meme-id}", "{slug-name}"
    if (urlParts[0] !== "memes") return false;
    if (urlParts[1] !== "detail") return false;
    if (isInvalidMemeID(urlParts[2])) return false;
    if (isInvalidSlugName(urlParts[3])) return false;
    //the url NEVER ends with another slash
    if (typeof urlParts[4] !== "undefined") return false;
    return true;
}

/**
 * Makes an url to **steal the meme!** Doesn't check if the meme has a video or the extension is supported. Use {@link getDownloadURL} to check that.
 * @param {string} baseLink 
 * @param {import('../index').Hint<import('../index').SupportedExtensions , string>} extension 
 */
export function getDownloadURLUnsafe(baseLink, extension) {
    return baseLink + "." + extension;
}

const photoExtensions = ["webp", "jpeg"];
const videoExtensions = ["webm", "mp4", ...photoExtensions];

/**
 * Makes an url to **steal the meme!** If a new extension is introduced in API and this module doesn't support it, use {@link getDownloadURLUnsafe}.
 * @param {import('../index').MemeMetadata} metadata 
 * @param {import('../index').SupportedExtensions} extension 
 */
export function getDownloadURL({ hasVideo, baseLink }, extension) {
    if (!hasVideo && !photoExtensions.includes(extension)) throw "The photo meme supports only image formats.";
    if (!videoExtensions.includes(extension)) throw "The animated meme supports only image and video formats.";
    return getDownloadURLUnsafe(baseLink, extension);
}
