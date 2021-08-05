import DataholderConnector from './DataholderConnector';
import { default as dataholders } from '@/assets/dataholders-connect.json';
import { default as nonDataholderCba } from '@/assets/dataholder-cba.json';
import { default as nonDataholderWestpac } from '@/assets/dataholder-westpac.json';

export default {
	title: 'CDR 2.0/Organisms/DataholderConnector',
	component: DataholderConnector,
};

const Template = (args, { argTypes }) => ({
	components: { DataholderConnector },
	props: Object.keys(argTypes),
	template: '<dataholder-connector :entered-data="entered"/>',
});

const nonDataholders = [nonDataholderCba, nonDataholderWestpac];

const reset = {
	status: null,
	authorisation: { authoriseUrl: true }
}

export const Default = Template.bind({});
Default.args = {
	entered: JSON.stringify({
		dataholders: dataholders.map(bank => ({ ...bank, ...reset })),
		nonDataholders
	})
}

export const Mixed = Template.bind({});
Mixed.args = {
	entered: JSON.stringify({
		dataholders: dataholders.map(x => {
			x = { ...x, ...reset };
			if (x.name === 'ANZ Bank') {
				x.status = 'failed';
			}
			if (x.name === 'Regional Australia Bank') {
				x.status = 'pending';
			}
			if (x.name === 'ING Bank') {
				x.status = 'complete';
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
			x = { ...x, ...reset };
			if (x.name === 'ANZ Bank') {
				x.status = 'failed';
			} else if (x.name === 'National Australia Bank') {
				x.authorisation = null;
			} else {
				return null;
			}
			return x;
		}).filter(Boolean),
		nonDataholders
	}),
};
