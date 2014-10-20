# How To's and Example Code

<!--===================================================================-->
## Making API Calls With Curl
In this section, we will walk you through the process of making API requests using the ‘curl’ command line tool. The Eagle Eye APIs are platform agnostic and we use them to create the web, Android, and iOS Eagle Eye clients. Curl is a tool for transferring data to and from a server, using a wide range of supported protocols, including HTTP/HTTPS, which is what we are interested in. Curl can be installed by going to this site. http://curl.haxx.se/.

With curl installed, the next step is to log in and have a valid session, so that we can freely use any of the APIs. Logging in, is a two step process consisting of authentication and authorization. The authentication API takes in 2 parameters. Our curl common will look like this. The [USERNAME] and [PASSWORD] need to be valid for the API request to return successfully.

`
curl --request POST https://login.eagleeyenetworks.com/g/aaa/authenticate --data 'username=[USERNAME]&password=[PASSWORD]'
`

The ‘–request’ flag specifies the type of request and can be set to GET, POST, PUT, and DELETE. The ‘data’ flag species the parameters of the API query. Upon running this command with valid credentials, we receive a Json formatted response, containing a key/value pair for ‘token’, which will look something like this.

`
{ “token”: “YrZF/8jf7W0rKcqNTugqidq…………4dZWeNOcNsuenTXc9fQVtvp2vI75g==” }
`

This token is a required parameter for making the Authorize API request. Copy the value of the token in order to have it on hand when creating the Authorize API request. Now we make the authorization API request using this curl command.

`
curl -D - --request POST https://login.eagleeyenetworks.com/g/aaa/authorize --data-urlencode token=[TOKEN]
`

The output are the headers of the API request followed by the response body. The ‘-D’ flag is used to write the protocol headers. Here is the description from the man pages.

`
-D, –dump-header <file> Write the protocol headers to the specified file. This option is handy to use when you want to store the headers that a HTTP site sends to you. Cookies from the headers could then be read in a second curl invocation by using the -b, –cookie option! The -c, –cookie-jar option is however a better way to store cookies.
`

Note that the ‘-‘ after the ‘-D’ indicates that the output “file” is stdout. One of the header elements will be “Set-Cookie: videobank_sessionid=[VIDEOBANK_SESSIONID]“. Copy ‘videobank_sessionid=[VIDEOBANK_SESSIONID]‘ into the clipboard as this cookie will need to be set for all other API requests. The curl request for getting a list of devices will look as such.

`
curl --cookie "videobank_sessionid=[VIDEOBANK_SESSIONID]" --request GET https://login.eagleeyenetworks.com/g/list/devices
`

The ‘videobank_sessionid’ cookie will need to be set for any other Eagle Eye API that requires a valid session.

<!--===================================================================-->
## Constructing Layouts

> Get /layout/list

```json
[
    [
        "fc7fa3a4-66ea-11e3-8ca8-523445989f37",
        "Default",
        [
            "iphone"
        ],
        "SWRD"
    ],
    [
        "14fbd682-66eb-11e3-8ca8-523445989f37",
        "Ekta 2",
        [
            "iphone"
        ],
        "SWRD"
    ],
    [
        "23535930-66eb-11e3-977b-ca8312ea370c",
        "Ekta 3",
        [
            "desktop"
        ],
        "SWRD"
    ]
]
```

When a user logs onto the Eagle Eye system, they are greeted with a grid of cameras, with each cell representing a camera pane. These panes can be of varying size so that the user can customize the layout to their liking. In this tutorial, we will demonstrate how to use the APIs to build these layouts so they are consistent on all platforms.

Upon being logged in, we make a request to the GET /layout/list API. This returns an array of Layout objects. Do note that this is not the same model as what is returned by the GET /layout API request. The one returned by the /layout/list API is an abridged version with only the most important attributes. The response of the request will look like this.

`
Get /layout/list
`

