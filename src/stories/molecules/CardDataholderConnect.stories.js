import CardDataholderConnect from './CardDataholderConnect';
import { default as dataholderCdr } from '@/assets/dataholder-rab.json';
import { default as dataholderNonCdr } from '@/assets/dataholder-cba.json';

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

export const CDRDataholder = Template.bind({});
CDRDataholder.args = {
	dataholder: dataholderCdr,
	slotTemplate: `<div>This means we will need you to upload statements for accounts held at this bank instead.</div>`,
};

export const NonCDRDataholder = Template.bind({});
NonCDRDataholder.args = {
	dataholder: dataholderNonCdr,
};
