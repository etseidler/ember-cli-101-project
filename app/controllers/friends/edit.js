import Ember from 'ember';

export default Ember.Controller.extend({
	originalModel: null,
	isValid: Ember.computed(
		'model.email',
		'model.firstName',
		'model.lastName',
		'model.twitter', {
			get() {
				return !Ember.isEmpty(this.get('model.email')) &&
					!Ember.isEmpty(this.get('model.firstName')) &&
					!Ember.isEmpty(this.get('model.lastName')) &&
					!Ember.isEmpty(this.get('model.twitter'));
			}
		}
	),
	actions: {
		save() {
			if (this.get('isValid')) {
				this.get('model').save().then(friend => {
					this.transitionToRoute('friends.show', friend);
				})
			} else {
				this.set('errorMessage', 'You have to fill in all the fields');
			}
			return false;
		},

		cancel() {
			this.get('model').rollbackAttributes();
			this.transitionToRoute('friends.show', this.get('model'));
			return false;
		}
	}
});
