ComponentVue_ConsentFlow2Consent
<template>
	<div class="rab-cdr">
	<!-- v0.3.0 -->
<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
		<accordion-consent title="Transaction Details" icon="wallet" :checked="entered.transactionDetailsConsent" class="mb-4">
			<ul class="pl-0 bullet-check-invert text-brand-copy-2 h7 columns-sm-2">
				<li v-for="listItem in transactionDetailsList" :key="listItem">{{ listItem }}</li>
			</ul>
		</accordion-consent>
		<accordion-consent title="Account balance and details" icon="coins" :checked="entered.accountBalanceConsent" class="mb-4">
			<ul class="pl-0 bullet-check-invert text-brand-copy-2 h7 columns-sm-2">
				<li v-for="listItem in accountBalanceList" :key="listItem">{{ listItem }}</li>
			</ul>
		</accordion-consent>
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
