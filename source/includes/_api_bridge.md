# Bridge

<!--===================================================================-->
## Overview
The Bridge is a product of Eagle Eye that sits at the customer location and talks to industry standard cameras. It converts the Cameras to be compatible with the EEVB and record the Assets. The Bridge is setup and controlled via a cloud based user interface. There is no user interface on the Bridge. The Bridge may serve local Assets directly to local Clients. The Bridge will also store Assets until they are transferred to the EEVB. The Bridge may be configured via DHCP or with a static IP address.

<!--===================================================================-->
## Bridge Model
> Json Response

```json

```
### Device Attributes

Parameter                     | Data Type     | Description
---------                     | ---------     | -----------
id                            | string        | A unique identifier of a bridge. It is automatically generated and assigned while adding a device
guid                          | string        | A globally unique identifier (GUID). A GUID is an immutable device identifier.It is assigned to a device during the production process
name                          | string        | A user-defined device name
timezone                      | string        | Indicates a timezone of place where a device is installed. Defaults to the account timezone. Possible values: ‘US/Alaska’ or ‘US/Arizona’ or‘US/Central’ or ‘US/Eastern’ or ‘US/Hawaii’ or ‘America/Anchorage’ or ‘UTC’
utcOffset                     | int           | A signed integer offset in seconds of a timezone from UTC. Automatically generated based on the timezone field
tags                          | array[string] | An array of strings, which each string representing a tag
permissions                   | string        | A string of zero or more characters. Each character defines a permission that the current user has
bridges                       | null          | **Only applies to Cameras**
[settings](#settings)         | json          | Basic settings (location, etc.)
[camera_info](#camera_info)   | json          | Basic informations related to a bridge
camera_info_status_code       | int           | Indicates whether it was possible to obtain informations about the device (200) or not (404)
camera_parameters             | json          | Bridge parameters
camera_parameters_status_code | int           | Indicates whether it was possible to obtain parameters of the device (200) or not (404)
camera_settings               | string        | **Deprecated.** This is for backwards compatibility
camera_settings_status_code   | int           | **Deprecated.** This is for backwards compatibility

### settings

Parameter                  | Data Type     | Description
---------                  | ---------     | -----------
retention_days             | int           |
analog_inputs_ignored      | array[string] | An array of numbers of analog inputs which the user wants to ignore.
event_data_start_timestamp | string        |
retention_days             | int           |
local_display_layout_ids   | array[string] | An array of available layouts on a local display
bridge                     | null          | **Only applies to Cameras**     
local_retention_days       | int           |
site_name                  | string        | A user-defined bridge location name
floor                      | int           | The floor of the building given that it is a multi-storey
longitude                  | float         | Longitude of the bridge location
latitude                   | float         | Latitude of the bridge location
street_address             | string        | A street address of the bridge location

### camera_info

Parameter                 | Data Type | Description
---------                 | --------- | -----------
camera_property_model     | string    |
model                     |	string    |
camera_property_version   |	string    |
version                   |	string    |
camera_property_make      |	string    |
make                      |	string    |
camera_abs_newest         |	string    |
camera_newest             |	string    |
camera_abs_oldest         |	string    |
camera_oldest             |	string    |
uuid                      |	string    | The same thing as the GUID from the [device attributes section](#device_attributes)
ipaddr                    |	string    | IP Addresses assigned to the device, comma delimited, with the one in use prefixed by an asterisk *
esn                       |	string    | The same thing as the id from the [device attributes section](#device_attributes)
class                     |	string    | Determines the type of a device ("bridge" or "camera")
service                   |	string    |
status                    |	string    | A [status bitmask](#status-bitmask) of a bridge
camera_state_version      |	int       |
no_video                  |	int       |
tagmap_status_state       |	int       |
camera_retention_asset    |	int       |
camera_retention_etag     |	int       |
run_mode                  |	string    |
register_id               |	int       |         
camera_now                |	string    |
ssn                       |	string    | A serial number of a bridge
proxy                     |	string    |
now                       |	string    |            
camera_property_analog    |	boolean   |
status_hex              	| string    | A [status bitmask](#status-bitmask) of a bridge as a hexadecimal value
camera_retention_interval |	int       |
camera_valid_ts           |	string    |


## Get Bridge

> Request

```shell
curl -G https://login.eagleeyenetworks.com/g/device -d "A=[AUTH_KEY]&id=[BRIDGE_ID]"
```

Returns bridge object by id.

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/device`

Parameter | Data Type | Description                                                                                       | Is Required
--------- | --------- | -----------                                                                                       | -----------
**id**    | string    | A unique identifier of a bridge. It is automatically generated and assigned while adding a device | true

### Error Status Codes

HTTP Status Code | Description  
---------------- | -----------
200              | Request succeeded
400              | Unexpected or non-identifiable arguments are supplied
401              | Unauthorized due to an invalid session cookie
403              | Forbidden due to the user missing the necessary privileges
404              | No device matching the ConnectID or GUID was found


<!--===================================================================-->
## Add Bridge To Account

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X PUT -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/device -d '{"name":"[NAME]","connectID":[CONNECT_ID]}'
```

> Json Response

```json
{
  "id": "100c339a"
}
```

Adds a bridge to the account

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/device`

Parameter     | Data Type   | Description                                       | Is Required
---------     | ----------- | -----------                                       | -----------
**name**      | string      | A user-defined device name                        | true
**connectID** | string      | A code delivered with a bridge and assigned to it | true

### Response Json Attributes

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | A unique identifier of a bridge

### Error Status Codes

HTTP Status Code | Description   
---------------- | -----------
200              | Request succeeded
400              | Unexpected or non-identifiable arguments are supplied
401              | Unauthorized due to an invalid session cookie
403              | Forbidden due to the user missing the necessary privileges
404              | No device matching the ConnectID or GUID was found
409              | ConnectID or GUID is currently already in use by an account
410              | Communication cannot be made to attach the camera to the bridge
415              | Device associated with the given GUID is unsupported

<!--===================================================================-->
## Update Bridge

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X POST -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/device -d '{"id": "[BRIDGE_ID], "name": "[NAME]"}'
```

> Json Response

```json
{
  "id": "100c339a"
}
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/device`

Parameter                | Data Type     | Description                     | Is Required
---------                | -----------   | -----------                     | -----------
**id**                   | string        | A unique identifier of a bridge | true
name                     | string        | A user-defined device name
timezone                 | string        | Indicates a timezone of place where a device is installed. Defaults to the account timezone. Possible values: ‘US/Alaska’ or ‘US/Arizona’ or‘US/Central’ or ‘US/Eastern’ or ‘US/Hawaii’ or ‘America/Anchorage’ or ‘UTC’
tags                     | array[string] | An array of strings, which each string representing a tag
[settings](#settings)    | json          | Basic settings (location, etc.)
camera_parameters_add    | json          | JSON object of camera parameters/settings to add/update
camera_parameters_delete | json          | JSON object of camera parameters/settings to delete

### Response Json Attributes

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | A unique identifier of a bridge

### Error Status Codes

HTTP Status Code | Description   
---------------- | -----------
200              | Request succeeded
400              | Unexpected or non-identifiable arguments are supplied
401              | Unauthorized due to an invalid session cookie
403              | Forbidden due to the user missing the necessary privileges
404              | Device matching the ID was not found
463              | Unable to communicate with the camera to add/delete camera settings, contact support

<!--===================================================================-->
## Delete Bridge

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X DELETE -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/device -d "id=[BRIDGE_ID]" -G
```

### HTTP Request

`DELETE https://login.eagleeyenetworks.com/g/device`

Parameter | Data Type | Description
--------- | --------- | -----------
**id**    | string    | A unique identifier of a bridge

### Error Status Codes

HTTP Status Code | Description  
---------------- | -----------
200              | Request succeeded
400              | Unexpected or non-identifiable arguments are supplied
401              | Unauthorized due to an invalid session cookie
403              | Forbidden due to the user missing the necessary privileges
404              | Device matching the ID was not found
463              | Unable to communicate with the camera or bridge, contact support

<!--===================================================================-->
## Get List of Bridges

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" --request GET https://login.eagleeyenetworks.com/g/device/list
```

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
        ]
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
        ]
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
        ]
    ]
]
```

Returns array of arrays, with each sub-array representing a device available to the user. The 'service_status' attribute either be set to 'ATTD' or 'IGND'. If the service_status is 'ATTD', the camera is attached to a bridge. If the service_status is 'IGND', the camera is unattached from any bridge and is available to be attached. Please note that the ListDevice model definition below has property keys, but that's only for reference purposes since it's actually just a standard array.

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/device/list`

Parameter | Data Type   | Description           
--------- | ----------- | -----------           
e         | string      | A unique identifier of a bridge             
n         | string      | A name of a bridge           
t         | string      | Device Type          
s         | string      | Device Service Status

### Response: Bridge Model

Array Index | Attribute           | Data Type     | Description
----------- | ---------           | ---------     | -----------
0           | account_id          | string        |
1           | id                  | string        |
2           | name                | string        |
3           | type                | string        |
4           | bridges             | json          |
5           | service_status      | string        |
6           | permissions         | string        |
7           | tags                | array[string] |
8           | guid                | string        |
9           | serial_number       | string        |
10          | device_status       | int           | [device_status](#status-bitmask)
11          | timezone            | string        |
12          | timezone_utc_offset | int           |
13          | is_unsupported      | int           |
14          | ip_address          | string        |
15          | is_shared           | int           |
16          | owner_account_name  | string        |
17          | is_upnp             | boolean       |
18          | video_input         | string        |
19          | video_status        | string        |
20          | ??                  |               |
21          | ??                  |               |
22          | ??                  |               |
23          | ??                  |               |
24          | ??                  |               |
25          | ??                  |               |

### Error Status Codes

HTTP Status Code | Description  
---------------- | -----------
200              | Request succeeded
400              | Unexpected or non-identifiable arguments are supplied
401              | Unauthorized due to an invalid session cookie
403              | Forbidden due to the user missing the necessary privileges
