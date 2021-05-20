import IncludedList from "./IncludedList";

export default {
  title: "CDR 2.0/Molecules/IncludedList",
  component: IncludedList,
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

const Template = (args) => ({
  components: { IncludedList },
	setup() {
  		return { args }
	},
  template: `<included-list v-bind="args"/>`,
});

export const Default = Template.bind({});
Default.args = {
  title: "What's included",
  list: [
    "Name of account",
    "Account balance",
    "Interest rates",
    "Fees",
    "Discounts",
    "Account mail address",
    "Type of account",
    "Fees",
    "Discounts",
    "Account terms",
  ],
};
