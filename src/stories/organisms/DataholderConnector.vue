ComponentVue_DataholderConnector
<template>
	<div class="rab-cdr">
	<!-- v0.2.0 -->
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
					<div class="rounded-sm border-thick border-brand-primary-3" :class="{ 'border-transparent': !completed.length }" :style="progress"></div>
				</div>
			</div>
		</div>
		<dataholder-connect v-for="dataholder in dataholders" :key="dataholder.id" :dataholder="dataholder" @update:status="dataholder.status = $event" class="my-3-1"></dataholder-connect>
		<dataholder-connect v-for="dataholder in nonDataholders" :key="dataholder.id" :dataholder="dataholder" nonDataholder class="my-3-1"></dataholder-connect>
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
			return this.entered.dataholders.filter(function(dataholder) {
				return dataholder.status === 'complete';
			});
		},
		progress: function() {
			return {
				width: ((this.completed.length / this.entered.dataholders.length) * 100) + '%',
			};
		},
	},
	mounted: function() {
		var vm = this;
		localStorage.removeItem('consent');
		window.addEventListener('storage', function(e) {
			if (e.key == 'consent' && !!e.newValue) {
				var consent = JSON.parse(e.newValue);
				consent.state = {
					application: unescape(consent.state).split('|')[0],
					dataholderId: unescape(consent.state).split('|')[1]
				};

				var dataholder = vm.entered.dataholders.find(function(dataholder) {
					return dataholder.dataholderId === consent.state.dataholderId;
				});

				if (dataholder) {
					vm.$set(dataholder, 'consent', consent);
				}
				localStorage.removeItem('consent');
			}
		})
	}
};
</script>
