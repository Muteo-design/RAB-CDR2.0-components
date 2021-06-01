ComponentVue_ConsentFlow2Intro
<template>
	<div class="rab-cdr">
	<!-- v0.4.0 -->
<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
		<card-cdr-intro class="mb-4">
			<h3>What does that mean?</h3>
			<ul class="bullet-info mb-0">
				<li>We only collect what we need</li>
				<li class="mb-0">We will only use this information to help streamline your loan application</li>
			</ul>
		</card-cdr-intro>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			// REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
			entered: {},
		};
	},
};
</script>
