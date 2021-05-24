ComponentVue_ConsentFlow2Intro
<template>
	<div class="rab-cdr">
	<!-- v0.2.1 -->
<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
		<div class="rounded-lg border p-4">
			<i class="icon-rab-logo-cdr float-right" :style="{ width: '90px' }"></i>
			<h3>What does that mean?</h3>
			<ul class="pl-0 mb-0 bullet-info">
				<li>We only collect what we need</li>
				<li class="mb-0">We will only use this information to help streamline your loan application</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			// REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
			entered: {
			},
		};
	},
};
</script>
