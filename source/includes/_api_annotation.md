# Annotation

<!--===================================================================-->
## Overview
<!--===================================================================-->

The Annotation service allows to push data (including HTML elements) into the event stream to add additional information about a camera/video. Annotations are associated with a device and a timestamp

<aside class="notice">Annotations are subject to normal retention logic and as such will be discarded when the annotated time has exceeded retention</aside>

<!--===================================================================-->
## Annotation Model
<!--===================================================================-->

> Annotation Model

```json
[
    [
        "3f06b432-41f9-11e7-aaf2-1c1b0daef2f5",
        "20180526095347.742",
        2,
        {
            "data": "{\"info\":\"Annotation1\";}"
        }
    ],
    [
        "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
        "20180526095435.831",
        11,
        {
            "info": "Annotation by cafedead"
        }
    ],
    [...]
]
```

### Annotation (Attributes)

Array Index | Attribute    | Data Type | Description                                                                                               | Editable    | Required
----------- | ---------    | --------- | -----------                                                                                               |:-----------:| --------
**0**       | **uuid**     | string    | Unique identifier for the annotation assigned to it during creation                                       | **&cross;** | **<sub><form action="#get-annotation"><button>GET</button></form></sub>**
  1         | timestamp    | string    | Time of the annotation creation in EEN Timestamp format (YYYYMMDDHHMMSS.NNN)                              | **&cross;** |
**2**       | **ns**       | int       | Namespace *grouping* assigned to the annotation (in the EEN structure namespaces can describe a specific category of annotations) <br><br>**Note:** Can only be defined during Create Annotation                                                                                     | **&check;** | **<sub><form action="#create-annotation"><button>PUT</button></form></sub>** <br>**<sub><form action="#update-annotation"><button>POST</button></form></sub>**
**3**       | **\<data\>** | json      | Content of the annotation                                                                                 | **&check;** | **<sub><form action="#create-annotation"><button>PUT</button></form></sub>** <br>**<sub><form action="#update-annotation"><button>POST</button></form></sub>**

<aside class="success">Please note that the model definition has property keys, but that's only for reference purposes since it's just a standard array</aside>

<!--===================================================================-->
## Get Annotation
<!--===================================================================-->

Returns an Annotation object by ID/UUID

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/annt/annt/get -d "id=[ID]" -d "uuid=[UUID1],[UUID2],[UUID3]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/annt/annt/get`

Parameter     | Data Type     | Description                                                                                                                  | Required    |
---------     | ---------     | -----------                                                                                                                  |:-----------:|
**id**        | string        | ID of the device the annotation is associated with                                                                           | **&check;** |
**uuid**      | array[string] | Array of comma-separated annotation UUIDs to return                                                                          | **&check;** |

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Create Annotation
<!--===================================================================-->

Create an Annotation for a device with a specific timestamp and data describing it

<aside class="notice">Annotations can only be created from within the account, where the device resides for which the annotation is being created</aside>

> Request

```shell
curl -X PUT "https://login.eagleeyenetworks.com/annt/set?c=[ID]&ts=[TIMESTAMP]&ns=[NAMESPACE]" -d '{"[KEY_NAME]": "[ANNOTATION_DATA]"}' -H "content-type: application/json" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`PUT https://login.eagleeyenetworks.com/annt/set`

Parameter     | Data Type | Description                                                                                                                      | Required    |
---------     | --------- | -----------                                                                                                                      |:-----------:|
**c**         | string    | ID of the device the annotation should be associated with                                                                        | **&check;** |
**ns**        | int       | The numerical namespace value assigned by Eagle Eye Networks                                                                     | **&check;** |
**\<data\>**  | json      | Json object representing the data to be used as the annotation content (can include HTML elements)                               | **&check;** |
ts            | string    | Timestamp associated with the annotation (optional - if left out the system will automatically provide a timestamp)              | **&cross;** |

> Json Response

