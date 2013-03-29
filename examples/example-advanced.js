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

var alphamail = require('alphamail');

// Step #1: Let's start by entering the web service URL and the API-token you've been provided
// If you haven't gotten your API-token yet. Log into AlphaMail or contact support at 'support@comfirm.se'.
var emailService = new alphamail.EmailService()
    .setServiceUrl("http://api.amail.io/v2/")
    .setApiToken("YOUR-ACCOUNT-API-TOKEN-HERE");

// Step #2: Let's create a message with the data we want to use in our template
var message = {
    // Represents the <# payload.message #> in our template
    message: "Hello world like a boss!",
    // Represents the <# payload.some_other_message #> in our template
    some_other_message: "And to the rest of the world! Chíkmàa! مرحبا! नमस्ते! Dumelang!"
};

// Step #3: Let's set up everything that is specific for delivering this email
var payload = new alphamail.EmailMessagePayload()
    .setProjectId(12345) // The id of the project your want to send with
    .setSender(new alphamail.EmailContact("Sender Company Name", "your-sender-email@your-sender-domain.com"))
    .setReceiver(new alphamail.EmailContact("Joe E. Receiver", "email-of-receiver@comfirm.se"))
    .setBodyObject(message);

// Step #4: Haven't we waited long enough. Let's send this!
emailService.queue(payload, {
    // Success!
    onSuccess: function(queueId){
        // Step #5: Pop the champagné! We got here which mean that the request was sent successfully and the email is on it's way!        
        console.log("Successfully queued message with id '" + queueId + "' (you can use this ID to get more details about the delivery)");
    },
    // Oh heck. Something went wrong. But don't stop here.
    // If you haven't solved it yourself. Just contact our brilliant support and they will help you.
    // Validation error
    onValidationError: function(errorCode, message){
        // Example: Handle request specific error code here
        if (errorCode == 3){
            // Example: Print a nice message to the user.
        }else{
            // Something in the input was wrong. Probably good to double double-check!
            console.log("Validation error: " + message + " (" + errorCode + ")");
        }
    },
    // Authentication error
    onAuthenticationError: function(errorCode, message){
        // Ooops! You've probably just entered the wrong API-token.
        console.log("Authentication error: " + message + " (" + errorCode + ")");
    },
    // Service error
    onInternalError: function(errorCode, message){
        // Not that it is going to happen.. Right :-)
        console.log("Internal error: " + message + " (" + errorCode + ")");
    },
    // Connection error
    onConnectionError: function(message){
        // Most likely your internet connection that is down. We are covered for most things except "multi-data-center-angry-server-bashing-monkeys" (remember who coined it) or.. nuclear bombs.
        // If one blew. Well.. It's just likely that our servers are down.
        console.log("An error (probably related to connection) occurred: " + message);
    }
});