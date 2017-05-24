# Annotation

<!--===================================================================-->
## Overview
<!--===================================================================-->

The Annotation service allows to push data (valid Json, can include HTML elements) into the event stream to add additional information about a camera/video. Annotations are associated with a device and a timestamp

<aside class="notice">Annotations are subject to normal retention logic and as such will be discarded when the annotated time has exceeded retention</aside>

<!--===================================================================-->
## Create Annotation
<!--===================================================================-->

Create an Annotation for a device with a specific timestamp and data describing it

> Request TODO

```shell
```

### HTTP Request

`PUT http://login.eagleeyenetworks.com/annt`

Parameter     | Data Type | Description                                                                                                                      | Required    |
---------     | --------- | -----------                                                                                                                      |:-----------:|
**id**        | string    | ID of the device the annotation should be associated with                                                                        | **&check;** |
**ns**        | int       | The numerical namespace value assigned by Eagle Eye Networks                                                                     | **&check;** |
**u**         | string    | A randomly generated UUID used for indexing purposes and quick retrieval of events                                               | **&check;** |
**ts**        | string    | Timestamp associated with the annotation                                                                                         | **&check;** |
**type**      | string    | Type of operation to execute: <br>`'add'` - adds the annotation                                                                  | **&check;** |

<!--TODO: Investigate whether the table row is in use: **data**      | json      | Json object representing the data associated with the annotation (No predefined data fields required)                             | **&check;** -->

> Json Response TODO

```json
```

### HTTP Response (Json Attributes)



### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Get Annotation
<!--===================================================================-->

Returns an Annotation object by ID/UUID

> Request TODO

```shell
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/annt/get`

Parameter     | Data Type     | Description                                                                                                                  | Required    |
---------     | ---------     | -----------                                                                                                                  |:-----------:|
**id**        | string        | ID of the device the annotation should be associated with                                                                    | **&check;** |
**u**         | array[string] | Array of comma-separated UUIDs to return                                                                                     | **&check;** |

> Json Response TODO

```json
```

### HTTP Response (Array Attributes)



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

> Request TODO

```shell
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/annt/get`

Parameter           | Data Type     | Description                                                                                                            | Required    |
---------           | ---------     | -----------                                                                                                            |:-----------:|
**id**              | string        | ID of the device the annotation should be associated with                                                              | **&check;** |
**start_timestamp** | string        | Start timestamp of the annotations to return                                                                           | **&check;** |
**end_timestamp**   | string        | End timestamp of the annotations to return                                                                             | **&check;** |
uuid                | array[string] | Array of comma-delimited UUIDs to list                                                                                 | **&cross;** |
namespace           | array[int]    | Array of 1 to N comma-delimited namespaces to list                                                                     | **&cross;** |
exclusive           | boolean       | Whether to include annotations that span start or end (0) or not (1)                                                   | **&cross;** |

> Json Response TODO

```json
```

### HTTP Response (Array Attributes)



### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded
