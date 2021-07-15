import ConnectBanksChecklist from './ConnectBanksChecklist';
import { default as dataholders } from '@/assets/dataholders-connect.json';
import { default as nonDataholderCba } from '@/assets/dataholder-cba.json';
import { default as nonDataholderWestpac } from '@/assets/dataholder-westpac.json';

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

const nonDataholders = [nonDataholderCba, nonDataholderWestpac];

export const Default = Template.bind({});
Default.args = {
	entered: JSON.stringify({
		dataholders: dataholders.map(bank => ({ ...bank, ...{ status: null }})),
		nonDataholders
	})
}

export const Mixed = Template.bind({});
Mixed.args = {
	entered: JSON.stringify({
		dataholders: dataholders.map(x => {
			delete x.status;
			if (x.name === 'Commonwealth Bank of Australia') {
				x.status = 'complete';
			}
			if (x.name === 'ANZ') {
				x.status = 'failed';
			}
			if (x.name === 'National Australia Bank') {
				x.status = 'pending';
			}
			return x;
		}),
		nonDataholders
	}),
};

export const AllComplete = Template.bind({});
AllComplete.args = {
	entered: JSON.stringify({
		dataholders: dataholders.map(x => {
			x.status = 'complete';
			return x;
		}),
		nonDataholders
	}),
};

export const Failed = Template.bind({});
Failed.args = {
	entered: JSON.stringify({
		dataholders: dataholders.map(x => {
			delete x.status;
			if (x.name === 'National Australia Bank' || x.name === 'ANZ Bank') {
				x.status = 'failed';
			}
			return x;
		}),
		nonDataholders
	}),
};
