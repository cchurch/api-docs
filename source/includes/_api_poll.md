# Poll

<!--===================================================================-->
## Overview
<!--===================================================================-->

The poll service provides a mechanism for an application to receive notifications of events or spans from Eagle Eye Networks. These entities are grouped by resource

Resources:

  - pre - Timestamp for a preview image. The timestamp can later be used to retrieve the actual preview image
  - thumb - Timestamp for a thumbnail image. The timestamp can later be used to retrieve the actual thumbnail image
  - video - Start and end timestamp of a video event
  - [status](#status-bitmask) - Bitmask defining the state of a bridge or a camera
  - [event](#event-objects) - Full event information

Event sources:

  - Camera or device (camera alerts, start and stop recording, etc.)
  - System (maintenance, server changes, etc.)
  - Account (other user changes, account alerts, layout changes, etc.)

Camera and device events include: on, off, online, offline, currently recording, currently sensing motion, start/stop schedule event, being controlled with PTZ, etc.)

<aside class="success">This service will continually be extended</aside>

Poll is a stateful request for updates any time a matching event occurs within the service. The initial poll request is a POST (Default GET with [WebSocket](#websocket-polling)) with a JSON formatted body indicating the resources to track. Resources that are video, pre, and thumbnail automatically register the API caller to their respective events. However, resource type ‘event’ requires the API caller to tell the API what events to listen for

Each object consists of an id element and a list of resource types to be monitored. The POST transaction receives and immediately responds with a JSON formatted body indicating the current timestamp for all requested resources. The response also includes a cookie, which can be used to track changes to the indicated resources via GET transaction

### Response Resource Types

Each resource type has a specific object format in response:

Type                      | Response         | Description
----                      | --------         | -----------
pre                       | prets            | Timestamp of latest preview image
thumb                     | thumbts          | Timestamp of latest thumbnail image
video                     | [startts, endts] | List of start and end timestamps for a video segment. Updates at start and per key frame received until end
[status](#status-bitmask) | bitmask          | A numerical bitmask defining the status. Bit position defines status
[event](#event-objects)   | object           | Events are a key value pair, where the key is the Four CC of the event and event structure is the actual meta data for that specific event

## Status Bitmask

HEX Value | Status
--------- | ------
0x000001  | Camera online **(DEPRECATED)**
0x000002  | Stream attached (camera communicating with bridge) **(DEPRECATED)**
0x000004  | Camera on (user setting) **(DEPRECATED)**
0x000008  | Camera recording **(DEPRECATED)**
0x000010  | Camera sending previews
0x000020  | Camera located (bridge has found the camera)
0x000040  | Camera not supported
0x000080  | Camera configuration in process (bridge configuring camera)
0x000100  | Camera needs ONVIF password
0x000200  | Camera available but not yet attached
0x000400  | *Internal status*
0x000800  | Camera error
0x001000  | *Internal status*
0x002000  | *Internal status*
0x004000  | *Reserved*
0x008000  | *Reserved*
0x010000  | Invalid state (unknown state)
0x020000  | Camera on (user setting)
0x040000  | Camera streaming video
0x080000  | Camera recording
0x100000  | Camera online

This status bitmask is used to determine what the high-level/overall device status is

<aside class="notice">Overall status uses the following logic:</aside>

IF "Camera On" (**bit 17**)==0 THEN "Off" (orange forbidden icon)
<br>ELSE IF "Registered" (**bit 20**)==0 THEN "Internet Offline" (red exclamation icon)
<br>ELSE IF "Streaming" (**bit 18**)==1 THEN "Online" (green check icon)
<br>ELSE IF "Password" (**bit 8**)==1 THEN "Password Needed" (effectively "Offline") (red padlock icon)
<br>ELSE "Offline" (red X icon)

<aside class="notice">Recording status uses the following logic:</aside>

IF "Recording" (**bit 19**) THEN Recording (green circle icon)  
IF "Invalid" (**bit 16**)==1 THEN no status change (use whatever status bits were set previously)

## Event Objects

> Json Response

```json
{
    "status_code": 200,
    "message": "OK",
    "data": {
        "100e1e23": {
            "event": {
                "PRSS": {
                    "status": 31,
                    "format": 1,
                    "frame_delay": 1000,
                    "timestamp": "20170425100000.000",
                    "cameraid": "10087ff5",
                    "flags": 0,
                    "duration": 3600000,
                    "previewid": 1493114470
                }
            }
        },
        "<object_id>": {...},
        "<object_id>": {...},
        "<object_id>": {...}
    }
}
```

<aside class="notice">Each event type is returned with the EEN formatted timestamp: YYYYMMDDhhmmss.xxx</aside>

Four CC   | Description                                                        | Returned parameters
-------   | -----------                                                        | -------------------
VRES      | Video start event                                                  | cameraid, videoid, format, status
VREE      | Video end event                                                    | cameraid, videoid, videosize, format, status
VRKF      | Video key frame event                                              | cameraid, videoid, file_offset, format
VRSU      | Video update event                                                 | cameraid, videoid, format, status
PRSS      | Preview stream start event                                         | cameraid, previewid, frame_delay, duration, flags, format, status
PRTH      | Thumbnail event                                                    | cameraid, previewid, eventid, file_offset, frame_size
PRFR      | Preview event                                                      | cameraid, previewid, file_offset, frame_size
PRFB      | Preview backing event                                            | cameraid, previewid, file_offset, frame_size
PRFU      | Preview upload event                                             | cameraid, file_offset, frame_size
PRSE      | Preview stream end event                                           | cameraid, previewid, status
PRSU      | Preview stream update event                                        | cameraid, previewid, status
EMES      | Motion start event                                                 | cameraid, videoid, eventid
EMEU      | Motion update event                                              | cameraid, videoid, eventid
EMEE      | Motion end event                                                   | cameraid, eventid
ESES      | Stream start event                                                 | cameraid, videoid, eventid
EAES      | ???                                                              | cameraid, videoid, eventid
EPES      | ???                                                              | cameraid, videoid, eventid
ENES      | ???                                                              | cameraid, videoid, eventid, ns
ENEU      | ???                                                              | cameraid, videoid, eventid, ns
EVVS      | Video swap event                                                   | cameraid, videoid, eventid
ESEE      | Stream stop event                                                  | cameraid, eventid
EAEE      | ???                                                              | cameraid, eventid
EPEE      | ???                                                              | cameraid, eventid
ENEE      | ???                                                              | cameraid, eventid, ns
ECON      | Camera online event                                                | cameraid
ECOF      | Camera offline event                                               | cameraid
RCON      | Camera register online event                                     | cameraid, registerid
RCOF      | Camera register offline event                                    | cameraid, registerid
RCHB      | Camera register heartbeat event                                  | cameraid, registerid
AELI      | Account log in event                                               | cameraid, status, source_userid
AELO      | Account log out event                                              | cameraid, status, source_userid
AEDO      | Download video event                                               | cameraid, status, source_userid, source_accountid, resource_type, deviceid, endtime
AEUC      | Create user event                                                  | cameraid, status, target_userid, source_userid, source_accountid
AEUD      | Delete user event                                                  | cameraid, status, target_userid, source_userid, source_accountid
AECC      | User configuration change event                                    | cameraid, status, target_userid, source_userid, source_accountid, values
AELD      | Live display event                                                 | cameraid, status, source_userid, deviceid
AEPT      | Pan tilt zoom event                                                | cameraid, status, source_userid, deviceid
AEEC      | Create layout event                                              | cameraid, status, source_userid, source_accountid, layoutid
AEED      | Delete layout event                                                | cameraid, status, source_userid, source_accountid, layoutid
AEEL      | Layout change event                                                | cameraid, status, source_userid, source_accountid, layoutid, values
AEAC      | Create account event                                               | cameraid, status, new_accountid, source_userid, source_accountid
AEAD      | Delete account event                                               | cameraid, status, source_userid, source_accountid
AEAH      | Account change event                                               | cameraid, status, source_userid, source_accountid, values
AEDC      | Create device event                                                | cameraid, status, deviceid, source_userid, source_accountid
AEDD      | Delete device event                                                | cameraid, status, deviceid, source_userid, source_accountid
AEDH      | Device change event                                                | cameraid, status, deviceid, source_userid, source_accountid, values
CECF      | Camera found event                                                 | cameraid, uuid, svc_state
CECL      | Camera lost event                                                | cameraid
CSAT      | Camera stream attach event                                         | cameraid, stream_format, stream_type
CSDT      | Camera stream detach event                                         | cameraid, stream_format, stream_type
CSAU      | ???                                                              | cameraid, streamid, stream_format, stream_type
CSDU      | ???                                                              | cameraid, streamid, stream_format, stream_type
COFF      | Camera off event                                                   | cameraid
CONN      | Camera on event                                                    | cameraid
COBC      | Camera bounce event                                                | cameraid
CSTS      | Camera settings event                                              | cameraid, sequence, settings
CZTS      | ???                                                              | cameraid, sequence, settings
CSTC      | Camera settings change event                                       | cameraid, sequence, settings
CZTC      | ???                                                              | cameraid, userid, flags, command, change
CZDC      | ???                                                              | cameraid, userid, flags, command, change
CPRG      | Camera purge event                                                 | cameraid, day, bytes
CDLT      | Camera data lost event                                             | cameraid, day, bytes
CBWS      | Camera bandwidth sample event                                      | cameraid, kbytesondisk, bytesstored, bytesshaped, bytesstreamed, bytesfreed, daysondisk
BBWS      | Bridge bandwidth sample event                                      | cameraid, kbytessize, kbytesavail, bytesstored, bytesshaped, bytesstreamed, bytesfreed
SBWS      | ???                                                              | cameraid, bw10, bw60, bw300, streamtype
SBW0      | ???                                                              | cameraid, bw10, bw60, bw300
SBW1      | ???                                                              | cameraid, bw10, bw60, bw300
SBW2      | ???                                                              | cameraid, bw10, bw60, bw300
SBW3      | ???                                                              | cameraid, bw10, bw60, bw300
SBW4      | ???                                                              | cameraid, bw10, bw60, bw300
BBTW      | ???                                                              | cameraid, ip, bytes_sent, bytes_rcvd, active_write_us, paused_write_us
BBOO      | Bridge boot event                                                | cameraid, booted
MRBX      | Motion box event                                                   | cameraid
MRSZ      | Motion size reports event                                          | cameraid, flags, motion
ROMS      | Region of interest motion start event                              | cameraid, roiid, videoid, eventid
ROMU      | ???                                                              | cameraid, roiid, videoid, eventid
ROME      | Region of interest motion end event                                | cameraid, eventid
ALMS      | Motion alert start event                                           | cameraid, eventid, alertid, alertmotionid
ALME      | Motion alert end event                                             | cameraid, alertmotionid
ALRS      | Region of interest alert start event                               | cameraid, eventid, alertid, alertroiid
ALRE      | Region of interest alert end event                                 | cameraid, alertroiid
AEDA      | Device alert event                                                 | cameraid, status, deviceid, source_userid, source_accountid, values
AEDN      | Device alert notification event                                    | cameraid, status, target_deviceid, triggerid, starttime, endtime, target_userid, json
NOOP      | ???                                                              | cameraid
CSST      | ???                                                              | cameraid, streamtype, total_expected, total_rcvd, delta_expected, delta_rcvd, interval
CSSU      | ???                                                              | cameraid, streamtype, streamformat, total_expected, total_rcvd, delta_expected, delta_rcvd, interval, streamid
CCCF      | ???                                                              | cameraid, errcode
BUBW      | ???                                                              | cameraid, bytessent, millisecs
ABRT      | Camera abort event                                               | cameraid, aborted
AABT      | ???                                                              | cameraid, aborted
NVPT      | ???                                                              | cameraid, ns, key_offset, op, mpack
ANNT      | Annotation event                                                 | cameraid, ns, flags, uuid, seq, op, mpack
SCRN      | ???                                                              | cameraid, ns, uuid, mpack
CCLC      | ???                                                              | cameraid, src_ip, dest_ip, src_port, dest_port, ctype
CCLD      | ???                                                              | cameraid, src_ip, dest_ip, src_port, dest_port, ctype, reason, seconds
SSTE      | ???                                                              | cameraid, stype, event, seconds
ITFU      | ???                                                              | cameraid, ip, flags, valid, mpack
PTZS      | ???                                                              | cameraid, userid, flags, reason, pan_status, zoom_status, x, y, z

### Event Parameters

Parameter          | Description
---------          | -----------
aborted            |
active_write_us    |
alertid            |
alertmotionid      |
alertroiid         |
booted             |
bw10               |
bw60               |
bw300              |
bytes              |
bytes_rcvd         |
bytes_sent         |
bytesfreed         |
bytessent          |
bytesshaped        |
bytesstored        |
bytesstreamed      |
cameraid           |
change             |
command            |
ctype              |
day                |
daysondisk         |
delta_expected     |
delta_rcvd         |
dest_ip            |
dest_port          |
deviceid           |
duration           |
endtime            |
errcode            |
event              |
eventid            |
file_offset        |
flags              |
format             |
frame_delay        |
frame_size         |
interval           |
ip                 |
kbytesavail        |
kbytesondisk       |
kbytessize         |
key_offset         |
layoutid           |
millisecs          |
motion             |
mpack              |
new_accountid      |
ns                 |
op                 |
pan_status         |
paused_write_us    |
previewid          |
reason             |
registerid         |
resource_type      |
roiid              |
seconds            |
seq                |
sequence           |
settings           |
source_accountid   |
source_userid      |
src_ip             |
src_port           |
starttime          |
status             |
stream_format      |
stream_type        |
streamformat       |
streamid           |
streamtype         |
stype              |
target_deviceid    |
target_userid      |
total_expected     |
total_rcvd         |
triggerid          |
userid             |
uuid               |
valid              |
values             |
videoid            |
videosize          |
x                  |
y                  |
z                  |
zoom_status        |




















<!--===================================================================-->
## Initialize Poll
<!--===================================================================-->

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X POST -H 'Content-Type: application/json' https://c001.eagleeyenetworks.com/poll -d '{"cameras":{"111st658":{"resource":["event","status"],"event":["VREE","PRFR","CPRG"]}}}'
```

> Request Json

```json
{
    "cameras": {
        "100e1e23": {
            "resource": [
                "pre",
                "thumb",
                "status",
                "event"
            ],
            "event": [
            	"MRBX"
            ]
        },
        "10097d15": {
            "resource": [
                "pre",
                "thumb",
                "status",
                "event"
            ],
            "event": [
            	"MRBX"
            ]
        },
        "<object_id>": {...},
        "<object_id>": {...},
        "<object_id>": {...}
    }
}
```
<aside class="notice">Subscribe to the poll service, which is required for GET /poll. Response: token=xxxxx / Response headers: set_cookie: ee-poll-ses/poll_id=xxxxx</aside>

Response includes 2 session cookies and a returned token (which are identical). Only one of the session cookies has to be provided to the GET /poll request

### HTTP Request

`POST https://login.eagleeyenetworks.com/poll`

<aside class="notice">The cameras parameter is an entity, which can contain any object structure keyed by id (camera, bridge or account ESN)</aside>

Due to the progressing expansion of the event polling mechanic, the parameter 'cameras' has undergone numerous changes and has been kept as such for backwards compatibility. It should be understood as device/account

Parameter   | Data Type | Description
---------   | --------- | -----------
cameras 		| json      | Json attribute keyed with the [object_id](#object-structure) (can contain multiple Json objects, even of different types)

### Object Structure

Parameter   | Data Type | Description
---------   | --------- | -----------
[object_id] | json      | Json attribute keyed with 'resource' and/or 'event'

The Json object allows to narrow down the polling scope by specifying which type of entity to poll for. The types include:

Parameter   | Data Type | Description | Is Required
---------   | --------- | ----------- | -----------
**resource**  | array[string] | Array of one or more string containing which type of data should be retrieved from the provided device/account<br><br>enum: [pre, thumb, video, status, event](#poll) | true
event       | array[string] | Array of one or more string containing the event [Four CC](#event-objects) (If resource contains 'event', the array of events specified here will narrow down the scope of retrieved events)

<!--TODO: Find out why the video as a feasible resource has been excluded from the above table-->

<aside class="warning">The event parameter is required to have the event resource present when polling over HTTP (instead of WebSocket)</aside>

### HTTP Response

> Json Response

```json
{
    "cameras": {
        "100e1e23": {
            "status": 1441847
        },
        "10097d15": {
            "status": 1441847
        },
        "<object_id>": {...},
        "<object_id>": {...},
        "<object_id>": {...}
    },
    "token": "ooe0eoEAMNsF"
}
```

Parameter   | Data Type | Description
---------   | --------- | -----------
cameras 		| json      | Json attribute keyed with the [object_id](#response-object-structure) (can contain multiple Json objects, even of different types)
token 			| string 		| Token to be used for subsequent GET /poll requests

### Response Object Structure

Parameter   | Data Type | Description
---------   | --------- | -----------
[object_id] | json      | Json attribute keyed with [resource](#poll) types. Retrieved values are the most recent entities for the specified resource

The amount of keys depends on the sent request inquiry (if the request entailed 'pre' and 'video', then the retrieved data will only cover 'pre' and 'video' information)

If a specified event has not been triggered on the device/account, it will not be listed by the poll service (no error will be reported)

The returned values are in accordance with the [returned resource types](#response-resource-types)

<aside class="warning">The status parameter takes precedence (if multiple) and all others will become suppressed when polling over HTTP POST /poll</aside>

### Error Status Codes

HTTP Status Code | Data Type   
---------------- | ---------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200 | Request succeeded

<!--===================================================================-->
## Polling
<!--===================================================================-->

<aside class="notice">Used to receive updates on real-time changes. This API call requires a valid 'ee-poll-ses' cookie from POST /poll</aside>

### HTTP Request

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY];ee-poll-ses=[TOKEN]" --request GET https://c001.eagleeyenetworks.com/poll
```

`GET https://login.eagleeyenetworks.com/poll`

### HTTP Response

> Json Response

```json
{
    "cameras": {
        "100e1e23": {
            "pre": "20141121165011.233",
            "event": {
                "MRBX": {
                    "timestamp": "20141121165011.499",
                    "cameraid": "100c299e",
                    "boxes": [
                        {
                            "x": 24575,
                            "y": 29126,
                            "w": 4095,
                            "h": 5825
                        }
                    ]
                },
                "PRFU": {
                    "timestamp": "20141121165011.233",
                    "cameraid": "100c299e",
                    "file_offset": 26311872,
                    "frame_size": 7838
                },
                "PRFR": {
                    "timestamp": "20141121165011.233",
                    "cameraid": "100c299e",
                    "previewid": 1416585600,
                    "file_offset": 26311872,
                    "frame_size": 7830
                }
            }
        },
        "10097d15": {
            "pre": "20141121165011.281",
            "event": {
                "PRFU": {
                    "timestamp": "20141121165011.281",
                    "cameraid": "1002a2a4",
                    "file_offset": 6126297,
                    "frame_size": 4014
                },
                "PRFR": {
                    "timestamp": "20141121165011.281",
                    "cameraid": "1002a2a4",
                    "previewid": 1416585600,
                    "file_offset": 6126297,
                    "frame_size": 4006
                }
            }
        }
    }
}
```

Parameter   | Data Type | Description
---------   | --------- | -----------
cameras 		| json      | Json attribute keyed with the object_id (can contain multiple Json objects, even of different types)

### Response Object Structure

Parameter   | Data Type | Description
---------   | --------- | -----------
[object_id] | json      | Json attribute keyed with [resource](#poll) types. Retrieved values are the most recent entities for the specified resource

The amount of keys depends on the sent POST request (if the request entailed 'pre' and 'video', then the retrieved data will only cover 'pre' and 'video' information)

If a specified event has not been triggered on the device/account, it will not be listed by the poll service (no error will be reported)

The returned values are in accordance with the [returned resource types](#response-resource-types)

<aside class="warning">The status parameter will be omitted (if multiple), all others will be returned when polling over HTTP GET /poll</aside>

### Error Status Codes

HTTP Status Code | Data Type   
---------------- | ---------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200 | Request succeeded

<!--===================================================================-->
## WebSocket Polling
<!--===================================================================-->

> Request Json

```json
{
    "cameras": {
        "100e1e23": {
            "resource": [
                "pre",
                "thumb",
                "status",
                "event"
            ],
            "event": [
            	"MRBX"
            ]
        },
        "10097d15": {
            "resource": [
                "pre",
                "thumb",
                "status",
                "event"
            ],
            "event": [
            	"MRBX"
            ]
        },
        "<object_id>": {...},
        "<object_id>": {...},
        "<object_id>": {...}
    }
}
```

WebSockets provide a persistent connection between a client and server. This uplink enables a two-way data stream over which chunked data can be sent and received as messages. This protocol provides a full-duplex communications channel over a single TCP connection, allowing the client to receive event-driven responses without having to poll the server for a reply (effectively decreasing data traffic)

<aside class="notice">The WebSocket similarity to the HTTP protocol is that its handshake is interpreted by HTTP servers as a HTTP 'upgrade request'</aside>

### Client Handshake Request

`GET /api/v2/Device/00001007/Events HTTP/1.1`  
`Upgrade: websocket`  
`Connection: Upgrade`  
`Host: c000.eagleeyenetworks.com`  
`Origin: http://c000.eagleeyenetworks.com`  
`Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==`  
`Sec-WebSocket-Version: 13`  
`Cookie: auth_key=[AUTH_KEY]`

The WebSocket protocol has two parts:

  - Handshake (to establish the upgraded connection)
  - Data transfer

<aside class="notice">The handshake process has to be initiated from the client side via a standard HTTP request (the HTTP version must be 1.1 or greater and the method must be GET)</aside>

<table>
    <tr>
        <th colspan=7>The WebSocket request URL is composed in the following way:</th>
    </tr>
    <tr>
        <th style="text-align:center;">wss:&#47;&#47;</th>
        <th style="text-align:center;">c000.</th>
        <th style="text-align:center;">eagleeyenetworks.com</th>
        <th style="text-align:center;">&#47;api&#47;v2</th>
        <th style="text-align:center;">&#47;Device</th>
        <th style="text-align:center;">&#47;00001007</th>
        <th style="text-align:center;">&#47;Events</th>
    </tr>
    <tr>
        <td style="text-align:center;">secure <br>websocket <br>protocol</td>
        <td style="text-align:center;">branded <br>subdomain</td>
        <td style="text-align:center;">server</td>
        <td style="text-align:center;">API version</td>
        <td style="text-align:center;">resource</td>
        <td style="text-align:center;">account id</td>
        <td style="text-align:center;">'Events' suffix</td>
    </tr>
</table>

WebSocket URLs use the WS scheme or alternatively WSS for secure connections which is the equivalent of HTTPS

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**A**     | string    | Used to replace the 'auth_key' cookie | false

### Server Handshake Response

`HTTP/1.1 101 Switching Protocols`  
`Server: openresty`  
`Date: Wed, 08 Mar 2018 14:01:06 GMT`  
`Connection: upgrade`  
`upgrade: websocket`  
`sec-websocket-accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=`  
`set-cookie: ee-ws-poll-ses=kjxZXVrDyIkK`  
`x-een-lb-tried-proxies: 209.94.238.21:80`

The server reply completes the handshake. A successful server reply is followed by data transfer

### Error Status Codes

Status Code | Description
----------- | -----------
400	| Header is not understood or has an incorrect value
101	| Switching protocols

### Data Exchange

The client communicates with the server after a successful handshake by sending an object as Json-formatted string. The 'message' send is being triggered by the client by calling the appropriate WebSocket 'send' function (the method depends on the client environment)

The client has to specify via Json what kind of data it is going to be polling and from which devices (See [Initialize Poll](#initialize-poll), [Resource Type](#poll), [Event Objects](#event-objects))

WebSocket is an event-driven API. When messages are received a message event is delivered to the the 'onmessage' function, where the message is being received and parsed

The connection can be severed at any given time using the 'close' function

<aside class="warning">A successful handshake can be established even with an incorrect data set in the Json-formatted string</aside>

WebSocket polling will additionally return 'message' response error codes for each individual encountered problem based on the [Errors](#errors) section

### Message Error Status Codes

Status Code | Description
----------- | -----------
400 | Invalid resource
401	| Access denied
412 | Auth lost
200	| OK
