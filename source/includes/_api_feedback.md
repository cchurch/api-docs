# Feedback

<!--===================================================================-->
## Overview
<!--===================================================================-->

This service allows users to send feedback to support

<!--===================================================================-->
## Send Feedback
<!--===================================================================-->

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" --request POST https://login.eagleeyenetworks.com/g/feedback --data "subject=[SUBJECT]&message=[MESSAGE]"
```

Send feedback to support

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/feedback`

Parameter   | Data Type | Description | Is Required
---------   | --------- | ----------- | -----------
**subject** | string    | Subject of the feedback | true
**message** | string    | Feedback message | true

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
202	| Request succeeded
