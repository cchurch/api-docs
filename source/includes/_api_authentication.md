# Authentication

<!--===================================================================-->
## Overview
<!--===================================================================-->

Gaining access to the Eagle Eye API is a two-stage process: Clients first present their credentials and Realm to obtain a single use Authentication Token. This single use token is valid for a pre-defined duration or until it has been used. Once the Authentication Token is obtained the Client must utilize it in an Authorize service call to obtain a session ID (via the `'auth_key'` Cookie) that provides access to resources. This two phase approach allows Clients to authenticate and operate in multiple domains. The first step is done using Authenticate. The second step is done using Authorize. Note that the Authenticate call must be done over an HTTPS connection

In addition to the Simple Authentication scheme described above, also a more Secure Authentication scheme, known as **Two-Factor Authentication** (**TFA**) may be used. TFA is a method of confirming a user's identity by utilizing a combination of two different components. The first component is a user's password and the second is a one-time TFA code delivered to the user via another communication channel - e-mail or a text message sent to the user's mobile phone

Whether simple or Two-Factor Authentication scheme is used for a particular user's login is determined by this user's settings in the system. Note, however, that an account administrator may enforce all users in a particular account to use TFA scheme

If TFA scheme is in use, the Authorize call will expect the TFA code to be passed in addition to the token obtained from the Authenticate call

Once the `'auth_key'` cookie is obtained from the Authorize call, there are 2 methods for which you can use the session ID to make subsequent calls to the API. The first, is simply to pass the `'auth_key'` cookie with all API requests. The second method, is to take the value of the `'auth_key'` cookie and pass it in the request as the `'A'` parameter. The `'A'` parameter can be used with any method (GET, PUT, POST, DELETE). The order of precedence for session ID retrieval is as follows:

  1. `'A'` parameter in the query string of any method (GET, PUT, POST, DELETE)
  2. `'A'` parameter in the POST data
  3. `'A'` parameter in the request body (e.g. PUT)
  4. `'auth_key'` cookie

All status codes are listed in order of precedence, meaning the first one listed is the one returned if its respective conditions are met and the last one listed is the one that will be returned if none of the preceding codes' conditions are met

<!--===================================================================-->
## Step 1: Authenticate
<!--===================================================================-->

Login is a two-step process when using Simple Authentication and a three-step process using TFA

***Simple scheme:***

Authenticate, then Authorize with the token returned by Authenticate

***TFA scheme:***

Authenticate, Instruct the system to send TFA Code to the user, Authorize with the token received from step 1 and the TFA code received from step 2

> Request

```shell
curl -v --request POST https://login.eagleeyenetworks.com/g/aaa/authenticate --data-urlencode "username=[USERNAME]" --data-urlencode "password=[PASSWORD]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/authenticate`

Parameter    | Data Type | Is Required
---------    | --------- | -----------
**username** | string    | true
**password** | string    | true

> Json Response (Simple Authentication)

```json
{
    "token": "O3k0hNH3jQgjaxC0bLG9/5cM+Z7eWdPe0c+UpEZNXOs7PTFH45Dr9M3wxLkP6GjcPuCw8lXVTkHGA1zgx/q44HBv3Xmcj4/XzN2f6Hv+mZVIy8LorX8N5a6fNVRknWWW86nCHfbLvOP6TPcmBP1dD10ynnGeAdlQHTqMN5mvKH24WwZgVFbM4DyhyWu+eTN+t1XNROegJdZRjhaYCZ1FVKkdnrlsrMD6JSr/tE7byCLVjPcwzVabA+x0tDbGipystTNYPZyDVr3DQM70SV6kfqg2irlC8/zDu7a2EhI1IQWuZZ2GQIQm5jBtj9UR/p7ainHVhEc/bSFYUCvziepcAa=="
}
```

> Json Response (Two-Factor Authentication)

