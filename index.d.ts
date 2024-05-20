export * from "./src/core.js";
export * from "./src/full.js";
export type Author = {
    name: string
    url: string
}

export type PhotoMemeMetadata = {
    title: string
    author: Author
    baseLink: string
    hasVideo: false
}

export type VideoMemeMetadata = {
    title: string
    author: Author
    baseLink: string
    hasVideo: true
}


export type MemeMetadata = PhotoMemeMetadata | VideoMemeMetadata;

export type PhotoExtensions = "jpeg" | "webp";
export type VideoExtensions = "mp4" | "webm";
export type SupportedExtensions = PhotoExtensions | VideoExtensions;
export { Hint } from "./HintFix"