ComponentVue_ConsentFlow3Confirm
<template>
	<div class="rab-cdr">
	<!-- v0.3.3 -->
<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
		<div class="py-3 px-sm-3 mb-3 border-bottom border-light">
			<div class="p-sm-1">
				<h3>Supporting third parties</h3>
				<p>We work with trusted partners to help understand your data. They follow the same rules as us and can only use your data for the purpose you are consenting to.</p>
				<p class="bullet-arrow-lime"><a @click="showThirdParties" class="cursor-pointer">See list of providers</a></p>
			</div>
		</div>
		<div class="py-3 px-sm-3 mb-3 border-bottom border-light">
			<div class="p-sm-1">
				<h3>What happens to your data after we've used it</h3>
				<p>We will de-identify your data to calculate your average monthly living expenses. We keep it to show how it helped make a decision on your loan.</p>
				<p class="bullet-arrow-lime"><a @click="showDeIdentifyData" class="cursor-pointer">How and why we de-identify data</a></p>
			</div>
		</div>
		<h3 class="py-2 px-sm-3 m-sm-1">Managing your data</h3>
		<accordion title="How to review your consent" class="my-3 pb-1 pb-sm-0">
			<div class="px-1">
				<p class="bullet-info text-brand-copy-2 h7 sm-h6">We provide a secure dashboard for you to review and revoke the consent you've given. Access it via:</p>
				<p class="bullet-arrow-invert line-height-normal"><a href="#" class="font-weight-bold border-bottom-0 h8 sm-h6">mycdr.regionalaustraliabank.com.au</a></p>
			</div>
		</accordion>
		<accordion title="How to revoke your consent" class="my-3 pb-1 pb-sm-0">
			<div class="px-1">
				<p class="bullet-info text-brand-copy-2 h7 sm-h6">Visit your dashboard and follow the instructions to revoke your consent anytime.</p>
			</div>
		</accordion>
		<accordion title="How to stop sharing your data">
			<ul class="bullet-info text-brand-copy-2 px-1 mb-0 h7 sm-h6">
				<li>If we're processing your loan application, it will be cancelled.</li>
				<li>You'll have to restart your application and upload your bank statements manually.</li>
			</ul>
		</accordion>
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
	methods: {
		showThirdParties: function() {
			CCExtension.showThirdPartyModal();
		},
		showDeIdentifyData: function() {
			CCExtension.showDeIdentifyDataModal();
		}
	}
};
</script>
