var projectclient = require('./projectclient');

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
	}

	return client;
};
