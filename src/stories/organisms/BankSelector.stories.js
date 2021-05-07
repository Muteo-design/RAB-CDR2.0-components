import BankSelector from './BankSelector';
import { default as dataholders } from '@/assets/dataholders.json';

export default {
  title: 'CDR 2.0/Organisms/BankSelector',
  component: BankSelector,
  decorators: [() => ({ template: '<div id="cloudcase-form" class="p-4 bg-white"><story/></div>' })],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BankSelector },
  template:
    '<bank-selector :entered-data="entered"/>',
});

export const Default = Template.bind({});
Default.args = {
  entered: JSON.stringify({ dataholders }),
};

export const PreSelected = Template.bind({});
PreSelected.args = {
  entered: JSON.stringify({
    dataholders: dataholders.map(x => {
      if (x.name === 'CommBank' || x.name === 'Westpac') {
        x.selected = true;
      }
      return x;
    }),
  }),
};
