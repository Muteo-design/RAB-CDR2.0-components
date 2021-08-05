import ToggleBox from './ToggleBox';

export default {
	title: 'CDR 2.0/Atoms/ToggleBox',
	component: ToggleBox,
};

const Template = (args, { argTypes }) => ({
	components: { ToggleBox },
	props: Object.keys(argTypes),
	template:
		'<toggle-box v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = null;

export const Selected = Template.bind({});
Selected.args = { checked: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const SelectedDisabled = Template.bind({});
SelectedDisabled.args = {
	checked: true,
	disabled: true,
};
