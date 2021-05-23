<template>
	<page :currentStep="3" :stepCount="3">
		<widget legend="What happens next" feature-text="We’ve summarised below how we use your data once we’ve collected it. Your consent is needed before we can connect to your banks.">
			<consent-flow-3-intro/>
		</widget>
		<widget>
			<consent-flow-3-confirm/>
		</widget>
	</page>
</template>

<script>
import Page from '../templates/Page.vue';
import Widget from '../templates/Widget.vue';

export default {
	name: 'consent-flow-3',
	components: { Page, Widget },
	props: {},
};
</script>
