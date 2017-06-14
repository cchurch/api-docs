# Managed Switch

## Overview

To simplify camera troubleshooting Eagle Eye Networks provides managed Ethernet switches to be used in the camera LAN. The managed switch uses PoE (Power over Ethernet) to provide power to cameras connected to its LAN ports like a typical PoE switch, but it can also switch the power in individual ports in response to commands delivered via Eagle Eye Network API. Thus it can force a hard reset of a camera by simply cycling its power suppy.

<aside class="notice">Manged switches may be standalone or built into EEN bridges, as in the case of model 305</aside>


### Get List of Managed Switches

Returns a list of managed switches available to the current user.

> Request

```shell
TODO: write curl request here
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/managed_switch/list`

Parameter           | Data Type     | Description                                                                                                            | Required    |
---------           | ---------     | -----------                                                                                                            |:-----------:|
**is_detailed**              | boolean        | Wheter or not to include detailed data in the response  with                                                              | **&cross;** |

> Json Response

```json
[
    "TODO":"Write the JSON response here"
]
```
### HTTP Response (Array Attributes)

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
index          |  string            | Port number   TODO: is this really "string" or maybe "integer"
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
