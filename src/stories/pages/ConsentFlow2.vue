<template>
	<page :currentStep="2" :stepCount="3">
		<panel legend="Data we collect with your permission" feature-text="Once you've given us your consent, we'll connect with your banks to collect the information we need for your application.">
			<question>
				<consent-flow-2-intro/>
			</question>
			<question>
				<consent-flow-2-clusters text-data="Please agree for us to collect your:"/>
			</question>
		</panel>
	</page>
</template>

<script>
import Page from '../templates/Page.vue';
import Panel from '../templates/Panel.vue';
import Question from '../templates/Question';

export default {
	name: 'consent-flow-2',
	components: { Question, Page, Panel },
};
</script>
