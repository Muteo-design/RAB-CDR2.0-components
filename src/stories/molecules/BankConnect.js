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
				<bank-details :bank="bank" truncate class="font-brand-bold text-brand-copy-1 h5 ml-sm-2 px-1"></bank-details>
				<div class="ml-auto">
					<button v-if="!bank.status" type="button" @click="$emit('update:status', 'pending')"
						class="btn btn-primary w-auto rounded-sm mh-0 mw-0 p-2 line-height-2">
						<span class="h7 mx-1">Connect<span class="d-none d-sm-inline"> now</span></span>
						<i class="icon-rab-arrow-right-green-2 mx-1"></i>
					</button>
					<template v-else>
						<div class="d-flex text-right align-items-center">
							<h6 class="h7 mb-0 mx-2" :class="[ 'text-' + statusMap[bank.status].color ]">{{ statusMap[bank.status].text }}</h6>
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
					text: 'Failed to connect',
					icon: 'attention',
					color: 'danger text-muted'
				},
			},
		};
	},
};