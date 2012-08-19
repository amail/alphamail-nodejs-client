var restclient = require('./restclient');

// Project client

var ProjectClient = exports.ProjectClient = function(options){
	this.client = new restclient.RestClient(options);
};

ProjectClient.prototype.createEntity = function(name, template_id, signature_id){
	return {
		name: name,
		template_id: template_id,
		signature_id: signature_id
	};
};

ProjectClient.prototype.create = function(project, on_success, on_error){
	this.client.post('projects', project, on_success, on_error);
	return this;
};

ProjectClient.prototype.getAll = function(on_success, on_error){
	this.client.get('projects', on_success, on_error);
	return this;
};

ProjectClient.prototype.getSingle = function(project_id, on_success, on_error){
	this.client.get('projects/'+project_id, on_success, on_error);
	return this;
};

ProjectClient.prototype.update = function(project, on_success, on_error){
	this.client.put('projects/'+project.id, project, on_success, on_error);
	return this;
};

ProjectClient.prototype.delete = function(project_id, on_success, on_error){
	this.client.delete('projects/'+project_id, null, on_success, on_error);
	return this;
};