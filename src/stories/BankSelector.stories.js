import BankSelector from '../components/BankSelector.vue';

export default {
  title: 'CDR 2.0/BankSelector',
  component: BankSelector,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BankSelector },
  template:
  '<bank-selector :entered-data="entered" />',
});

const dataholders = [{
  name: "Westpac",
  image: "https://banking.westpac.com.au/wbc/banking/Themes/Default/Desktop/WBC/Core/Images/logo_white_bg.png.6c772a263bf42d99a2c098bf0739fc5b504ed28d.png"
}, {
  name: "NAB",
  image: "https://www.nab.com.au/etc/designs/nabrwd/clientlibs/images/logo.png"
}, {
  name: "Commonwealth Bank With an Excessively Long Name for Demonstration Purposes",
  image: "https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg"
}, {
  name: "ANZ",
  image: "https://www.anz.com.au/content/dam/anzconz/images/common/promopages/logo-promo-anz-small.png"
}];

export const NoneSelected = Template.bind({});
NoneSelected.args = {
  entered: {
    dataholders
  }
};

export const WestpacSelected = Template.bind({});
WestpacSelected.args = {
  entered: {
    dataholders: dataholders.map(x => {
      if (x.name === 'Westpac') {
        x.selected = true
      }
      return x;
    })
  }
};
