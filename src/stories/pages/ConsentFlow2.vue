<template>
  <page>
    <widget legend="Data we collect with your permission" currentStep=2 stepCount=3>
      <consent-flow-2-intro />
      <consent-flow-2-info />
    </widget>
  </page>
</template>

<script>
import Page from '../templates/Page.vue';
import Widget from '../templates/Widget.vue';
import ConsentFlow2Intro from '../organisms/ConsentFlow2Intro.vue';
import ConsentFlow2Info from '../organisms/ConsentFlow2Info.vue';

export default {
  name: 'consent-flow-2',
  components: { Page, Widget, ConsentFlow2Intro, ConsentFlow2Info },
  props: {
  },
};
</script>
