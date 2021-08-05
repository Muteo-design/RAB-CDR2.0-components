import ConsentFlow3Confirm from './ConsentFlow3Confirm';

export default {
	title: 'CDR 2.0/Organisms/ConsentFlow3Confirm',
	component: ConsentFlow3Confirm,
};

const Template = (args, { argTypes }) => ({
	components: { ConsentFlow3Confirm },
	props: Object.keys(argTypes),
	template: '<consent-flow-3-confirm/>',
});

export const Default = Template.bind({});
