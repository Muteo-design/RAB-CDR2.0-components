import CardDataholderConnect from './CardDataholderConnect';

export default {
	title: 'CDR 2.0/Molecules/CardDataholderConnect',
	component: CardDataholderConnect,
};

const Template = (args) => ({
	components: { CardDataholderConnect },
	setup() {
		return { args };
	},
	template: `
		<card-dataholder-connect v-bind="args">${args.slotTemplate || ''}</card-dataholder-connect>
	`,
});

const dataholderCdr = {
	'name': 'Regional Australia Bank',
	'alias': 'RAB',
	'imageUrl': 'https://www.finder.com.au/global/images/providers/regional-australia-bank-logo-140px.png?fit=1200',
	'CDREnabled': true,
};

const dataholderNonCdr = {
	'name': 'Commonwealth Bank of Australia',
	'id': 1,
	'alias': 'CBA',
	'imageUrl': 'https://www.commbank.com.au/content/dam/commbank-assets/cba-stacked.jpg',
};

export const CDRDataholder = Template.bind({});
CDRDataholder.args = {
	dataholder: dataholderCdr,
	slotTemplate: `<div>This means we will need you to upload statements for accounts held at this bank instead.</div>`,
};

export const NonCDRDataholder = Template.bind({});
NonCDRDataholder.args = {
	dataholder: dataholderNonCdr,
};
