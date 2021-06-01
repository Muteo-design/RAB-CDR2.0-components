/*
ComponentVue_CardBankConnect
	[[
		vueJSWidget.registerComponent('card-bank-connect', {
*/
export default {
	// v0.4.0
	template: `
		<div class="d-flex align-items-stretch">
			<div class="rounded-lg border border-light bg-brand-secondary-4 p-3 w-100">
				<i v-if="isDataholder" class="icon-rab-logo-cdr-monogram icon-24 float-right"></i>
				<bank-details :bank="bank" class="font-weight-bold text-brand-copy-1 line-height-3"></bank-details>
				<div class="font-brand text-brand-copy-1 mt-1">
					<div class="py-2">Connection status</div>
					<div class="line-height-normal" :class="{ 'mb-1': $slots.default }">
						<strong v-if="isDataholder">Ready to connect</strong>
						<strong v-else>We cannot connect your data from this bank</strong>
					</div>
					<slot></slot>
				</div>
			</div>
		</div>
	`,
	props: {
		bank: Object,
		isDataholder: Boolean,
	},
};