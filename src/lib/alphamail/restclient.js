var url = require('url');
var http = require('http');
var https = require('https');
var logger = require('./logger').Logger;

var RestClient = exports.RestClient = function(options){
	// Set default object values
	this.headers = {};
	options = options || {};

	if(options.base_url){
		this.setBaseUrl(options.baseUrl);
	}

	if(options.basicAuthentication){
		this.setBasicAuthentication(
			options.basicAuthentication.username,
			options.basicAuthentication.password);
	}

	this.options = options;
};

RestClient.prototype.resolveUrl = function(path){
	return url.parse(url.resolve(this.getBaseUrl(), path));
};

// High level set methods

RestClient.prototype.getBaseUrl = function(){
	return this.options.baseUrl;
}

RestClient.prototype.setBaseUrl = function(baseUrl){
	var baseUrl = this.options.baseUrl = url.parse(baseUrl);
	return this;
};

RestClient.prototype.setBasicAuthentication = function(username, password){
	this.setHeader("Authorization", "Basic " + new Buffer((username || '') + ":" + (password || ''))
		.toString("base64"));

	return this;
};

RestClient.prototype.setHeader = function(key, value){
	this.headers[key] = value;
	return this;
};

// High level request methods

RestClient.prototype.get = function(path, onComplete, onConnectionError){
	this.rawRequest('get', path, null, null, onComplete, onConnectionError);
	return this;
};

RestClient.prototype.put = function(path, body_object, onComplete, onConnectionError){
	this.rawRequest('put', path, body_object, null, onComplete, onConnectionError);
	return this;
};

RestClient.prototype.post = function(path, body_object, onComplete, onConnectionError){
	this.rawRequest('post', path, body_object, null, onComplete, onConnectionError);
	return this;
};

RestClient.prototype.delete = function(path, onComplete, onConnectionError){
	this.rawRequest('delete', path, null, null, onComplete, onConnectionError);
	return this;
};

// For teh 1337's and epic customizer

RestClient.prototype.rawRequest = function(method, path, body_object, headers, onComplete, onConnectionError){
	var outer_scope = this;

	var headerData = {};
	var dataToWrite = null;
	var requestMethod = method.toUpperCase();
	var requestUrl = this.resolveUrl(path);

	// Set the target host
	headerData.Host = requestUrl.host;

	// Build body content if applicable/available
	if(body_object != null && (requestMethod == 'PUT' || requestMethod == 'POST')){
		dataToWrite = JSON.stringify(body_object);
		headerData['Content-Type'] = 'application/json';
		headerData['Content-Length'] = Buffer.byteLength(dataToWrite, 'utf8');
		data = null;
	}

	// Start by copying global scope headers
	Object.keys(outer_scope.headers).forEach(function(key){
		headerData[key] = outer_scope.headers[key];
	});

	// Add local scope variables if available
	if(headers){
		Object.keys(headers).forEach(function(key){
			headerData[key] = headers[key];
		});
	}

	// Build request
	var requestData = {
		hostname: requestUrl.host, port: 80,
		path: requestUrl.pathname,
		method: requestMethod,
		headers: headerData
	};
	
	// Log request
	logger.log("Request.New: " + JSON.stringify(requestData));
	
	// Create our request
	var request = http.request(requestData, function(response){
		var data = "";
        response.setEncoding('utf8');

        response.on('data', function(chunk) {
        	data += chunk;
        });

		response.on('error', function(error){
			// Discard any errors
			console.log("Request.New.Error: " + error);
		});

		response.on('end', function() {
			var contentType = response.headers['content-type'];

			var parsedData = contentType == 'json' || contentType == 'application/json'
				? JSON.parse(data) : data;

			// Handle redirections.. (status code > 300 < 400)

			onComplete(response, parsedData);
			data = parsedData = null;
		});
	});
	
	// Handle any connection/transport errors
	request.on('error', function(error){
		var connectionErrorFallback = onConnectionError || outer_scope.options.onConnectionError;
		if(connectionErrorFallback){
			var message = "Unknown error";

			switch(error.code){
				// End-point not found
				case 'ENOTFOUND':
					message = "Unable to resolve endpoint '" + outer_scope.getBaseUrl() + "'";
					break;
			}

	    	connectionErrorFallback(message);
    	}
	});

	if(dataToWrite){
		logger.log("Request.New.Body: " + dataToWrite);
		request.write(dataToWrite);
		dataToWrite = null;
	}

	request.end();

	return this;
};