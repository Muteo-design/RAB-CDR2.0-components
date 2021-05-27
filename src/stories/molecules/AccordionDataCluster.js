/*
ComponentVue_AccordionDataCluster
	[[
		vueJSWidget.registerComponent('accordion-data-cluster', {
*/
export default {
	// v0.3.1
	template: `
		<accordion :title="accordionTitle" :open="isOpen" @update:released="updateReleased">
			<template v-slot:above="{ setClass, setStyle }">
				<div @click="checkedLocal = !isChecked" class="border border-bottom-0 rounded-top cursor-pointer d-flex align-items-center p-2">
					<i class="ml-1 my-2 mr-2 icon-36" :class="[ 'icon-rab-' + icon ]"></i>
					<h6 class="m-0 font-weight-normal">{{ title }}</h6>
					<tickbox :checked="checkedLocal" class="flex-none ml-auto"></tickbox>
				</div>
				<div class="px-3 bg-gradient-top">
					<div :class="setClass" :style="setStyle(content)" class="position-relative text-brand-copy-2 compress">
						<div ref="content" class="px-1">
							<h6 class="pt-3 font-weight-normal brand-primary-3">What's included</h6>
							<slot></slot>
						</div>
					</div>
					<div class="py-3 px-1">
						<h6 class="font-weight-normal brand-primary-3">Why we need it</h6>
						<p class="h7 mb-0 text-brand-copy-2">We'll use this data to find out about your income, assets and liabilities</p>
					</div>
				</div>
			</template>
		</accordion>
	`,
	props: {
		icon: String,
		title: String,
		checked: Boolean,
		open: Boolean,
	},
	data: function () {
		return {
			isChecked: this.checked,
			isOpen: this.open,
			isReleased: false,
			content: null,
		};
	},
	mounted: function() {
		this.setContent();
	},
	methods: {
		// Pass accordion content element to `setStyle()` method to ensure max-height is calculated correctly
		// Can't use a computed prop because `$refs.content` is not reactive
		setContent: function() {
			this.content = this.$refs.content;
		},
		updateReleased: function(value) {
			this.setContent();
			this.isReleased = value;
		},
	},
	computed: {
		accordionTitle: function() {
			return this.isReleased ? 'Hide' : 'What\'s included'
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
};
