import CardBadge from './CardBadge';

export default {
	title: 'CDR 2.0/Molecules/CardBadge',
	component: CardBadge,
	argTypes: {
		slotTemplate: {
			table: { disable: true },
		},
	},
	decorators: [() => ({ template: '<div class="row"><div class="col-sm-3"><story/></div></div>' })],
};

const Template = ({ icon }, { argTypes }) => ({
	components: { CardBadge },
	props: Object.keys(argTypes),
	template: `
		<card-badge v-bind="$props"><i class="icon-48 icon-rab-${icon}"/></card-badge>
	`,
});

export const Convenient = Template.bind({});
Convenient.args = {
	heading: 'Convenient',
	text: 'Say goodbye to manually collecting bank statements. With CDR, we can do it for you',
	icon: 'shield',
};

export const Accurate = Template.bind({});
Accurate.args = {
	heading: 'Accurate',
	text: 'CDR allows us to precisely get the data we need to generate accurate results',
	icon: 'calendar',
};

export const Secure = Template.bind({});
Secure.args = {
	heading: 'Secure',
	text: 'The safety of your data matters most to us. That\'s why we\'re CDR accredited',
	icon: 'clock',
};
