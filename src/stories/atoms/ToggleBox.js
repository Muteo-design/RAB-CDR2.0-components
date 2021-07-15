/*
ComponentVue_ToggleBox
	[[
		vueJSWidget.registerComponent('toggle-box', {
*/
export default {
	// v0.1.0
	template: `
		<div>
			<label class="input-toggle d-sm-none" :class="[ disabled ? 'cursor-not-allowed' : 'cursor-pointer' ]">
				<input type="checkbox" class="d-none" v-model="checkedLocal" :disabled="disabled"/>
				<span>
					<i :class="['icon-rab-' + (isChecked ? 'check-raw' : 'close-gray-raw')]"></i>
				</span>
			</label>
			<div class="d-none d-sm-flex rounded-sm border-thick" :class="[ 'bg-brand-' + bgColor, 'border-brand-' + bgColor ]">
				<button type="button" @click="checkedLocal = false" class="btn-toggle" :class="[ isCheckedButton ? 'text-muted' : 'bg-white shadow-2' ]">
					{{ unCheckedText }}
				</button>
				<button type="button" @click="checkedLocal = true" class="btn-toggle text-right" :class="[ isCheckedButton ? 'bg-white shadow-2' : 'text-brand-copy-3' ]">
					{{ checkedText }} <i class="ml-2 mr-1 icon-rab-check-lime" :class="{ 'invisible': !isCheckedButton }"></i>
				</button>
			</div>
		</div>
	`,
	props: {
		checked: Boolean,
		disabled: Boolean,
		checkedText: String,
		unCheckedText: String,
	},
	data: function() {
		return {
			hover: false,
			isChecked: this.checked,
			isCheckedButton: this.checked,
		};
	},
	methods: {
		setChecked: function(value) {
			this.isCheckedButton = value;
			var vm = this;
			setTimeout(function() {
				vm.isChecked = value;
			}, 150);
		},
	},
	computed: {
		bgColor: function() {
			return this.isCheckedButton ? 'primary-2' : 'secondary-3';
		},
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