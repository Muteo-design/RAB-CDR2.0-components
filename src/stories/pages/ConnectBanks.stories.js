import ConnectBanks from './ConnectBanks';
import * as ConnectBanksChecklist from '../organisms/ConnectBanksChecklist.stories';

export default {
	title: 'CDR 2.0/Pages/ConnectBanks',
	component: ConnectBanks,
};

const Template = (args) => ({
	components: { ConnectBanks },
	setup() {
		return { args };
	},
	template:
		'<connect-banks v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
	connectBanksChecklistEntered: ConnectBanksChecklist.Default.args.entered,
};
