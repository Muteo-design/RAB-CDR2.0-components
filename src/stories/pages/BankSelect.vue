<template>
	<page>
		<widget legend="Add your banks" feature-text="Michael Howlett, tell us about all the banks where you have accounts for transactions, savings, credit cards or loans.">
			<bank-selector :entered-data="bankSelectorEntered"></bank-selector>
		</widget>
	</page>
</template>

<script>
import Page from '../templates/Page.vue';
import Widget from '../templates/Widget.vue';

export default {
	name: 'bank-select',
	components: { Page, Widget },
	props: {
		bankSelectorEntered: String,
	},
};
</script>
