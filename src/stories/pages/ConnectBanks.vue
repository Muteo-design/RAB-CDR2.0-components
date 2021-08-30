<template>
	<page hide-buttons>
		<panel legend="Now let's connect" feature-text="Please select your banks below and securely connect them one by one. We'll then be able to collect the data we need to fast track your application.">
			<question>
				<dataholder-connector :entered-data="connectBanksChecklistEntered"/>
			</question>
		</panel>
	</page>
</template>

<script>
import Page from '../templates/Page.vue';
import Panel from '../templates/Panel.vue';
import Question from '../templates/Question';

export default {
	name: 'connect-banks',
	components: { Question, Page, Panel },
	props: {
		connectBanksChecklistEntered: Object,
	},
};
</script>
