import ConsentFlow2Consent from './ConsentFlow2Clusters';

export default {
	title: 'CDR 2.0/Organisms/ConsentFlow2Clusters',
	component: ConsentFlow2Consent,
};

const Template = (args) => ({
	components: { ConsentFlow2Consent },
	setup() {
		return { args };
	},
	template: '<consent-flow-2-clusters v-bind:entered-data="args.entered"/>',
});

export const Default = Template.bind({});

export const ConsentTransactionDetails = Template.bind({});
ConsentTransactionDetails.args = {
	entered: JSON.stringify({ transactionDetailsConsent: true }),
};

export const ConsentBoth = Template.bind({});
ConsentBoth.args = {
	entered: JSON.stringify({
		transactionDetailsConsent: true,
		accountBalanceConsent: true,
	}),
};
