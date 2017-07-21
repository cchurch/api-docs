# Managed Switch

<!--===================================================================-->
## Overview
<!--===================================================================-->

To simplify camera troubleshooting Eagle Eye Networks provides managed Ethernet switches to be used in the camera LAN. The managed switch uses PoE (Power over Ethernet) to provide power to cameras connected to its LAN ports the same way a typical PoE switch would, but it can additionally switch the power in individual ports on or off in response to commands delivered via Eagle Eye Network API (Thus forcing a camera *hard reset* by simply cycling its power supply)

<aside class="notice">Managed Switches can only be controlled or listed from within the account, where the device resides</aside>

For each reference in this section to port being 'on', 'off', 'enabled' or 'disabled', **only the PoE power delivery function is meant**. Communication function of the ports is not affected by this API

Manged Switches may be standalone or built into EEN bridges (e.g. model 305)

<!--===================================================================-->
## Get List of Managed Switches
<!--===================================================================-->

Returns a list of Managed Switches available to the current user

> Request (basic)

```shell
curl -X GET https://login.eagleeyenetworks.com/g/managed_switch/list -H "Authentication: [API_KEY]:" --cookie "auth_key=[AUTH_KEY]" -G

```

> Request (detailed)

```shell
curl -X GET https://login.eagleeyenetworks.com/g/managed_switch/list -d "is_detailed=true" -H "Authentication: [API_KEY]:" --cookie "auth_key=[AUTH_KEY]" -G

```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/managed_switch/list`

Parameter   | Data Type | Description                                                                                                                        | Required    |
---------   | --------- | -----------                                                                                                                        |:-----------:|
is_detailed | boolean   | Whether to include detailed data in the response (true) or not (false) <br><br>(Default value: false)                              | **&cross;** |

> Json Response (basic)

```json
[
    {
        "bridges": [
            "10107f40"
        ],
        "state": "REDY",
        "guid": "cb407e63-99f8-5dbx-86a6-d1d78ac6ffb0",
        "available_bridges": [],
        "ports": 4
    },
    {...}
]
```

> Json Response (detailed)

```json
[
    {
        "comment": "switch",
        "bridges": [
            "10107f40"
        ],
        "available_bridges": [],
        "name": null,
        "ip": "10.143.70.77",
        "state": "PROB",
        "port_details": [
            {
                "index": "port_2",
                "power": 0,
                "ip": null,
                "enabled": "true",
                "mac": null,
                "camera_guid": null,
                "esn": null
            },
            {
                "index": "port_3",
                "power": 0,
                "ip": "10.143.176.211",
                "enabled": "true",
                "mac": "00:FC:14:18:08:05",
                "camera_guid": "(null)",
                "esn": null
            },
            {
                "index": "port_1",
                "power": 0,
                "ip": null,
                "enabled": "true",
                "mac": null,
                "camera_guid": null,
                "esn": null
            },
            {
                "index": "port_4",
                "power": 2.3,
                "ip": "10.143.63.240",
                "enabled": "true",
                "mac": "00:1C:27:09:B1:9E",
                "camera_guid": "36e3dbx0-15c5-11e6-a8c2-e9134ac9c158",
                "esn": "1007fdae"
            }
        ],
        "version": "IM-V122.1",
        "guid": "cb407e63-99f8-5dbx-86a6-d1d78ac6ffb0",
        "ports": 4
    },
    {...}
]
```

### HTTP Response

The response body will be in EEN JSON-RPC format. The payload body will return a list of switch objects containing the `'guid'`, `'state'`, `'bridges'` and `'ports'` keys. If `'is_detailed=true'`, the response will contain all of the below information

Each switch object has the following (detailed) structure:

Parameter         | Data Type     | Description
---------         | ---------     | -----------
guid              | string        | Globally Unique Identifier of the switch
state             | string        | State of the managed switch: <br>`'REDY'` - idle and ready to control <br>`'PROB'` - probing for the data behind ports like mac/voltage/enabled etc. <br>`'CTRL'` - busy actively changing settings
bridges           | array[string] | List of bridge ESN's this managed switch was found on
ports             | integer       | Number of controllable PoE ports available on the switch
ip                | string        | IP address of managed switch
version           | string        | Version information
comment           | string        | Comment stored on switch
[port_details](#managed-switch-port_details) | array[obj]    | List of *Port Details* objects
available_bridges | array[string] | List of available bridge ESN's, i.e. bridges that this switch can be attached to
name              | string        | Name of the switch

### Managed Switch - port_details

Parameter   | Data Type | Description
---------   | --------- | -----------
index       | string    | Port index in the form of `'port_N'`, where N gets substituted by an integer (starting from 1)
enabled     | string    | Indicates whether the port is on (true) or off (false)
mac         | string    | MAC address behind the port, string "Multiple(N)" for N number of MAC addresses found behind this port
ip          | string    | If a single MAC address is found this is the arp lookup corresponding to that MAC address. Empty string "" if more MAC addresses are found behind this port
power       | float     | Power in Watts that this port is drawing
camera_guid | string    | GUID of the camera that is tied to the MAC/IP address
esn         | string    | ESN of the camera that is tied to the MAC/IP address

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Get Managed Switch
<!--===================================================================-->

This API call allows for retrieval of detailed information behind the Managed Switch

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/managed_switch -d "guid=[SWITCH_GUID]" -H "Authentication: [API_KEY]:" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/managed_switch`

