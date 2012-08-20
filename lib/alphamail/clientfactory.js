var projectclient = require('./projectclient');
var signatureclient = require('./signatureclient');
var emailclient = require('./emailclient');

// Client factory

var ClientFactory = exports.ClientFactory = function(options){
	this.options = options;
	if(this.options.token){
		this.setToken(this.options.token);
	}
};

ClientFactory.prototype.setToken = function(token){
	this.options.basic_authentication = {
		password: token
	};
};

ClientFactory.prototype.create = function(name){
	var client = null;

	switch(name.toLowerCase()){
		case 'project':
			client = new projectclient.ProjectClient(this.options);
			break;
		case 'signature':
			client = new signatureclient.SignatureClient(this.options);
			break;
		case 'email':
			client = new emailclient.EmailClient(this.options);
			break;
	}

	return client;
};
