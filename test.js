// TODO: Migrate to nodev18:test
//Didn't think too much while choosing the memes, if you find them offensive, open an issue.
const VALID_VIDEO_MEME_URL = "https://www.memedroid.com/memes/detail/3780694/Yeah-yeah-Over-here-On-the-side-bro";
const VALID_PICTURE_MEME_URL = "https://www.memedroid.com/memes/detail/3780709/chad-and-chad-jr";
const INVALID_MEME_URL = "https://www.memedroid.com/memes/random/";
const INVALID_HOST_URL = "https://github.com/sponsors/Abrifq";

import * as Module from "./index.js";

/**
 * @param {string} url
 */
function download(url) {
    console.log("Trying to download \"" + url + "\"");
    return fetch(url).then(response => {
        console.log("... got status code " + response.status);
        if (response.status === 200)
            return response.text()
                .then(text => {
                    console.log("... got " + text.length + " bytes.");
                    return text;
                });
        throw `Fetching url "${url}": Failed with status number ${response.status}`;
    });
}

async function test() {
    try {
        console.group("Invalid host should get detected");
        if (Module.isAllowedHost(INVALID_HOST_URL))
            console.log("ERROR! INVALID HOST PASSED THE VALID HOST TEST! URL: " + INVALID_HOST_URL);
    } catch (e) {
        console.error(e);
    } finally {
        console.log("Done.");
        console.groupEnd();
    }

    try {
        console.group("Invalid meme url should get detected");
        if (!Module.isAllowedHost(INVALID_MEME_URL))
            console.log("ERROR! INVALID MEME/POST URL HAS FAILED THE VALID HOST TEST! URL: " + INVALID_MEME_URL);
        if (Module.isValidURL(INVALID_MEME_URL))
            console.log("ERROR! INVALID MEME/POST URL HAS PASSED THE VALID URL TEST! URL: " + INVALID_MEME_URL);
    }
    catch (e) { console.error(e); }
    finally {
        console.log("Done.");
        console.groupEnd();
    }

    try {
        console.group("A valid meme with no video");
        if (!Module.isAllowedHost(VALID_PICTURE_MEME_URL))
            console.log("ERROR! VALID PICTURE URL HAS FAILED THE VALID HOST TEST! URL: " + VALID_PICTURE_MEME_URL);
        if (!Module.isValidURL(VALID_PICTURE_MEME_URL))
            console.log("ERROR! VALID PICTURE URL HAS FAILED THE VALID URL TEST! URL: " + VALID_PICTURE_MEME_URL);

        const document = await download(VALID_PICTURE_MEME_URL);

        const memeMetadata = Module.buildMetadata(
            Module.getMediaBase(document),
            Module.getAuthor(document),
            Module.getTitle(document),
            Module.isVideoMeme(document)
        );
        if (memeMetadata.hasVideo) console.log("ERROR! FOUND VIDEO IN \"VALID PICTURE URL\"s DOCUMENT! URL: " + VALID_PICTURE_MEME_URL);
        if (memeMetadata.baseLink === "") console.log("ERROR! CAN'T FIND MEDIA BASE IN \"VALID PICTURE URL\"s DOCUMENT! URL: " + VALID_PICTURE_MEME_URL);
    }
    catch (e) { console.error(e); }
    finally {
        console.log("Done.");
        console.groupEnd();
    }

    try {
        console.group("A valid meme with video");

        if (!Module.isAllowedHost(VALID_VIDEO_MEME_URL))
            console.log("ERROR! VALID PICTURE URL HAS FAILED THE VALID HOST TEST! URL: " + VALID_VIDEO_MEME_URL);
        if (!Module.isValidURL(VALID_VIDEO_MEME_URL))
            console.log("ERROR! VALID PICTURE URL HAS FAILED THE VALID URL TEST! URL: " + VALID_VIDEO_MEME_URL);

        const document = await download(VALID_VIDEO_MEME_URL);

        const memeMetadata = Module.buildMetadata(
            Module.getMediaBase(document),
            Module.getAuthor(document),
            Module.getTitle(document),
            Module.isVideoMeme(document)
        );
        if (!memeMetadata.hasVideo) console.log("ERROR! NOT FOUND VIDEO IN \"VALID PICTURE URL\"s DOCUMENT! URL: " + VALID_VIDEO_MEME_URL);
        if (memeMetadata.baseLink === "") console.log("ERROR! CAN'T FIND MEDIA BASE IN \"VALID PICTURE URL\"s DOCUMENT! URL: " + VALID_VIDEO_MEME_URL);
    }
    catch (e) { console.error(e); }
    finally {
        console.log("Done.");
        console.groupEnd();
    }

}

test();
