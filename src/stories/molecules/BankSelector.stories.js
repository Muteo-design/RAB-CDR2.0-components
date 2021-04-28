import BankSelector from '@/components/molecules/BankSelector.vue';
import { default as dataholders } from '@/assets/dataholders.json';

export default {
  title: 'CDR 2.0/Molecules/BankSelector',
  component: BankSelector,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BankSelector },
  template:
  '<bank-selector :entered-data="entered"/>',
});

export const Default = Template.bind({});
Default.args = {
  entered: JSON.stringify({
    dataholders
  })
};

export const CBAPreSelected = Template.bind({});
CBAPreSelected.args = {
  entered: JSON.stringify({
    dataholders: dataholders.map(x => {
      if (x.name === 'CommBank') {
        x.selected = true
      }
      return x;
    })
  })
};
