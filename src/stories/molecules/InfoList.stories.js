import InfoList from "./InfoList";

export default {
  title: "CDR 2.0/Molecules/InfoList",
  component: InfoList,
  argTypes: {
    slotTemplate: {
      table: { disable: true },
    },
  },
  decorators: [
    () => ({
      template: '<div class="row"><story/></div>',
    }),
  ],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { InfoList },
  template: `<info-list v-bind="$props">`,
});

export const Default = Template.bind({});
Default.args = {
  title: "What does that mean?",
  infoList: ["We only collect what we need.", "We will only use this information to help streamline your loan application"],
};
