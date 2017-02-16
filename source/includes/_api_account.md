# Account

<!--===================================================================-->
## Overview

The account service allows managing accounts by superusers and account superusers

<!--===================================================================-->
## Account Model

> Account Model

```json
{
    "is_master_video_disabled_allowed": 1,
    "is_inactive": 0,
    "is_suspended": 0,
    "brand_name": null,
    "alert_mode": [
        "default",
        "Weekend"
    ],
    "is_master_video_disabled": 0,
    "contact_state": null,
    "first_responders": [
        [
            "mark@responders.com",
            "Mark",
            "O'Malley",
            "Responders",
            "No Account"
        ],
        [
            "jeff@noaccount.com",
            "Jeff",
            "O'unverfied",
            "Unverfied Organization",
            "Fake Sponder"
        ],
        ...
    ],
    "contact_first_name": "Willem",
    "is_disable_all_settings": 0,
    "timezone": "US/Pacific",
    "id": "11111111",
    "contact_country": "US",
    "is_system_notifications_disabled": 0,
    "camera_shares": [
        [
            "10101010",
            "share@email.com",
            "hasno@account.com,No Account"
            ...
        ],
        ...
    ],
    "owner_account_id": "1010101b",
    "product_edition": null,
    "cc_info": [
        {
            "city": "",
            "name": "",
            "default": "",
            "street1": "",
            "street2": "",
            "number": "",
            "state": "",
            "tag": "",
            "postal_code": "",
            "expire": "",
            "country": "US",
            "type": ""
        }
    ],
    "brand_saml_publickey_cert": null,
    "brand_support_email": null,
    "is_billing_disabled": 0,
    "is_advanced_disabled": 0,
    "inactive_session_timeout": 720,
    "brand_logo_large": null,
    "brand_corp_url": null,
    "responder_active": true,
    "contact_street": [],
    "is_system_notification_images_enabled": 1,
    "is_custom_brand_allowed": 0,
    "holiday": [
        "20130101",
        "20130527",
        "20130704",
        "20130902",
        "20131128",
        "20131225"
    ],
    "is_rtsp_cameras_enabled": 0,
    "brand_saml_nameid_path": null,
    "is_contract_recording": 0,
    "utc_offset": -28800,
    "session_duration": 480,
    "is_custom_brand": 0,
    "contact_postal_code": null,
    "brand_logo_small": null,
    "is_active": 1,
    "work_days": "1111111",
    "is_add_delete_disabled": 0,
    "is_master": 0,
    "contact_email": "support@eagleeyenetworks.com",
    "responder_cameras": [
        "1010fake",
        "not1c4mr"
    ],
    "brand_support_phone": null,
    "map_lines": null,
    "contact_mobile_phone": null,
    "work_hours": [
        "0800",
        "1730"
    ],
    "login_attempt_limit": null,
    "default_cluster": "c9000",
    "customer_id": "1234",
    "name": "Account Name",
    "contact_city": null,
    "default_camera_passwords": "pwordpword",
    "contact_phone": null,
    "access_restriction": [
        "enable_mobile"
    ],
    "active_alert_mode": "default",
    "allowable_ip_address_range": [],
    "contact_last_name": "Dafoe",
    "contact_utc_offset": null,
    "camera_quantity": null,
    "brand_subdomain": "c9000"
}
```
<!--Need to update the recording and search sections-->
### Account Attributes

