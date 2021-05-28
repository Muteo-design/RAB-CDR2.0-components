<template>
	<div :id="questionName" :cc-panel="ccName" class="questionPanel shownQuestionPanel shownQuestionTextPanel">
		<div class="questionContainer fullWidthQuestion" :cc-type="ccType" :cc-style="ccStyle">
			<div class="questionAnnotationsAndText">
				<div class="questionAnnotations"><em>*</em></div>
				<div class="questionText" :cc-text="ccName">
					<span><slot/></span>
				</div>
			</div>
			<div class="questionContent">
				<slot name="content" :ccName="ccName"/>
			</div>
			<div class="questionOutcomeContainer">
				<div class="questionResultContainer">
					<div :cc-result-panel="ccName" class="result_content"></div>
				</div>
				<div class="questionErrorContainer">
					<div :cc-error-panel="ccName" class="error_content"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'question',
	props: {
		ccName: String,
		ccType: String,
		ccStyle: String,
		fixedWidth: Boolean,
	},
	computed: {
		questionId() {
			return `question_${this.ccName}`;
		},
	},
};
</script>
