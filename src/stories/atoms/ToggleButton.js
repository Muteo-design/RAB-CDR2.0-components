/*
ComponentVue_ToggleButton
	[[
		vueJSWidget.registerComponent('toggle-button', {
*/
export default {
	// v0.1.0
	template: `
		<div class="d-flex rounded-sm border-thick" :class="[ 'bg-brand-' + bgColor, 'border-brand-' + bgColor ]">
			<button type="button" @click="checkedLocal = false" class="btn-toggle" :class="{ 'bg-white shadow-2': !isChecked }">
				{{ unCheckedText }}
			</button>
			<button type="button" @click="checkedLocal = true" class="btn-toggle" :class="[ isChecked ? 'bg-white shadow-2' : 'text-brand-copy-3' ]">
				{{ checkedText }} <i v-if="isChecked" class="ml-2 icon-rab-check-lime" :style="iconStyle"></i>
			</button>
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
		};
	},
	computed: {
		bgColor: function() {
			return this.isChecked ? 'primary-2' : 'secondary-3';
		},
		iconStyle: function() {
			return {
				position: 'relative',
				top: '0.15rem',
			};
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