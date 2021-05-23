ComponentVue_ConsentFlow3Confirm
<template>
	<div class="rab-cdr">
	<!-- v0.1.0 -->
<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
		<div class="p-3 border-bottom border-light">
			<div class="p-1">
				<h3>Supporting third parties</h3>
				<p>We work with trusted partners to help understand your data. They follow the same rules as us and can only use your data for the purpose you are consenting to.</p>
				<p class="bullet-arrow-lime"><a href="!#">See list of providers</a></p>
			</div>
		</div>
		<div class="p-3 border-bottom border-light">
			<div class="p-1">
				<h3>What happens to your data after we’ve used it</h3>
				<p>We will de-identify your data to calculate your average monthly living expenses. We keep it to show how it helped make a decision on your loan.</p>
				<p class="bullet-arrow-lime"><a href="!#">How and why we de-identify data</a></p>
			</div>
		</div>
		<h3 class="p-3 m-1">Managing your data</h3>
		<div v-for="item in accordions" :key="item" class="border rounded shadow-sm cursor-pointer d-flex align-items-center py-2 pl-3 mb-3">
			<h6 class="ml-1 mb-0 font-weight-normal brand-primary-3">{{ item }}</h6>
			<chevron class="ml-auto mr-2"></chevron>
		</div>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			// REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
			entered: {
				dataholders: [],
			},
			accordions: [
				'How to review your consent',
				'How to revoke your consent',
				'When you stop sharing your data',
			],
		};
	},
};
</script>
