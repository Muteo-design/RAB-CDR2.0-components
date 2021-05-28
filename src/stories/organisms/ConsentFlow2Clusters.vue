ComponentVue_ConsentFlow2Clusters
<template>
	<div class="rab-cdr">
	<!-- v0.6.0 -->
<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
		<h1 class="mb-3">{{ text }}</h1>
		<accordion-data-cluster title="Transaction Details" icon="wallet" v-model:checked="entered.transactionDetailsConsent" class="mb-4 mb-sm-3">
			<ul class="pl-0 bullet-check-invert text-brand-copy-2 h7 columns-sm-2">
				<li v-for="listItem in transactionDetailsList" :key="listItem">{{ listItem }}</li>
			</ul>
		</accordion-data-cluster>
		<accordion-data-cluster title="Account balance and details" icon="coins" v-model:checked="entered.accountBalanceConsent" class="mb-4 mb-sm-3">
			<ul class="pl-0 bullet-check-invert text-brand-copy-2 h7 columns-sm-2">
				<li v-for="listItem in accountBalanceList" :key="listItem">{{ listItem }}</li>
			</ul>
		</accordion-data-cluster>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			// REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
			entered: {
				transactionDetailsConsent: false,
				accountBalanceConsent: false,
			},
			text: '',
			transactionDetailsList: [
				'Incoming and outgoing transactions',
				'Amounts',
				'Dates',
				'Descriptions of transactions',
				'Who you have sent money to and received money from (e.g. their name, BSB, account number)',
			],
			accountBalanceList: [
				'Name of account',
				'Type of account',
				'Account balance',
				'Account number',
				'Interest rates',
				'Fees',
				'Discounts',
				'Account terms',
				'Account mail address',
			],
		};
	},
};
</script>