Parameter | Data Type | Description                                                                                                                          | Required    |
--------- | --------- | -----------                                                                                                                          |:-----------:|
**guid**  | string    | Unique identifier of the switch                                                                                                      | **&check;** |

> Json Response

```json
{
    "comment": "switch",
    "name": null,
    "ip": "10.143.70.77",
    "state": "REDY",
    "port_details": [
        {
            "index": "port_2",
            "power": 0,
            "ip": null,
            "enabled": "true",
            "mac": null,
            "camera_guid": null,
            "esn": null
        },
        {
            "index": "port_3",
            "power": 0,
            "ip": "10.143.176.211",
            "enabled": "true",
            "mac": "00:FC:14:18:08:05",
            "camera_guid": "(null)",
            "esn": null
        },
        {
            "index": "port_1",
            "power": 0,
            "ip": null,
            "enabled": "true",
            "mac": null,
            "camera_guid": null,
            "esn": null
        },
        {
            "index": "port_4",
            "power": 2.3,
            "ip": "10.143.63.240",
            "enabled": "true",
            "mac": "00:1C:27:09:B1:9E",
            "camera_guid": "36e3dbx0-15c5-11e6-a8c2-e9134ac9c158",
            "esn": "1007fdae"
        }
    ],
    "version": "IM-V122.1",
    "guid": "cb407e63-99f8-5dbx-86a6-d1d78ac6ffb0",
    "ports": 4
}
```

### HTTP Response

Parameter | Data Type     | Description
--------- | ---------     | -----------
guid      | string        | Globally Unique Identifier
state     | string        | State of the managed switch: <br>`'REDY'` - idle and ready to control <br>`'PROB'` - probing for the data behind ports like mac/voltage/enabled etc. <br>`'CTRL'` - busy actively changing settings
bridges   | array[string] | List of bridge esns this managed switch was found on
ports     | integer       | Number of controllable PoE ports available on the switch
ip        | string        | IP address of managed switch
version   | string        | Version information
comment   | string        | Comment stored on switch
[port_details](#managed-switch-port_details) | array[obj]    | List of *Port Details* objects
name      | string        | Name of the switch

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Bridge or managed switch not found
200	| Request succeeded

<!--===================================================================-->
## Control Managed Switch
<!--===================================================================-->

This API call enables control of the Managed Switch (i.e. for turning ports on or off)

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/managed_switch/control -d '{"switch_guid": "[SWITCH_GUID]", "ports": ["port_1", "port_2"], "command": "reboot"}'  -H "Content-type: application/json" -H "Authentication: [API_KEY]:" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/managed_switch/control`

Parameter       | Data Type     | Description                                                                                                                | Required    |
---------       | ---------     | -----------                                                                                                                |:-----------:|
**switch_guid** | string        | Globally Unique Identifier of the switch                                                                                   | **&check;** |
**command**     | string        | Control commands: <br>`'enable'` - turn port on <br>`'disable'` - turn port off <br>`'reboot'` - cycle ports' power        | **&check;** |
**ports**       | array[string] | Ports to be affected by the command                                                                                        | **&check;** |

> Json Response

```json
{
    "status": "Success",
    "details": "Bridge sent command to managed switch"
}
```

### HTTP Response

Parameter | Data Type | Description
--------- | --------- | -----------
status    | string    | Command status (e.g. `'Success'`)
details   | string    | Command resolution

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Bridge or managed switch not found
406	| Managed switch is not currently in a valid state to be controlled
415	| Invalid command supplied
200	| Request succeeded

<!--===================================================================-->
## Control Camera Power
<!--===================================================================-->

This API call enables control of camera power using the camera identifier rather than port number of the switch

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/camera/power_cycle -d '{"identifier": "[ESN]"}' -H "Content-type: application/json" -H "Authentication: [API_KEY]:" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/camera/power_cycle`

Parameter      | Data Type | Description                                                                                                                     | Required    |
---------      | --------- | -----------                                                                                                                     |:-----------:|
**identifier** | string    | Device identifier: <br>`<GUID>` - Global Unique Identifier of the camera <br>`<ESN>` - ID of the camera <br>`<MAC>` - MAC address of the camera                                                                                                                                                       | **&check;** |

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

### HTTP Response

Parameter | Data Type | Description
--------- | --------- | -----------
status    | string    | Command status (e.g. `'Success'`)
details   | string    | Command resolution

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Bridge or managed switch not found
406	| Managed switch is not currently in a valid state to be controlled
415	| Invalid command supplied
200	| Request succeeded
