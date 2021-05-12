<template>
  <page>
    <widget legend="Let's fast track your application">
      <consent-flow-intro :entered-data="consentFlowIntroEntered"/>
      <consent-flow-can-connect :entered-data="consentFlowCanConnectEntered"/>
      <consent-flow-need-help :entered-data="consentFlowNeedHelpEntered"/>
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
    consentFlowIntroEntered: String,
    consentFlowCanConnectEntered: String,
    consentFlowNeedHelpEntered: String,
  },
};
</script>
