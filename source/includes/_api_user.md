# User

<!--===================================================================-->
## Overview
<!--===================================================================-->

The user service allows managing users to a degree outlined by the permission level

<!--===================================================================-->
## User Model
<!--===================================================================-->

> User Model

```json
{
    "id": "ca0e1cf2",
    "first_name": "Firstname",
    "last_name": "Lastname",
    "email": "john.doe@fakeemail.com",
    "owner_account_id": "00004206",
    "active_account_id": "00004206",
    "uid": " ",
    "is_superuser": 0,
    "is_account_superuser": 1,
    "is_staff": 0,
    "is_active": 1,
    "is_pending": 0,
    "is_master": 1,
    "is_user_admin": 1,
    "is_layout_admin": 1,
    "is_live_video": 1,
    "is_device_admin": 1,
    "is_export_video": 1,
    "is_recorded_video": 1,
    "is_edit_cameras": 1,
    "is_edit_all_users": 1,
    "is_edit_account": 1,
    "is_system_notifications_disabled": 0,
    "is_edit_ptz_stations": 1,
    "is_view_preview_video": 1,
    "is_edit_camera_on_off": 1,
    "is_edit_camera_less_billing": 1,
    "is_edit_all_and_add": 1,
    "is_edit_sharing": 1,
    "is_mobile_branded": 0,
    "is_edit_admin_users": 1,
    "is_view_contract": 1,
    "is_ptz_live": 1,
    "is_view_audit_trail": 1,
    "is_edit_users": 1,
    "is_edit_motion_areas": 1,
    "is_two_factor_authentication_enabled": 0,
    "user_authenticated_clients": null,
    "account_utc_offset": -21600,
    "account_work_days": "1111100",
    "account_work_hours": ["0800", "1730"],
    "language": "en-us",
    "inactive_session_timeout": 15,
    "street": ["address line 1", "address line 2"],
    "city": "New York",
    "state": "Alaska",
    "country": "US",
    "postal_code": "9980-999",
    "phone": "111111111",
    "mobile_phone": "000000000",
    "utc_offset": -21600,
    "timezone": "US/Pacific",
    "last_login": "20181006173752.672",
    "alternate_email": "alternate.email@fakeemail.com",
    "sms_phone": "222111222",
    "is_sms_include_picture": 0,
    "json": "{}",
    "camera_access": [
        [
            "1005f2ed",
            "r"
        ],
        [
            "100bd708",
            "r"
        ]
    ],
    "layouts": [
        "217f0fd4-450f-11e4-a983-ca8312ea370c"
    ],
    "is_notify_enable": 1,
    "notify_period": [
        "0-0000-2359",
        "1-0000-2359",
        "2-0000-2359",
        "3-0000-2359",
        "4-0000-2359",
        "5-0000-2359",
        "6-0000-2359"
    ],
    "notify_rule": [
        "one-email-0"
    ],
    "is_branded": 1,
    "active_brand_subdomain": "login",
    "account_map_lines": null,
    "access_period": [
        "0-0000-2359",
        "1-0000-2359",
        "2-0000-2359",
        "3-0000-2359",
        "4-0000-2359",
        "5-0000-2359",
        "6-0000-2359"
    ],
    "is_terms_noncompliant": 1
}
```

### User Attributes

