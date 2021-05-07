<template>
  <page>
    <widget legend="Let's fast track your application">
      <p class="text-feature mt-4">The new Consumer Data Right (CDR) makes your home loan application more convenient, accurate and safe. Plus, we can really speed up the process.</p>
      <consent-flow-intro class="mb-4"/>
      <consent-flow-can-connect :entered-data="consentFlowCanConnectEntered" class="mb-4"/>
      <consent-flow-need-help :entered-data="consentFlowNeedHelpEntered" class="mb-4"/>
    </widget>
  </page>
</template>

<script>
import Page from '../templates/Page.vue';
import Widget from '../templates/Widget.vue';
import ConsentFlowNeedHelp from '@/stories/organisms/ConsentFlowNeedHelp';

export default {
  name: 'consent-flow-1',
  components: { ConsentFlowNeedHelp, Page, Widget },
  props: {
    consentFlowCanConnectEntered: String,
    consentFlowNeedHelpEntered: String
  }
};
</script>
