# Layout

<!--===================================================================-->
## Overview
<!--===================================================================-->

Layouts contain panes, which is a group of cameras arranged for viewing on screen. Layouts are associated with an account and account users are granted view/write/share permissions for the layout. Users who would otherwise have no access to a camera gain access to all cameras included in layouts shared with them

The ordering of the panes is determined by the order of the array of LayoutJsonPane returned by the API. Each pane will have a size of 1, 2, or 3. A size of 1 is the smallest, and fills up 1x1 on the layout grid. A size of 3 is the largest and fills up 3x3 on the layout grid. If the grid does not have enough columns to fit the pane, then the size of the pane is decreased until it is able to fit on the grid

Rendered Layouts on Web and Mobile:
<img src="images/api_layout/example_1.png" alt="Example 1" width="1000">
<img src="images/api_layout/example_2.png" alt="Example 2" width="400">

<!--===================================================================-->
## Layout Model
<!--===================================================================-->

> Layout Model

```json
{
    "id": "0b58ec7a-61e4-11e3-8f7d-523445989f37",
    "name": "Everything",
    "types": [
        "mobile"
    ],
    "permissions": "SWRD",
    "current_recording_key": null,
    "shares": [
        [
            "ca01ce6d",
            "SWRD"
        ],
        [
            "ca0c7d2c",
            "R"
        ],
        [...],
        [...],
        [...],
        [
            "ca05e8c2",
            "R"
        ]
    ],
    "configuration": {
        "panes": [
            {
                "cameras": [
                    "100ace90"
                ],
                "type": "preview",
                "pane_id": 0,
                "name": "",
                "size": 1
            },
            {
                "cameras": [
                    "10045dd6"
                ],
                "type": "preview",
                "pane_id": 0,
                "name": "",
                "size": 1
            },
            {...},
            {...},
            {...},
            {
                "cameras": [
                    "100891b7"
                ],
                "type": "preview",
                "pane_id": 0,
                "name": "",
                "size": 1
            }
        ],
        "settings": {
            "camera_row_limit": 3,
            "camera_name": true,
            "camera_aspect_ratio": 0.5625,
            "camera_border": false
        }
    }
}
```

### Layout (Attributes)

