# Search

<!--===================================================================-->
## Overview
<!--===================================================================-->

This service allows for search across various types of data

<aside class="success">Currently only supports recordings and annotations, but support for other types of data is coming soon</aside>

<!--===================================================================-->
## Search Recordings
<!--===================================================================-->

> Request TODO

```shell
```

Returns array of recording objects that match a search value

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/search/recordings`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**value** | string    | Value to search for | true

> Json Response TODO

```json
```

### HTTP Response (Json Attributes)

Parameter                   | Data Type     | Description
---------                   | ---------     | -----------
\_key                       | string        | Unique identifier (within the user's account) of the recording
current_recording_timestamp | string        | Timestamp of when the current recording (if any) was started
recording_%s_start          | RecordingInfo | Object of info about the recording start event, where '%s' is the timestamp it started. Could be N number of these
recording_%s_stop           | RecordingInfo | Object of info about the recording stop event, where '%s' is the timestamp it started. Must have a matching 'recording_%s_start' event. Could be N number of these
recording_%s_meta           | object        | Object of info about the recording, where '%s' is the timestamp it started. Must have a matching 'recording_%s_start' event

### RecordingInfo Json Attributes

Parameter   | Data Type     | Description
---------   | ---------     | -----------
timestamp   | string        | Timestamp of when the recording was started
layout_id   | boolean       | Id of a layout the recording was started for
camera_ids  | array[string] | Array of camera ids who had recording started for
layout_name | string        | Name of layout at the time the recording started
user_id     | string        | Id of the user who started/stopped the recording

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
200 | Request succeeded

<!--===================================================================-->
## Search Annotations
<!--===================================================================-->

> Request TODO

```shell
```

Returns array of annotation objects that match a search value

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/search/recordings`

Parameter           | Data Type | Description | Is Required
---------           | --------- | ----------- | -----------
**value**           | string    | Value to search for | true
**start_timestamp** | string    | Start timestamp to use to limit search results | true
end_timestamp       | string    | End timestamp to use to limit search results (defaults to 'now')

> Json Response TODO

```json
```

### HTTP Response (Json Attributes)

Parameter | Data Type     | Description
--------- | ---------     | -----------
???       | array[object] | ???

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
200 | Request succeeded
