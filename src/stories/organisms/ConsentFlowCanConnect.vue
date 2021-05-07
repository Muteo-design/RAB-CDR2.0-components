<template>
  <!-- <div id="vue-{{question.id}}" class="rab-cdr">-->
  <div class="rab-cdr">
    <div class="border rounded shadow-subtle p-4">
      <h4>We can connect with your banks</h4>
      <ul class="bullet-arrow-green pl-0">
        <li>You're using one or more banks that feature CDR.</li>
        <li>With your consent and as a qualified data recipient, Regional Australia Bank can securely connect and collect data on your behalf.</li>
      </ul>
      <div class="row d-sm-flex">
        <div v-for="dataholder in entered.dataholders" class="col-sm-6 d-flex align-items-stretch mt-4">
          <div class="rounded border bg-gray p-4 w-100">
            <dataholder-details :dataholder="dataholder" class="mb-4"/>
            <p>Connection status</p>
            <p class="mb-0"><strong>Ready to connect</strong></p>
          </div>
        </div>
      </div>
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
