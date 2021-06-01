/*
ComponentVue_Accordion
	[[
		vueJSWidget.registerComponent('accordion', {
*/
export default {
	// v0.3.0
	template: `
		<div>
			<slot name="above" :setClass="setClass" :setStyle="setStyle"></slot>
			<div class="border shadow-sm" :class="[ $slots.above ? 'rounded-bottom border-top-0' : 'rounded' ]">
				<div @click="openLocal = !isOpen" class="cursor-pointer d-flex align-items-center py-2 pl-3">
					<h6 class="ml-1 mb-0 font-weight-normal brand-primary-3">{{ title }}</h6>
					<chevron :expanded="isReleased" class="ml-auto mr-2"></chevron>
				</div>
				<div class="compress" :class="setClass" :style="setStyle()">
					<div class="px-3" ref="content">
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	`,
	props: {
		title: String,
		open: Boolean,
	},
	data: function() {
		return {
			isOpen: this.open,
			isReleased: false,
			releaseHeight: 0,
			content: null,
		};
	},
	created: function() {
		this.setReleased(this.isOpen);
	},
	mounted: function() {
		this.setContent();
	},
	methods: {
		// Use a method to set this explicitly. Can't use a computed prop because `$refs.content` is not reactive
		setContent: function() {
			this.content = this.$refs.content;
		},
		// Pass optional content element for calculating release height
		setStyle: function(content) {
			if (content) {
				this.content = content;
			}
			var height = this.content ? this.content.offsetHeight : 0;
			return { maxHeight: this.isOpen ? height + 30 + 'px' : 0 };
		},
		setReleased: function(value) {
			var vm = this;
			setTimeout(function() {
				vm.isReleased = value;
				vm.$emit('update:released', value);
			}, 100);
		},
	},
	computed: {
		setClass: function() {
			return { 'release': this.isOpen };
		},
		openLocal: {
			get: function() {
				return this.isOpen;
			},
			set: function(value) {
				this.setContent();
				this.isOpen = value;
				this.$emit('update:open', value);
			},
		},
	},
	watch: {
		open: function(value) {
			this.isOpen = value;
		},
		isOpen: function(value) {
			this.setReleased(value);
		},
	},
};
