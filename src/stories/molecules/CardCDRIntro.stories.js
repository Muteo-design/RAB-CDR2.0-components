import CardCDRIntro from './CardCDRIntro';

export default {
	title: 'CDR 2.0/Molecules/CardCDRIntro',
	component: CardCDRIntro,
};

const Template = (args) => ({
	components: { CardCDRIntro },
	setup() {
		return { args };
	},
	template: `
		<card-cdr-intro>
			<h3>How often will we access your data?</h3>
			<p class="bullet-info mb-0">Lorem ipsum</p>
		</card-cdr-intro>
	`,
});

export const Default = Template.bind({});
