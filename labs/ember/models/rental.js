import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	ownwer: DS.attr('string'),
	city: DS.attr('string'),
	type: DS.attr('string'),
	image: DS.attr('string'),
	bedrooms: DS.attr('number'),
});
