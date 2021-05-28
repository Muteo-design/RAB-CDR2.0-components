<template>
	<page>
		<panel legend="Add your banks" feature-text="Michael Howlett, tell us about all the banks where you have accounts for transactions, savings, credit cards or loans.">
			<question>
				<bank-selector :entered-data="bankSelectorEntered"></bank-selector>
			</question>
		</panel>
	</page>
</template>

<script>
import Page from '../templates/Page.vue';
import Panel from '../templates/Panel.vue';
import Question from '@/stories/templates/Question';

export default {
	name: 'bank-select',
	components: { Page, Panel, Question },
	props: {
		bankSelectorEntered: String,
	},
};
</script>
