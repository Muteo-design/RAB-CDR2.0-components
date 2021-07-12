import Togglebox from './Togglebox';

export default {
	title: 'CDR 2.0/Atoms/Togglebox',
	component: Togglebox,
	// decorators: [() => ({ template: '<label><story/></label>' })],
};

const Template = (args) => ({
	components: { Togglebox },
	setup() {
		return { args }
	},
	template:
		'<togglebox v-bind="args"/>',
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