```json
{
    "token": "MiDUwMQqwP1JsfKqbqT1DQ8hJFHEOZfROEUtBvnuqv0ICxvcOybkS1n9/awjrJ9YKijb60GqdUDPP8TW4o8Ei8iI8OXC/dj74KC2cLMxJ2vs/hmYPfbW8OpCwf0k683a2LfIbjcC3Uy/SmDpOsxVdPMTXQEGJHXD3ItmAvoQ5MOoRKfHBNOu7OJBWQjPUjeP0fkHSrx8JgAHSqT5SwRM0mLysFmiFHF0h7/5Apt81dDhZwLBDwwSrl+kTqgn+wnw6rJ432liESdK+yp3Qefk1wAtytoTJkkBE2srqsHJdW4ryVYKk9SKA62Cz7pO3VUaD8Yxx9Ff2Os9ez6TdfBmqg==",
    "two_factor_authentication_code":
    {
        "sms": "*** *** 779",
        "email": "***********@gmail.com"
    }
}
```

### HTTP Response (Json Attributes)

Returned parameters            | Data Type |  Description
-------------------            | --------- | ------------
token                          | string    | Token to be used in Authorize
two_factor_authentication_code | Json dictionary with two keys:<br/>**sms** - scrubbed user's SMS number,<br/>**email** - scrubbed user's e-mail address (present in response only if TFA scheme is being used). | Code required to complete the Two-Factor Authentication

***NOTE 1:***

Token expiration:

  - *30 seconds* for Simple Authentication
  - *15 minutes* for TFA scheme

***NOTE 2:***