Parameter                            | Data Type            | Description
---------                            | ---------            | -----------
id                                   | string               | Unique identifier of the user
first_name                           | string               | First name of the user
last_name                            | string               | Last name of the user
email                                | string               | Email address of the user (must contain only ASCII characters)
owner_account_id                     | string               | Unique identifier of the account that the user belongs to
active_account_id                    | string               | Unique identifier of the user's active account. When switching to a sub-account the 'active_account_id' of that user in their session becomes the unique identifier of the sub-account that was switched into
uid                                  | string               | Identifier of the user (**Internal use only**)
is_superuser                         | int                  | Indicates whether the user is a superuser (1) or not (0). Only superusers can set this (**Internal use only**)
is_account_superuser                 | int                  | Indicates whether the user is an account superuser (1) or not (0)
is_staff                             | int                  | Indicates whether the user is a staff member (1) or not (0) (**Internal use only**)
is_active                            | int                  | Indicates whether the user is active (1) or not (0)
is_pending                           | int                  | Indicates whether the user is pending (1) or not (0)
is_master                            | int                  | Indicates whether the user is in a master account (1) or not (0)
is_user_admin                        | int                  | This is for backwards compatibility **(DEPRECATED)**
is_layout_admin                      | int                  | Indicates whether the user is a layout administrator (1) or not (0)
is_live_video                        | int                  | Indicates whether the user is authorized to access live video (1) or not (0)
is_device_admin                      | int                  | This is for backwards compatibility **(DEPRECATED)**
is_export_video                      | int                  | Indicates whether the user is authorized to export video (1) or not (0)
is_recorded_video                    | int                  | Indicates whether the user is authorized to view recorded video (1) or not (0)
is_edit_cameras                      | int                  | Indicates whether the user is authorized to edit cameras (1) or not (0)
is_edit_all_users                    | int                  | Indicates whether the user is authorized to manage users who are not administrators in the master account (1) or not (0)
is_edit_account                      | int                  | Indicates whether the user is authorized to edit account settings (1) or not (0)
is_system_notifications_disabled     | int                  | It reflects whether the account the user belongs to has system notifications disabled (1) or not (0). If true, then the user will not be able to receive any system alert notifications for the cameras in their account
is_edit_ptz_stations                 | int                  | Indicates whether the user is authorized to edit PTZ stations (1) or not (0)
is_view_preview_video                | int                  | Indicates whether the user is authorized to view preview images from cameras (1) or not (0)
is_edit_camera_on_off                | int                  | Indicates whether the user is authorized to turn cameras on and off (1) or not (0)
is_edit_camera_less_billing          | int                  | Indicates whether the user is authorized to edit all camera settings except retention and full video resolution (1) or not (0)
is_edit_all_and_add                  | int                  | Indicates whether the user is authorized to add/edit/delete bridges and cameras (1) or not (0)
is_edit_sharing                      | int                  | Indicates whether the user is authorized to view/edit 'Sharing' and 'Responders' tabs under account settings (1) or not (0)
is_mobile_branded                    | int                  | Used by mobile devices
is_edit_admin_users                  | int                  | Indicates whether the user is authorized to manage all users in sub-account (1) or not (0)
is_view_contract                     | int                  | Indicates whether the user is authorized to view contracts and replay them (1) or not (0)
is_ptz_live                          | int                  | Indicates whether the user is authorized to control pan, tilt, zoom, and recall stations while viewing preview or live video of PTZ cameras (1) or not (0)
is_view_audit_trail                  | int                  | Indicates whether the user is authorized to view the audit trail feature (1) or not (0)
is_edit_users                        | int                  | Indicates whether the user is authorized to manage users who are not administrators in a sub-account (1) or not (0)
is_edit_motion_areas                 | int                  | Indicates whether the user is authorized to view and edit the 'Motion' tab under camera settings (1) or not (0)
is_two_factor_authentication_enabled | int                  | ???
user_authenticated_clients           | ???                  | ???
account_utc_offset                   | int                  | Signed integer offset in seconds of the timezone from UTC. This is the 'utc_offset' value from the user's associated account model
account_work_days                    | string               | The 'work_days' value from the user's associated account model. Indicates which day is a work day
account_work_hours                   | array[string]        | The 'work_hours' value from the user's associated account model. Indicates work hours for the account
language                             | string               | Language code. The API currently only supports English (en-us) and Japanese (ja) as display languages for the GUI. It accepts any valid language code as input, but it will show English text for the unsupported languages
inactive_session_timeout             | int                  | Maximum time period in seconds without activity before web session expires. Defined in the settings of the account which the user belongs to
street                               | array[string]        | Array of strings containing street addresses ['address line 1', 'address line 2']
city                                 | string               | City
state                                | string               | State/province
country                              | string               | Two letter country code
postal_code                          | string               | Zip/postal code
phone                                | string               | Phone number
mobile_phone                         | string               | Mobile phone number
utc_offset                           | int                  | Signed integer offset in seconds of the timezone from UTC. Automatically generated based on the timezone field
timezone                             | string               | Timezone of the user. Defaults to 'US/Pacific'. Possible values: 'US/Alaska' or 'US/Arizona' or 'US/Central' or 'US/Eastern' or 'US/Hawaii' or 'America/Anchorage' or 'UTC'
last_login                           | string               | EEN timestamp of the last login by the user. Format: YYYYMMDDHHMMSS.NNN
alternate_email                      | string               | Alternate email address
sms_phone                            | string               | Phone number to be used for SMS notifications
is_sms_include_picture               | int                  | Indicates whether the alert notifications should include a picture sent via MMS to the sms_phone number (1) or not (0)
json                                 | string               | Misc settings of the user as a Json string. [UserJson](#userjson-attributes)
camera_access                        | array[array[string]] | Array of arrays, defined on a per device basis. Each sub-array contains two elements. The first field is the device unique identifier and the second field is a string of 1 or more characters indicating permissions of the user <br><br>Example: [‘cafedead’,’RWS’] = user can view, change and delete this device. [‘cafe0001’,’RW’] = user can view this layout and change this device <br><br>Permissions include: 'R' - user has access to view images and video for this camera. 'A' - user is an administrator for this camera. 'S' - user can share this camera in a group share. Only superusers or account superusers can edit this field
layouts                              | array[string]        | List of layout unique identifiers the user has access to
is_notify_enable                     | int                  | Indicates whether notifications are enabled for the user (1) or not (0)
notify_period                        | array[string]        | Time periods during which the user will receive alert notifications. Each element of the array contains three fields separated by dashes. The first field is the day of the week where Monday is 0. The second element is the start time. The third element is the end time. If empty, user will not receive any alert notifications <br><br>All times are expressed in local time and use a 24 hour clock formatted as HHMM
notify_rule                          | array[string]        | Alert notification rules. Each rule contains three fields separated by dashes in the form: Alert_Label-Notification_Method-Delay <br><br>Alert_Label: name defined by the user <br>Notification_Method: email, SMS, or GUI <br>Delay: amount of time in minutes between notifications
is_branded                           | int                  | Indicates whether the user is associated with an account that currently has branding enabled (1) or not (0)
active_brand_subdomain               | string               | If the user is associated with an account that has branding enabled, this will have that brand's subdomain if one exists
account_map_lines                    | json                 | This is used by the front end to overlay lines over a map of the cameras for the account
access_period                        | array[string]        | Contains the time periods during which the user has access to the account. Each element of the array contains three field separated by dashes. The first field is the day of the week where Monday is 0. The second element is the start time. The third element is the end time. If empty, user has no time restrictions for access to the account. All times are expressed in local time and use a 24 hour clock formatted as HHMM
is_terms_noncompliant                | int                  | Indicates whether the terms of service have been accepted by the user (0) or not (1)

### UserJson Attributes

Parameter | Data Type | Description
--------- | --------- | -----------
een       | string    | EEN Object ([UserJsonEEN](#userjsoneen-attributes))

### UserJsonEEN Attributes

Parameter               | Data Type  | Description
---------               | ---------  | -----------
show_AMPM               | boolean    | Indicates whether times should be shown with AM/PM (True) or not (False)
milliseconds_display    | boolean    | Indicates whether times should be shown with milliseconds (True) or not (False)
layout_rotation_seconds | int        | If set, indicates how long to wait between layout changes during auto-rotation. If not set or set to 0, then no auto-rotation will occur
motion_boxes            | boolean    | Indicates whether motion boxes should be shown (True) or not (False)
notify_levels           | array[int] | Array of integers. Indicates what types of alert notification emails will be sent <br><br>Notify level: 1='High', 2='Low', 3='System' <br><br>When creating motion alerts for a camera 'High' or 'Low' can be chosen. If a motion alert is set to 'High' and if the user has chosen to receive 'High' alert notifications, then they will receive them for that motion alert. 'System' are camera status changes (online/offline/off/internet offline, etc.). When a camera changes status, any user who has chosen to receive 'System' alert notifications will get notified of the camera status changes in their account
permissions             | json       | This is for backwards compatibility **(DEPRECATED)**
employee_id             | string     | Identifier which a user with the necessary permissions can set for other users
layouts                 | json       | Json-formatted data keyed by the account unique identifier, where each value is an array of globally unique identifiers of layouts in the account, ordered by how the user wants to see them in their graphical user interface

<!--===================================================================-->
## Permissions
<!--===================================================================-->

There are several user types:

  - superuser (**Internal use only**)
  - staff (**Internal use only**)
  - account superuser
  - regular user

**Account superuser**

The account superuser has a full set of permissions. This user can manage all users in their account and sub-account

<aside class="notice">An indicator of the administrator status is the flag 'is_account_superuser'</aside>

**Regular user**

After being created the regular user has several default permissions : 'is_live_video', 'is_recorded_video', 'is_export_video'

### List of permissions

Required Parameter          | Description
------------------          | -----------
is_superuser                | (**Internal use only**)
is_staff                    | (**Internal use only**)
is_account_superuser        | Highest permission level possible for a user. All permissions are enabled (including the view permission)
is_edit_account             | View and edit all account settings (including categories: Control, Days, Security, Camera, Alerts, Notifications, Privacy, Sharing, and Responders)
is_edit_camera_on_off       | Ability to turn cameras on and off. If this is the only camera permission granted all others are hidden
is_edit_cameras             | Allows editing all camera settings (does not allow adding or deleting cameras). View previews is enabled automatically with this permission
is_edit_motion_areas        | Enables the 'Motion' tab under camera settings. View previews and view recorded video is enabled automatically with this permission
is_edit_ptz_stations        | Enables the 'PTZ' tab under camera settings. Set PTZ mode and add/edit/delete stations. View previews is enabled automatically with this permission
is_edit_sharing             | Enables the 'Sharing' and 'Responders' tabs under Account Settings (This setting is not required if 'is_edit_account' is enabled)
is_edit_users               | Enables the management of non-administrator users in a sub-account (add/delete/modify users). Gives the ability to grant access to cameras and layouts
is_export_video             | Enables to download preview and full resolution video. View previews is enabled automatically with this permission
is_edit_all_and_add         | Enables the management of bridges and cameras (add/edit/delete). Refers to devices only. View previews is enabled automatically with this permission
is_edit_camera_less_billing | Allows editing all camera settings except retention and full video resolution (no ability to add/delete). View Previews is enabled automatically with this permission
is_layout_admin             | Enables the management of layouts (any user can create/edit/delete their own layouts. User layouts are always visible to admin users)
is_live_video               | Allows viewing full resolution video live from cameras. View previews is enabled automatically with this permission
is_ptz_live                 | Enables the control over pan, tilt, zoom, and recall stations while viewing preview or live video of PTZ cameras. View previews is enabled automatically with this permission
is_recorded_video           | View history browser and archived video from cameras. View previews is enabled automatically with this permission
is_view_preview_video       | Enables the preview of images from cameras
is_edit_admin_users         | Enables the management of all users in a sub-account (add/delete/modify all users including administrators. Only available to Master Users)
is_edit_all_users           | Enables the management of master users who are not administrators (add/delete/modify master account users) <br><br>Ability to grant access to sub-accounts. No user permissions are granted in sub-accounts. Only available to master account users
is_device_admin             | This is for backwards compatibility **(DEPRECATED)**
is_user_admin               | This is for backwards compatibility **(DEPRECATED)**


### User Permission Matrix

The table below shows which user management actions a user can execute depending on the account they belong to and which permission flags they have enabled

<table style="margin-top:30px;">
  <tr>
    <td style="background-color:#EAF2F6;" rowspan="3" colspan="3" ></td>
    <th colspan="4" style="text-align:center; border:solid 1px;background-color:#F3F7FA;">Who I am</td>
  </tr>
  <tr>
    <th colspan="2" style="text-align:center;border:solid 1px;background-color:#F3F7FA;">In Master Account</td>
    <th colspan="2" style="text-align:center;border:solid 1px;background-color:#F3F7FA;">In Child Account</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Account Superuser (ASU)</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Regular User (RU)</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Account Superuser (ASU)</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Regular User (RU)</td>
  </tr>
  <tr>
    <th style="vertical-align:middle; border:solid 1px;background-color:#F3F7FA;" rowspan="12">What I can do</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;" rowspan="3">In own account</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To ASU</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To RU</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete when is_edit_all_users == True</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete when is_edit_users == True</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Get list of users</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">yes</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">no</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">yes</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">no</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;" rowspan="3">In parent account</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To ASU</td>
    <td colspan="2" rowspan="3" style="background-color:#EAF2F6;text-align:center;border:solid 1px;vertical-align:middle;">Master Accounts have no parents</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To RU</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Get list of users</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">no</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">no</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;" rowspan="3">In child account</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To ASU</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete when is_edit_admin_users == True</td>
    <td rowspan="3" colspan="2" style="background-color:#EAF2F6;text-align:center;border:solid 1px;vertical-align:middle;">Child accounts have no children</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To RU</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete when is_edit_users==True or is_edit_admin_users==True</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Get list of users</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">yes</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">yes when is_edit_admin_users == True</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;" rowspan="3">In sibling account</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To ASU</td>
    <td rowspan="3" colspan="2" style="background-color:#EAF2F6;text-align:center;border:solid 1px;vertical-align:middle;">Master Accounts have no siblings</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To RU</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Get list of users</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">no</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">no</td>
  </tr>
</table>

<!--===================================================================-->
## Get User
<!--===================================================================-->

> Request

```shell
curl -G https://login.eagleeyenetworks.com/g/user -d "A=[AUTH_KEY]"

or

curl --cookie "auth_key=[AUTH_KEY]" -G https://login.eagleeyenetworks.com/g/user -d id=[USER_ID]
```

Returns a User object by id

<aside class="notice">If no unique identifier is passed in the request, then the response will return data of the current user</aside>

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/user`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
id        | string    | Unique identifier of the user | false

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| No user matching the unique identifier was found
200	| Request succeeded

<!--===================================================================-->
## Create User
<!--===================================================================-->

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X PUT -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/user -d '{"first_name": "[FIRST_NAME]", "last_name": "[LAST_NAME]", "email": "[EMAIL]"}'
```

Creates a new user. After being created the user is in the pending state ('is_pending':1, 'is_active':0). The user creation email will be sent to the email address passed in the request. Then the user will be able to enter a password (In this step they may need to accept [Terms of Service](#terms-of-service)). After this operation the user will be active ('is_pending':0, 'is_active':1)

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/user`

Parameter      | Data Type | Description | Is Required
---------      | --------- | ----------- | -----------
**first_name** | string    | The first name of the user | true
**last_name**  | string    | The last name of the user | true
**email**      | string    | The email address of the user | true
sms_phone      | string    | Phone number to be used for SMS notifications

<aside class="notice">When TFA authentication is used and authorization code delivery via SMS is set, the user's 'sms_phone' number must be defined</aside>

> Json Response

```json
{
    "id": "ca0ffa8c"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | Unique identifier of the user

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
409	| The email address is currently already in use
200	| Request succeeded

<!--===================================================================-->
## Update User
<!--===================================================================-->

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X POST -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/user -d '{"id": "[USER_ID]", "first_name": "[FIRST_NAME]"}'
```

Updates a user

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/user`

Parameter                   | Data Type     | Description                             | Is Required
---------                   | ---------     | -----------                             | -----------
**id**                      | string        | Unique identifier of the user           | true
first_name                  | string        | First name of the user
last_name                   | string        | Last name of the user
email                       | string        | Email address of the user (email must only contain ASCII characters)
phone                       | string        | Phone number
mobile_phone                | string        | Mobile phone number
uid                         | string        | Identifier of the user. Only superusers can set this (**Internal use only**)
street                      | array[string] | Array of strings containing street addresses ['address line 1', 'address line 2']
city                        | string        | City
state                       | string        | State/province
country                     | string        | Two letter country code
postal_code                 | string        | Zip/postal code
json                        | string        | Json-formatted data representing various user settings. [UserJson](#userjson-attributes)
is_staff                    | int           | Indicates whether the user is a staff member (1) or not (0). Only superusers can set this (**Internal use only**)
is_superuser                | int           | Indicates whether the user is a superuser (1) or not (0). Only superusers can set this (**Internal use only**)
is_account_superuser        | int           | Indicates whether the user is an account superuser (1) or not (0). Only superusers and account superusers can set this
is_layout_admin             | int           | Indicates whether the user is a layout administrator (1) or not (0)
is_device_admin             | int           | This is for backwards compatibility **(DEPRECATED)**
is_user_admin               | int           | This is for backwards compatibility **(DEPRECATED)**
is_live_video               | int           | Indicates whether the user is authorized to access live video (1) or not (0)
is_export_video             | int           | Indicates whether the user is authorized to export video (1) or not (0)
is_recorded_video           | int           | Indicates whether the user is authorized to view recorded video (1) or not (0)
is_edit_cameras             | int           | Indicates whether the user is authorized to edit cameras (1) or not (0)
is_edit_all_users           | int           | Indicates whether the user is authorized to manage users who are not administrators in master account (1) or not (0)
is_edit_account             | int           | Indicates whether the user is authorized to edit account settings (1) or not (0)
is_edit_ptz_stations        | int           | Indicates whether the user is authorized to edit PTZ stations (1) or not (0)
is_view_preview_video       | int           | Indicates whether the user is authorized to view preview images from cameras (1) or not (0)
is_edit_camera_on_off       | int           | Indicates whether the user is authorized to turn cameras on and off (1) or not (0)
is_edit_camera_less_billing | int           | Indicates whether the user is authorized to edit all camera settings except retention and full video resolution (1) or not (0)
is_edit_all_and_add         | int           | Indicates whether the user is authorized to add/edit/delete bridges and cameras (1) or not (0)
is_edit_sharing             | int           | Indicates whether the user is authorized to view/edit 'Sharing' and 'Responders' tabs under account settings (1) or not (0)
is_ptz_live                 | int           | Indicates whether the user is authorized to control pan, tilt, zoom, and recall stations while viewing preview or live video of PTZ cameras (1) or not (0)
is_edit_users               | int           | Indicates whether the user is authorized to manage users who are not administrators in a sub-account (1) or not (0)
is_edit_admin_users         | int           | Indicates whether the user is authorized to manage all users in sub-account (1) or not (0)
is_edit_motion_areas        | int           | Indicates whether the user is authorized to view and edit the 'Motion' tab under camera settings (1) or not (0)
camera_access               | array         | Array of arrays, defined on a per device basis. Each sub-array contains two elements. The first field is the device unique identifier and the second field is a string of 1 or more characters indicating permissions of the user <br><br>Example: [‘cafedead’,’RWS’] = user can view, change and delete this device. [‘cafe0001’,’RW’] = user can view this layout and change this device <br><br>Permissions include: 'R' - user has access to view images and video for this camera. 'A' - user is an administrator for this camera. 'S' - user can share this camera in a group share. Only superusers or account superusers can edit this field
sms_phone                   | string        | Phone number to be used for SMS notifications
is_sms_include_picture      | int           | Indicates whether the alert notifications should include a picture sent via MMS to the sms_phone number (1) or not (0)
alternate_email             | string        | Alternate email address
timezone                    | string        | Timezone of the user. Defaults to 'US/Pacific'. Possible values: 'US/Alaska' or 'US/Arizona' or 'US/Central' or 'US/Eastern' or 'US/Hawaii' or 'America/Anchorage' or 'UTC'
access_period               | array         | Contains the time periods during which the user has access to the account. Each element of the array contains three field separated by dashes. The first field is the day of the week where Monday is 0. The second element is the start time. The third element is the end time. If empty, user has no time restrictions for access to the account. All times are expressed in local time and use a 24 hour clock formatted as HHMM
notify_period               | array         | Time periods during which the user will receive alert notifications. Each element of the array contains three fields separated by dashes. The first field is the day of the week where Monday is 0. The second element is the start time. The third element is the end time. If empty, user will not receive any alert notifications <br><br>All times are expressed in local time and use a 24 hour clock formatted as HHMM
is_notify_enable            | int           | Indicates whether notifications are enabled for the user (1) or not (0)
notify_rule                 | array         | Alert notification rules. Each rule contains three fields separated by dashes in the form: Alert_Label-Notification_Method-Delay <br><br>Alert_Label: name defined by the user <br>Notification_Method: email, SMS, or GUI <br>Delay: amount of time in minutes between notifications
language                    | string        | Language code. The API currently only supports English (en-us) and Japanese (ja) as display languages for the GUI. It accepts any valid language code as input, but it will show English text for the unsupported languages
is_view_contract            | int           | Indicates whether the user is authorized to view contracts and replay them (1) or not (0)

> Json Response

```json
{
    "id": "ca0ffa8c"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | Unique identifier of the user

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| No user matching the unique identifier was found
200	| Request succeeded

<!--===================================================================-->
## Delete User
<!--===================================================================-->

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X DELETE -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/user -d "id=[USER_ID]" -G
```

Deletes a user

### HTTP Request

`DELETE https://login.eagleeyenetworks.com/g/user`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**id**    | string    | Unique identifier of the user | true

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| No user matching the unique identifier was found
200	| Request succeeded

<!--===================================================================-->
## Get List of Users
<!--===================================================================-->

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" --request GET https://login.eagleeyenetworks.com/g/user/list
```

Returns array of arrays with each sub-array representing a user available to the current user

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/user/list`

> Json Response

```json
[
    [
        "ca0555c7",
        "Katherine",
        "Xiao",
        "katherine.xiao@fakeemail.com",
        [
            "export_video",
            "recorded_video",
            "live_video",
            "device_admin",
            "layout_admin",
            "account_superuser",
            "user_admin",
            "active"
        ],
        "20180929154619.000"
    ],
    [
        "ca00783b",
        "George",
        "Adams",
        "george.adams@fakeemail.com",
        [
            "export_video",
            "recorded_video",
            "live_video",
            "active"
        ],
        "20180716205645.000"
    ],
    [...],
    [...],
    [...]
]
```

### HTTP Response (Array Attributes)

Array Index | Attribute   | Data Type     | Description
---------   | ----------- | ---------     | -----------
0           | id          | string        | Unique identifier of the user
1           | first_name  | string        | First name of the user
2           | last_name   | string        | Last name of the user
3           | email       | string        | Email address of the user
4           | permissions | array[string] | List of permissions of the user
5           | last_login  | string        | EEN timestamp of the last login by the user. Format: YYYYMMDDHHMMSS.NNN

<aside class="success">Please note that the model definition has property keys, but that's only for reference purposes since it's just a standard array</aside>

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded
