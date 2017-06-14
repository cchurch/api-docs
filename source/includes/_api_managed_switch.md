# Managed Switch

## Overview

To simplify camera troubleshooting Eagle Eye Networks provides managed Ethernet switches to be used in the camera LAN. The managed switch uses PoE (Power over Ethernet) to provide power to cameras connected to its LAN ports like a typical PoE switch, but it can also switch the power in individual ports in response to commands delivered via Eagle Eye Network API. Thus it can force a hard reset of a camera by simply cycling its power suppy.

<aside class="notice">Manged switches may be standalone or built into EEN bridges, as in the case of model 305</aside>


## Get List of Managed Switches

Returns a list of managed switches available to the current user.

> Request (no details)

```shell
curl --request GET https://login.eagleeyenetworks.com/g/managed_switch/list --cookie "auh_key=[AUTH_KEY]"

```

> Request (with details)

```shell
curl --request GET https://login.eagleeyenetworks.com/g/managed_switch/list?is_detailed=true --cookie "auh_key=[AUTH_KEY]"

```



### HTTP Request

`GET https://login.eagleeyenetworks.com/g/managed_switch/list`

Parameter           | Data Type     | Description                                                                                                            | Required    |
---------           | ---------     | -----------                                                                                                            |:-----------:|
**is_detailed**              | boolean        | Wheter or not to include detailed data in the response. Default value: false | **&cross;** |

> Json Response (no details)

```json
[
    {
        "bridges": [
            "10104f40"
        ],
        "state": "REDY",
        "guid": "cb407e63-99f8-5dac-86a6-d1d78ac6ffb0",
        "available_bridges": [],
        "ports": 4
    }

]
```

> Json Response (with details)

```json
[
    {
        "comment": "switch",
        "bridges": [
            "10104f40"
        ],
        "available_bridges": [],
        "name": null,
        "ip": "10.143.70.38",
        "state": "REDY",
        "port_details": [
            {
                "index": "port_2",
                "power": 0.0,
                "ip": "null",
                "enabled": "true",
                "mac": "null",
                "camera_guid": "null",
                "esn": "null"
            },
            {
                "index": "port_3",
                "power": 0.0,
                "ip": "10.143.176.231",
                "enabled": "true",
                "mac": "00:FC:14:18:08:05",
                "camera_guid": "(null)",
                "esn": "null"
            },
            {
                "index": "port_1",
                "power": 0.0,
                "ip": "null",
                "enabled": "true",
                "mac": "null",
                "camera_guid": "null",
                "esn": "null"
            },
            {
                "index": "port_4",
                "power": 2.4,
                "ip": "10.143.63.240",
                "enabled": "true",
                "mac": "00:1C:27:09:B1:9E",
                "camera_guid": "36e3acd0-15c5-11e6-a8c2-e9134ac9c158",
                "esn": "1007fdae"
            }
        ],
        "version": "IM-V122.1",
        "guid": "cb407e63-99f8-5dac-86a6-d1d78ac6ffb0",
        "ports": 4
    }
]
```



### HTTP Response

The response body will be in EEN JSON-RPC format.  The payload body will return a list of switch objects containing the guid, state, bridges, and ports keys. If request detailed is true then it will contain all information below.
Each switch object has the following structure:

Key            |  Data Type         | Description
---------------|------------------- | -----------
guid           |  string            | Globally Unique Identifier of the switch
state          |  string            | State of the managed switch: "PROB" | "REDY" | "CTRL"  TODO:Find our whate these really mean
bridges        |  list of strings   | List of bridge esns this managed switch was found on
ports          |  integer           | Number of controllable POE ports available on the switch
ip             |  string            | IP Address of managed switch
version        |  string            | Version information
comment        |  string            | Comment stored on switch
port_details   |  list of objects   | List of *Port Details* objects. See table below
available _bridges| list of strings | List of available bridge ESN's   TODO: clarify how it is different from 'bridges'
name           |  string            | Name of the switch

#### Port Details Object

Key            |  Data Type         | Description
---------------|------------------- | -----------
index          |  integer           | Port index in the form of "port_N", where N gets substituted for integer (starting from 1)
enabled        |  boolean           | Indicated whether the port is on or off. TODO: API returns string "true" or "false" here rather than a boolean. Is this a bug in API or mistake in doc?
mac            |  string            | Mac address behind the port. A null is returned for none and string "Multiple(N)"" for N number of macs found behind this port.
ip             |  string            | If a single MAC address is found this is the arp lookup corresponding to that MAC address. Empty string "" if more MAC addresses are found behid this port. A null for none.
power          |  float             | Power in Watts that this port is drawing
camera_guid    |  string            | GUID of the camera that is tied to the MAC / IP address. Or null for none.
esn            |  string            | ESN of the camera that is tied to the MAC / IP address. Or null for none.



### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!---=============================================================================================
   ______     __     __  ___                                 __   _____         _ __       __
  / ____/__  / /_   /  |/  /___ _____  ____ _____ ____  ____/ /  / ___/      __(_) /______/ /_
 / / __/ _ \/ __/  / /|_/ / __ `/ __ \/ __ `/ __ `/ _ \/ __  /   \__ \ | /| / / / __/ ___/ __ \
/ /_/ /  __/ /_   / /  / / /_/ / / / / /_/ / /_/ /  __/ /_/ /   ___/ / |/ |/ / / /_/ /__/ / / /
\____/\___/\__/  /_/  /_/\__,_/_/ /_/\__,_/\__, /\___/\__,_/   /____/|__/|__/_/\__/\___/_/ /_/
=================================================================================================-->


## Get Managed Switch

This API call allows for retrieval of detailed information behind the managed switch


> Request

```shell
curl --request GET https://c001.eagleeyenetworks.com/g/managed_switch?guid=cb407e63-99f8-5dac-86a6-d1d78ac6ffb0   --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/managed_switch`

Parameter           | Data Type     | Description                                                                                                            | Required    |
---------           | ---------     | -----------                                                                                                            |:-----------:|
**guid**              | string        | Globally Unique Identifier of the switch  | **&check;**

> Json Response

```json
{
    "comment": "switch",
    "name": null,
    "ip": "10.143.70.38",
    "state": "REDY",
    "port_details": [
        {
            "index": "port_2",
            "power": 0.0,
            "ip": "null",
            "enabled": "true",
            "mac": "null",
            "camera_guid": "null",
            "esn": "null"
        },
        {
            "index": "port_3",
            "power": 0.0,
            "ip": "10.143.176.231",
            "enabled": "true",
            "mac": "00:FC:14:18:08:05",
            "camera_guid": "(null)",
            "esn": "null"
        },
        {
            "index": "port_1",
            "power": 0.0,
            "ip": "null",
            "enabled": "true",
            "mac": "null",
            "camera_guid": "null",
            "esn": "null"
        },
        {
            "index": "port_4",
            "power": 2.6,
            "ip": "",
            "enabled": "true",
            "mac": "Multiple(2)",
            "camera_guid": "36e3acd0-15c5-11e6-a8c2-e9134ac9c158",
            "esn": "1007fdae"
        }
    ],
    "version": "IM-V122.1",
    "guid": "cb407e63-99f8-5dac-86a6-d1d78ac6ffb0",
    "ports": 4
}
```



### HTTP Response

The response for the request always comes back with the EEN JSON-RPC format.  If everything goes well a 200 is returned.  There can be multiple errors that happen during the process.  The full description of the error is always returned in the EEN JSON-RPC formatted body.  For simpler verification of errors we also use HTTP status codes within the HTTP header.  The response will contain a UUID that is associated with the Managed Switch Object.

The switch object has the following structure:

Key            |  Data Type         | Description
---------------|------------------- | -----------
guid           |  string            | Globally Unique Identifier
state          |  string            | State of the managed switch: "PROB" | "REDY" | "CTRL"
bridges        |  list of strings   | List of bridge esns this managed switch was found on
ports          |  integer           | Number of controllable POE ports available on the switch
ip             |  string            | IP Address of managed switch
version        |  string            | Version information
comment        |  string            | Comment stored on switch
port_details   |  list of objects   | List of *Port Details* objects. See table below
name           |  string            | Name of the switch


#### Port Details Object

Key            |  Data Type         | Description
---------------|------------------- | -----------
index          |  string            | Port index in the form of "port_N", where N gets substituted for integer (starting from 1)
enabled        |  boolean           | Indicated whether the port is on or off  TODO: API returns string "true" or "false" here rather than a boolean. Is this a bug in API or mistake in doc?
mac            |  string            | Mac address behind the port. A null is returned for none and string "Multiple(N)"" for N number of macs found behind this port.
ip             |  string            | If a single MAC address is found this is the arp lookup corresponding to that MAC address. Empty string "" if more MAC addresses are found behid this port. A null for none.
power          |  float             | Power in Watts that this port is drawing
camera_guid    |  string            | GUID of the camera that is tied to the MAC / IP address. Or null for none.
esn            |  string            | ESN of the camera that is tied to the MAC / IP address. Or null for none.



