import ConsentFlow2Consent from './ConsentFlow2Clusters';

export default {
	title: 'CDR 2.0/Organisms/ConsentFlow2Clusters',
	component: ConsentFlow2Consent,
};

const Template = args => ({
	components: { ConsentFlow2Consent },
	setup() {
		return { args };
	},
	template:
		'<consent-flow-2-clusters v-bind:entered-data="args.entered" v-bind:text-data="args.text"/>',
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
