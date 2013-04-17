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

## Documentation (v1.1.4)

### EmailContact

#### Constructor

var contact = new alphamail.EmailContact(string name, string email[, string id]);
>Where name is same as contact.setName(name);
>Where email is same as contact.setEmail(email);
>Where id is same as contact.setIdentity(id);

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

#### Constructor

var payload = new alphamail.EmailMessagePayload();

#### Methods

* integer getProjectId()
>Get the identity of the AlphaMail Project to send with.

* EmailMessagePayload setProjectId(integer projectId)
>Set the identity of the AlphaMail Project to send with.
>Set the EmailContact to send with. I.e. this should be your sender email/name.
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
