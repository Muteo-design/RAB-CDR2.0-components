ComponentVue_ConsentFlow3Actions
<template>
	<div class="rab-cdr">
	<!-- v0.1.0 -->
<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
		<div class="text-center my-4">
			<div class="my-5">
				<h2>Do you consent for us to collect this data?</h2>
				<p>Selecting "I consent" won't give us access to your data just yet. We will need to connect you with your bank to confirm this decision.</p>
			</div>
			<div>
				<button type="button" class="btn btn-primary btn-wide my-2 mx-3">I Don't Consent</button>
				<button type="button" class="btn btn-primary btn-wide my-2 mx-3">I Consent</button>
			</div>
		</div>
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
