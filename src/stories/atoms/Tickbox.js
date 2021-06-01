/*
ComponentVue_Tickbox
	[[
		vueJSWidget.registerComponent('tickbox', {
*/
export default {
	// v0.2.0
	template: `
		<div class="rounded p-2"
			@mouseenter="hover = true"
			@mouseleave="hover = false"
			:class="[ disabled ? 'cursor-not-allowed' : 'cursor-pointer hover-bg-brand-secondary-1' ]">
			<i class="icon-24" :class="[ 'icon-rab-tickbox' + iconName ]"></i>
			<input type="checkbox" class="d-none" v-model="checkedLocal" :disabled="disabled"/>
		</div>
	`,
	props: {
		checked: Boolean,
		disabled: Boolean,
	},
	data: function() {
		return {
			hover: false,
			isChecked: this.checked,
		};
	},
	methods: {
		setHover: function(value) {
			if (!this.disabled) {
				this.hover = value;
			}
		},
	},
	computed: {
		iconName: function() {
			if (this.checkedLocal) {
				return '-active' + (this.disabled ? '-disabled' : '');
			} else {
				return this.disabled ? '-disabled' : (this.hover ? '-hover' : '');
			}
		},
		checkedLocal: {
			get: function() {
				return this.isChecked;
			},
			set: function(value) {
				this.isChecked = value;
				this.$emit('update:checked', value);
			},
		},
	},
	watch: {
		checked: function(value) {
			this.isChecked = value;
		},
	},
};