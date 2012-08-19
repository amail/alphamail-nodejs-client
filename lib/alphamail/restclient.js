var url = require('url'),
	http = require('http'),
	https = require('https');

var RestClient = exports.RestClient = function(options){
	// Set default object values
	this.client = {};
	this.options = {};
	this.headers = {};
	this.on_connection_error = {};

	if(options.base_url){
		this.setBaseUrl(options.base_url);
	}

	if(options.basic_authentication){
		this.setBasicAuthentication(
			options.basic_authentication.username,
			options.basic_authentication.password);
	}

	this.options = options;
};

RestClient.prototype.resolveUrl = function(path){
	return url.parse(url.resolve(this.options.base_url, path));
};

// High level set methods

RestClient.prototype.setBaseUrl = function(base_url){
	var base_url = this.options.base_url_parsed = url.parse(base_url);
	var client = this.client = http.createClient(base_url.port || 80, base_url.host);
	
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

RestClient.prototype.get = function(path, on_completed, on_error){
	this.rawRequest('get', path, null, null, on_completed, on_error);
	return this;
};

RestClient.prototype.put = function(path, body_object, on_completed, on_error){
	this.rawRequest('put', path, body_object, null, on_completed, on_error);
	return this;
};

RestClient.prototype.post = function(path, body_object, on_completed, on_error){
	this.rawRequest('post', path, body_object, null, on_completed, on_error);
	return this;
};

RestClient.prototype.delete = function(path, on_completed, on_error){
	this.rawRequest('delete', path, null, null, on_completed, on_error);
	return this;
};

// For teh 1337's and epic customizer

RestClient.prototype.rawRequest = function(method, path, body_object, headers, on_success, on_response_error, on_connection_error){
	var outer_scope = this;

	var header_data = {};
	var data_to_write = null;
	var request_method = method.toUpperCase();
	var request_url = this.resolveUrl(path);

	// Set the target host
	header_data.Host = request_url.host;

	// Build body content if applicable/available
	if(body_object != null && (request_method == 'PUT' || request_method == 'POST')){
		data_to_write = JSON.stringify(body_object);
		header_data['Content-Type'] = 'application/json';
		header_data['Content-Length'] = data_to_write.length;
		data = null;
	}

	// Start by copying global scope headers
	Object.keys(outer_scope.headers).forEach(function(key){
		header_data[key] = outer_scope.headers[key];
	});

	// Add local scope variables if available
	if(headers){
		Object.keys(headers).forEach(function(key){
			header_data[key] = headers[key];
		});
	}

	// Create our request
	var request = this.client.request(request_method,
		request_url.pathname, header_data);

	if(data_to_write){
		request.write(data_to_write);
		data_to_write = null;
	}

	// Handle any connection/transport errors
	request.on('error', function(error){
		var connection_error_callback = on_connection_error || outer_scope.on_connection_error;
		if(connection_error_callback){
			var message = "Unknown error";

			switch(error.code){
				// End-point not found
				case 'ENOTFOUND':
					message = "Unable to resolve endpoint '" + outer_scope.options.base_url + "'";
					break;
			}

	    	connection_error_callback(request, error, message);
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
				var content_type = response.headers['content-type'];

				var parsed_data = content_type == 'json' || content_type == 'application/json'
					? JSON.parse(data) : data;

				if(response.statusCode >= 400 || response.statusCode < 200){
					if(on_response_error){
						on_response_error(response, response.statusCode, parsed_data);
					}
				}else if(response.statusCode >= 300){
					// Redirection...
				}else if(response.statusCode >= 200){
					// Successful!
					if(on_success){
						on_success(response, response.statusCode, parsed_data);
					}
				}

				data = parsed_data = null;
			});
	});

	request.end();

	return this;
};