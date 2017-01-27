# Authentication

## Overview

Gaining access to the Eagle Eye API is a two-stage process: Clients first present their credentials and Realm to obtain a single use Authentication Token. This single use token is valid for a pre-defined duration or until it has been used. Once the Authentication Token is obtained the Client must utilize it in an Authorize service call to obtain a session ID (via the "auth_key" Cookie) that provides access to resources. This two phase approach allows Clients to authenticate and operate in multiple domains. The first step is done using Authenticate. The second step is done using Authorize. Note that the Authenticate call must be done over an https connection.

In addition to the simple authentication scheme described above, also a more secure authentication scheme, known as **Two Factor Authentication** (TFA) may be used. TFA is a method of confirming a user's claimed identity by utilizing a combination of two different components. The first component is a user's password and the second is a one-time TFA code delivered to the user via another communication channel - e-mail or a text message sent to the user's mobile phone.

Whether simple or TFA authentication scheme is used for a particular user's login is determined by this user's settings in the system. Note, however, that an account administrator may enforce all users in a particular account to use TFA scheme.

If TFA scheme is in use, the Authorize call will expect the TFA code to be passed in addition to the token obtained from the Authenticate call.

Once the "auth_key" cookie is obtained from the "Authorize" call, there are 2 methods for which you can use the session ID to make subsequent calls to the API. The first, is simply to pass the "auth_key" cookie with all API requests. The second method, is to take the value of the "auth_key" cookie and pass it in the request as the "A" parameter. The "A" parameter can be used with any method (GET, PUT, POST, DELETE). The order of precedence for session ID retrieval is as follows:

1. "A" parameter in the query string of any method (GET, PUT, POST, DELETE)
2. "A" parameter in the POST data
3. "A" parameter in the request body (e.g. PUT)
4. "auth_key" cookie

All status codes are listed in order of precedence, meaning the first one listed is the one returned if its respective conditions are met, and the last one listed is the one that will be returned if none of the preceding codes' conditions are met.

<!--===================================================================-->
## Step 1: Authenticate
> Request

```shell
curl -v --request POST https://login.eagleeyenetworks.com/g/aaa/authenticate --data-urlencode "username=[USERNAME]" --data-urlencode "password=[PASSWORD]"
```

> Json Response, simple authentication

```json
{
  "token": "O3k0hNH3jQgjaxC0bLG9/5cM+Z7eWdPe0c+UpEZNXOs7PTFH45Dr9M3wxLkP6GjcPuCw8lXVTkHGA1zgx/q44HBv3Xmcj4/XzN2f6Hv+mZVIy8LorX8N5a6fNVRknWWW86nCHfbLvOP6TPcmBP1dD10ynnGeAdlQHTqMN5mvKH24WwZgVFbM4DyhyWu+eTN+t1XNROegJdZRjhaYCZ1FVKkdnrlsrMD6JSr/tE7byCLVjPcwzVabA+x0tDbGipystTNYPZyDVr3DQM70SV6kfqg2irlC8/zDu7a2EhI1IQWuZZ2GQIQm5jBtj9UR/p7ainHVhEc/bSFYUCvziepcAa=="
}
```

> Json Response, TFA authentication

```json
{
  "token": "MiDUwMQqwP1JsfKqbqT1DQ8hJFHEOZfROEUtBvnuqv0ICxvcOybkS1n9/awjrJ9YKijb60GqdUDPP8TW4o8Ei8iI8OXC/dj74KC2cLMxJ2vs/hmYPfbW8OpCwf0k683a2LfIbjcC3Uy/SmDpOsxVdPMTXQEGJHXD3ItmAvoQ5MOoRKfHBNOu7OJBWQjPUjeP0fkHSrx8JgAHSqT5SwRM0mLysFmiFHF0h7/5Apt81dDhZwLBDwwSrl+kTqgn+wnw6rJ432liESdK+yp3Qefk1wAtytoTJkkBE2srqsHJdW4ryVYKk9SKA62Cz7pO3VUaD8Yxx9Ff2Os9ez6TdfBmqg==",
  "two_factor_authentication_code":
  {
    "sms": "+xxxxxxxx779",
    "email": "xxxxxxxxxxx.01@gmail.com"
  }
}
```

Login is a 2 step process when using simple authentication and a 3 step process using TFA scheme.

*Simple scheme:*  
Authenticate, then Authorize with the token returned by Authenticate.  

