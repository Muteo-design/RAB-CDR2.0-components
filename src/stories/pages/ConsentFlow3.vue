<template>
	<page :currentStep="2" :stepCount="3" hide-buttons>
		<template v-slot:top>
			<div class="rab-cdr mx-4 mb-n4 mt-4 mt-md-0">
				<button type="button" class="w-100 rounded bg-brand-secondary-1 py-3 px-4 mb-5 brand-primary-1 font-weight-medium text-left">
					<i class="icon-rab-arrow-left-large icon-24 mr-4"></i>Back to permissions
				</button>
			</div>
		</template>
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
