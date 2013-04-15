var restclient = require('./alphamailrestclient');

// Email contact

var EmailContact = exports.EmailContact = function(name, email, id){
	this.setName(name);
	this.setEmail(email);
	if(id != null){
		this.setIdentity(id);
	}
};

EmailContact.prototype.getIdentity = function(){
	return this.id;
};

EmailContact.prototype.setIdentity = function(id){
	this.id = id;
	return this;
};

EmailContact.prototype.getName = function(){
	return this.name;
};

EmailContact.prototype.setName = function(name){
	this.name = name;
	return this;
};

EmailContact.prototype.getEmail = function(){
	return this.email;
};

EmailContact.prototype.setEmail = function(email){
	this.email = email;
	return this;
};

// Email message payload

var EmailMessagePayload = exports.EmailMessagePayload = function(){
	this.data = {};

	// Set default values
	this.setReceiverId(0);
	this.setBodyObject({});
};

EmailMessagePayload.prototype.getDataObject = function(){
	return this.data;
};

EmailMessagePayload.prototype.getProjectId = function(){
	return this.data.project_id;
};

EmailMessagePayload.prototype.setProjectId = function(projectId){
	this.data.project_id = projectId;
	return this;
};

EmailMessagePayload.prototype.getSender = function(){
	return new EmailContact(this.data.sender_name, this.data.sender_email);
};

EmailMessagePayload.prototype.setSender = function(emailContact){
	this.data.sender = emailContact;
	return this;
};

EmailMessagePayload.prototype.getReceiverId = function(){
	return this.data.receiver_id;
};

EmailMessagePayload.prototype.setReceiverId = function(receiverId){
	this.data.receiver_id = receiverId;
	return this;
};

EmailMessagePayload.prototype.getReceiver = function(){
	return new EmailContact(this.data.receiver_name, this.data.receiver_email);
};

EmailMessagePayload.prototype.setReceiver = function(emailContact){
	this.data.receiver = emailContact;
	return this;
};

EmailMessagePayload.prototype.getBodyObject = function(){
	return this.data.payload ? JSON.parse(this.data.payload) : null;
};

EmailMessagePayload.prototype.setBodyObject = function(data){
	this.data.payload = data || {};
	return this;
};

// Email Service

var EmailService = exports.EmailService = function(options){
	this.client = new restclient.AlphaMailRestClient(options);
};

EmailService.prototype.setServiceUrl = function(baseUrl){
	this.client.setServiceUrl(baseUrl);
	return this;
};

EmailService.prototype.setApiToken = function(token){
	this.client.setApiToken(token);
	return this;
};

EmailService.prototype.queue = function(queueItem, callback){
	this.client.post('email/queue', queueItem.getDataObject(), callback);
	return this;
};