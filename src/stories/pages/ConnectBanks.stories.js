import ConnectBanks from './ConnectBanks';
import * as DataholderConnector from '../organisms/DataholderConnector.stories';

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
	connectBanksChecklistEntered: DataholderConnector.Default.args.entered,
};
