<template>
  <!-- <div id="vue-{{question.id}}" class="rab-cdr">-->
  <div class="rab-cdr">
    <p class="text-feature">Once you've given us your consent, we'll connect with your banks to collect the information we need for your application.</p>
    <info-list title="What does that mean?"
               v-bind:infoList="['We only collect what we need.', 'We will only use this information to help streamline your loan application']" />
  </div>
</template>
<script>
import InfoList from "../molecules/InfoList";
export default {
  data: function() {
    return {
      // REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
      entered: {
        dataholders: [],
      },
    };
  },
  components: {InfoList},
  methods: {},
  computed: {},
};
</script>
