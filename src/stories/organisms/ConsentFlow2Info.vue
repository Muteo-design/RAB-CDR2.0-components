<template>
	<div class="rab-cdr info-consent">
		<legend>Please agree for us to collect your:</legend>
		<div class="info-consent-grid">
			<accordion v-for="info in infoSections" :key="info.title" :title="info.title" :icon="info.icon">
				<ul class="mb-n3 pl-0 text-brand-copy-2 dual-columns list-unstyled bullet-check-invert">
					<li v-for="(listItem, index) in info.included" :key="index">
						{{ listItem }}
					</li>
				</ul>
			</accordion>
		</div>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			// REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
			entered: {
				dataholders: [],
			},
			infoSections: [{
				icon: 'icon-rab-wallet',
				title: 'Transaction Details',
				why: 'We’ll use this data to find out about your income, assets and liabilities',
				included: ['Name of account', 'Account balance', 'Interest rates', 'Fees', 'Discounts', 'Account mail address', 'Type of account', 'Fees', 'Discounts', 'Account terms'],
			}, {
				icon: 'icon-rab-coins',
				title: 'Account balance and details',
				why: 'We’ll use this data to find out about your income, assets and liabilities',
				included: ['Name of account', 'Account balance', 'Interest rates', 'Fees', 'Discounts', 'Account mail address', 'Type of account', 'Fees', 'Discounts', 'Account terms'],
			}],
		};
	},
};
</script>
