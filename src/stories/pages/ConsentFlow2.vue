<template>
  <page>
    <widget legend="Data we collect with your permission">
      <consent-flow-2-intro />
    </widget>
  </page>
</template>

<script>
import Page from '../templates/Page.vue';
import Widget from '../templates/Widget.vue';
import ConsentFlow2Intro from '../organisms/ConsentFlow2Intro.vue';

export default {
  name: 'consent-flow-2',
  components: { Page, Widget, ConsentFlow2Intro },
  props: {
  },
};
</script>
