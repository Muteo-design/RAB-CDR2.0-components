/*
ComponentVue_Chevron
	[[
		vueJSWidget.registerComponent('chevron', {
*/
export default {
	// v0.1.0
	template: `
		<div class="rounded-circle cursor-pointer hover-bg-brand-secondary-1 p-1">
			<i class="icon-24" :class="iconName"></i>
			<input type="checkbox" class="d-none" v-model="expandedLocal"/>
		</div>
	`,
	props: {
		expanded: Boolean,
	},
	data: function() {
		return {
			isExpanded: this.expanded,
		};
	},
	computed: {
		iconName: function() {
			return this.isExpanded ? 'icon-rab-chevron-up' : 'icon-rab-chevron-down';
		},
		expandedLocal: {
			get: function() {
				this.isExpanded = this.expanded;
				return this.expanded;
			},
			set: function(value) {
				this.isExpanded = value;
				this.$emit('update:expanded', value);
			},
		},
	},
};