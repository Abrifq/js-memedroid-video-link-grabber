# Memedroid Video Link Grabber

That's it. It grabs the video link.
In linkedIn terms, it's a Software as a Service that gets file from a highly active website -- i dunno. lol.

Uses nodeJS.

## Parameters

### `link`

The url to the meme.

### `returns`

Chooses response text's structure for API consumers.
Ignored when `redirect` argument is present.

Can be "xml" (or "html"), "json" or "raw".
If this is not supplied, `Accept` header will be used. (`application/xml`, `text/html`, `application/json` or `text/plain`)

### `preferWebm`

When present, the default video link will be webm.

### `redirect`

When present, instead of returning a response text, the API will simply redirect the request to the video link.

## Return Values

It's a barebone api so it doesn't start a web server as a module. Use app.js to launch the web server.

### 200: Video Found

Use [returns](#returns) argument to specify a format.

- JSON Format:
  
  ```json
  {
  "authorURL": "meme author's profile's URL",
  "authorName": "meme author's name, for archival purposes.",
  "memeTitle": "meme's title",
  "videoLink": "video's link. mp4 by default. use preferWebm to make this field webm.",
  "videoLinks": {
        "webm":"webm video link",
        "mp4":"mp4 video link"
    },
  "thumbnailURL":"video thumbnail's URL"
  }
  ```

- XML/HTML Format:

  ```html
  <div data-status="success">
    <video controls autoplay="no" poster="{video thumbnail url}">
    <source id="webm-source" src="{webm video link}" type="video/webm" />
    <source id="mp4-source" src="{mp4 video link}" type="video/mp4" />
    </video><br>
    <p>
        <span id="meme-title">{meme title}</span>
        Posted by: <a id="author" href="{author profile url}" >{author name}
    </p>
    <span>
        <a download="{meme title}.mp4" href=".?redirect"><button> Download MP4 </button><a>
        <a download="{meme title}.webm" href=".?redirect&preferWebm"><button> Download WEBM </button><a>
    </span>
  </div>
  ```

- Raw Text format:

  `{chosen video url}`

### 302: Redirect to Video

When [redirect](#redirect) argument is present, this will be used instead of [the normal response](#200-video-found).

### 400: Not a memedroid link

Used when the given [link](#link) is not in memedroid site.

### 404: Meme does not have video

When given meme does not have a video.