For TFA scheme, the system uses the parameter `'sms_phone'` from the [User Model](#user-model).  
If SMS-based authentication is to be used, that parameter MUST be specified at the user's creation time (see [Create User](#create-user))
If user's parameter `'sms_phone'` has not been set, the value of the **sms** key will be `'No sms phone found'`

***NOTE 3:***

The TFA-related user's data (i.e. SMS Phone or e-mail), once set at the time of user's account creation can only be modified by that user alone. Any such modification will also be TFA authenticated. Account superuser may not change such data for security reasons

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Invalid credentials supplied
402	| Account is suspended
460	| Account is inactive
461	| Account is pending
412\*	| User is disabled
462	| User is pending (This will be thrown before 401 if the username is valid and account is active)
200	| User has been authenticated (Body contains Json encoded result)

\* Code 412 is also returned if TFA is used and the user's account has been locked due to more than 3 failed attempts to authorize with a TFA code



<!-- TODO: verify whether the list above is complete==-->

<!--===================================================================-->
## Step 2: Send TFA Code (only if using TFA scheme)
<!--===================================================================-->

This step is only to be executed when TFA scheme is used for the user log in (i.e. if the Authenticate call returned `'two_factor_authentication_code'` key in response)
Otherwise proceed to Step 3: Authorize

> Request (Simple Authentication)

```shell
curl -D - --request POST https://login.eagleeyenetworks.com/g/aaa/two_factor_authenticate --data-urlencode token=[TOKEN] two_factor_authentication_type=sms
```

```shell
curl -D - --request POST https://login.eagleeyenetworks.com/g/aaa/two_factor_authenticate --data-urlencode token=[TOKEN] two_factor_authentication_type=email
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/two_factor_authenticate`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**token** | string    | Token received in step 1 | true
**two_factor_authentication_type** | string    | TFA type (Must be `'sms'`  or `'email'`) | true

### HTTP Response

This API call does not return data in response

***NOTE 1:***

TFA code expiration is *15 minutes*

### Response Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
412	| Unable to send TFA code with the TFA type selected
415	| Specified TFA type not supported
200	| Request succeeded (TFA code has been sent to the user)

<!--===================================================================-->
## Step 3: Authorize
<!--===================================================================-->

Authorize is the final step of the Login process, by using the token from the first step (Authenticate) and - if TFA scheme is used - the TFA code delivered to the user by e-mail or SMS
A Successful Authorize call returns an authorized user object and sets the `'auth_key'` cookie. For all subsequent API calls, either the cookie can be sent or the value of the cookie can be sent as the `'A'` parameter
When TFA scheme is used, this call will also set `'tfa_key'` cookie. See **Authorized devices** section for more detail on this cookie

API calls can originally be done against "https://login.eagleeyenetworks.com" (The host url), but after authorization is returned the API should then use the **branded subdomain**
At this stage the branded host url will become `'https://[active_brand_subdomain].eagleeyenetworks.com'` where the **active_brand_subdomain** field is returned in the authorization response

For example after the authorization in the example on the right, the host url should be changed to `'https://c001.eagleyenetworks.com'`

Each account will consistently have the same **branded subdomain** and as such will not change throughout the life of the session
Caching the subdomain is safe to do as long as the client software validates against the active_brand_subdomain after authorization.  Using the **branded subdomain** is important for speed and robustness

> Request (Simple Authentication)

```shell
curl -D - --request POST https://login.eagleeyenetworks.com/g/aaa/authorize --data-urlencode token=[TOKEN]
```

> Request (TFA scheme)

```shell
curl -D - --request POST https://login.eagleeyenetworks.com/g/aaa/authorize --data-urlencode token=[TOKEN] two_factor_authentication_code=[TFA_CODE]
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/authorize`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**token** | string    | Token received in step 1 | true
two_factor_authentication_code | string    | 4 decimal digits <br/>Used only for TFA (Not used when authorizing with the simple scheme)

***NOTE 1:***

More than 3 failed attempts to Authorize with TFA code will lock the user's account. It then can only be unlocked by Eagle Eye's technical support staff
When the user's account has been locked the user is notified of this fact by e-mail

> Json Response

```json
{
    "is_sms_include_picture": 0,
    "last_name": "",
    "uid": " ",
    "is_export_video": 1,
    "layouts": [
        "217f0fd4-450f-11e4-a983-ca8312ea370c"
    ],
    "account_map_lines": null,
    "postal_code": null,
    "is_account_superuser": 1,
    "timezone": "US/Pacific",
    "active_brand_subdomain": "c001",
    "sms_phone": null,
    "city": null,
    "first_name": null,
    "user_id": "ca0e1cf2",
    "is_notify_enable": 1,
    "owner_account_id": "00004206",
    "json": "{}",
    "id": "ca0e1cf2",
    "is_superuser": 0,
    "state": null,
    "last_login": "20141006173752.672",
    "is_recorded_video": 1,
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
    "notify_period": [
        "0-0000-2359",
        "1-0000-2359",
        "2-0000-2359",
        "3-0000-2359",
        "4-0000-2359",
        "5-0000-2359",
        "6-0000-2359"
    ],
    "email": "john.doe@fakeemail.com",
    "utc_offset": -25200,
    "mobile_phone": null,
    "street": [],
    "notify_rule": [
        "one-email-0"
    ],
    "is_active": 1,
    "is_user_admin": 1,
    "phone": null,
    "is_layout_admin": 1,
    "is_live_video": 1,
    "is_device_admin": 1,
    "is_branded": 1,
    "alternate_email": null,
    "active_account_id": "00004206",
    "access_period": [],
    "is_staff": 0,
    "country": "US",
    "is_master": 0,
    "is_pending": 0
}
```

### HTTP Response (Json Attributes)

When successful, this API call returns Json data structure following the [User Model](#user-model)

### Error Status Codes

**When using the Simple Authentication scheme**

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Invalid token supplied
200	| User has been authorized for access to the realm

**When using the TFA scheme**

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Invalid token supplied, missing TFA code or attempting to authorize with expired TFA code
406	| Invalid TFA supplied or invalid TFA and invalid token supplied
429	| This user's account has been locked due to more than 3 failed attempts to Authorize
200	| User has been authorized for access to the realm

<!--===================================================================-->
## Forced vs. Optional TFA scheme
<!--===================================================================-->

Depending whether the account to which the user belongs enforces TFA or not, the user may be able to select Simple Authentication for their future log-ins rather than TFA  
In order to find out whether the account enforces TFA, examine the `'is_two_factor_authentication_forced'` flag in the account record returned by the [Get Account](#get-account) API Call
This flag can be set or cleared by the account superuser with the [Update Account](#update-account) API call  
If the `'is_two_factor_authentication_forced'` is set to 0 the user may switch to Simple Authentication
scheme. That is achieved by clearing `'is_two_factor_authentication_enabled'` flag in the User record
This can only be achieved by the user themselves (not by an account superuser)
Update of any TFA-related field in the User record is performed through a dedicated TFA update endpoint `'/g/aaa/two_factor_authenticate/update'`. See next section

<!--===================================================================-->
## TFA Update
<!--===================================================================-->

Data present in the User record that affects the TFA scheme is security-sensitive and therefore may only be altered using a dedicated endpoint, whose operation is itself TFA protected
This data includes three fields in the User model:

Field | Description | Remarks | Is Required
----- | ----------- | ------- | -----------
**sms_phone** | Phone number to which text messages (SMS) containing TFA code will be delivered | Can only be changed when using SMS for TFA code delivery <br/> Code will be delivered to the new phone number | true
**email** | E-mail address to which messages containing TFA code will be delivered | Can only be changed when using e-mail for TFA code delivery <br/> Code will be delivered to the new e-mail address | true
**is_two_factor_authentication_enabled** | 1 - user will be required to authenticate with TFA <br/> 0 - user will authenticate with a simple scheme | Can be updated with either SMS or e-mail delivery of TFA code | true

The fields described above may only be changed one at a time

TFA Update is a two-step process:

### 1. Request Update

This step initiates the TFA data update process

#### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/two_factor_authenticate/update`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**two_factor_authentication_type** | `'sms'` or `'email'` | Defines which method to use for TFA code delivery to verify this update request | true
**password** | string | The user's password | true
**update_json** | Json structure containing the name of the updated field and its new value. <br/>Only one field can be updated at a time | Example: <br/>`{` <br/>&nbsp;&nbsp;&nbsp;&nbsp;`'sms_phone':'+123456789'`<br/>`}` | true

#### HTTP Response

This API call returns no data

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied (i.e. update of `'sms_phone'` is requested with `'two_factor_authentication_type'` set to `'email'` or vice versa)
401	| Invalid credentials supplied
415	| Invalid TFA code delivery method supplied in `'two_factor_authentication_type'`
200	| Request succeeded (Proceed to verification)

### 2. Verify update request with TFA

#### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/two_factor_authenticate/verify`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**two_factor_authentication_code** | string    | The 4-digit code received via sms or e-mail | true

#### HTTP Response

This API call returns no data

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
406	| Invalid TFA code supplied
200	| Request succeeded

<!--===================================================================-->
## Authorized devices
<!--===================================================================-->

In order to make the log-in process as convenient as possible for the user,
the system will allow for use of the Simple Authentication scheme on devices
used previously by that user for a successful TFA-based log in.  
Upon a successful TFA-based log in, the **Authorize** API call sets a cookie `'tfa_key'` in the browser
Subsequent execution of **Authenicate** API Call with the correct username and password will start
of a Simple Authentication scheme, which can be told by absence of `'two_factor_authentication_code'` field in
the response of **Authenicate**. In such case one can skip the **Send TFA Code** API call and proceed immediately
to execute **Authorize** API Call, as is the process for a non-TFA-enabled user login

***NOTE 1:***

The same `'tfa_key'` value may be used for multiple users, who have successfully authorized in the past from the particular device

***NOTE 2:***

The list of authorized devices for any user is stored in the field `'user_authenticated_clients'` in the User record. See [User Model](#user-model) for details
