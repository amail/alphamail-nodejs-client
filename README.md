Comfirm AlphaMail Node.js Client
================================
Use this library to connect your Node.js application to the AlphaMail system. 
Start sending transactional e-mail today without the hassle of SMTP and large blocks of unmaintainable HTML.

AlphaMail supports templating (Comlang), DKIM-signatures and reliable delivery. Beside that, we got awesome statistics.

http://amail.io/

## How to start?

1) Install with NPM:

    $ npm install alphamail

2) Sign Up:

    http://amail.io/

3) Send your first mail!
    
    var alphamail = require('alphamail');
    var emailService = new alphamail.EmailService("API-TOKEN");
     
    var data = {
        id: "abc-123-456",
        name: "Some Guy",
        profile_url: "http://domain.com/profile/ABC-123-456/",
        recommended_profiles: [
            {
                id: "abc-222-333",
                name: "Jane Joe",
                profile_url: "http://domain.com/profile/ABC-222-333/",
                profile_image_url: "http://img.domain.com/profile/abc-222-333.jpg",
                age: 24
            }
        ]
    };
    
    var payload = new alphamail.EmailMessagePayload()
        .setProjectId(1235) // ID of your AlphaMail project
        .setSender(new alphamail.EmailContact("My Company", "your@domain.com"))
        .setReceiver(new alphamail.EmailContact("Some guy", "some@guy.com"))
        .setBodyObject(data);
     
    emailService.queue(payload, function(error, result){
        if(error){
            console.log(error);
            return;
        }
        console.log("Email sent! ID = " + result);
    });
    
## Usage

Include the module

    var alphamail = require('alphamail');

Initialize an email service with your token

    var emailService = new alphamail.EmailService(apiToken);
    
<sub><i>Where apiToken is your AlphaMail token. Don't have a token? Head to http://amail.io/ and signup for a free AlphaMail account.</i></sub>
    
Queue an email for sending

    emailService.queue(payload, callback);

<sub><i>Where payload is:</i></sub>

    var payload = new alphamail.EmailMessagePayload()
        .setProjectId(12345) // ID of your AlphaMail project
        .setSender(new alphamail.EmailContact("My Company", "your@domain.com"))
        .setReceiver(new alphamail.EmailContact("Some guy", "some@guy.com"))
        .setBodyObject({/*Data to use in email*/});
        
<sub><i>Where callback is:</i></sub>

    var callback = function(error, result){
        if(error){
            console.log(error);
        }else{
            console.log("Mail successfully sent! ID = " + result);
        }
    };

## Documentation

### EmailService

```var emailService = new alphamail.EmailService("MY-ALPHAMAIL-API-TOKEN");```

#### Constructor

alphamail.EmailService(string token)

>setting parameter 'token' is the same as calling emailService.setApiToken(token);

#### Methods

* EmailService setServiceUrl(string url)
>Set the base service url. Default when not called: 'http://api.amail.io/v2/'

* EmailService setApiToken(string token)
>Set the API token to authenticate with.

* EmailService queue(EmailMessagePayload payload[, function callback])
>Queue an email for sending.
```
    emailService.queue(payload, function(error, result){
        if(error){
            console.log(error);
        }else{
            console.log("Mail successfully sent! ID = " + result);
        }
    });
```

### EmailContact

```var contact = new alphamail.EmailContact("Some Guy", "some@guy.com");```

#### Constructor

alphamail.EmailContact(string name, string email[, string id]);

>setting parameter 'name' is same as calling contact.setName(name);<br />
>setting parameter 'email' is same as calling contact.setEmail(email);<br />
>setting optional parameter 'id' is same as calling contact.setIdentity(id);

#### Methods

* string getName()
> Get the name of the contact.

* EmailContact setName(string name)
> Set the name of the contact. E.g. 'John Snow'

* string getEmail()
> Get the email of the contact.

* EmailContact setEmail(string email)
> Set the email of the contact. E.g. 'john.snow@nightswatch.gov'

* string getIdentity()
> Get the identity of the contact.

* EmailContact setIdentity(string id)
> Set the identity of the contact. Note! Currently only handled when setting a receiver contact.

### EmailMessagePayload

```var payload = new alphamail.EmailMessagePayload();```

#### Constructor

alphamail.EmailMessagePayload()

#### Methods

* integer getProjectId()
>Get the identity of the AlphaMail Project to send with.

* EmailMessagePayload setProjectId(integer projectId)
>Set the identity of the AlphaMail Project to send with.
```
    payload.setProjectId(12345);
```

* EmailContact getSender()
>Get the EmailContact to send with.

* EmailMessagePayload setSender(EmailContact sender)
>Set the EmailContact to send with. I.e. this should be your sender email/name.
```
    payload.setSender(
        new alphamail.EmailContact(
            "Your Company", // Name
            "you@domain.com" // Email
        )
    );
```

* string getReceiver()
>Get the EmailContact to send to.

* EmailMessagePayload setReceiver(EmailContact receiver)
>Set the EmailContact to send to. I.e. this should be the email/name that you want to send to.
```
    payload.setReceiver(
        new alphamail.EmailContact(
            "John Wayne", // Name
            "john@wayne.com", // Email
            "jwayne1979" // Optional identifier
        )
    );
```

* object getBodyObject()
>Get the payload data.

* EmailMessagePayload setBodyObject(object body)
>Set the payload data. This is the data that you'll use in AlphaMail to format your email.
```
    payload.setBodyObject({
        id: "abc-123-456",
        name: "Some Guy",
        profile_url: "http://domain.com/profile/ABC-123-456/",
        sso_url: "http://domain.com/login/ABC-123-456-789-000-FFF/"
    });
```

## Error Handling

All errors created by this module are instances of the JavaScript Error object.
When returned by a service, the error object is decorated with the property 'code'.
In callbacks, the error parameter is always the first parameter (as shown below).

```
function(error, result){
    if(error){
        console.log(error.name);
        console.log(error.message);
        console.log(error.code); // Only present in the context of a service
    }
}
```

## Debugging

### Logging

If you're interested in accessing verbose logs generated by this library you can override the method 'log' on alphamail.Logger.

```
alphamail.Logger.log = function(message){
    console.log(message);
};
```

## Frequently Asked Questions (FAQ)

### I'm having trouble with Unicode data

>This library has full Unicode support (UTF-8). If you're experiencing issues with Unicode, ensure that the data that you are passing is a UTF-8 encoded string and not a Buffer. You can do this by calling 'toString' as demonstrated below.

```
someVariable.toString("utf8");
```

### Can I use multiple recipients?

>Since the AlphaMail API is a "transactional only" API, support for multiple recipients is currently not available.<br />
>But this feature is planned!

## Author & License

Robin Orheden (robin@amail.io)

    Copyright (C) 2013 Robin Orheden
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
