import Tickbox from './Tickbox.vue';

export default {
  title: 'CDR 2.0/Atoms/Tickbox',
  component: Tickbox,
  decorators: [() => ({ template: '<div class="rab-cdr p-4 bg-white"><label><story/></label></div>' })],
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
Selected.args = { checked: true }

export const Disabled = Template.bind({});
Disabled.args = { disabled: true }

export const SelectedDisabled = Template.bind({});
SelectedDisabled.args = {
  checked: true,
  disabled: true,
}
