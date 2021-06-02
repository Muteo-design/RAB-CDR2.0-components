import ConnectBanksChecklist from './ConnectBanksChecklist';
import { default as banks } from '@/assets/dataholders-connect.json';

export default {
	title: 'CDR 2.0/Organisms/ConnectBanksChecklist',
	component: ConnectBanksChecklist,
};

const Template = (args) => ({
	components: { ConnectBanksChecklist },
	setup() {
		return { args };
	},
	template: '<connect-banks-checklist :entered-data="args.entered"/>',
});

export const Default = Template.bind({});
Default.args = {
	entered: JSON.stringify({ banks: banks.map(bank => ({ ...bank, ...{ status: null }}))})
}

export const Mixed = Template.bind({});
Mixed.args = {
	entered: JSON.stringify({
		banks: banks.map(x => {
			delete x.status;
			if (x.name === 'Commonwealth Bank of Australia') {
				x.status = 'complete';
			}
			if (x.name === 'Westpac') {
				x.status = 'failed';
			}
			if (x.name === 'National Australia Bank') {
				x.status = 'pending';
			}
			return x;
		}),
	}),
};

export const AllComplete = Template.bind({});
AllComplete.args = {
	entered: JSON.stringify({
		banks: banks.map(x => {
			x.status = 'complete';
			return x;
		}),
	}),
};

export const Failed = Template.bind({});
Failed.args = {
	entered: JSON.stringify({
		banks: banks.map(x => {
			delete x.status;
			if (x.name === 'National Australia Bank' || x.name === 'ANZ Bank') {
				x.status = 'failed';
			}
			return x;
		}),
	}),
};
