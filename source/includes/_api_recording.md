# Recording

<!--===================================================================-->
## Overview
<!--===================================================================-->

This service is used to retrieve and update recording information for recordings that were started/stopped using the 'action/recordnow' and 'action/recordoff' endpoints

<!--===================================================================-->
## Get Recording Object
<!--===================================================================-->

> Request TODO

```shell
```

> Json Response TODO

```json
```

Returns recording object by recording_key

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/recording`

Parameter         | Data Type | Description
---------         | --------- | -----------
**recording_key** | string    | Recording key

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

> Request TODO

```shell
```

> Json Response TODO

```json
```

Update a Recording

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/recording`

Parameter         | Data Type | Description | Is Required
---------         | --------- | ----------- | -----------
**recording_key** | string    | Unique identifier (within an account) of a recording | true
meta              | object    | Meta data. This is meant to be a generic object that can store any data that is needed, so the properties are not predefined

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded
