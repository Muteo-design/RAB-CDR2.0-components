<template>
<div class="rab-cdr info-consent">
    <legend>Please agree for us to collect your:</legend>
    <div class="info-consent-grid">
      <accordian v-for="info in infoSections" :key="info.title" :title="info.title" :icon="info.icon">
        <text-content title="Why we need it" :body="info.why" />
        <template v-slot:footer>
            <included-list title="What's included" :list="info.included" />
        </template>
      </accordian>
    </div>
</div>
</template>
<script>
import TextContent from '../atoms/TextContent';
import IncludedList from "../molecules/IncludedList";
import Accordian from "../molecules/Accordian";

const infoSections = () => [
    {
        icon: 'wallet',
        title: 'Transaction Details',
        why: 'We’ll use this data to find out about your income, assets and liabilities',
        included: ["Name of account", "Account balance", "Interest rates", "Fees", "Discounts", "Account mail address", "Type of account", "Fees", "Discounts", "Account terms"]
    },
    {
        icon: 'coins',
        title: 'Account balance and details',
        why: 'We’ll use this data to find out about your income, assets and liabilities',
        included: ["Name of account", "Account balance", "Interest rates", "Fees", "Discounts", "Account mail address", "Type of account", "Fees", "Discounts", "Account terms"]    },
];

export default {
  data: function() {
    return {
      infoSections: infoSections(),
      // REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
      entered: {
        dataholders: [],
      },
    };
  },
  components: { TextContent, IncludedList, Accordian },
  methods: {},
  computed: {},
};
</script>
