/*
ComponentVue_DataholderPill
	[[
		vueJSWidget.registerComponent('dataholder-pill', {
*/
export default {
	// v0.3.0
	template: `
		<div class="dataholder-pill rounded-pill border-brand-primary-1 bg-white p-2 mr-2 mb-2 mw-100"
			:class="{ 'hover-shadow-2': editing && !disabled }">
			<div class="d-flex align-items-center">
				<dataholder-details :dataholder="dataholder" small :truncate="truncate" class="overflow-text font-body pr-1"></dataholder-details>
				<div class="flex-none ml-auto pl-2">
					<i v-if="editing" @click="$emit('ask-deselect', dataholder)" class="icon-rab-close icon-24 cursor-pointer"></i>
					<i v-else class="icon-24" :class="[ 'icon-rab-' + (disabled ? 'close-gray' : 'check-green') ]"></i>
				</div>
			</div>
		</div>
	`,
	props: {
		dataholder: Object,
		disabled: Boolean,
		editing: Boolean,
		truncate: Boolean,
	},
};
