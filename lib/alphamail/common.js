exports.Common = {};

exports.Common.handleResponse = function(status_code, data, on_success, on_validation_error, on_authentication_error, on_service_error){
	switch(status_code){
		case 200: case 201: case 202:
			// Success
			if(data.error_code == 0){
				if(on_success){
					on_success(data.result, data.message);
				}
			}else{
				if(on_service_error){
					on_service_error(data.error_code, data.message);
				}
			}
			break;
		case 401: case 403:
			// Unauthorized
			if(on_authentication_error){
				on_authentication_error(data.error_code, data.message);
			}
			break;
		case 400: case 405:
			// Bad request (due to validation)
			if(on_validation_error){
				on_validation_error(data.error_code, data.message);
			}
			break;
		case 500:
			// AlphaMailInternalException
			if(on_service_error){
				on_service_error(data);
			}
			break;
		default:
			// AlphaMailServiceException
			if(on_service_error){
				on_service_error(data);
			}
			break;
	}
};