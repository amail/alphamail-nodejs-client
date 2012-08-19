var projectclient = require('./projectclient');
var signatureclient = require('./signatureclient');

// Client factory

var ClientFactory = exports.ClientFactory = function(options){
	this.options = options;
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
	}

	return client;
};
