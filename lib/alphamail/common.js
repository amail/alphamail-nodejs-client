exports.Common = {};

exports.Common.handleResponse = function(statusCode, data, onSuccess, onValidationError, onAuthenticationError, onServiceError){
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