var restclient = require('./alphamailrestclient');

// Signature Service

var SignatureService = exports.SignatureService = function(options){
	this.client = new restclient.AlphaMailRestClient(options);
};

SignatureService.prototype.setServiceUrl = function(baseUrl){
	this.client.setServiceUrl(baseUrl);
	return this;
};

SignatureService.prototype.setApiToken = function(token){
	this.client.setApiToken(token);
	return this;
};

SignatureService.prototype.createEntity = function(name, templateId, signatureId){
	return {
		name: name,
		template_id: templateId,
		signature_id: signatureId
	};
};

SignatureService.prototype.create = function(signature, events){
	this.client.post('signatures', signature, events);
	return this;
};

SignatureService.prototype.getAll = function(events){
	this.client.get('signatures', events);
	return this;
};

SignatureService.prototype.getSingle = function(signatureId, events){
	this.client.get('signatures/'+signatureId, events);
	return this;
};

SignatureService.prototype.update = function(signature, events){
	this.client.put('signatures/'+signature.id, signature, events);
	return this;
};

SignatureService.prototype.delete = function(signatureId, events){
	this.client.delete('signatures/'+signatureId, null, events);
	return this;
};