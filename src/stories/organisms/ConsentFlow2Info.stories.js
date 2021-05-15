import ConsentFlow2Info from "./ConsentFlow2Info";

export default {
  title: "CDR 2.0/Organisms/ConsentFlow2Info",
  component: ConsentFlow2Info,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ConsentFlow2Info },
  template: "<consent-flow2-info />",
});

export const Default = Template.bind({});
