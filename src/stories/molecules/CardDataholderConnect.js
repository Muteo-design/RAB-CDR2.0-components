/*
ComponentVue_CardDataholderConnect
	[[
		vueJSWidget.registerComponent('card-dataholder-connect', {
*/
export default {
	// v0.1.4
	template: `
		<div class="d-flex align-items-stretch">
			<div class="rounded-lg border border-light bg-brand-secondary-4 p-3 w-100">
				<i v-if="dataholder.CDREnabled" class="icon-rab-logo-cdr-monogram icon-24 float-right"></i>
				<dataholder-details :dataholder="dataholder" class="font-weight-bold text-brand-copy-1 line-height-3"></dataholder-details>
				<div class="font-brand text-brand-copy-1 pt-3">
					<div class="mb-1">Connection status</div>
					<div>
						<strong v-if="dataholder.CDREnabled">Ready to connect</strong>
						<strong v-else>We cannot connect your data from this bank</strong>
					</div>
					<slot></slot>
				</div>
			</div>
		</div>
	`,
	props: {
		dataholder: Object,
	},
};