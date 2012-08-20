var url = require('url'),
	http = require('http'),
	https = require('https');

var RestClient = exports.RestClient = function(options){
	// Set default object values
	this.client = {};
	this.headers = {};

	if(options.base_url){
		this.setBaseUrl(options.baseUrl);
	}

	if(options.basicAuthentication){
		this.setBasicAuthentication(
			options.basicAuthentication.username,
			options.basicAuthentication.password);
	}

	this.options = options || {};
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
	var client = this.client = http.createClient(baseUrl.port || 80, baseUrl.host);
	
	client.on('error', function(error){
		// Don't let it go un handled.. Let it pass to request scope.
	});

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
		headerData['Content-Length'] = dataToWrite.length;
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

	// Create our request
	var request = this.client.request(requestMethod,
		requestUrl.pathname, headerData);

	if(dataToWrite){
		request.write(dataToWrite);
		dataToWrite = null;
	}

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

	    	connectionErrorFallback(request, error, message);
    	}
	});

	// Handle response.. Read data and trigger callbacks
	request.on('response', function(response) {
			var data = "";
	        response.setEncoding('utf8');

	        response.on('data', function(chunk) {
	        	data += chunk;
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

	request.end();

	return this;
};