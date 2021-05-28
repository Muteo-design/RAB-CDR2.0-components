<template>
	<page wide :currentStep="1" :stepCount="3">
		<panel legend="Data we collect with your permission" feature-text="The new Consumer Data Right (CDR) makes your home loan application more convenient, accurate and safe. Plus, we can really speed up the process.">
			<question>
				<consent-flow-1-intro :entered-data="consentFlow1IntroEntered"/>
			</question>
			<question>
				<consent-flow-1-dataholders :entered-data="ConsentFlow1DataholdersEntered"/>
			</question>
		</panel>
	</page>
</template>

<script>
import Page from '../templates/Page.vue';
import Panel from '../templates/Panel.vue';
import Question from '../templates/Question';

export default {
	name: 'consent-flow-1',
	components: { Question, Page, Panel },
	props: {
		consentFlow1IntroEntered: String,
		ConsentFlow1DataholdersEntered: String,
	},
};
</script>
