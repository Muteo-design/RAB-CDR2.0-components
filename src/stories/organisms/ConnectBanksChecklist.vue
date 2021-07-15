ComponentVue_ConnectBanksChecklist
<template>
	<div class="rab-cdr">
		<!-- v0.1.2 -->
		<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
		<div class="row">
			<h3 class="col-xs-6 d-none d-sm-block">Connect Now</h3>
			<div class="col-xs-12 col-sm-6">
				<h6 class="d-flex flex-wrap h7 mb-2">
					<span>Completed:</span>
					<span class="ml-auto">
						<span :class="{ 'text-light': !completed.length }">{{ pad(completed.length, 2) }}</span><span :class="{ 'text-light': completed.length !== dataholders.length }">/{{ pad(dataholders.length, 2) }}</span>
					</span>
				</h6>
				<div class="w-100 position-relative rounded-sm bg-light overflow-hidden d-flex">
					<div class="rounded-sm border-thick border-brand-primary-3 " :class="{ 'border-transparent':  !completed.length }" :style="progress"></div>
				</div>
			</div>
		</div>
		<bank-connect v-for="bank in dataholders" :key="bank.id" :bank="bank" @update:status="bank.status = $event" class="my-3-1"></bank-connect>
		<bank-connect v-for="bank in nonDataholders" :key="bank.id" :bank="bank" nonDataholder class="my-3-1"></bank-connect>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			// REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
			entered: {
				dataholders: [],
				nonDataholders: [],
			},
		};
	},
	methods: {
		pad: function(num, size) {
			num = num.toString();
			while (num.length < size) num = '0' + num;
			return num;
		},
	},
	computed: {
		dataholders: function() {
			return this.entered.dataholders;
		},
		nonDataholders: function() {
			return this.entered.nonDataholders;
		},
		completed: function() {
			return this.entered.dataholders.filter(function(bank) {
				return bank.status === 'complete';
			});
		},
		progress: function() {
			return {
				width: ((this.completed.length / this.entered.dataholders.length) * 100) + '%',
			};
		},
	},
};
</script>
