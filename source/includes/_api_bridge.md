# Bridge

<!--===================================================================-->
## Overview
<!--===================================================================-->

The Bridge is a product of Eagle Eye that is deployed at the customer location and communicates with industry standard cameras. It converts the cameras to be compatible with the EEVB and record [assets](#images-and-video). The Bridge is configured and controlled via a cloud-based user interface (has no built-in user interface). The Bridge may serve local assets directly to local clients. The Bridge will also store assets until they are transferred to the EEVB. The Bridge can be configured via DHCP or have a static IP address

<!--===================================================================-->
## Bridge Model
<!--===================================================================-->

> Bridge Model

```json
{
    "bridges": null,
    "camera_info_status_code": 404,
    "name": "Main",
    "settings": {
        "bridge": null,
        "is_logically_deleted": false
    },
    "camera_settings_status_code": 200,
    "camera_info": null,
    "utcOffset": -25200,
    "camera_parameters_status_code": 200,
    "id": "100d88a8",
    "timezone": "US/Pacific",
    "guid": "bceb04ec-8b24-4aee-a09a-8479d856e81c",
    "camera_parameters": {
        "active_settings": {
            "max_disk_usage": {
                "max": 0.97999999999999998,
                "min": 0.050000000000000003,
                "d": 0.80000000000000004,
                "v": 0.80000000000000004
            },
            "display_layouts": {
                "d": {},
                "v": {}
            },
            "local_display_enable": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "bandwidth_background": {
                "max": 10000000000.0,
                "min": -1000.0,
                "d": 100000.0,
                "v": 100000.0
            },
            "bandwidth_recover": {
                "max": 10000000000.0,
                "min": 100000.0,
                "d": 5000000.0,
                "v": 5000000.0
            },
            "stream_stats_present_only": {
                "max": 1,
                "min": 0,
                "d": 1,
                "v": 1
            },
            "retention_days": {
                "max": 10000,
                "min": 1,
                "d": 14,
                "v": 14
            },
            "bridge_retention_days": {
                "max": 100000,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "stream_stats": {
                "d": "none",
                "v": "none"
            },
            "upnp_enable": {
                "max": 1,
                "min": -1,
                "d": 0,
                "v": 0
            },
            "bandwidth_demand": {
                "max": 10000000000.0,
                "min": 100000.0,
                "d": 10000000.0,
                "v": 10000000.0
            },
            "bandwidth_upload": {
                "max": 10000000000.0,
                "min": 100000.0,
                "d": 1000000.0,
                "v": 1000000.0
            },
            "retention_priority": {
                "max": 10000,
                "min": 1,
                "d": 100,
                "v": 100
            },
            "display_default_enabled": {
                "max": 1,
                "min": 0,
                "d": 1,
                "v": 1
            }
        },
        "active_filters": [
            "schedule_bandwidth_background",
            "user_user"
        ],
        "user_settings": {
            "versions": {},
            "settings": {
                "upnp_enable": "0",
                "bandwidth_background": 50000
            },
            "schedules": {
                "bandwidth_background": {
                    "priority": 1,
                    "start": {
                        "seconds": 0,
                        "hours": 8,
                        "months": "*",
                        "minutes": 0,
                        "wdays": [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7
                        ]
                    },
                    "end": {
                        "seconds": 0,
                        "hours": 17,
                        "months": "*",
                        "minutes": 30,
                        "wdays": [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7
                        ]
                    },
                    "when": "work",
                    "settings": {
                        "bandwidth_background": "100000"
                    }
                }
            }
        }
    },
    "tags": [],
    "permissions": "swr"
  }
```

### Bridge (Attributes)

Parameter                     | Data Type     | Description                                                                                         | Editable | Required
---------                     | ---------     | -----------                                                                                         | -------- | --------
**id**                        | string        | Unique identifier automatically generated and assigned while adding a device                        | false    | **<sub><form action="#get-bridge"><button>GET</button></form></sub>** <br>**<sub><form action="#update-bridge"><button>POST</button></form></sub>** <br>**<sub><form action="#delete-bridge"><button>DELETE</button></form></sub>**
**name**                      | string        | Name of the bridge                                                                                  | true     | **<sub><form action="#add-bridge-to-eevb"><button>PUT</button></form></sub>**
guid                          | string        | The GUID (Globally Unique Identifier) is an immutable device identifier assigned to a device during the production process                                                                                                                                             | false    |
timezone                      | string        | Indicates the timezone of where the device is installed. Defaults to the account timezone. Example: ‘US/Alaska’, ‘US/Arizona’, ‘US/Central’, ‘US/Eastern’, ‘US/Hawaii’, ‘America/Anchorage’ or ‘UTC’                                                                               | true     |
utcOffset                     | int           | The signed integer offset in seconds of a timezone from UTC. Automatically generated based on the timezone field                                                                                                                                               | false    |
tags                          | array[string] | Array of strings each representing a tag name                                                       | true     |
permissions                   | string        | String of characters each defining a permission level of the current user                           | false    |
[bridges](#camera-bridges)    | json          | (**Applies only to Cameras**)                                                                       | false    |
[settings](#bridge-settings)  | json          | Json object of basic settings (location, etc.)                                                      | true     |
[camera_info](#bridge-camera_info) | json          | Json object of basic bridge information. If bridge information cannot be retrieved for whatever reason (example: communication with the bridge has been lost), this will be empty and camera_info_status_code will be 404                                            | false    |
camera_info_status_code       | int           | Indicates whether it was possible to retrieve information about the device (200) or not (404)       | false    |
camera_parameters             | json          | Json object of bridge parameters. If bridge parameters cannot be retrieved for whatever reason (example: communication with the bridge has been lost), this will be empty and camera_parameters_status_code will be 404                                                             | true     |
camera_parameters_status_code | int           | Indicates whether it was possible to retrieve parameters of the device (200) or not (404)           | false    |
camera_settings               | string        | This is for backwards compatibility **(DEPRECATED)**                                                | false    |
camera_settings_status_code   | int           | This is for backwards compatibility **(DEPRECATED)**                                                | false    |

### Bridge - settings

Parameter                     | Data Type     | Description
---------                     | ---------     | -----------
analog_inputs_ignored         | array[string] | An array of numbers of analog inputs which the user wants to ignore
event_data_start_timestamp    | string        | <p hidden>???</p>
local_display_layout_ids      | array[string] | An array of available layouts on a local display
bridge                        | null          | (**Applies only to Cameras**)
site_name                     | string        | User-defined bridge location name
floor                         | int           | The floor of the building given that it is a multi-storey
retention_days                | int           | Total amount of days the bridge should store data. Data exceeding this threshold will gradually be deleted
local_retention_days          | int           | Total amount of days the bridge should store data locally. Normally data is not being stored and the value is set to '-1', meaning the bridge should directly upload any and all data during the specified times. Data exceeding this threshold will gradually be deleted
longitude                     | float         | Longitude of the bridge location
latitude                      | float         | Latitude of the bridge location
street_address                | string        | Street address of the bridge location

<aside class="notice">local_retention_days and cloud_retention_days are unpurposed in CMVR mode</aside>

### Bridge - camera_info

Parameter                     | Data Type | Description
---------                     | --------- | -----------
camera_property_model         | string    | <p hidden>???</p>
model                         | string    | <p hidden>???</p>
camera_property_version       | string    | <p hidden>???</p>
version                       | string    | <p hidden>???</p>
camera_property_make          | string    | <p hidden>???</p>
make                          | string    | <p hidden>???</p>
camera_abs_newest             | string    | <p hidden>???</p>
camera_newest                 | string    | <p hidden>???</p>
camera_abs_oldest             | string    | <p hidden>???</p>
camera_oldest                 | string    | <p hidden>???</p>
uuid                          | string    | Identical to 'guid' from the [bridge attributes](#bridge-model) section
ipaddr                        | string    | IP addresses assigned to the device, comma delimited, with the one in use prefixed by an asterisk (\*)
esn                           | string    | Identical to 'id' from the [bridge attributes](#bridge-model) section
class                         | string    | Determines the type of a device ('bridge' or 'camera')
service                       | string    | <p hidden>???</p>
[status](#status-bitmask)     | string    | The device status bitmask
camera_state_version          | int       | <p hidden>???</p>
no_video                      | int       | <p hidden>???</p>
tagmap_status_state           | int       | <p hidden>???</p>
camera_retention_asset        | int       | <p hidden>???</p>
camera_retention_etag         | int       | <p hidden>???</p>
run_mode                      | string    | <p hidden>???</p>
register_id                   | int       | <p hidden>???</p>
camera_now                    | string    | <p hidden>???</p>
ssn                           | string    | The serial number of a bridge
proxy                         | string    | <p hidden>???</p>
now                           | string    | The current time of when the request has been completed in EEN format: YYYYMMDDHHMMSS.NNN
camera_property_analog        | boolean   | <p hidden>???</p>
[status_hex](#status-bitmask) | string    | The device status bitmask as a hexadecimal value
camera_retention_interval     | int       | <p hidden>???</p>
camera_valid_ts               | string    | <p hidden>???</p>

<!--TODO: Add the full bridge model bridge attributes table-->

<!--===================================================================-->
## Get Bridge
<!--===================================================================-->

Returns a Bridge object by ID

> Request

```shell
curl -G https://login.eagleeyenetworks.com/g/device -d "A=[AUTH_KEY]&id=[BRIDGE_ID]"
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/device`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**id**    | string    | Bridge ID   | true

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| No device matching the Connect ID or GUID has been found
200	| Request succeeded

<!--===================================================================-->
## Add Bridge to EEVB
<!--===================================================================-->

Adds a Bridge to the Eagle Eye Video Bank

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X PUT -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/device -d '{"name":"[NAME]","connectID":[CONNECT_ID]}'
```

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/device`

Parameter     | Data Type | Description | Is Required
---------     | --------- | ----------- | -----------
**name**      | string    | Bridge name | true
**connectid** | string    | Connect ID is the code delivered with a bridge and assigned to it (All non-alphanumeric characters will be stripped) | true

> Json Response

```json
{
    "id": "100c339a"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | Unique identifier for the device

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| No device matching the Connect ID or GUID was found
409	| Connect ID or GUID is currently already in use by an account
410	| Communication cannot be made to attach the camera to the bridge
415	| Device associated with the given GUID is unsupported
200	| Request succeeded

<!--===================================================================-->
## Update Bridge
<!--===================================================================-->

Update Bridge information

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X POST -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/device -d '{"id": "[BRIDGE_ID], "name": "[NAME]"}'
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/device`

Parameter                | Data Type     | Description | Is Required
---------                | ---------     | ----------- | -----------
**id**                   | string        | Bridge ID   | true
name                     | string        | Bridge name
timezone                 | string        | Indicates the timezone of where the device is installed. Defaults to the account timezone. Example: ‘US/Alaska’, ‘US/Arizona’, ‘US/Central’, ‘US/Eastern’, ‘US/Hawaii’, ‘America/Anchorage’ or ‘UTC’
tags                     | array[string] | Array of strings each representing a tag name
[settings](#bridge-settings) | json          | Json object of basic settings (location, etc.)
camera_parameters_add    | json          | Json object of camera settings to add/update
camera_parameters_delete | json          | Json object of camera settings to delete

> Json Response

```json
{
    "id": "100c339a"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | Unique identifier for the device

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Device matching the ID was not found
463	| Unable to communicate with the camera to add/delete camera settings, contact support
200	| Request succeeded

<!--===================================================================-->
## Delete Bridge
<!--===================================================================-->

Delete a Bridge from the Eagle Eye Video Bank

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X DELETE -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/device -d "id=[BRIDGE_ID]" -G
```

### HTTP Request

`DELETE https://login.eagleeyenetworks.com/g/device`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**id**    | string    | Bridge ID   | true

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Device matching the ID was not found
463	| Unable to communicate with the camera or bridge, contact support
200	| Request succeeded

<!--===================================================================-->
## Get List of Bridges
<!--===================================================================-->

Returns array of arrays with each sub-array representing a Bridge available to the user

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" --request GET https://login.eagleeyenetworks.com/g/device/list
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/device/list`

Parameter | Data Type | Description
--------- | --------- | -----------
e         | string    | Bridge ID
n         | string    | Bridge name
t         | string    | Device type
s         | string    | Device service status

> Json Response

```json
[
    [
        "00004206",
        "100d88a8",
        "Main",
        "bridge",
        [
            [
                "100f2fa1",
                "ATTD"
            ],
            [
                "100c339a",
                "ATTD"
            ]
        ],
        "ATTD",
        "swr",
        [],
        "bceb04ec-8b24-4aee-a09a-8479d856e81c",
        "EEN-BR300-08480",
        1048576,
        "US/Pacific",
        -25200,
        1,
        "",
        0,
        "Greater Good",
        false,
        null,
        null,
        [
            null,
            null,
            null,
            null,
            null,
            null
        ],
        null,
        null,
        0,
        [],
        0
    ],
    [
        "00004206",
        "100c339a",
        "New Camera 1",
        "camera",
        [
            [
                "100d88a8",
                "ATTD"
            ]
        ],
        "ATTD",
        "swr",
        [],
        "1e574020-4e33-11e3-9b40-2504532f70b4",
        "4242325013460008",
        1441847,
        "US/Pacific",
        -25200,
        0,
        "*10.143.14.254",
        0,
        "Greater Good",
        false,
        null,
        null,
        [
            null,
            null,
            null,
            null,
            null,
            null
        ],
        null,
        null,
        0,
        [],
        0
    ],
    [
        "00004206",
        "100f2fa1",
        "Dome",
        "camera",
        [
            [
                "100d88a8",
                "ATTD"
            ]
        ],
        "ATTD",
        "swr",
        [],
        "3b3efd60-432d-11e3-b19b-11ac28dbc101",
        "4016825013440034",
        1441847,
        "US/Pacific",
        -25200,
        0,
        "*10.143.217.117",
        0,
        "Greater Good",
        false,
        null,
        null,
        [
            null,
            null,
            null,
            null,
            "",
            null
        ],
        null,
        null,
        0,
        [],
        0
    ]
]

```

### HTTP Response (Array Attributes)

Array Index | Attribute           | Data Type            | Description
----------- | ---------           | ---------            | -----------
0           | account_id          | string               | Unique identifier of the device’s account
1           | id                  | string               | Unique identifier of a device
2           | name                | string               | Device name
3           | type                | string, enum         | Device type <br><br>enum: bridge, camera
4           | cameras             | array[array[string]] | This is an array of string arrays, each array representing a camera that is attached to the bridge. The first element of the array is the camera ESN. The second element is the service status
5           | service_status      | string, enum         | Device service status: <br>'ATTD' = camera is attached to a bridge <br>'IGND' = camera is unattached from all bridges and is available to be attached to a bridge <br><br>For bridges this field is always 'ATTD' <br><br>enum: ATTD, IGND
6           | permissions         | string               | String of zero or more characters each defining a permission level (of the current user)
7           | tags                | array[string]        | Array of strings each representing a tag name
8           | guid                | string               | The GUID (Globally Unique Identifier) is an immutable device identifier assigned to a device during the production process
9           | serial_number       | string               | Serial number of the device
10          | [device_status](#status-bitmask) | int                  | The device status bitmask
11          | timezone            | string               | Indicates the timezone of where the device is installed. Defaults to the account timezone. Example: ‘US/Alaska’, ‘US/Arizona’, ‘US/Central’, ‘US/Eastern’, ‘US/Hawaii’, ‘America/Anchorage’ or ‘UTC’
12          | timezone_utc_offset | int                  | The signed integer offset in seconds of a timezone from UTC
13          | is_unsupported      | int                  | Indicates whether the device is NOT supported (1) or is supported (0)
14          | ip_address          | string               | IP address assigned to the device
15          | is_shared           | int                  | Indicates whether the device is shared (1) or not (0) (**Applies only to Cameras**)
16          | owner_account_name  | string               | Name of the account that owns the device
17          | is_upnp             | boolean              | Indicates whether the device is a UPNP device (1) or not (0) (**Applies only to cameras that haven’t yet been attached to the account, in which they could have been detected via ONVIF or UPNP**)
18          | video_input         | string               | Indicates the video input channel of the camera (**Applies to analog Cameras**)
19          | video_status        | string               | Indicates the video status of the camera: (**Applies to analog Cameras**) <br>'0x00000000' - signal ok <br>'0x00000102' - no signal
20          | location            | array                | Location of the device specified in the following way: <br><br>`[` <br>&nbsp;&nbsp;&nbsp;&nbsp;`latitude(float),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`longitude(float),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`azimuth(float/null for bridge),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`range(int/null for bridge),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`street address(string),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`floor(int),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`location name(string)` <br>`]` <br><br>Note: If any field is not set, the value is null
21          | parent_camera_id    | string               | Parent camera ID
22          | child_camera_view   | string               | Child camera view
23          | is_hidden           | int                  | GUI control to not show device
24          | ignored_inputs      | array[string]        | Array of analog port numbers which should be ignored by the bridge
25          | responder_camera    | int                  | Indicates whether the camera is a first responder camera (1) or not (0)

<aside class="success">Please note that the model definition has property keys, but that's only for reference purposes since it's just a standard array</aside>

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded
