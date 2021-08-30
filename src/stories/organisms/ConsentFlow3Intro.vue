ComponentVue_ConsentFlow3Intro
<template>
	<div class="rab-cdr">
		<!-- v0.3.0 -->
<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
		<card-cdr-intro>
			<h3>How often will we access your data?</h3>
			<ul class="bullet-info mb-0">
				<li>We'll do this once</li>
			</ul>
			<h4>How long will we keep your data?</h4>
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
