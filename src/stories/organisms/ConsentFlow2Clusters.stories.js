import ConsentFlow2Consent from './ConsentFlow2Clusters';

export default {
	title: 'CDR 2.0/Organisms/ConsentFlow2Clusters',
	component: ConsentFlow2Consent,
};

const Template = (args, { argTypes }) => ({
	components: { ConsentFlow2Consent },
	props: Object.keys(argTypes),
	template:
		'<consent-flow-2-clusters v-bind:entered-data="entered" v-bind:text-data="text"/>',
});

const text = 'Please agree for us to collect your:';

export const Default = Template.bind({});
Default.args = { text };

export const ConsentTransactionDetails = Template.bind({});
ConsentTransactionDetails.args = {
	entered: JSON.stringify({ transactionDetailsConsent: true }),
	text,
};

export const ConsentBoth = Template.bind({});
ConsentBoth.args = {
	entered: JSON.stringify({
		transactionDetailsConsent: true,
		accountBalanceConsent: true,
	}),
	text,
};
