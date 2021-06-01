<template>
	<page :currentStep="2" :stepCount="3" hide-buttons>
		<panel legend="What happens next" feature-text="We've summarised below how we use your data once we've collected it. Your consent is needed before we can connect to your banks.">
			<question>
				<consent-flow-3-intro/>
			</question>
			<question>
				<consent-flow-3-confirm/>
			</question>
			<question>
				<consent-flow-3-actions/>
			</question>
		</panel>
	</page>
</template>

<script>
import Page from '../templates/Page.vue';
import Panel from '../templates/Panel.vue';
import Question from '../templates/Question';

export default {
	name: 'consent-flow-3',
	components: { Question, Page, Panel },
	props: {},
};
</script>
