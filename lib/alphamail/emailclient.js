var restclient = require('./alphamailrestclient');

// Email client

var EmailClient = exports.EmailClient = function(options){
	this.client = new restclient.AlphaMailRestClient(options);
};

EmailClient.prototype.createQueueEntity = function(project_id, receiver_id, receiver_email, receiver_name, sender_email, sender_name, payload){
	return {
	    "project_id": project_id || -1,
	    "receiver_id": receiver_id || 0,
	    "receiver_email": receiver_email || '',
	    "receiver_name": receiver_name || '',
	    "sender_email": sender_email || '',
	    "sender_name": sender_name || '',
	    "body": JSON.stringify(payload || {})
	};
};

EmailClient.prototype.queue = function(queue_item, on_success, on_validation_error){
	this.client.post('email/queue', queue_item, on_success, on_validation_error);
	return this;
};