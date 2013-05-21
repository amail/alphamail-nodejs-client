var restclient = require('./alphamailrestclient');

// Project Service

var ProjectService = exports.ProjectService = function(options){
	this.client = new restclient.AlphaMailRestClient(options);
};

ProjectService.prototype.setServiceUrl = function(baseUrl){
	this.client.setServiceUrl(baseUrl);
	return this;
};

ProjectService.prototype.setApiToken = function(token){
	this.client.setApiToken(token);
	return this;
};

ProjectService.prototype.createEntity = function(name, templateId, signatureId){
	return {
		name: name,
		template_id: templateId,
		signature_id: signatureId
	};
};

ProjectService.prototype.create = function(project, events){
	this.client.post('projects', project, events);
	return this;
};

ProjectService.prototype.getAll = function(events){
	this.client.get('projects', events);
	return this;
};

ProjectService.prototype.getSingle = function(projectId, events){
	this.client.get('projects/'+projectId, events);
	return this;
};

ProjectService.prototype.update = function(project, events){
	this.client.put('projects/'+project.id, project, events);
	return this;
};

ProjectService.prototype.delete = function(projectId, events){
	this.client.delete('projects/'+projectId, null, events);
	return this;
};