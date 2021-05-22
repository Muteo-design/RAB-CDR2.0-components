// ComponentAccordion
export default /*vueJSWidget.registerComponent('accordion',*/ {
	// v0.1.0
	template: `
		<div class="component-accordion">
			<div @click="isChecked = !isChecked" class="border border-bottom-0 rounded-top d-flex align-items-center justify-content-between">
				<div class="p-2">
					<i class="icon-36" :class="icon"></i>
				</div>
				<p class="m-0 font-brand-bold brand-primary-1">{{ title }}</p>
				<tickbox :checked="isChecked" class="flex-none m-2"></tickbox>
			</div>
			<div class="p-3 bg-gradient-top">
				<slot></slot>
<!--				<div :class="[ isOpen ? 'accordion-slider-open' : 'accordion-slider-closed' ]">-->
				<div>
					<span class="mb-2 font-weight-bold brand-primary-1">Why we need it</span>
					<p class="h6 text-brand-copy-2">We'll use this data to find out about your income, assets and liabilities</p>
				</div>
			</div>
			<div @click="isOpen = !isOpen" class="border border-top-0 rounded-bottom cursor-pointer">
				<p class="font-brand-bold brand-primary-1">{{ isOpen ? "Hide" : "What's included" }}</p>
				<chevron :expanded="isOpen" class="flex-none"></chevron>
			</div>
		</div>
	`,
	props: {
		icon: String,
		title: String,
	},
	data: function () {
		return {
			isChecked: false,
			isOpen: false,
		};
	},
};
