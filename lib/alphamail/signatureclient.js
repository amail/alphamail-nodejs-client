var restclient = require('./alphamailrestclient');

// Signature client

var SignatureClient = exports.SignatureClient = function(options){
	this.client = new restclient.AlphaMailRestClient(options);
};

SignatureClient.prototype.createEntity = function(name, template_id, signature_id){
	return {
		name: name,
		template_id: template_id,
		signature_id: signature_id
	};
};

SignatureClient.prototype.create = function(signature, on_success, on_validation_error){
	this.client.post('signatures', signature, on_success, on_validation_error);
	return this;
};

SignatureClient.prototype.getAll = function(on_success, on_validation_error){
	this.client.get('signatures', on_success, on_validation_error);
	return this;
};

SignatureClient.prototype.getSingle = function(signature_id, on_success, on_validation_error){
	this.client.get('signatures/'+signature_id, on_success, on_validation_error);
	return this;
};

SignatureClient.prototype.update = function(signature, on_success, on_validation_error){
	this.client.put('signatures/'+signature.id, signature, on_success, on_validation_error);
	return this;
};

SignatureClient.prototype.delete = function(signature_id, on_success, on_validation_error){
	this.client.delete('signatures/'+signature_id, null, on_success, on_validation_error);
	return this;
};