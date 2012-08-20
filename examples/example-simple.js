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

var emailService = new alphamail.EmailService()
    .setServiceUrl("http://api.amail.io/v1/")
    .setApiToken("YOUR-ACCOUNT-API-TOKEN-HERE");

var message = {
    content: "Some text that I want to have in my mail",
    other_content: "Other text that I want to have in my mail",
};

var payload = new alphamail.EmailMessagePayload()
    .setProjectId(2) // The id of the project your want to send with
    .setSender(new alphamail.EmailContact("Sender Company Name", "your-sender-email@your-sender-domain.com"))
    .setReceiver(new alphamail.EmailContact("Joe E. Receiver", "email-of-receiver@comfirm.se"))
    .setBodyObject(message);

emailService.queue(payload);