Comfirm AlphaMail Node.js Client
================================
Use this library to connect your Node.js application to the AlphaMail system. 
Start sending transactional e-mail today without the hassle of SMTP and large blocks of unmaintainable HTML.

AlphaMail supports templating (Comlang), DKIM-signatures and reliable delivery. Beside that, we got awesome statistics.

http://amail.io/


1) Install with NPM:

    $ npm install alphamail

2) Sign Up:

    http://amail.io/

3) Send your first mail!
    
    var alphamail = require('alphamail');
    var emailService = new alphamail.EmailService("API-TOKEN");
     
    var data = {name:"Joe", pwns:true, likesCats:"certainly"};
    var payload = new alphamail.EmailMessagePayload()
        .setProjectId(1235) // ID of your AlphaMail project
        .setSender(new alphamail.EmailContact("My Company", "your@domain.com"))
        .setReceiver(new alphamail.EmailContact("Some dude", "receiver@some55-domain.com"))
        .setBodyObject(data);
     
    emailService.queue(payload, function(error, result){
        if(error){
            console.log(error);
            return;
        }
        console.log("Email sent! ID = " + result);
    });
