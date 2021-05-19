<template>
	<page>
		<widget legend="Data we collect with your permission" feature-text="The new Consumer Data Right (CDR) makes your home loan application more convenient, accurate and safe. Plus, we can really speed up the process.">
			<consent-flow-1-intro :entered-data="consentFlow1IntroEntered"/>
		</widget>
		<widget>
			<consent-flow-1-dataholders :entered-data="ConsentFlow1DataholdersEntered"/>
		</widget>
	</page>
</template>

<script>
import Page from '../templates/Page.vue';
import Widget from '../templates/Widget.vue';

export default {
	name: 'consent-flow-1',
	components: { Page, Widget },
	props: {
		consentFlow1IntroEntered: String,
		ConsentFlow1DataholdersEntered: String,
	},
};
</script>
