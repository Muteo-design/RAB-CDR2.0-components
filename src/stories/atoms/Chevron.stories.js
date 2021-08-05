import Chevron from './Chevron';

export default {
	title: 'CDR 2.0/Atoms/Chevron',
	component: Chevron,
	decorators: [() => ({ template: '<label><story/></label>' })],
};

const Template = (args, { argTypes }) => ({
	components: { Chevron },
	props: Object.keys(argTypes),
	template:
		'<chevron v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = null;

export const Expanded = Template.bind({});
Expanded.args = { expanded: true };
