# Notice

<!--===================================================================-->
## Get Notice for User

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY] -X GET https://login.eagleeyenetworks.com/g/users/notice?id=[ID]
```

> Response List

```list
[[ u'cafe1866',
  u'example@eagleeyenetworks.com',
  u'Terms And Condtions (2015)',
  u'',
  1,
  14]]
```

This is to push important notices such as "Terms and Conditions (2015)".
The client software must call **GET** to see if the user needs to agree to the notice.
If the user has an **action needed** then the client software should popup a notice box for each of the given **notice title**.
It is preferred to have this as a single combined notice, but is returned as a list of notices.

If the user agrees to the terms then a **PUT** call should be placed containing all of the notices.
A past due user is subject to suspension of services, and may not be allowed to login.

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/users/notice`

Parameter  		| Data Type   | Description   	| Is Required
---------  		| ----------- | -----------   	| -----------
**id**   		| string      | User Id 		| false

### HTTP List Attributes

Parameter 	| Data Type     | Description
---------  	| -----------   | -----------
user_id 	| string 		| Unique identifier for validated user
notice_title| string 		| Title of the notice
notice_url  | string        | Url of a file with the notice text
version     | int    		| Version number for the notice title
is_compliant| bool          | If False then the user needs to accept the notice
past_due    | int           | Number of days the notice has been active
* If action is needed then the client software should popup a notice box for the requested notice title.

### Error Status Codes

HTTP Status Code    | Data Type
------------------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
406	| Information supplied could not be verified
402	| Account is suspended
460	| Account is inactive
409	| Account has already been activated
412	| User is disabled
200	| User has been authorized for access to the realm


<!--===================================================================-->
## Accept Notice for User
  This is called to record acceptance of the notice.
  Account Super Users will not be able to accept for other people.

### Notice Attributes
Parameter           | Data Type         | Description
---------           | ---------------   | -----------
notice_title        | string            | Title of the notices to accept
version             | int               | Version number of the notice title

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X PUT  -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/users/notice -d '{"notice_title": [NOTICE_TITLE]}'
```

> Response Json

``` json
{ "id": "cafe1866"}
```

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/users/notice`

Parameter  		| Data Type   | Description   	| Is Required
---------  		| ----------- | -----------   	| -----------
**notices**     | array[json] | Array of Json notices that are accepted | true

### HTTP Json
Parameter  		| Data Type   | Description
---------  		| ----------- | -----------
**id**| string      | user id |

### Error Status Codes
 Code    | Data Type
-------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
402	| Account is suspended
404 | Notice Title was not found
406	| Information supplied could not be verified
460	| Account is inactive
409	| Account has already been activated
412	| User is disabled
200	| User has been authorized for access to the realm

<!--===================================================================-->
## Create Notice for Account

Master Accounts (Resellers) may require their own notice for terms.
For that case, this api endpoint is to submit the text of the terms of the agreement.
First the new terms can be submitted with a PUT command, then a GET command can be done to see the state of notices.
Text is limited to 64 kbytes.  Notices are stored in the account of the user issuing the notice.
**PUT** will retire notices of the same title and account.
Notices can be stored in the sub account or the parent account of the user.

* Only master accounts can **PUT** an account notice


> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X PUT  -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/accounts/notice -d '{"notice_title": "Company Notice", "notice_text": "This is example text for a notice", "id": "00008832", "days": 7, "admins": False, "users": True, all_required: True'
```

> Response Json

``` json
{ "id": ["00008832"]}
```

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/accounts/notice`

