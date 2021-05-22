/*
ComponentVue_CardDataholderConnect
	[[
		vueJSWidget.registerComponent('card-dataholder-connect', {
*/
export default {
	// v0.1.2
	template: `
		<div class="d-flex align-items-stretch">
			<div class="rounded-lg border-light bg-brand-secondary-4 p-3 w-100">
				<i v-if="dataholder.CDREnabled" class="icon-rab-logo-cdr-monogram icon-24 float-right"></i>
				<dataholder-details :dataholder="dataholder" name-class="font-brand-bold h5 text-brand-copy-1" class="mb-4"></dataholder-details>
				<div class="font-brand text-brand-copy-1">
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