<template>
	<page :currentStep="2" :stepCount="3">
		<widget legend="Data we collect with your permission">
			<consent-flow-2-intro/>
		</widget>
		<widget legend="Please agree for us to collect your:">
			<consent-flow-2-info/>
		</widget>
	</page>
</template>

<script>
import Page from '../templates/Page.vue';
import Widget from '../templates/Widget.vue';

export default {
	name: 'consent-flow-2',
	components: { Page, Widget },
	props: {},
};
</script>
