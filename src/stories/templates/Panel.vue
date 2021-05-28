<template>
	<div id="fieldset_section_Loan_AboutYourLoan" class="sectionHeader">
		<div class="overlay-container">
			<div class="overlay"></div>
		</div>
		<legend>{{ legend }}</legend>
		<!-- TODO: Confirm feature text markup -->
		<div class="text-feature">{{ featureText }}</div>
		<div id="id_section_Loan_AboutYourLoan">
			<div id="question_LoanDetails" cc-panel="LoanDetails" class="questionPanel hiddenQuestionPanel hiddenQuestionTextPanel">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'panel',
	props: {
		legend: String,
		featureText: String,
	},
};
</script>
