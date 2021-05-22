import Accordion from "./Accordion";
import TextContent from "../atoms/TextContent";
import IncludedList from "../molecules/IncludedList";

export default {
  title: "CDR 2.0/Molecules/Accordion",
  component: Accordion,
  argTypes: {
    slotTemplate: {
      table: { disable: true },
    },
  },
  decorators: [
    () => ({
      template: '<div class="row"><div class="col-sm-3"><story/></div></div>',
    }),
  ],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Accordion, TextContent, IncludedList },
  template: `
  <accordion v-bind="$props">
    <text-content title="Why we need it" body="We’ll use this data to find out about your income, assets and liabilities" />
    <template v-slot:footer>
        <included-list title="What's included" :list="included" />
    </template>
  </accordion>`,
});

export const Default = Template.bind({});
Default.args = {
  title: "Title goes here",
  icon: "coins",
  included: [
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
