/*
The MIT License

Copyright (c) 2012 Comfirm <http://www.comfirm.se/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// In doubt or experiencing problems?
// Please email our support at 'support@comfirm.se'

// If missing, run # npm install alphamail
var alphamail = require('alphamail');
var emailService = new alphamail.EmailService("YOUR-ACCOUNT-API-TOKEN-HERE");

var message = {
    user: {
        id: 12345,
        username: "jdoe75",
        firstName: "John",
        lastName: "Doe"
    }
};

var payload = new alphamail.EmailMessagePayload()
    .setProjectId(12345) // ID of your project
    .setSender(new alphamail.EmailContact("My Company", "your@domain.com"))
    .setReceiver(new alphamail.EmailContact("Some dude", "receiver@some55-domain.com"))
    .setBodyObject(message);

emailService.queue(payload, function(error, result){
    if(error){
        console.log(error);
    }else{
        console.log("Mail successfully sent! ID = " + result);
    }
});
