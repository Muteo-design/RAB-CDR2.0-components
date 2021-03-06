import ConsentFlow3Actions from './ConsentFlow3Actions';

export default {
	title: 'CDR 2.0/Organisms/ConsentFlow3Actions',
	component: ConsentFlow3Actions,
};

const Template = (args, { argTypes }) => ({
	components: { ConsentFlow3Actions },
	props: Object.keys(argTypes),
	template: '<consent-flow-3-Actions/>',
});

export const Default = Template.bind({});