Parameter  		   | Data Type       | Description   	| Is Required
---------  		   | -----------     | -----------   	| -----------
**notice_text**    | string          | Text of the notices to accept (use single LF character for line break, max size is 64 kbytes)  | true
id                 | string          | Unique id of the Account (defaults to requester's account) | false
notice_title       | string          | Title of the notices to accept (defualts to "Terms and Conditions"), max size is 32 bytes | true
is_admin_required  | bool            | If admins have to accept (defaults to False)| false
is_user_required   | bool            | If users have to accept  (defaults to True) | false
ia_all_required    | bool            | If all or one have to accept (defaults to True) | false

### HTTP Attributes
Parameter  		| Data Type   | Description
---------  		| ----------- | -----------
notice          | json        | returns the created notice

### Error Status Codes
 Code    | Data Type
-------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
402	| Account is suspended
404 | Notice Title was not found
406	| Information supplied could not be verified
460	| Account is inactive
409	| Account has already been activated
412	| User is disabled
200	| User has been authorized for access to the realm

<!--===================================================================-->
## Update Notice for Account

Updates an account notice as specified by Put Notice for Account

* Only master accounts can **Post** an account notice


> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X POST  -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/accounts/notice -d '{"notice_title": "Company Notice", "notice_text": "This is example text for a notice", "id": "00008832", "days": 7, "admins": False, "users": True, all_required: True'
```

> Response Json

``` json
{ "id": ["00008832"]}
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/accounts/notice`

Parameter  		   | Data Type       | Description   	| Is Required
---------  		   | -----------     | -----------   	| -----------
notice_text        | string          | Text of the notices to accept (use single LF character for line break  | false
id                 | string          | Unique id of the Account (defaults to requester's account) | false
notice_title       | string          | Title of the notices to accept (defaults to "Terms and Conditions" | false
is_admin_required  | bool            | If admins have to accept (defaults to not updating)| false
is_user_required   | bool            | If users have to accept  (defaults to not updating) | false
ia_all_required    | bool            | If all or one have to accept (defaults to not updating) | false
date               | string          | Date the notice goes into affect (defaults to Now) | false

* Users are not required to accept notice of the same version again, so if users should be forced to accept again then PUT should be done

### HTTP Attributes
Parameter  		| Data Type   | Description
---------  		| ----------- | -----------
notice          | json        | returns the updated notice

### Error Status Codes
 Code    | Data Type
-------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
402	| Account is suspended
404 | Notice Title was not found
406	| Information supplied could not be verified
460	| Account is inactive
409	| Account has already been activated
412	| User is disabled
200	| User has been authorized for access to the realm


<!--===================================================================-->
## Delete Notice for Account

This will **retire** a notice.
* Only master accounts can **DELETE** an account notice

`DELETE https://login.eagleeyenetworks.com/g/accounts/notice`

Parameter  		| Data Type   | Description   	| Is Required
---------  		| ----------- | -----------   	| -----------
id   		    | string      | Accuont Id 		| false
notice_title    | string      | Title of the notice | false


### HTTP List Attributes
Parameter 	| Data Type     | Description
---------  	| -----------   | -----------
account_id  | string        | Unique Id of the account that is requesting this notice
account_name| string        | Name of the account that is requesting this notice
notice_title| string        | Title of the notice
version     | int           | Version number for the notice title, a larger version number will retire other versions
is_admin_required      | bool          | If admins have to accept
is_user_required       | bool          | If users have to accept
is_all_required| bool       | If all or one have to accept
notice_url  | string        | URL of the file containing the text for the notice
status      | string        | Enum of the following values: retired, active
date        | string        | date of the notice


### HTTP Attributes
Parameter  		| Data Type   | Description
---------  		| ----------- | -----------
notice          | json        | returns the retired notice

### Error Status Codes
 Code    | Data Type
-------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
402	| Account is suspended
404 | Notice Title was not found
406	| Information supplied could not be verified
460	| Account is inactive
409	| Account has already been activated
412	| User is disabled
200	| User has been authorized for access to the realm

<!--===================================================================-->


## Get Notice for Account

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY] -X GET https://login.eagleeyenetworks.com/g/accounts/notice?id=[ID]
```

> Response List

```list
[[ u'Eagle Eye Networks',
  u'Terms and Conditions (2015)',
  u'20150528120000.000',
  True,
  7,
  False,
  True,
  True,
  u'This is example text for a notice'
  ]]
```

This is to push important notices such as "Terms and Conditions (2015)".
The client software must call **GET** to see if the user needs to agree to the notice.
If the user has an **action needed** then the client software should popup a notice box for each of the given **notice title**.
It is preferred to have this as a single combined notice, but it is returned as a list of notices.

If the user agrees to the terms then a **PUT** call should be placed for the notice.
A past due user is subject to suspension of services, and may not be allowed to login.

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/accounts/notice`

Parameter  		| Data Type   | Description   	| Is Required
---------  		| ----------- | -----------   	| -----------
**id**   		| string      | Account Id 		| false

### HTTP List Attributes
Parameter 	| Data Type     | Description
---------  	| -----------   | -----------
account_id  | string        | Unique Id of the account that is requesting this notice
account_name| string        | Name of the account that is requesting this notice
notice_title| string        | Title of the notice
version     | int           | Version number for the notice title, a larger version number will retire other versions
is_admin_required      | bool          | If admins have to accept
is_user_required       | bool          | If users have to accept
is_all_required| bool       | If all or one have to accept
notice_url  | string        | URL of the file containing the text for the notice
status      | string        | Enum of the following values: retired, active with action needed, active without action needed
date        | string        | date of the notice

### Error Status Codes

HTTP Status Code    | Data Type
------------------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
406	| Information supplied could not be verified
402	| Account is suspended
460	| Account is inactive
409	| Account has already been activated
412	| User is disabled
200	| User has been authorized for access to the realm



> Request

```shell
curl --cookie "auth_key=[AUTH_KEY] -X GET https://login.eagleeyenetworks.com/g/accounts/notice?id=[ID]
```

> Response List

```list
[[ u'Eagle Eye Networks',
  u'Terms and Conditions (2015)',
  u'20150528120000.000',
  True,
  7,
  False,
  True,
  True,
  u'This is example text for a notice'
  ]]
```