```json
{
    "uuid": "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
    "cameraid": "1000f60d",
    "ts": "20180526095435.831",
    "ns": 11
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
uuid      | string    | Unique identifier of the annotation
cameraid  | string    | Unique identifier of the device
ts        | string    | Timestamp associated with the annotation
ns        | string    | Namespace associated with the annotation

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Update Annotation
<!--===================================================================-->

Update an Annotation for a device with a particular timestamp. Simple modifications (`'type=mod'`) require to pass the original `'timestamp'` from when the Annotation was created. Zero to N `'heartbeats'` (`'type=hb'`) can also be applied to describe changes over time for the Annotation

The Annotation can be ended at any given time by specifying an end event (`'type=end'`), which closes the Annotation and allows to attach additional information. Each Annotation event is assumed to last for 10 seconds in the absence of a heartbeat extending it (After a heartbeat, it is assumed to last for another 10 seconds)

> Request

```shell
curl -X POST "https://login.eagleeyenetworks.com/annt/set?u=[UUID]&c=[ID]&ns=[NAMESPACE]&ts=[TIMESTAMP]" -d '{"[KEY_NAME]": "[ANNOTATION_DATA]"}' -H "content-type: application/json" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/annt/set`

Parameter     | Data Type    | Description                                                                                                                   | Required    |
---------     | ---------    | -----------                                                                                                                   |:-----------:|
**u**         | string       | Unique identifier (UUID) of the annotation being updated returned during Create Annotation                                    | **&check;** |
**c**         | string       | Unique identifier of the device associated with the annotation being updated                                                  | **&check;** |
**ns**        | int          | The numerical namespace value assigned by Eagle Eye Networks (can be omitted for heartbeat events `'type=hb'`)                | **&check;** |
**type**      | string       | If `'type=mod'`, then this must be the timestamp associated with the annotation when originally created. If `'type'` is `'hb'` or `'end'`, this timestamp can be a different timestamp than the original                                                                                                | **&check;** |
**\<data\>**  | json         | Json object representing the data to be used as the annotation content (can include HTML elements)                            | **&check;** |
type          | string, enum | The type of annotation update to make (Defaults to `'mod'`): <br><br>`'mod'` - simple modification of the annotation <br>`'hb'` - indicates a heartbeat event, adding information on parameters that have changed and extending duration <br>`'end'` - indicates the end of the event and updates the annotation if changes have been specified, no `'hb'` with a later timestamp will be accepted <br><br>enum: end, hb, mod                                                    | **&cross;** |

> Json Response

```json
{
    "uuid": "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
    "cameraid": "1000f60d",
    "ts": "20180526095435.831",
    "ns": 11
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
uuid      | string    | Unique identifier of the annotation
cameraid  | string    | Unique identifier of the device
ts        | string    | Timestamp associated with the annotation
ns        | string    | Namespace associated with the annotation

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Next Annotation
<!--===================================================================-->

Returns an object populated by Annotations occurring *around* the defined timestamp by searching for the next event in the indicated direction

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/annt/annt/next -d "c=[ID]" -d "st=[START_TIMESTAMP]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/annt/annt/next`

Parameter | Data Type | Description                                                                                                                          | Required    |
--------- | --------- | -----------                                                                                                                          |:-----------:|
**c**     | string    | ID of the device the annotation is associated with                                                                                   | **&check;** |
**st**    | string    | Timestamp to get annotation(s) for in EEN format: YYYYMMDDHHMMSS.NNN                                                                 | **&check;** |

> Json Response

```json
{
    "ts": "20180526095435.831",
    "new": [
        [
            "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
            "20180526095435.831",
            11,
            {
                "info": "Annotation by cafedead"
            }
        ],
        [...],
        [...]
    ],
    "active": [
        "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
        "<uuid>",
        "<uuid>"
    ]
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type         | Description
--------- | ---------         | -----------
ts        | string            | Closest matching timestamp to the requested (to get annotations after) in EEN format: YYYYMMDDHHMMSS.NNN
new       | array[array[obj]] | Array of arrays with each returned element being an annotation object with Json-formatted data <br>(See [Get Annotation](#get-annotation) for the returned annotation array structure)
active    | array[string]     | Array of all annotation UUIDs active around the specified `'st'` (or within the defined time window)

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Previous Annotation
<!--===================================================================-->

Returns an object populated by Annotations occurring *around* the defined timestamp by searching for the previous event in the indicated direction

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/annt/annt/prev -d "c=[ID]" -d "et=[END_TIMESTAMP]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/annt/annt/prev`

Parameter | Data Type | Description                                                                                                                          | Required    |
--------- | --------- | -----------                                                                                                                          |:-----------:|
**c**     | string    | ID of the device the annotation is associated with                                                                                   | **&check;** |
**et**    | string    | Timestamp to get annotation(s) for in EEN format: YYYYMMDDHHMMSS.NNN                                                                 | **&check;** |

> Json Response

```json
{
    "ts": "20180526095435.831",
    "new": [
        [
            "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
            "20180526095435.831",
            11,
            {
                "info": "Annotation by cafedead"
            }
        ],
        [...],
        [...]
    ],
    "active": [
        "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
        "<uuid>",
        "<uuid>"
    ]
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type         | Description
--------- | ---------         | -----------
ts        | string            | Closest matching timestamp to the requested (to get annotations before) in EEN format: YYYYMMDDHHMMSS.NNN
new       | array[array[obj]] | Array of arrays with each returned element being an annotation object with Json-formatted data <br>(See [Get Annotation](#get-annotation) for the returned annotation array structure)
active    | array[string]     | Array of all annotation UUIDs active around the specified `'et'` (or within the defined time window)

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Window of Annotations
<!--===================================================================-->

Return an object populated by active annotations as a point in time (optionally including annotations that have recently ended). The result can be filtered by passing UUIDs to be excluded from the list. By specifying `'st'` the result will include any documents ended between `'st'` and `'et'` (specifying `'st'` does not change the search interval)

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/annt/annt/window  -d "c=[ID]" -d "st=[START_TIMESTAMP]" -d "et=[END_TIMESTAMP]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/annt/annt/window`

Parameter | Data Type     | Description                                                                                                                      | Required    |
--------- | ---------     | -----------                                                                                                                      |:-----------:|
**c**     | string        | ID of the device the annotation is associated with                                                                               | **&check;** |
**et**    | string        | End timestamp of query in EEN format: YYYYMMDDHHMMSS.NNN                                                                         | **&check;** |
st        | string        | Start timestamp of query in EEN format: YYYYMMDDHHMMSS.NNN                                                                       | **&cross;** |
uuid      | array[string] | Array of UUIDs to exclude from results                                                                                           | **&cross;** |

> Json Response

```json
{
    "ts": "20180526095435.831",
    "new": [
        [
            "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
            "20180526095435.831",
            11,
            {
                "info": "Annotation by cafedead"
            }
        ],
        [...],
        [...]
    ],
    "active": [
        "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
        "<uuid>",
        "<uuid>"
    ]
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type         | Description
--------- | ---------         | -----------
ts        | string            | Closest matching timestamp to the requested (to get annotations for) in EEN format: YYYYMMDDHHMMSS.NNN
new       | array[array[obj]] | Array of arrays with each returned element being an annotation object with Json-formatted data <br>(See [Get Annotation](#get-annotation) for the returned annotation array structure)
active    | array[string]     | Array of all annotation UUIDs returned based on the specified criteria

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Get List of Annotations
<!--===================================================================-->

Returns an array of Annotations by count or time range

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/annt/annt/list -d "id=[ID]" -d "st=[START_TIMESTAMP]" -d "et=[END_TIMESTAMP]" -H 'Content-type: application/json' --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/annt/annt/list`

Parameter           | Data Type     | Description                                                                                                            | Required    |
---------           | ---------     | -----------                                                                                                            |:-----------:|
**id**              | string        | ID of the device the annotation should be associated with                                                              | **&check;** |
**start_timestamp** | string        | Start timestamp of the annotations to return                                                                           | **&check;** |
**end_timestamp**   | string        | End timestamp of the annotations to return                                                                             | **&check;** |
count               | int           | N number of annotations to return (can be used to replace the `'end_timestamp'`, in which case will return the first N number of annotations after `'start_timestamp'`)                                                                                                                       | **&cross;** |
uuid                | array[string] | Array of comma-delimited UUIDs to list                                                                                 | **&cross;** |
namespace           | array[int]    | Array of 1 to N comma-delimited namespaces to list                                                                     | **&cross;** |
exclusive           | boolean       | Whether to include annotations that span start or end (0) or not (1)                                                   | **&cross;** |

> Json Response

```json
[
    [
        "3f06b432-41f9-11e7-aaf2-1c1b0daef2f5",
        "20180526095347.742",
        2,
        {
            "data": "{\"info\":\"Annotation1\";}"
        }
    ],
    [
        "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
        "20180526095435.831",
        11,
        {
            "info": "Annotation by cafedead"
        }
    ],
    [...],
    [...],
    [...]
]
```

### HTTP Response (Array Attributes)

Array Index | Attribute              | Data Type | Description
----------- | ---------              | --------- | -----------
0           | uuid                   | string    | Unique identifier for the annotation assigned to it during creation
1           | timestamp              | string    | Time of the annotation creation in EEN Timestamp format (YYYYMMDDHHMMSS.NNN)
2           | namespace              | int       | Namespace *grouping* assigned to the annotation (in the EEN structure namespaces can describe a specific category of annotations)
3           | \<data\>               | json      | Content of the annotation

<aside class="success">Please note that the model definition has property keys, but that's only for reference purposes since it's just a standard array</aside>

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded
