import Tickbox from './Tickbox';

export default {
	title: 'CDR 2.0/Atoms/Tickbox',
	component: Tickbox,
	decorators: [() => ({ template: '<label><story/></label>' })],
};

const Template = (args) => ({
	components: { Tickbox },
	setup() {
		return { args }
	},
	template:
		'<tickbox v-bind="args"/>',
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
