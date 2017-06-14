# Managed Switch

## Overview

To simplify camera troubleshooting Eagle Eye Networks provides managed Ethernet switches to be used in the camera LAN. The managed switch uses PoE (Power over Ethernet) to provide power to cameras connected to its LAN ports like a typical PoE switch, but it can also switch the power in individual ports in response to commands delivered via Eagle Eye Network API. Thus it can force a hard reset of a camera by simply cycling its power suppy.

<aside class="notice">Manged switches may be standalone or built into EEN bridges, as in the case of model 305</aside>


## Get List of Managed Switches

Returns a list of managed switches available to the current user.

> Request (no details)

```shell
curl --request GET https://login.eagleeyenetworks.com/g/managed_switch/list --cookie "auh_key=c001~13b95d63b343250e804d79e3e7f40ce2"

```

> Request (with details)

```shell
curl --request GET https://login.eagleeyenetworks.com/g/managed_switch/list?is_detailed=true --cookie "auh_key=c001~13b95d63b343250e804d79e3e7f40ce2"

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
guid           |  string            | Globally Unique Identifier
state          |  string            | State of the managed switch TODO: enumerate what states are possible
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
index          |  integer           | Port number
enabled        |  boolean           | Indicated whether the port is on or off
mac            |  string            | Mac address behind the port, also null for none and Multiple(n) for n number of macs found behind this port. TODO: find out how the multiple MAC's are listed (JSON list or commas)
ports          |  integer           | Number of controllable POE ports available on the switch
ip             |  string            | If a single MAC address is found this is the arp lookup corresponding to that MAC address
camera_guid    |  string            | If a camera is tied to the MAC / IP address the GUID it corresponds to in VBS will be here.
esn            |  string            | ESN id of the port  TODO: confirm that indeed this is the ESN of port

<aside class="success">TODO: Find out whether the port being "on" or "off" refers to just the PoE power being supplied or also to communication function of port</aside>



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

Returns a list of managed switches available to the current user.

> Request (no details)

```shell
curl --request GET https://login.eagleeyenetworks.com/g/managed_switch/list --cookie "auh_key=c001~13b95d63b343250e804d79e3e7f40ce2"

```

> Request (with details)

```shell
curl --request GET https://login.eagleeyenetworks.com/g/managed_switch/list?is_detailed=true --cookie "auh_key=c001~13b95d63b343250e804d79e3e7f40ce2"

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
guid           |  string            | Globally Unique Identifier
state          |  string            | State of the managed switch TODO: enumerate what states are possible
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
index          |  integer           | Port number
enabled        |  boolean           | Indicated whether the port is on or off
mac            |  string            | Mac address behind the port, also null for none and Multiple(n) for n number of macs found behind this port. TODO: find out how the multiple MAC's are listed (JSON list or commas)
ports          |  integer           | Number of controllable POE ports available on the switch
ip             |  string            | If a single MAC address is found this is the arp lookup corresponding to that MAC address
camera_guid    |  string            | If a camera is tied to the MAC / IP address the GUID it corresponds to in VBS will be here.
esn            |  string            | ESN id of the port  TODO: confirm that indeed this is the ESN of port

<aside class="success">TODO: Find out whether the port being "on" or "off" refers to just the PoE power being supplied or also to communication function of port</aside>



### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded
