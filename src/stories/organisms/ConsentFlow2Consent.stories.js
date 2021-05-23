import ConsentFlow2Consent from './ConsentFlow2Consent';

export default {
	title: 'CDR 2.0/Organisms/ConsentFlow2Consent',
	component: ConsentFlow2Consent,
};

const Template = (args) => ({
	components: { ConsentFlow2Consent },
	setup() {
		return { args };
	},
	template: '<consent-flow-2-consent/>',
});

export const Default = Template.bind({});
