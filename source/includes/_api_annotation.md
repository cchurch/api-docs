# Annotation

<!--===================================================================-->
## Overview
<!--===================================================================-->

The annotation service allows to push data into the event stream to add additional information about a camera/video. Annotations are associated with a device and a timestamp

<aside class="notice">Annotations are subject to normal retention logic and as such will be discarded when the annotated time has passed the retention</aside>

<!--===================================================================-->
## Create Annotation
<!--===================================================================-->

> Request TODO

```shell
```

Create an annotation for a device with a particular timestamp and data describing the annotation

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/annotation`

Parameter     | Data Type | Description | Is Required
---------     | --------- | ----------- | -----------
**device_id** | string    | Id of the device the annotation should be associated with | true
**timestamp** | string    | Timestamp associated with the annotation | true
**data**      | json      | Json object representing the data associated with the annotation (No predefined data fields required) | true

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
## Update Annotation
<!--===================================================================-->

> Request TODO

```shell
```

Update an annotation for a device with a particular timestamp. Simple modifications ('atype'='mod') can be made and require you to pass the original 'timestamp' from when the annotation was created. Zero to N 'heartbeats' ('atype'='hb') can also be applied to describe changes over time for the annotation. The annotation can be ended ('atype'='end') which closes the annotation and lets you attach additional information. Each annotation event is assumed to last for 10 seconds in the absence of a heartbeat extending it. After a heartbeat, it is assumed to last for another 10 seconds. Annotations can be truncated by specifying an end event ('atype'='end')

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/annotation`

Parameter     | Data Type    | Description | Is Required
---------     | ---------    | ----------- | -----------
**id**        | string       | Id of the annotation being updated, which is returned by PUT /annotation | true
**device_id** | string       | Id of the device the associated with the annotation being updated | true
**timestamp** | string       | If atype='mod', then this must be the timestamp associated with the annotation when originally created. If atype is 'hb' or 'end', this timestamp can be a different timestamp than the original | true
**data**      | json         | Json object representing the data to update the annotation with. No predefined data fields required | true
atype         | string, enum | The type of annotation update to make. Defaults to 'mod'. 'mod' is a simple modification of the annotation. 'hb' indicates a heartbeat event, adding information on parameters that have changed and extending duration. 'end' indicates the end of the event, and no 'hb' with a later timestamp will be accepted <br><br>enum: end, hb, mod

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
