# Memedroid Video Link Grabber

TODO: propose a proper api and release this lmao

That's it. It grabs the video link.
In linkedIn terms, it's a Software as a Service that gets file from a highly active website -- i dunno. lol.

Both npm and browser (as ES6 module) compliant.

## Methods

### In "minimal" Script

Has enough methods to **steal the meme**!

#### isVideoMeme

`isVideoMeme( webpage: string )=>boolean`

Scrapes the webpage data to see if the meme is a video/gif meme or not.

#### getMediaBase

`getMediaBase( webpage: string )=>string`

Scrapes the webpage data to get the media url base.

### In "core" Script

Has methods to get information about the meme.
Also includes [minimal script](#in-minimal-script)!

#### getAuthor

`getAuthor( webpage: string )=>Author`

Scrapes webpage data to get [`Author`](#author) data.

#### getTitle

`getTitle( webpage: string )=>string`

Scrapes webpage data to get meme's title.

### In "full" Script

Has utility functions to validate incoming url and create API responses.

Also includes [minimal](#in-minimal-script) and [core](#in-core-script) scripts!

#### isAllowedHost

`isAllowedHost( url: string )=>boolean`

The given url's hostname is checked against the known MemeDroid hosts. Returns `true` when it matches a known host.

#### isValidURL

`isValidURL( url: string )=>boolean`

The given url's path is checked if it's a valid post url.

Returns `false` when the path shouldn't point to a post.

#### buildMetadata

`buildMetadata( baseLink: string, author: Author, title: string, hasVideo: boolean )=>MemeMetadata`

Builds the metadata with the scraped data.
Get parts from here:

- baseLink: [getMediaBase](#getmediabase)
- author: [getAuthor](#getauthor)
- title: [getTitle](#gettitle)
- hasVideo: [isVideoMeme](#isvideomeme)

#### makeMetadata

`makeMetadata( webpage: string )=>MemeMetadata`

Scrapes and builds the metadata from the webpage data.

#### getDownloadURLUnsafe

`getDownloadURLUnsafe( baseLink: string, extension: string )=>string`

Returns a direct link to get the meme image or video.
**WARNING**: This function won't check if the wanted extension is valid. Use [getDownloadURL](#getdownloadurl) if you need to be error-prone.

#### getDownloadURL

`getDownloadURL( metadata:MemeMetadata, extension: string )=>string`

Returns a direct link to get meme image or video.

If this method gets out of date at any time, use [the unsafe variant](#getdownloadurlunsafe).

## Types

### Author

Holds information about the post's original poster. (OP)

Properties:

- `name` : `string`
  Username of the OP.
- `url` : `string`
  Profile url of the OP.

### MemeMetadata

Holds metadata values to be used in an API response.

Properties:

- `title` : `string`
  Title of the meme.
- `author` : [`Author`](#author)
  Holds value of the author of this meme.
- `baseLink` : `string`
  The media base link that allows you to access multiple file variations of the meme. See [getMediaBase](#getmediabase).
- `hasVideo` : `boolean`
  If `true`, the meme is a video or a gif.
  If `false`, the meme is a photo and trying to get video formats should fail.
