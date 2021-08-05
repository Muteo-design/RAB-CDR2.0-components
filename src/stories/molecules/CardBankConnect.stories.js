import CardBankConnect from './CardBankConnect';
import { default as dataholder } from '@/assets/dataholder-rab.json';
import { default as nonDataholder } from '@/assets/dataholder-cba.json';

export default {
	title: 'CDR 2.0/Molecules/CardBankConnect',
	component: CardBankConnect,
};

const Template = ({ slotTemplate }, { argTypes }) => ({
	components: { CardBankConnect },
	props: Object.keys(argTypes),
	template: `
		<card-bank-connect :bank="bank" :is-dataholder="isDataholder">${slotTemplate || ''}</card-bank-connect>
	`,
});

export const CDRDataholder = Template.bind({});
CDRDataholder.args = {
	bank: dataholder,
	isDataholder: true,
	slotTemplate: '<div>This means we will need you to upload statements for accounts held at this bank instead.</div>',
};

export const NonCDRDataholder = Template.bind({});
NonCDRDataholder.args = {
	bank: nonDataholder,
};
