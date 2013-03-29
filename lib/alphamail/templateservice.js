var restclient = require('./alphamailrestclient');

// Template Service

var TemplateService = exports.TemplateService = function(options){
	this.client = new restclient.AlphaMailRestClient(options);
};

TemplateService.prototype.setServiceUrl = function(baseUrl){
	this.client.setServiceUrl(baseUrl);
	return this;
};

TemplateService.prototype.setApiToken = function(token){
	this.client.setApiToken(token);
	return this;
};

TemplateService.prototype.createEntity = function(name, templateId, signatureId){
	return {
		name: name,
		template_id: templateId,
		signature_id: signatureId
	};
};

TemplateService.prototype.create = function(template, events){
	this.client.post('templates', template, events);
	return this;
};

TemplateService.prototype.getAll = function(events){
	this.client.get('templates', events);
	return this;
};

TemplateService.prototype.getSingle = function(templateId, events){
	this.client.get('templates/'+templateId, events);
	return this;
};

TemplateService.prototype.update = function(template, events){
	this.client.put('templates/'+template.id, template, events);
	return this;
};

TemplateService.prototype.delete = function(templateId, events){
	this.client.delete('templates/'+templateId, null, events);
	return this;
};