Parameter                             | Data Type            | Description                                                                                      | Editable | Required
---------                             | ---------            | -----------                                                                                      | -------- | --------
id 						                        | string 		           | Unique identifier of the account                                                                 | false    | GET, POST, DELETE
name 					                        | string 		           | Name of the account                                                                              | true     | PUT
owner_account_id 		                  | string 		           | Id of the parent account. Defaults to the account of the creating user                           | false    |
contact_first_name 		                | string 		           | First name of primary contact for account                                                        | true     | PUT
contact_last_name  		                | string 		           | Last name of primary contact for account                                                         | true     | PUT
contact_email 			                  | string 		           | Email of primary contact for account                                                             | true     |
contact_street 			                  | array[string]        | Array of strings containing street addresses of the primary contact for account [address line 1, address line 2]                                                                                                                                                              | true     |
contact_city 			                    | string 		           | City of primary contact for account                                                              | true     |
contact_state 			                  | string 		           | State/province of primary contact for account                                                    | true     |
contact_postal_code 	                | string 		           | Zip/postal code of primary contact for account                                                   | true     |
contact_country 		                  | string 		           | Country of primary contact for account                                                           | true     |
contact_phone                         | string               | Phone number of primary contact for account                                                      | true     |
contact_mobile_phone                  | string               | Mobile phone number of primary contact for account                                               | true     |
timezone 				                      | string               | Timezone of the account. Defaults to 'US/Pacific'. Possible values: 'US/Alaska' or 'US/Arizona' or 'US/Central' or 'US/Eastern' or 'US/Hawaii' or 'America/Anchorage' or 'UTC'                                                                                                     | true     |
status					                      | array[string]        | Account status. This can only be edited by superusers and account superusers of the parent/owner account. Values: 'active', 'inactive', 'pending_validation', 'suspended'. 'active' mean account is in a normal working state. 'Inactive' means logins are not allowed. 'Suspended' means the account is effectively no longer operational ('pending_validation' is the default state after first creation, before the user has validated the account)                                  | true     |
utc_offset 				                    | int 			           | Signed integer offset in seconds of the timezone from UTC. Automatically generated based on the timezone field                                                                                                                                                           | false    |
access_restriction 		                | array[string]        | Array of strings containing access restrictions. Possible values: 'enable_mobile' = If present this account has access to mobile clients. 'enable_ip_restrictions' = if present, and if 'allowable_ip_address_range' has been specified, limits logins to the address ranges specified    | false    |
allowable_ip_address_range            | array[string]        | Each entry in the array specifies one address range. Entries use the ‘/’ format. For example, to limit access to 192.168.123.0-192.168.123.255, the entry would be 192.168.123.0/24. If no entries are present, 0.0.0.0/0 is implied                                             | false    |
session_duration 		                  | int 			           | Session duration in minutes. Session duration of 0 means 'stay logged in forever'                | true     |
holiday 				                      | array[string]        | Array of strings containing dates during which holidays are observed. Format for dates is YYYYMMDD                                                                                                                                                        | true     |
work_days 				                    | string 		           | String of length 7. Each position in the string corresponds to a day of the week. Monday is position 0, Tuesday is position 1, etc. Each character in the string can have a value of 1 or 0. 1 means that this day is a work day                                                               | true     |
work_hours 				                    | array[string]        | Two entries. Each entry containing a time expressed in local time. The first entry in the array is the work day start time. The second entry in the array is the stop time. Times are represented using a 24 hour clock and are formatted as HHMM. For example, 8AM would be 0800 and 5PM would be 1700                                                                                                                                                            | true     |
alert_mode 				                    | array[string]        | Array of strings containing possible alert modes as defined for this account. Accepts an array of any number of strings of varying length. This controls what values are able to be chosen for the 'active_alert_mode field'                                                               | true     |
active_alert_mode 		                | string               | A string chosen from values in the account 'alert_mode' array. Must be blank or one of the values defined in the alert_mode array. This is used to determine when to send motion alert notifications (defined by camera settings in the device model). If a motion alert is defined with an alert mode from one of the strings in the account 'alert_mode' array, then the notifications triggered from that motion alert will only be sent when the account 'active_alert_mode' is also set to that same alert mode string defined for that motion alert                                                                                                                            | true     |
default_camera_passwords              | string               | Comma-delimited string of default camera passwords                                               | true     |
camera_shares 			                  | array[array[string]] | Array of arrays, with each sub array representing a camera to be shared to 1 or more recipients. First element of sub array is action, with 'm' for add/update. Second element of sub array is camera id. Third element of sub array is a string containing 1 or multiple recipients. Each recipient is a string value of 'email,account', but only applies to the 'm' action. Example: [['m', '12345678', 'joe@em.com,His account', joe2@dd.com,That account']]                          | true     |
is_revoke_admins		                  | int      		         | Indicates whether to revoke all admin permissions for the users in the account (1) or not (0). This field doesn't save anything on the account itself. It will revoke admin privileges of any admins in the account                                                                    | true     |
is_master 				                    | int 			           | Indicates whether the account is a master account (1) or not (0)                                 | false    |
is_active 				                    | int 			           | Indicates whether the account is active (1) or not (0)                                           | false    |
is_inactive 			                    | int 			           | Indicates whether the account is inactive (1) or not (0)                                         | true     |
is_suspended 			                    | int 		             | Indicates whether the account is suspended (1) or not (0)                                        | true     |
product_edition 		                  | string 		           | Product edition the account is using                                                             | false    |
camera_quantity 		                  | int 			           | Total number of cameras the account is allowed to use                                            | false    |
is_custom_brand_allowed               | int 			           | Indicates whether the account is allowed to have branding (1) or not (0)                         | true     |
is_custom_brand 		                  | int 			           | Indicates whether the account has branding enabled (1) or not (0)                                | true     |
brand_logo_small 		                  | string 		           | Base64 encoded image for the branded small logo (PNG, 160x52, transparent background)            | true     |
brand_logo_large 		                  | string 		           | Base64 encoded image for the branded large logo (PNG, 460x184, white background)                 | true     |
brand_subdomain 		                  | string 		           | Sub domain for the branded url                                                                   | true     |
brand_corp_url 			                  | string 		           | Corporate website url                                                                            | true     |
brand_name 				                    | string 		           | Branded company name                                                                             | true     |
brand_saml_publickey_cert             | string               | Public certificate which Eagle Eye Networks will use to decrypt the SAML for SSO                 | true     |
brand_saml_nameid_path                | string               | The path within the SAML xml to find the users email address                                     | true     |
is_without_initial_user               | string               | Indicates whether to create the new account without an initial user (1) or not (0). Defaults to 0, meaning an initial user with 'is_account_superuser=1' will be created using the arguments 'contact_first_name/contact_last_name/contact_email' specified upon account creation          | true     |
customer_id                           | string               | Arbitrary id assigned to a sub-account by a master account                                       | true     |
is_master_video_disabled_allowed      | int                  | Indicates whether a sub-account can block video access to reseller (1) or not (0)                | true     |
is_master_video_disabled              | int                  | Indicates whether video access is blocked to reseller (1) or not (0)                             | true     |
is_contract_recording                 | int                  | Indicates whether the account is of type contract_recording. Controls whether contract recording features are enabled for the users in this account on the front-end GUI (1) or not (0)                                                                                                       | true     |
is_advanced_disabled                  | int                  | Indicates whether the reseller has disabled advanced functionality (1) or not (0) If this is set for a sub-account, the users in the sub-account cannot change any settings related to bandwidth, billing (retention and resolution) and certain account settings.  Master users switched in still can modify these things if their permissions allow it                                                                                                                                   | true     |
is_billing_disabled                   | int                  | Indicates whether the reseller has disabled editing settings in a sub-account that affect billing (1) or not (0). This controls whether users can change camera resolution/retention, add/delete cameras, etc                                                                          | true     |
is_add_delete_disabled                | int                  | Indicates whether the reseller has disabled adding or deleting devices (1) or not (0)            | true     |
is_disable_all_settings               | int                  | Indicates whether the reseller has disabled all device and most account settings (1) or not (0). Does not affect editing users, layouts, or sharing                                                                                                                                      | true     |
first_responders                      | array[array[string]] | Array of strings [['responder email', 'responder first name', 'responder last name', 'responder organization', 'responder account']]. Accounts can identify a list of email accounts that will serve as emergency responders.  Emergency responders get access to the identified cameras when an emergency is triggered by setting 'responder_active'                                                                                                                                   | true     |
responder_active                      | ???                  | Indicates whether the list of responder cameras can be seen by the list defined under 'first_responders'. Until this flag is set, responders cannot see the video                                                                                                                            | true     |
responder_cameras                     | array[string]        | Array of camera esns that are shared to first responders                                         | true     |
inactive_session_timeout              | int                  | Maximum time period in seconds without activity before web session expires                       | true     |
login_attempt_limit                   | int                  | Maximum incorrect login attempts before the user account access becomes locked                   | true     |
is_rtsp_cameras_enabled               | int                  | Indicates whether the account can have cameras attached over RTSP (instead of ONVIF) (1) or not (0)                                                                                                                                                             | true     |
brand_support_phone                   | string               | Branded support phone number                                                                     | true     |
default_cluster                       | string               | Indicates the data center cluster the account is assigned to                                     | true     |
is_system_notification_images_enabled | int                  | Indicates whether email notifications about online/offlice status should contain images from those cameras (1) or not (0)                                                                                                                                                             | true     |
contact_utc_offset                    | int                  | This field is deprecated and not used                                                            | true     |


<!--===================================================================-->
## Get Account

> Request

```shell
curl -G https://login.eagleeyenetworks.com/g/account -d "id=[ID]&A=[AUTH_KEY]"
```

Return an Account object by id

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account`

Parameter 	| Data Type   | Description | Is Required
--------- 	| ---------   | ----------- | -----------
**id**  	  | string      | Account id 	| true

### Error Status Codes

HTTP Status Code    | Description
----------------    | -----------
200	| Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Account not found with the supplied ID

<!--===================================================================-->
## Create Account

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X PUT -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/account -d '{"name": "[NAME]", "contact_first_name": "[CONTACT_FIRST_NAME]", "contact_last_name": "[CONTACT_LAST_NAME]", "contact_email": "[CONTACT_EMAIL]"}'
```

> Json Response

```json
{
    "id": "1234abcd"
}
```

Create a new Account

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/account`

Parameter 				                    | Data Type     | Description 	                                                                                                     | Is Required
--------- 				                    | --------- 	  | ----------- 	                                                                                                     | -----------
**name**  				                    | string  		  | Name of the account	                                                                                               | true
owner_account_id  		                | string      	| Id of the parent account. Defaults to the account of the creating user
**contact_first_name**	              | string      	| First name of primary contact for account                                                                          | true
**contact_last_name**	                | string        | Last name of primary contact for account                                                                           | true
**contact_email**		                  | string        | Email of primary contact for account                                                                               | true
contact_street			                  | array[string] | Array of strings containing street addresses of the primary contact for account [address line 1, address line 2]
contact_city			                    | string      	| City of primary contact for account
contact_state			                    | string      	| State/province of primary contact for account
contact_postal_code		                | string      	| Zip/postal code of primary contact for account
contact_country			                  | string      	| Country of primary contact for account
timezone				                      | string        | Timezone of the account. Defaults to 'US/Pacific'. Possible values: 'US/Alaska' or 'US/Arizona' or 'US/Central' or 'US/Eastern' or 'US/Hawaii' or 'America/Anchorage' or 'UTC'
status					                      | array[string] | Account status. This can only be edited by superusers and account superusers of the parent/owner account. 'realm_root' can only be set by superusers
access_restriction		                | array[string] | Array of strings containing access restrictions. Possible values: 'enable_mobile' = If present this account has access to mobile clients. 'enable_ip_restrictions' = if present, and if 'allowable_ip_address_range' has been specified, limits logins to the address ranges specified
allowable_ip_address_range            | array[string] | Each entry in the array specifies one address range. Entries use the ‘/’ format. For example, to limit access to 192.168.123.0-192.168.123.255, the entry would be 192.168.123.0/24. If no entries are present, 0.0.0.0/0 is implied           
session_duration		                  | int      		  | Session duration in minutes. Session duration of 0 means 'stay logged in forever'
holiday					                      | array[string] | Array of strings containing dates during which holidays are observed. Format for dates is YYYYMMDD
work_days				                      | array[string] | String of length 7. Each position in the string corresponds to a day of the week. Monday is position 0, Tuesday is position 1, etc. Each character in the string can have a value of 1 or 0. 1 means that this day is a work day
work_hours				                    | array[string] | Two entries. Each entry containing a time expressed in local time. The first entry in the array is the work day start time. The second entry in the array is the stop time. Times are represented using a 24 hour clock and are formatted as HHMM. For example, 8AM would be 0800 and 5PM would be 1700
alert_mode 				                    | array[string] | Array of strings containing possible alert modes as defined for this account. Accepts an array of any number of strings of varying length. This controls what values are able to be chosen for the 'active_alert_mode field'
active_alert_mode 		                | string      	| A string chosen from values in the account 'alert_mode' array. Must be blank or one of the values defined in the alert_mode array. This is used to determine when to send motion alert notifications (defined by camera settings in the device model). If a motion alert is defined with an alert mode from one of the strings in the account 'alert_mode' array, then the notifications triggered from that motion alert will only be sent when the account 'active_alert_mode' is also set to that same alert mode string defined for that motion alert
default_camera_passwords              | string      	| Comma-delimited string of default camera passwords
is_without_initial_user	              | int      		  | Indicates whether to create the new account without an initial user (1) or not (0). Defaults to 0, meaning an initial user with 'is_account_superuser=1' will be created using the arguments 'contact_first_name/contact_last_name/contact_email' specified upon account creation
is_initial_user_not_admin             | int      	    | Indicates whether the initial user is an admin (0) or not (1)

### Error Status Codes

HTTP Status Code    | Description   
----------------    | -----------
409	| Another account with the supplied contact email address already exists

<!--===================================================================-->
## Update Account

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X POST -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/account -d '{"id": "[ACCOUNT_ID]", "contact_first_name": "[CONTACT_FIRST_NAME]"}'
```

> Json Response

```json
{
    "id": "1234abcd"
}
```

Update an Account

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/account`

Parameter 				                    | Data Type   	       | Description 	                                                                                               | Is Required
--------- 				                    | ---------   	       | ----------- 	                                                                                               | -----------
**id**  				                      | string  		         | Unique identifier of the account                                                                            | true
name  					                      | string  		         | Name of the account
contact_first_name		                | string      	       | First name of primary contact for account
contact_last_name		                  | string      	       | Last name of primary contact for account
contact_email			                    | string      	       | Email of primary contact for account
contact_street			                  | array[string]        | Array of strings containing street addresses of the primary contact for account [address line 1, address line 2]
contact_city			                    | string      	       | City of primary contact for account
contact_state			                    | string      	       | State/province of primary contact for account
contact_postal_code		                | string      	       | Zip/postal code of primary contact for account
contact_country			                  | string      	       | Country of primary contact for account
contact_phone                         | string               | Phone number of primary contact for account
contact_mobile_phone                  | string               | Mobile phone number of primary contact for account
timezone				                      | string               | Timezone of the account. Defaults to 'US/Pacific'. Possible values: 'US/Alaska' or 'US/Arizona' or 'US/Central' or 'US/Eastern' or 'US/Hawaii' or 'America/Anchorage' or 'UTC'
status					                      | array[string]        | Account status. This can only be edited by superusers and account superusers of the parent/owner account. Values: 'active', 'inactive', 'pending_validation', 'suspended'. 'active' mean account is in a normal working state. 'Inactive' means logins are not allowed. 'Suspended' means the account is effectively no longer operational ('pending_validation' is the default state after first creation, before the user has validated the account)
access_restriction		                | array[string]        | Array of strings containing access restrictions. Possible values: 'enable_mobile' = If present this account has access to mobile clients. 'enable_ip_restrictions' = if present, and if 'allowable_ip_address_range' has been specified, limits logins to the address ranges specified
allowable_ip_address_range            | array[string]        | Each entry in the array specifies one address range. Entries use the ‘/’ format. For example, to limit access to 192.168.123.0-192.168.123.255, the entry would be 192.168.123.0/24. If no entries are present, 0.0.0.0/0 is implied           
session_duration		                  | int      		         | Session duration in minutes. Session duration of 0 means 'stay logged in forever'
holiday					                      | array[string]        | Array of strings containing dates during which holidays are observed. Format for dates is YYYYMMDD
work_days				                      | array[string]        | String of length 7. Each position in the string corresponds to a day of the week. Monday is position 0, Tuesday is position 1, etc. Each character in the string can have a value of 1 or 0. 1 means that this day is a work day
work_hours				                    | array[string]        | Two entries. Each entry containing a time expressed in local time. The first entry in the array is the work day start time. The second entry in the array is the stop time. Times are represented using a 24 hour clock and are formatted as HHMM. For example, 8AM would be 0800 and 5PM would be 1700
alert_mode 				                    | array[string]        | Array of strings containing possible alert modes as defined for this account. Accepts an array of any number of strings of varying length. This controls what values are able to be chosen for the 'active_alert_mode field'
active_alert_mode 		                | string      	       | A string chosen from values in the account 'alert_mode' array. Must be blank or one of the values defined in the alert_mode array. This is used to determine when to send motion alert notifications (defined by camera settings in the device model). If a motion alert is defined with an alert mode from one of the strings in the account 'alert_mode' array, then the notifications triggered from that motion alert will only be sent when the account 'active_alert_mode' is also set to that same alert mode string defined for that motion alert
default_camera_passwords              | string      	       | Comma-delimited string of default camera passwords
camera_shares 			                  | array[array[string]] | Array of arrays, with each sub array representing a camera to be shared to 1 or more recipients. First element of sub array is action, with 'm' for add/update. Second element of sub array is camera id. Third element of sub array is a string containing 1 or multiple recipients. Each recipient is a string value of 'email,account', but only applies to the 'm' action. Example: [['m', '12345678', 'joe@em.com,His account', joe2@dd.com,That account']]
is_revoke_admins		                  | int      		         | Indicates whether to revoke all admin permissions for the users in the account (1) or not (0). This field doesn't save anything on the account itself. It will revoke admin privileges of any admins in the account
is_custom_brand			                  | int      		         | Indicates whether the account has branding enabled (1) or not (0)
brand_logo_small		                  | string      	       | Base64 encoded image for the branded small logo (PNG, 160x52, transparent background)
brand_logo_large		                  | string      	       | Base64 encoded image for the branded large logo (PNG, 460x184, white background)
brand_subdomain			                  | string      	       | Sub domain for the branded url
brand_corp_url			                  | string      	       | Corporate website url
brand_name				                    | string      	       | Branded company name
brand_saml_publickey_cert             | string               | Public certificate which Eagle Eye Networks will use to decrypt the SAML for SSO
brand_saml_nameid_path                | string               | The path within the SAML xml to find the users email address
is_master_video_disabled_allowed      | int                  | Indicates whether a sub-account can block video access to reseller (1) or not (0)
is_master_video_disabled              | int                  | Indicates whether video access is blocked to reseller (1) or not (0)
is_contract_recording                 | int                  | Indicates whether the account is of type contract_recording. Controls whether contract recording features are enabled for the users in this account on the front-end GUI (1) or not (0)
is_advanced_disabled                  | int                  | Indicates whether the reseller has disabled advanced functionality (1) or not (0). If this is set for a sub-account, the users in the sub-account cannot change any settings related to bandwidth, billing (retention and resolution) and certain account settings.  Master users switched in still can modify these things if their permissions allow it
is_billing_disabled                   | int                  | Indicates whether the reseller has disabled editing settings in a sub-account that affect billing (1) or not (0). This controls whether users can change camera resolution/retention, add/delete cameras, etc
is_add_delete_disabled                | int                  | Indicates whether the reseller has disabled adding or deleting devices (1) or not (0)
is_disable_all_settings               | int                  | Indicates whether the reseller has disabled all device and most account settings (1) or not (0). Does not affect editing users, layouts, or sharing
first_responders                      | array[array[string]] | Array of strings [['responder email', 'responder first name', 'responder last name', 'responder organization', 'responder account']]. Accounts can identify a list of email accounts that will serve as emergency responders.  Emergency responders get access to the identified cameras when an emergency is triggered by setting 'responder_active'
responder_active                      | ???                  | Indicates whether the list of responder cameras can be seen by the list defined under 'first_responders'. Until this flag is set, responders cannot see the video
responder_cameras                     | array[string]        | Array of camera esns that are shared to first responders
inactive_session_timeout              | int                  | Maximum time period in seconds without activity before web session expires
login_attempt_limit                   | int                  | Maximum incorrect login attempts before the user account access becomes locked
is_rtsp_cameras_enabled               | int                  | Indicates whether the account can have cameras attached over RTSP (instead of ONVIF) (1) or not (0)
brand_support_phone                   | string               | Branded support phone number
default_cluster                       | string               | Indicates the data center cluster the account is assigned to
customer_id                           | string               | Arbitrary id assigned to a sub-account by a master account
is_system_notification_images_enabled | int                  | Indicates whether email notifications about online/offlice status should contain images from those cameras (1) or not (0)
contact_utc_offset                    | int                  | This field is deprecated and not used


<!--===================================================================-->
## Delete Account

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X DELETE -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/account -d "id=[ACCOUNT_ID]" -G
```

Delete an Account

### HTTP Request

`DELETE https://login.eagleeyenetworks.com/g/account`

Parameter     | Data Type   | Description
---------     | ----------- | -----------
**id**        | string      | Account id

### Error Status Codes

HTTP Status Code    | Description  
----------------    | -----------
200	| Delete succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Account not found with the supplied ID

<!--===================================================================-->
## Get List of Accounts

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" --request GET https://login.eagleeyenetworks.com/g/account/list
```

> Json Response

```json
[
    [
        "00004206",
        "Greater God",
        0,
        0,
        1,
        0,
        0,
        1,
        null,
        0,
        0,
        0,
        0,
        0,
        0,
        "20160228234555.722",
        0,
        "Greater ID"
    ],
    [...],
    [...]
]
```

Return an array of arrays, with each sub-array representing an account available to the user. Please note that the account list model definition below has property keys, but that's only for reference purposes since it's actually just a standard array

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/list`

### Account Array Attributes

Array Index		| Attribute   			     | Data Type | Description
----------- 	| ---------              | --------- | -----------
0             | id          			     | string    | Unique identifier for the account
1 				    | name 					         | string 	 | Name of the account
2 				    | camera_online_count	   | int 			 | Number of cameras currently online in the account
3				      | camera_count 			     | int 			 | Number of cameras currently in the account
4 				    | user_count 			       | int 		   | Number of users currently in the account
5 				    | is_suspended 			     | int 			 | Indicates whether the account is suspended (1) or not (0)
6 				    | is_inactive 			     | int 			 | Indicates whether the account is inactive (1) or not (0)
7 				    | is_active 			       | int 			 | Indicates whether the account is active (1) or not (0)
8 				    | product_edition 		   | string 	 | Product edition the account is using
9             | bridge_online_count    | int       | Number of online bridges owned by the account
10            | bridge_active_count    | int       | Number of active bridges owned by the account
11            | bridge_count           | int       | Number of bridges owned by the account
12            | camera_off_count       | int       | Number of account cameras that are currently offline
13            | camera_available_count | int       | Number of available cameras in the account
14            | is_account_active      | int       | Indicates the account is active (1) or not (0)
15            | last_login             | string    | EEN timestamp of the last login by this account
16            | average_retention_days | int       | The average number of retention days for the account
17            | customer_id            | string    | The customer id assigned to this account

<!---TODO Update Account Array Attributes-->

### Error Status Codes

HTTP Status Code    | Description   
----------------    | -----------
200	| Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
