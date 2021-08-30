<template>
	<div :id="questionId" :cc-panel="ccName" class="questionPanel shownQuestionPanel shownQuestionTextPanel">
		<div class="questionContainer" :class="[($scopedSlots.content ? 'fixed' : 'full') + 'WidthQuestion']" :cc-type="ccType" :cc-style="ccStyle">
			<template v-if="featureText || $scopedSlots.content">
				<div class="questionAnnotationsAndText">
					<div class="questionAnnotations"><em>&nbsp;</em></div>
					<div class="questionText" :cc-text="ccName">
						<span>
							<template v-if="text">
								{{ text }}
							</template>
							<p v-else class="text-feature">{{ featureText }}</p>
						</span>
					</div>
				</div>
				<div class="questionContent">
					<slot name="content" :ccName="ccName"/>
				</div>
			</template>
			<div class="questionOutcomeContainer">
				<div class="questionResultContainer">
					<div :cc-result-panel="ccName" class="result_content"></div>
				</div>
				<div class="questionErrorContainer">
					<div :cc-error-panel="ccName" class="error_content"></div>
				</div>
			</div>
		</div>
		<slot/>
	</div>
</template>

<script>
export default {
	name: 'question',
	props: {
		text: String,
		featureText: String,
		ccName: String,
		ccType: String,
		ccStyle: String,
	},
	computed: {
		questionId() {
			return this.ccName && `question_${this.ccName}`;
		},
	},
};
</script>