<aside class="warning">TODO: Find out whether the port being "on" or "off" refers to just the PoE power being supplied or also to communication function of port</aside>



### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Bridge or managed switch not found
200	| Request succeeded



<!---=============================================================================================
      ___            _             _                                           _   __          _ _       _
     / __\___  _ __ | |_ _ __ ___ | |   /\/\   __ _ _ __   __ _  __ _  ___  __| | / _\_      _(_) |_ ___| |__
    / /  / _ \| '_ \| __| '__/ _ \| |  /    \ / _` | '_ \ / _` |/ _` |/ _ \/ _` | \ \\ \ /\ / / | __/ __| '_ \
   / /__| (_) | | | | |_| | | (_) | | / /\/\ \ (_| | | | | (_| | (_| |  __/ (_| | _\ \\ V  V /| | || (__| | | |
   \____/\___/|_| |_|\__|_|  \___/|_| \/    \/\__,_|_| |_|\__,_|\__, |\___|\__,_| \__/ \_/\_/ |_|\__\___|_| |_|
                                                                |___/
=================================================================================================-->


## Control Managed Switch

This API call allows for controlling the managed switch, i.e. for turning ports on or off


> Request

```shell
curl -H "Content-type: application/json" --cookie "auth_key=c001~4facf3b0b1c6e9c926d570f8f6fe936a" -X POST -d '{"switch_guid": "cb407e63-99f8-5dac-86a6-d1d78ac6ffb0", "ports": ["port_1", "port_2"], "command": "reboot"}' https://login.eagleeyenetworks.com/g/managed_switch/control
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/managed_switch/control`

Parameter           | Data Type     | Description                                                                                                            | Required    |
---------           | ---------     | -----------                                                                                                            |:-----------:|
**switch_guid**              | string           | Globally Unique Identifier of the switch  | **&check;**
**command**                  | string           | "enable" - to turn port on <br/>  "disable" - to turn port off <br/> "reboot" - to cycle ports' power   | **&check;**
**ports**                    | list of strings  | Ports to be affected by the command   | **&check;**

> Json Response

```json
{
    "status": "Success",
    "details": "Bridge sent command to managed switch"
}
```



### HTTP Response

The response for the request always comes back with the EEN JSON-RPC format.  If everything goes well a 200 is returned.  There can be multiple errors that happen during the process.  The full description of the error is always returned in the EEN JSON-RPC formatted body.  For simpler verification of errors also HTTP status codes are used within the HTTP header.

The response object has the following structure:

Key            |  Data Type         | Description
---------------|------------------- | -----------
status         |  string            | Command status, e.g. "Success"
details        |  string            | Command resolution



### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Bridge or managed switch not found
406	| Managed switch is not currently in a valid state to be controlled
415 | Invalid command supplied
200	| Request succeeded



<!---=============================================================================================
 .--.         .          .    .--.                            .--.
:            _|_         |   :                                |   )
|    .-. .--. |  .--..-. |   |    .-.  .--.--. .-. .--..-.    |--'.-..  .    ._.-. .--.
:   (   )|  | |  |  (   )|   :   (   ) |  |  |(.-' |  (   )   |  (   )\  \  / (.-' |
 `--'`-' '  `-`-''   `-' `-   `--'`-'`-'  '  `-`--''   `-'`-  '   `-'  `' `'   `--''
=================================================================================================-->



## Control Camera Power

This API call allows for control of camera power using camera identifier, rather than port number of the switch.

> Request

```shell

```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/camera/power_cycle`

Parameter           | Data Type     | Description                                                                                                            | Required    |
---------           | ---------     | -----------                                                                                                            |:-----------:|
**identifier**              | string     | GUID, ESN, or MAC of the camera to control  | **&check;**



> Json Response

```json
{
    "status": "success",
    "command": {
        "status": "Success",
        "details": "Bridge sent command to managed switch"
    }
}
```
TODO: Why is the above structure completely different to the one returned by the earlier API Call? And is it by design or a bug?


### HTTP Response

The response for the request always comes back with the EEN JSON-RPC format.  If everything goes well a 200 is returned.  There can be multiple errors that happen during the process.  The full description of the error is always returned in the EEN JSON-RPC formatted body.  For simpler verification of errors also HTTP status codes are used within the HTTP header.

The response object has the following structure:

Key            |  Data Type         | Description
---------------|------------------- | -----------
status         |  string            | Command status, e.g. "Success"
details        |  string            | Command resolution



### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Bridge or managed switch not found
406	| Managed switch is not currently in a valid state to be controlled
415 | Invalid command supplied
200	| Request succeeded
