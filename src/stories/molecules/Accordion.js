// ComponentAccordion
export default /*vueJSWidget.registerComponent('accordion',*/ {
	// v0.1.0
	template: `
		<div class="component-accordion">
			<div class="border-bottom-0 rounded-top accordion-header border-color-secondary-2 no-select"
				@click="isChecked = !isChecked">
				<i :class="'icon-36 icon-rab-' + icon"></i>
				<p class="accordion-title mb-1 font-weight-bold brand-primary-1">{{ title }}</p>
				<tickbox :checked="isChecked" class="flex-none"></tickbox>
			</div>
			<div class="accordion-content">
				<transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
					<slot></slot>
				</transition>
				<div :class="[ isOpen ? 'accordion-slider-open' : 'accordion-slider-closed' ]">
					<slot name="footer"></slot>
				</div>
			</div>
			<div class="border-top-0 rounded-bottom accordion-footer border-color-secondary-2 no-select" @click="isOpen = !isOpen">
				<span class="mb-2 font-weight-bold brand-primary-1">{{ isOpen ? "Hide" : "What's included" }}</span>
				<chevron :expanded="isOpen" class="flex-none"></chevron>
			</div>
		</div>
	`,
	props: {
		heading: String,
		title: String,
		footerTitle: String,
		icon: String,
	},
	data: function () {
		return {
			isChecked: this.isChecked,
			isOpen: this.isOpen,
		};
	},
};
