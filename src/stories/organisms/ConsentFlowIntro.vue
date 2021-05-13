<template>
  <!-- <div id="vue-{{question.id}}" class="rab-cdr">-->
  <div class="rab-cdr">
    <p class="text-feature">The new Consumer Data Right (CDR) makes your home loan application more convenient, accurate and safe. Plus, we can really speed up the process.</p>
    <div class="row d-sm-flex">
      <div class="col-sm-4 d-flex align-items-stretch">
        <card-badge heading="Convenient" text="Say goodbye to manually collecting bank statements. With CDR, we can do it for you." class="w-100">
          <i class="icon-rab-shield icon-48"/>
        </card-badge>
      </div>
      <div class="col-sm-4 d-flex align-items-stretch">
        <card-badge heading="Accurate" text="CDR allows us to precisely get the data we need to generate accurate results." class="w-100">
          <i class="icon-rab-calendar icon-48"/>
        </card-badge>
      </div>
      <div class="col-sm-4 d-flex align-items-stretch">
        <card-badge heading="Secure" text="The safety of your data matters most to us. That's why we're CDR accredited." class="w-100">
          <i class="icon-rab-clock icon-48"/>
        </card-badge>
      </div>
    </div>
    <div class="text-center mb-4">
      <card-cdr :adr-number="entered.adrNumber" class="d-inline-block mx-auto"/>
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
        adrNumber: ''
      },
    };
  },
  methods: {},
  computed: {},
};
</script>