*TFA scheme:*  
Authenticate, Send TFA Code to the user, Authorize with the token received from step 1 and the TFA code received from step 2

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/authenticate`

Parameter   	| Data Type   
---------   	| -----------
**username** 	| string      
**password** 	| string     

### HTTP Response

Returned parameters  | Data Type  |  Description
----------       | ---------  | ------------
**token**            | string     | token to be used in Authorize step
**two_factor_authentication_code**            | JSON dictionary with two keys:<br/>**sms** - scrubbed user's SMS number,<br/>**email** - scrubbed user's e-mail address    | present in response only if TFA scheme is being used.

*NOTE 1:*  
The validity of token is:

* 30 seconds, for simple authentication
* 15 minutes, for TFA scheme


*NOTE 2:*  
For TFA scheme, the system uses the parameter `sms_phone` of the user's model (see **User Model** section).
That parameter MUST be specified at the user's creation time (see **Create User** API Call)*
If user's parameter `sms_phone` has not been set, the value of the **sms** key will be `No sms phone found.`



### Error Status Codes

HTTP Status Code    | Data Type   
---------           | -----------
400 | Some argument(s) are missing or invalid
401 | Supplied credentials are not valid
402 | Account is suspended
460 | Account is inactive
461 | Account is pending
412\* | User is disabled  
462 | User is pending. This will be thrown before 401 if username is valid and Account is active.
200 | User has been authenticated. Body contains JSON encoded result

\* Code 412 is also returned if TFA scheme is used and the user's account has been locked due to more than 3 failed attempts to authorize with a TFA code.


<!-- TODO: verify if the list above is complete==-->

<!--===================================================================-->
## Step 2: Send TFA Code (only if using TFA Scheme)

> Request, simple authentitaction scheme

```shell
curl -D - --request POST https://login.eagleeyenetworks.com/g/aaa/two_factor_authenticate --data-urlencode token=[TOKEN] two_factor_authentication_type=sms
```

```shell
curl -D - --request POST https://login.eagleeyenetworks.com/g/aaa/two_factor_authenticate --data-urlencode token=[TOKEN] two_factor_authentication_type=email
```


This step is only to be executed when TFA scheme is used for the user log in, i.e., if the Authenticate call returned `two_factor_authentication_code` key in response.
Otherwise proceed to step 3: Authorize.

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/two_factor_authenticate`

Parameter   	| Data Type   
---------   	| -----------
**token** 	| string <br/> token received in step 1    
**two_factor_authentication_type** 	| string <br/> Must be 'sms'  or 'email'


### HTTP Response

This API call does not return data in response.

*NOTE 1:*  
The validity of TFA code sent to the user is 15 minutes.


### Response Status Codes

HTTP Status Code    | Data Type   
---------           | -----------
400 | Some argument(s) are missing or invalid
412 | Unable to send TFA code with the TFA authentication type selected
415 | Specified TFA authentication type not supported
200 | Success, TFA code has been sent to the user



<!--===================================================================-->
## Step 3: Authorize

> Request, simple authentitaction scheme

```shell
curl -D - --request POST https://login.eagleeyenetworks.com/g/aaa/authorize --data-urlencode token=[TOKEN]
```

> Request, TFA scheme

```shell
curl -D - --request POST https://login.eagleeyenetworks.com/g/aaa/authorize --data-urlencode token=[TOKEN] two_factor_authentication_code=[TFA_CODE]
```


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

Authorize is the final step of the Login process, by using the token from the first step (Authenticate) and - if TFA scheme is used - the TFA code delivered to the user by e-mail or SMS.
A Successful Authorize call returns an authorized user object, and sets the 'auth_key' cookie. For all subsequent API calls, either the cookie can be sent or the value of the cookie can be sent as the 'A' parameter.

The host url for API calls can originally be done against "https://login.eagleeyenetworks.com", but after authorization is returned the API should then use the **branded subdomain** as returned from authorization.
As such the branded host url will become "https://[active_brand_subdomain].eagleeyenetworks.com" where the **active_brand_subdomain** field is returned in the authorization response.

For example after the authorization in the example on the right, the host url should be changed to "https://c001.eagleyenetworks.com".

Each account will consistently have the same **branded subdomain** and as such will not change throughout the life of the session.
Caching the subdomain is safe to do as long as the client software validates against the active_brand_subdomain after authorization.  Using the **branded subdomain** is important for speed and robustness.


### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/authorize`

Parameter   | Data Type		
---------	| -----------   
**token**   | string      	
**two_factor_authentication_code**   | string, 4 decimal digits

*NOTE 1:*  
More than 3 failed attempts to Authorize with TFA code will lock the user's account. It then can only be unlocked by Eagle Eye's technical support staff.  
When the user's account has been locked the user is notified of this fact by e-mail.



### HTTP Response

When successful, this API call returns JSON data structure corresponding to User Model (see section User Model)


### Error Status Codes

**When using simple authentication scheme**

HTTP Status Code    | Data Type   
---------           | -----------
400 | Some argument(s) are missing or invalid
401 | Invalid Token supplied
200 | User has been authorized for access to the realm

**When using TFA authentication scheme**

HTTP Status Code    | Data Type   
---------           | -----------
400 | Some argument(s) are missing or invalid
401 | Invalid Token supplied, or missing TFA code, or attempting to authorize with expired TFA code
406 | Invalid TFA supplied or Invalid TFA and invalid Token supplied
429 | This user's account has been locked due to more than 3 failed attempts to Authorize
200 | User has been authorized for access to the realm
