ComponentVue_ConsentFlow3Actions
<template>
	<div class="rab-cdr">
	<!-- v0.1.1 -->
<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
		<div class="row">
			<h3 class="col-xs-6 d-none d-sm-block">Connect Now</h3>
			<div class="col-xs-12 col-sm-6">
				<h6 class="d-flex flex-wrap h7 mb-2">
					<span>Completed:</span>
					<span class="ml-auto">
						<span :class="{ 'text-light': !completed.length }">{{ pad(completed.length, 2) }}</span><span :class="{ 'text-light': completed.length !== banks.length }">/{{ pad(banks.length, 2) }}</span>
					</span>
				</h6>
				<div class="w-100 position-relative rounded-sm bg-light overflow-hidden d-flex">
					<div class="rounded-sm border-thick border-brand-primary-3 " :class="{ 'border-transparent':  !completed.length }" :style="progress"></div>
				</div>
			</div>
		</div>
		<bank-connect v-for="bank in banks" :key="bank.id" :bank="bank" @update:status="bank.status = $event" class="my-3-1"></bank-connect>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			// REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
			entered: {
				banks: [],
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
		banks: function() {
			return this.entered.banks;
		},
		completed: function() {
			return this.entered.banks.filter(function(bank) {
				return bank.status === 'complete';
			});
		},
		progress: function() {
			return {
				width: ((this.completed.length / this.entered.banks.length) * 100) + '%',
			};
		},
	},
};
</script>
