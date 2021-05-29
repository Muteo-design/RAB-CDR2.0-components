<template>
	<div id="fieldset_section_Borrower1ConsentFlow1_Letsfasttrackyourapplication" class="sectionHeader">
		<div class="overlay-container">
			<div class="overlay"></div>
		</div>
		<legend>{{ legend }}</legend>
		<div id="id_section_Borrower1ConsentFlow1_Letsfasttrackyourapplication">
			<question :feature-text="featureText">
				<slot/>
			</question>
		</div>
	</div>
</template>

<script>
import Question from '@/stories/templates/Question';

export default {
	name: 'panel',
	components: { Question },
	props: {
		legend: String,
		featureText: String,
	},
};
</script>
