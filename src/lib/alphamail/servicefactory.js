var projectservice = require('./projectservice'),
	signatureservice = require('./signatureservice'),
	emailservice = require('./emailservice');

// Service Factory

var ServiceFactory = exports.ServiceFactory = function(options){
	this.options = options;
	if(this.options.token){
		this.setToken(this.options.token);
	}
};

ServiceFactory.prototype.setToken = function(token){
	this.options.basic_authentication = {
		password: token
	};
};

ServiceFactory.prototype.create = function(name){
	var service = null;

	switch(name.toLowerCase()){
		case 'project':
			service = new projectservice.ProjectService(this.options);
			break;
		case 'signature':
			service = new signatureservice.SignatureService(this.options);
			break;
		case 'email':
			service = new emailservice.EmailService(this.options);
			break;
	}

	return service;
};
