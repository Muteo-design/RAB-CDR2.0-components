/*
ComponentVue_Accordion
	[[
		vueJSWidget.registerComponent('accordion', {
*/
export default {
	// v0.1.0
	template: `
		<div class="component-accordion">
			<div @click="checkedLocal = !isChecked" class="border border-bottom-0 rounded-top cursor-pointer d-flex align-items-center p-2">
				<i class="ml-1 my-2 mr-2 icon-36" :class="[ 'icon-rab-' + icon ]"></i>
				<h6 class="m-0 font-weight-normal">{{ title }}</h6>
				<tickbox :checked="checkedLocal" class="flex-none ml-auto"></tickbox>
			</div>
			<div class="px-3 bg-gradient-top">
				<div class="compress" :class="{ 'release': isOpen }">
					<div class="pt-3 position-relative text-brand-copy-2">
						<h6 class="font-weight-normal brand-primary-3">What's included</h6>
						<slot></slot>
					</div>
				</div>
				<div class="py-3">
					<h6 class="font-weight-normal brand-primary-3">Why we need it</h6>
					<p class="h7 mb-0 text-brand-copy-2">We'll use this data to find out about your income, assets and liabilities</p>
				</div>
			</div>
			<div @click="isOpen = !isOpen"
				class="border border-top-0 rounded-bottom cursor-pointer d-flex align-items-center p-2">
				<h6 class="ml-2 mb-0 font-weight-normal brand-primary-3">{{ isReleased ? "Hide" : "What's included" }}</h6>
				<chevron :expanded="isReleased" class="ml-auto mr-1"></chevron>
			</div>
		</div>
	`,
	props: {
		icon: String,
		title: String,
		checked: Boolean,
		open: Boolean,
	},
	data: function () {
		return {
			isOpen: this.open,
			isChecked: this.checked,
			isReleased: false,
		};
	},
	created: function() {
		this.setReleased(this.isOpen);
	},
	methods: {
		setReleased: function(value) {
			var vm = this;
			setTimeout(function() {
				vm.isReleased = value;
			}, 150);
		}
	},
	computed: {
		checkedLocal: {
			get: function() {
				return this.isChecked;
			},
			set: function(value) {
				this.isChecked = value;
				this.$emit('update:checked', value);
			},
		}
	},
	watch: {
		isOpen: function(value) {
			this.setReleased(value);
		},
	},
};
