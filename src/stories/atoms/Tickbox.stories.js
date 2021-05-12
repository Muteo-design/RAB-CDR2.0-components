import Tickbox from './Tickbox';

export default {
  title: 'CDR 2.0/Atoms/Tickbox',
  component: Tickbox,
  decorators: [() => ({ template: '<label><story/></label>' })],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Tickbox },
  template:
    '<tickbox v-bind="$props"/>',
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
