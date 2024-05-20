//sample text:
//<meta property="og:video:secure_url" content="{video-url}" />
const getVideoBaseRegExp = /<meta property\=\"og\:video\:secure_url\" content\=\"(.+?)\" \/\>/;

/**
 * Checks if the meme is a gif or a video.
 * @returns {boolean}
 * @param {string} webpage 
 */
export function isVideoMeme(webpage) { return getVideoBaseRegExp.test(webpage); }

//sample text:
//<meta property="og:image:secure_url" itemprop="image" content="{image-url}" />
const getMediaBaseRegExp = /<meta property\=\"og\:image\:secure_url\" .+? content\=\"(.+?)\" \/\>/;

/**
 * Used in getting the meme files. Use {@link isVideoMeme} to see if it's animated and use {@link getDownloadURL} to get a direct download URL.
 * @returns {string}
 * @param {string} webpage 
 */
export function getMediaBase(webpage) {
    const scrapeResult = getMediaBaseRegExp.exec(webpage);
    return scrapeResult && scrapeResult[1].split(".jpeg")[0] || "";
}