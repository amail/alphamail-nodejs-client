var common = require('./common').Common,
	restclient = require('./restclient');

var AlphaMailRestClient = exports.AlphaMailRestClient = function(token){
	this.options = {};
	this.client = new restclient.RestClient();
	this.setServiceUrl("http://api.amail.io/v2/");
	this.setApiToken(token);
};

AlphaMailRestClient.prototype.setServiceUrl = function(base_url){
	this.client.setBaseUrl(base_url);
	return this;
};

AlphaMailRestClient.prototype.setApiToken = function(token){
	this.client.setBasicAuthentication(null, token);
	return this;
};

AlphaMailRestClient.prototype.get = function(path, events){
	var outerScope = this;
	events = common.resolveEventObject(events);
	
	this.client.get(path, function(response, data){
		common.handleResponse(response.statusCode, data, events.onSuccess, events.onValidationError,
			events.onAuthenticationError || outerScope.options.on_authentication_error,
			events.onServiceError || outerScope.options.on_service_error);
	}, events.onConnectionError);
	
	return this;
};

AlphaMailRestClient.prototype.put = function(path, bodyObject, events){
	var outerScope = this;

	bodyObject = bodyObject || {};
	events = common.resolveEventObject(events);

	this.client.put(path, bodyObject, function(response, data){
		common.handleResponse(response.statusCode, data, events.onSuccess, events.onValidationError,
			events.onAuthenticationError || outerScope.options.on_authentication_error,
			events.onServiceError || outerScope.options.on_service_error);
	}, events.onConnectionError);
	
	return this;
};

AlphaMailRestClient.prototype.post = function(path, bodyObject, events){
	var outerScope = this;

	bodyObject = bodyObject || {};
	events = common.resolveEventObject(events);

	this.client.post(path, bodyObject, function(response, data){
		common.handleResponse(response.statusCode, data, events.onSuccess, events.onValidationError,
			events.onAuthenticationError || outerScope.options.on_authentication_error,
			events.onServiceError || outerScope.options.on_service_error);
	}, events.onConnectionError);
	
	return this;
};

AlphaMailRestClient.prototype.delete = function(path, events){
	var outerScope = this;
	events = common.resolveEventObject(events);

	this.client.delete(path, function(response, data){
		common.handleResponse(response.statusCode, data, events.onSuccess, events.onValidationError,
			events.onAuthenticationError || outerScope.options.on_authentication_error,
			events.onServiceError || outerScope.options.on_service_error);
	}, events.onConnectionError);

	return this;
};