We take the layout id attribute for each layout of interest and pass it to the Get /layout API request. This will contain the information we need to construct the layout.

`
Get /layout
`

> Get /layout

```json
{
    "id": "811dbe48-66eb-11e3-8ca8-523445989f37",
    "shares": [
        [
            "ca0c35cb",
            "SWRD"
        ]
    ],
    "name": "mob dev 1",
    "permissions": "SWRD",
    "current_recording_key": null,
    "types": [
        "desktop"
    ],
    "configuration": {
        "settings": {
            "camera_row_limit": 3,
            "automatic_rotation": false,
            "camera_name": false,
            "camera_border": "false",
            "camera_aspect_ratio": "0.75"
        },
        "panes": [
            {
                "type": "preview",
                "pane_id": 0,
                "name": "Conference Room",
                "cameras": [
                    "100f6136"
                ],
                "size": 2
            },
            {
                "type": "preview",
                "pane_id": 1,
                "name": "NW Parking",
                "cameras": [
                    "10003254"
                ],
                "size": 2
            }
        ]
    }
}
```

We get a wealth of good information, but the information specific to setting up the pane layout is in the ‘configuration’ json. Within that json, there is an attribute called ‘panes’ which is an array of individual pane objects. Each pane specifies the camera_id and the size of the pane. The size represents the width and height in number of cells. A size of 2 means that the pane is 2 cells in width and height, so it occupies a total of 4 cells. A size of 3 would occupy 9 cells.

The other important factor to know is the size of grid holding the panes, specifically the number of columns. For the Eagle Eye web client, a browser can be resized to be a narrow strip or the full width of the screen. The layout will dynamically adjust the number of columns based on the width of the window. Mobile devices have fixed screen sizes, so for the iOS and Android smartphone clients, we set the number of columns to three.

Now that we have the order of the panes, the size of each pane, and the size of the grid, we can construct our layout. This proved to be of varying difficulty depending on the platform. The web client uses a robust packing library, Packery, which is based on a bin packing algorithm. http://metafizzy.co/blog/packery-released/. This library minimizes empty space while preserving the order as best as possible. Using Packery reduced the development time for this feature significantly.

At the time of this writing, Android does not have a robust library for packing the panes so the algorithm to do so was written from scratch. The goal was to mimic the Packery library as best as possible. The Android algorithm works as such:


 1. Remove the next image from the ‘panes’ array and place it in the ‘panes_for_analysis’ list.
 2. Analyze the panes in ‘panes_for_analysis’. If there is a fully packed block, remove those panes and add them to the layout
 3. If the ‘panes’ array is not empty, GOTO 1, else GOTO 4
 4. Add the remaining panes from ‘panes_for_analysis’ to the layout.

This is the algorithm at a high level, though the specifics can get a little more complex, such as determining whether a fully packed block exists. The state of a fully packed block is also dependent on the number of columns for the grid.

The ease of constructing layouts is highly dependent on the robustness of the 3rd party library. In the case that one does not exist, we fall back to our home grown packing algorithm.

<!--===================================================================-->
## Annotating Previews
In this tutorial, you will learn how to annotate your surveillance images. We will walk you through the complete flow from logging in and retrieving camera ids, to annotating images and then searching through them.

[Learn More](http://www.eagleeyenetworks.com/video-api-example-code/annotating-previews/)

<!--===================================================================-->
## Playing Live Video
Learn how to embed live video into your own application.

[Learn More](http://www.eagleeyenetworks.com/video-api-example-code/playing-live-video/)

<!--===================================================================-->
## Long Polling
Learn how to subscribe to the poll stream and receive camera events in real time.

[Learn More](http://www.eagleeyenetworks.com/video-api-example-code/long-polling/)


<!--===================================================================-->
## Creating Timelapse Video
Learn how to create a time lapse video for a specific time range.

[Learn More](http://www.eagleeyenetworks.com/video-api-example-code/time-lapse/)