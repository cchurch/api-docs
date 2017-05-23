# Metric

<!--===================================================================-->
## Overview
<!--===================================================================-->

This service defines metrics that can be queried from the system

<!--===================================================================-->
## Camera Bandwidth
<!--===================================================================-->

Used to query the bandwidth usage for a particular camera device

> Request

```shell
curl -G https://login.eagleeyenetworks.com/g/metric/camerabandwidth -d "A=[AUTH_KEY]&id=[CAMERA_ID]"
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/metric/camerabandwidth`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
**id**          | string       | Camera ID   | true
start_timestamp | string       | Start timestamp of query, in EEN format: YYYYMMDDHHMMSS.NNN. Defaults to 7 days ago
end_timestamp   | string       | End timestamp of query, in EEN format: YYYYMMDDHHMMSS.NNN. Defaults to *now*
group_by        | string, enum | Hour or day indicating how the results should be grouped <br><br>enum: day, hour, minute
motion_interval | int          | Motion Interval used for Motion Activity metric, in milliseconds. Defaults to 15000
metrics         | string, enum | String delimited list used to filter which metrics get returned. Setting this parameter to `'core,motion'` will return data only for core and motion <br><br>enum: core, packets, motion

> Json Response

```json
{
    "core": [
        [
            "20181002190000.000",
            0.0,
            0.0,
            215910545.0,
            76733036.0,
            32049659.0,
            52716510.0
        ],
        [
            "20181002200000.000",
            0.0,
            0.0,
            252051927.0,
            164214711.0,
            36128066.0,
            223484133.0
        ],
        [...],
        [...],
        [...],
        [
            "20181009190000.000",
            0.0,
            0.0,
            41425890.0,
            10373660.0,
            5029677.0,
            78599812.0
        ]
    ],
    "packets": [
        [
            "20181002190000.000",
            0.00183
        ],
        [
            "20181002200000.000",
            0.0018439999999999999
        ],
        [...],
        [...],
        [...],
        [
            "20181009190000.000",
            0.0
        ]
    ],
    "motion": []
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
core      | array[[CameraCore](#cameracore-json-array-elements)]       | Array of core metrics
packets   | array[[CameraPackets](#camerapackets-json-array-elements)] | Array of packet metrics
motion    | array[[CameraMotion](#cameramotion-json-array-elements)]   | Array of motion metrics

### CameraCore Json Array Elements

Index     | Data Type | Description
-----     | --------- | -----------
0         | string    | EEN Timestamp: YYYYMMDDHHMMSS.NNN
1         | float     | Average kilobytes on disk
2         | float     | Average days on disk
3         | float     | Bytes stored
4         | float     | Bytes shaped
5         | float     | Bytes streamed
6         | float     | Bytes freed

### CameraPackets Json Array Elements

Index     | Data Type | Description
-----     | --------- | -----------
0         | string    | EEN Timestamp: YYYYMMDDHHMMSS.NNN
1         | float     | Packet loss percentage (decimal)

### CameraMotion Json Array Elements

Index     | Data Type | Description
-----     | --------  | -----------
0         | string    | EEN Timestamp: YYYYMMDDHHMMSS.NNN
1         | int       | Motion activity value

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Metrics not found
200 | Request succeeded

<!--===================================================================-->
## Bridge Bandwidth
<!--===================================================================-->

Used to query the bandwidth usage for a particular bridge device

> Request

```shell
curl -G https://login.eagleeyenetworks.com/g/metric/bridgebandwidth -d "A=[AUTH_KEY]&id=[BRIDGE_ID]"
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/metric/bridgebandwidth`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
**id**          | string       | Bridge ID   | true
start_timestamp | string       | Start timestamp of query, in EEN format: YYYYMMDDHHMMSS.NNN. Defaults to 7 days ago
end_timestamp   | string       | End timestamp of query, in EEN format: YYYYMMDDHHMMSS.NNN. Defaults to *now*
group_by        | string, enum | Hour or day indicating how the results should be grouped <br><br>enum: day, hour, minute

> Json Response

```json
{
    "core": [
        [
            "20181002170000.000",
            711610368.0,
            673860608.0,
            21533380.0,
            10299.0,
            10064282.0,
            9903.0
        ],
        [
            "20181002180000.000",
            711610368.0,
            673802922.66666698,
            139693604.0,
            16579176.0,
            30849223.0,
            70446106.0
        ],
        [...],
        [...],
        [...],
        [
            "20181009170000.000",
            711610368.0,
            674052608.0,
            20663486.0,
            8637204.0,
            18879693.0,
            19383808.0
        ]
    ],
    "bandwidth": [
        [
            "20181002180000.000",
            253117.37089200001
        ],
        [
            "20181002220000.000",
            240255.52353499999
        ],
        [...],
        [...],
        [...],
        [
            "20181009150000.000",
            232692.09302299999
        ]
    ],
    "storage": [
        [
            "20181002170000.000",
            21523477
        ],
        [
            "20181002180000.000",
            69247498
        ],
        [...],
        [...],
        [...],
        [
            "20181009170000.000",
            1279678
        ]
    ]
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
core      | array[[BridgeCore](#bridgecore-json-array-elements)]           | Array of core metrics
bandwith  | array[[BridgeBandwidth](#bridgebandwidth-json-array-elements)] | Array of bandwidth metrics
storage   | array[[BridgeStorage](#bridgestorage-json-array-elements)]     | Array of storage metrics

### BridgeCore Json Array Elements

Index     | Data Type | Description
-----     | --------- | -----------
0         | string    | EEN Timestamp: YYYYMMDDHHMMSS.NNN
1         | float     | Average kilobytes on disk
2         | float     | Average days on disk
3         | float     | Bytes stored
4         | float     | Bytes shaped
5         | float     | Bytes streamed
6         | float     | Bytes freed

### BridgeBandwidth Json Array Elements

Index     | Data Type | Description
-----     | --------- | -----------
0         | string    | EEN Timestamp: YYYYMMDDHHMMSS.NNN
1         | float     | Bytes per second

### BridgeStorage Json Array Elements

Index     | Data Type | Description
-----     | --------- | -----------
0         | string    | EEN Timestamp: YYYYMMDDHHMMSS.NNN
1         | float     | Bytes difference

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Metrics not found
200 | Request succeeded
