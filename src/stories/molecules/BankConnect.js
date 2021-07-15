/*
ComponentVue_BankConnect
	[[
		vueJSWidget.registerComponent('bank-connect', {
*/
export default {
	// v0.1.1
	template: `
		<div class="bank-connect w-100 rounded-lg border bg-white p-3">
		<div class="d-flex align-items-center">
			<bank-details :bank="bank" truncate class="font-brand-semibold text-brand-copy-1 h5 ml-sm-2 px-1"></bank-details>
			<div class="ml-auto">
				<div v-if="nonDataholder" class="btn pointer-none bg-brand-secondary-3 w-auto rounded-sm mh-0 px-2-1 pt-2-1 line-height-1">
					<span class="h7 text-brand-copy-2 font-weight-medium">No action required yet</span>
				</div>
				<button v-else-if="!bank.status" type="button" @click="$emit('update:status', 'pending')"
					class="btn btn-primary w-auto rounded-sm mh-0 mw-0 p-2 line-height-2">
					<span class="h7 mx-1 font-weight-medium">Connect<span class="d-none d-sm-inline"> now</span></span>
					<i class="icon-rab-arrow-right-green-2 mx-1"></i>
				</button>
				<template v-else>
					<div class="d-flex text-right align-items-center">
						<h6 class="h7 mb-0 mx-2">
								<span v-if="bank.status === 'failed'" class="text-danger text-muted">
									Failed<span class="d-none d-sm-inline"> to connect</span>
								</span>
							<template v-else>
								{{ statusMap[bank.status].text }}
							</template>
						</h6>
						<i class="icon-24" :class="[ 'icon-rab-' + statusMap[bank.status].icon ]"></i>
					</div>
				</template>
			</div>
		</div>
		<div v-if="bank.status === 'failed'" class="w-100 border-top border-light mt-3 pt-3">
			<h6 class="my-0 text-danger">We cannot connect your data from this bank.</h6>
			<p class="font-brand text-brand-copy-2 mb-0">This means we will need you to upload statements for accounts held at this bank instead.</p>
		</div>
		</div>
	`,
	props: {
		bank: Object,
		nonDataholder: Boolean,
	},
	data: function() {
		return {
			statusMap: {
				'pending': {
					text: 'Connecting',
					icon: 'stopwatch',
				},
				'complete': {
					text: 'Connected',
					icon: 'check-green',
				},
				'failed': {
					icon: 'attention',
				},
			},
		};
	},
};