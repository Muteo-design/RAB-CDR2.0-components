import ToggleButton from './ToggleButton';

export default {
	title: 'CDR 2.0/Atoms/ToggleButton',
	component: ToggleButton,
	// decorators: [() => ({ template: '<label><story/></label>' })],
};

const Template = (args) => ({
	components: { ToggleButton },
	setup() {
		return { args };
	},
	template:
		'<toggle-button v-bind="args"/>',
});

const text = {
	checkedText: 'I agree',
	unCheckedText: 'I don\'t agree',
};

export const Default = Template.bind({});
Default.args = text;

export const Selected = Template.bind({});
Selected.args = {
	...text,
	checked: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	...text,
	disabled: true
};

export const SelectedDisabled = Template.bind({});
SelectedDisabled.args = {
	...text,
	checked: true,
	disabled: true,
};
