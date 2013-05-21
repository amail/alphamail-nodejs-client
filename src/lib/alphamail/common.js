var Common = exports.Common = {};

Common.resolveEventObject = function(value){
	var result = null;

	if(value == null){
		result = {};
	}else if (typeof(value) == 'function') {
		var errorCallback = function(errorCode, message){
			var error = new Error(message);
			error.code = errorCode; // Attach code
			value(error);
		};

		result = {
			onSuccess: function(result, message){
				value(false, result);
			},
			onValidationError: errorCallback,
			onAuthenticationError: errorCallback,
			onServiceError: errorCallback,
			onConnectionError: errorCallback
		};
	}else{
		result = value;
	}

	return result;
};

Common.handleResponse = function(statusCode, data, onSuccess, onValidationError, onAuthenticationError, onServiceError){
	switch(statusCode){
		case 200: case 201: case 202:
			// Success
			if(data.error_code == 0){
				if(onSuccess){
					onSuccess(data.result, data.message);
				}
			}else{
				if(onServiceError){
					onServiceError(data.error_code, data.message);
				}
			}
			break;
		case 401: case 403:
			// Unauthorized
			if(onAuthenticationError){
				onAuthenticationError(data.error_code, data.message);
			}
			break;
		case 400: case 405:
			// Bad request (due to validation)
			if(onValidationError){
				onValidationError(data.error_code, data.message);
			}
			break;
		case 500:
			// AlphaMailInternalException
			if(onServiceError){
				onServiceError(data);
			}
			break;
		default:
			// AlphaMailServiceException
			if(onServiceError){
				onServiceError(data);
			}
			break;
	}
};
