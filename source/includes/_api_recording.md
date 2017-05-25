# Recording

<!--===================================================================-->
## Overview
<!--===================================================================-->

This service is used to retrieve and update Recording Information for Recordings that were started/stopped using the `'action/recordnow'` and `'action/recordoff'` endpoints

<!--===================================================================-->
## Recording Model
<!--===================================================================-->

> Recording Model TODO

```json
```

### Recording (Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
<p hidden>???</p> | <p hidden>???</p> | <p hidden>???</p>



<!--===================================================================-->
## Get Recording Object
<!--===================================================================-->

Returns a Recording object by recording_key

> Request TODO

```shell
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/recording`

Parameter         | Data Type | Description | Is Required
---------         | --------- | ----------- | -----------
**recording_key** | string    | Recording key | true

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Update Recording Object
<!--===================================================================-->

Update a Recording

> Request TODO

```shell
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/recording`

Parameter         | Data Type | Description | Is Required
---------         | --------- | ----------- | -----------
**recording_key** | string    | Unique identifier (within an account) of a recording | true
meta              | object    | Meta data. This is meant to be a generic object that can store any data that is needed, so the properties are not predefined

> Json Response TODO

```json
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
<p hidden>???</p> | <p hidden>???</p> | <p hidden>???</p>



### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded
