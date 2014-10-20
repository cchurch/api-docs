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
We will look into the Layouts API to learn how to construct the same layouts used in the web and mobile clients.

[Learn More](http://www.eagleeyenetworks.com/video-api-example-code/constructing-layouts/)

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