import BankSelector from './BankSelector';
import { default as dataholders } from '@/assets/dataholders.json';

export default {
	title: 'CDR 2.0/Organisms/BankSelector',
	component: BankSelector,
};

const Template = (args) => ({
	components: { BankSelector },
	setup() {
		return { args }
	},
	template: '<bank-selector :entered-data="args.entered"/>',
});

export const Default = Template.bind({});
Default.args = {
	entered: JSON.stringify({
		banks: dataholders,
	}),
};

export const PreSelected = Template.bind({});
PreSelected.args = {
	entered: JSON.stringify({
		banks: dataholders.map(x => {
			if (x.name === 'Commonwealth Bank of Australia' || x.name === 'Westpac') {
				x.selected = true;
			}
			return x;
		}),
	}),
};
