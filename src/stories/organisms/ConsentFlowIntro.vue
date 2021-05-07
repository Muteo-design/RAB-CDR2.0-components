<template>
  <!-- <div id="vue-{{question.id}}" class="rab-cdr">-->
  <div class="rab-cdr">
    <div class="row d-sm-flex">
      <div class="col-sm-4 d-flex align-items-stretch">
        <badge heading="Convenient" text="Say goodbye to manually collecting bank statements. With CDR, we can do it for you">
          <icon-shield/>
        </badge>
      </div>
      <div class="col-sm-4 d-flex align-items-stretch">
        <badge heading="Accurate" text="CDR allows us to precisely get the data we need to generate accurate results">
          <icon-calendar/>
        </badge>
      </div>
      <div class="col-sm-4 d-flex align-items-stretch">
        <badge heading="Secure" text="The safety of your data matters most to us. That's why we're CDR accredited">
          <icon-calendar/>
        </badge>
      </div>
    </div>
    <div class="text-center">
      <cdr-badge class="mx-auto"/>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      // REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
      entered: {
        dataholders: [],
      },
    };
  },
  methods: {},
  computed: {},
};
</script>
