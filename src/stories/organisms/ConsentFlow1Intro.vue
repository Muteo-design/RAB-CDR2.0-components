ComponentVue_ConsentFlow1Intro
<template>
	<div class="rab-cdr">
	<!--v0.2.0-->
<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
		<div class="row d-sm-flex">
			<div v-for="card in cards" :key="card.heading" class="col-sm-4 d-flex align-items-stretch">
				<card-badge :heading="card.heading" :text="card.text" class="w-100">
					<i class="icon-48" :class="card.icon"></i>
				</card-badge>
			</div>
		</div>
		<div class="text-center mb-4">
			<card-cdr :adr-number="entered.adrNumber" class="d-inline-block mx-auto"></card-cdr>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ConsentFlow1Intro',
	data: function() {
		return {
			// REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
			entered: {
				adrNumber: '',
			},
			cards: [{
				heading: 'Convenient',
				text: 'Say goodbye to manually collecting bank statements. With CDR, we can do it for you.',
				icon: 'icon-rab-shield',
			}, {
				heading: 'Accurate',
				text: 'CDR allows us to precisely get the data we need to generate accurate results.',
				icon: 'icon-rab-calendar',
			}, {
				heading: 'Secure',
				text: 'The safety of your data matters most to us. That\'s why we\'re CDR accredited.',
				icon: 'icon-rab-clock',
			}],
		};
	},
};
</script>
