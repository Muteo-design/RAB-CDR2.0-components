ComponentVue_ConsentFlow1Dataholders
<template>
	<div class="rab-cdr">
	<!-- v0.2.1 -->
<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
		<div class="sm-border rounded-lg shadow-sm-1 px-sm-4 pt-sm-4 pb-sm-3 mt-4">
			<div class="p-sm-2">
				<h3>We can connect with your banks</h3>
				<ul class="bullet-check-lime">
					<li>You're using one or more banks that feature CDR.</li>
					<li>With your consent and as a qualified data recipient, Regional Australia Bank can securely connect and collect data on your behalf.</li>
				</ul>
				<div class="row d-sm-flex flex-wrap">
					<card-dataholder-connect v-for="dataholder in dataholdersCdr" :dataholder="dataholder"
						:key="dataholder.id" class="col-sm-6 mt-3 mt-sm-4 pb-2"></card-dataholder-connect>
				</div>
			</div>
		</div>
		<div class="sm-border rounded-lg shadow-sm-1 px-sm-4 pt-sm-4 pb-sm-3 mt-4">
			<div class="p-sm-2">
				<h3>We need your help</h3>
				<ul class="bullet-i-warning">
					<li>At this time, not all banks feature CDR. We still need more information to process your application, so please provide online statements for all accounts listed below. You can upload the PDFs later, but within the next 30 days.</li>
				</ul>
				<div class="row d-sm-flex flex-wrap">
					<card-dataholder-connect v-for="dataholder in dataholdersNonCdr" :dataholder="dataholder"
						:key="dataholder.id" class="col-sm-6 mt-3 mt-sm-4 pb-2">
						This means we will need you to upload statements for accounts held at this bank instead.
					</card-dataholder-connect>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ConsentFlow1Dataholders',
	data: function() {
		return {
			// REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
			entered: {
				dataholders: [],
			},
		};
	},
	computed: {
		dataholdersCdr: function() {
			return this.entered.dataholders.filter(function(dataholder) {
				return dataholder.CDREnabled;
			});
		},
		dataholdersNonCdr: function() {
			return this.entered.dataholders.filter(function(dataholder) {
				return !dataholder.CDREnabled;
			});
		},
	},
};
</script>
