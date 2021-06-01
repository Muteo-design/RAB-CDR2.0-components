/*
ComponentVue_BankPill
	[[
		vueJSWidget.registerComponent('bank-pill', {
*/
export default {
	// v0.5.0
	template: `
		<div class="bank-pill rounded-pill border-brand-primary-1 bg-white p-2 mr-2 mb-2 mw-100"
			:class="{ 'hover-shadow-2': editing && !disabled }">
			<div class="d-flex align-items-center">
				<bank-details :bank="bank" small :truncate="truncate" class="overflow-text font-body pr-1"></bank-details>
				<div class="flex-none ml-auto pl-2">
					<i v-if="editing" @click="$emit('ask-deselect', bank)" class="icon-rab-close icon-24 cursor-pointer"></i>
					<i v-else class="icon-24" :class="[ 'icon-rab-' + (disabled ? 'close-gray' : 'check-green') ]"></i>
				</div>
			</div>
		</div>
	`,
	props: {
		bank: Object,
		disabled: Boolean,
		editing: Boolean,
		truncate: Boolean,
	},
};
