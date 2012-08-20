var common = require('./common').Common,
	restclient = require('./restclient');

var AlphaMailRestClient = exports.AlphaMailRestClient = function(options){
	this.options = options;
	this.client = new restclient.RestClient(options);
};

AlphaMailRestClient.prototype.get = function(path, on_success, on_validation_error){
	var outer_scope = this;
	
	this.client.get(path, function(response, data){
		common.handleResponse(response.statusCode, data, on_success, on_validation_error,
			outer_scope.options.on_authentication_error, outer_scope.options.on_service_error);
	});
	
	return this;
};

AlphaMailRestClient.prototype.put = function(path, body_object, on_success, on_validation_error){
	var outer_scope = this;
	
	this.client.put(path, body_object, function(response, data){
		common.handleResponse(response.statusCode, data, on_success, on_validation_error,
			outer_scope.options.on_authentication_error, outer_scope.options.on_service_error);
	});
	
	return this;
};

AlphaMailRestClient.prototype.post = function(path, body_object, on_success, on_validation_error){
	var outer_scope = this;
	
	this.client.post(path, body_object, function(response, data){
		common.handleResponse(response.statusCode, data, on_success, on_validation_error,
			outer_scope.options.on_authentication_error, outer_scope.options.on_service_error);
	});
	
	return this;
};

AlphaMailRestClient.prototype.delete = function(path, on_success, on_validation_error){
	var outer_scope = this;
	
	this.client.delete(path, function(response, data){
		common.handleResponse(response.statusCode, data, on_success, on_validation_error,
			outer_scope.options.on_authentication_error, outer_scope.options.on_service_error);
	});

	return this;
};