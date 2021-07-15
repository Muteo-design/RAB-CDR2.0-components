/*
ComponentVue_ToggleBox
	[[
		vueJSWidget.registerComponent('toggle-box', {
*/
export default {
	// v0.1.0
	template: `
		<label class="input-toggle d-sm-none" :class="[ disabled ? 'cursor-not-allowed' : 'cursor-pointer' ]">
			<input type="checkbox" class="d-none" v-model="checkedLocal" :disabled="disabled"/>
			<span>
				<i :class="['icon-rab-' + (isChecked ? 'check-raw' : 'close-gray-raw')]"></i>
			</span>
		</label>
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
		setChecked: function(value) {
			var vm = this;
			setTimeout(function() {
				vm.isChecked = value;
			}, 150);
		},
	},
	computed: {
		checkedLocal: {
			get: function() {
				return this.isChecked;
			},
			set: function(value) {
				this.setChecked(value);
				this.$emit('update:checked', value);
			},
		},
	},
	watch: {
		checked: function(value) {
			this.setChecked(value);
		},
	},
};