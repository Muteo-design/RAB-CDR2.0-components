/*
ComponentVue_BankPill
	[[
		vueJSWidget.registerComponent('bank-pill', {
*/
export default {
	// v0.6.0
	template: `
		<div class="bank-pill rounded-pill border-brand-primary-1 bg-white p-2 mr-2-1 mb-2-1 mw-100"
			:class="{ 'hover-shadow-2': editing && !disabled }">
			<div class="d-flex align-items-center">
				<bank-details :bank="bank" small :truncate="truncate" class="overflow-text font-body pr-1"></bank-details>
				<div class="ml-auto pl-2">
					<i v-if="disabled" class="icon-rab-close-gray icon-24"></i>
					<i v-else-if="editing" @click="$emit('queue-deselect', bank)" class="icon-rab-close icon-24 cursor-pointer"></i>
					<i v-else class="icon-rab-check-green icon-24"></i>
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