Property              | Data Type            | Description                                                                                          | Editable    | Required
--------              | ---------            | -----------                                                                                          |:-----------:| --------
**id**                | string               | Unique identifier for the layout                                                                     | **&cross;** | **<sub><form action="#get-layout"><button>GET</button></form></sub>** <br>**<sub><form action="#create-layout"><button>PUT</button></form></sub>** <br>**<sub><form action="#update-layout"><button>POST</button></form></sub>** <br>**<sub><form action="#delete-layout"><button>DELETE</button></form></sub>**
**name**              | string               | Name of the layout                                                                                   | **&check;** | **<sub><form action="#create-layout"><button>PUT</button></form></sub>**
**types**             | array[string]        | Specifies target(s) for layout. Multiple values are allowed                                          | **&check;** | **<sub><form action="#create-layout"><button>PUT</button></form></sub>**
permissions           | string               | String of zero or more characters. Each character defines a permission <br><br>Permissions include: <br>`'R'` - user can view this layout <br>`'W'` - user can modify this layout <br>`'D'` - user can delete this layout <br>`'S'` - user can share this layout                  | **&cross;** |
current_recording_key | string               | String key representing a recording currently being made with the cameras in the layout, which was initiated using the action/recordnow service                                                                                                                            | **&cross;** |
shares                | array[array[string]] | Array of arrays, one per user account for whom sharing is enabled for this layout. Each string contains two field separated by comma. The first field is a user aid and the second field are permissions for the user. `'account'` specifies that the layout is shared with all users of the account. Second field contains permissions for users in the account <br><br>Example: <br>[`'1005f2ed'`,`'RWDS'`] = user can view, change, delete or share this layout <br>[`'1005f2ed'`,`'RW'`] = user can view this layout and change this layout <br>[`'1005f2ed'`, `'R'`] = All users of the account can view this layout <br><br>Permissions for the user issuing the /layout GET are not included in this array                                                                                                          | **&check;** |
[configuration](#layout-configuration) | json             | Json object of layout configuration                                                     | **&check;** |

### Layout - configuration

Parameter | Data Type | Description
--------- | --------- | -----------
[panes](#layout-configuration-panes) | json      | Json object of layout panes
[settings](#layout-configuration-settings) | json      | Json object of layout settings

### Layout - configuration - panes

Parameter | Data Type     | Description
--------- | ---------     | -----------
name      | string        | Layout pane name
type      | string        | Layout types: <br>`'preview'` - shows live preview images form cameras <br>`'carousel'` - rotates between preview images, IDs of cameras need to be included in the cameras array along with an integer in the delay array. The delay is an integer value of milliseconds as too how long the Camera will be displayed before switching to the next Camera. A `'carousel'` with only one camera is the same as preview <br>`'click'` - respond to click for other cameras in layout <br>`'motion'` - respond to motion for other cameras in layout <br>`'map'` - a static map with camera icons located on it <br>`'url'` - displays the contents of the url in the pane as a frame
pane_id   | int           | ID given to pane when created from the Layout Manager
size      | int           | Size of displayed image: <br>`1` - small <br>`2` - medium <br>`3` - large
cameras   | array[string] | Array of camera IDs (For `'carousel'`, cycle through the camera IDs with the delay setting in the corresponding `'delay'` property)

### Layout - configuration - settings

Parameter           | Data Type | Description
---------           | --------- | -----------
camera_border       | boolean   | Show camera pane borders
camera_name         | boolean   | Show camera name
camera_aspect_ratio | float     | Aspect ratio of images: <br>`0.5625` - 16x9 <br>`0.75` - 4x3
camera_row_limit    | int       | Max number of cameras to show per row: <br>`3` - 3 cameras per row <br>`4` - 4 cameras per row  <br>`5` - 5 cameras per row

<!--===================================================================-->
## Get Layout
<!--===================================================================-->

Returns a Layout object by ID

> Request

```shell
curl -G https://login.eagleeyenetworks.com/g/layout -d "A=[AUTH_KEY]&id=[LAYOUT_ID]"
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/layout`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**id**    | string    | Layout ID   | true

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Create Layout
<!--===================================================================-->

Create a new Layout

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X PUT -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/layout -d '{"name": "[NAME]", "json":"{\"panes\":[ {} ] }", "types":[""]}'
```

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/layout`

Parameter     | Data Type     | Description | Is Required
---------     | ---------     | ----------- | -----------
**name**      | string        | Layout name | true
**types**     | array[string] | Specifies target(s) for layout. Multiple values are allowed | true
configuration | json          | Json object of layout configuration
shares        | array[array]  | Array of arrays, one per user account for whom sharing is enabled for this layout. Each string contains two field separated by comma. The first field is a user aid and the second field are permissions for the user. `'account'` specifies that the layout is shared with all users of the account. Second field contains permissions for users in the account <br><br>Example: <br>[`'1005f2ed'`,`'RWDS'`] = user can view, change, delete or share this layout <br>[`'1005f2ed'`,`'RW'`] = user can view this layout and change this layout <br>[`'1005f2ed'`, `'R'`] = All users of the account can view this layout <br><br>Permissions for the user issuing the /layout GET are not included in this array

> Json Response

```json
{
    "id": "80ca9ee0-4f28-11e4-81bf-523445989f37"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | Unique identifier of the layout

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Update Layout
<!--===================================================================-->

Update Layout information

> Request TODO

```shell
```

### HTTP Request

`POST https://login/eagleeyenetworks.com/g/layout`

Parameter     | Data Type     | Description | Is Required
---------     | ---------     | ----------- | -----------
**id**        | string        | Layout name | true
**name**      | string        | Unique identifier of layout | true
**types**     | array[string] | Specifies target(s) for layout. Multiple values are allowed | true
configuration | json          | Json object of layout configuration
shares        | array[array]  | Array of arrays, one per user account for whom sharing is enabled for this layout. Each string contains two field separated by comma. The first field is a user aid and the second field are permissions for the user. `'account'` specifies that the layout is shared with all users of the account. Second field contains permissions for users in the account <br><br>Example: <br>[`'1005f2ed'`,`'RWDS'`] = user can view, change, delete or share this layout <br>[`'1005f2ed'`,`'RW'`] = user can view this layout and change this layout <br>[`'1005f2ed'`, `'R'`] = All users of the account can view this layout <br><br>Permissions for the user issuing the /layout GET are not included in this array

> Json Response

```json
{
    "id": "80ca9ee0-4f28-11e4-81bf-523445989f37"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | Unique identifier of the layout

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Delete Layout
<!--===================================================================-->

Delete a Layout

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X DELETE -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/layout -d "id=[LAYOUT_ID]" -G
```

### HTTP Request

`DELETE https://login.eagleeyenetworks.com/g/layout`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**id**    | string    | Layout ID   | true

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Layout matching the ID was not found
200	| Request succeeded

<!--===================================================================-->
## Get List of Layouts
<!--===================================================================-->

Returns an array of arrays with each sub-array representing a Layout available to the user

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" --request GET https://login.eagleeyenetworks.com/g/layout/list
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/layout/list`

> Json Response

```json
[
    [
        "0b58ec7a-61e4-11e3-8f7d-523445989f37",
        "Everything",
        [
            "mobile"
        ],
        "SWRD"
    ],
    [
        "75c03026-719a-11e3-afba-ca8312ea370c",
        "Glenn",
        [
            "mobile"
        ],
        "SWRD"
    ],
    [...],
    [...],
    [...]
]
```

### HTTP Response (Array Attributes)

Array Index | Attribute   | Data Type     | Description
----------- | ---------   | ---------     | -----------
0           | id          | string        | Unique identifier for the layout
1           | name        | string        | Name of the layout
2           | types       | array[string] | Array of types defined for the layout. This attribute has not yet been implemented
3           | permissions | string        | String of zero or more characters. Each character defines a permission <br><br>Permissions include: <br>`'R'` - user can view this layout <br>`'W'` - user can modify this layout <br>`'D'` - user can delete this layout <br>`'S'` - user can share this layout

<aside class="success">Please note that the model definition has property keys, but that's only for reference purposes since it's just a standard array</aside>

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded
