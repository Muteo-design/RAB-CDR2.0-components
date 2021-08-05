import ConnectBanks from './ConnectBanks';
import * as ConnectBanksChecklist from '../organisms/DataholderConnector.stories';

export default {
	title: 'CDR 2.0/Pages/ConnectBanks',
	component: ConnectBanks,
};

const Template = (args, { argTypes }) => ({
	components: { ConnectBanks },
	props: Object.keys(argTypes),
	template:
		'<connect-banks v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
	connectBanksChecklistEntered: ConnectBanksChecklist.Default.$propsentered,
};
