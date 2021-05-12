<template>
  <!-- <div id="vue-{{question.id}}" class="rab-cdr">-->
  <div class="rab-cdr">
    <div class="border rounded-lg shadow-1 px-4 pt-4 pb-3">
      <div class="p-2">
        <h3>We can connect with your banks</h3>
        <ul class="bullet-check-green pl-0">
          <li>You're using one or more banks that feature CDR.</li>
          <li>With your consent and as a qualified data recipient, Regional Australia Bank can securely connect and collect data on your behalf.</li>
        </ul>
        <div class="row d-sm-flex flex-wrap">
          <card-dataholder-connect v-for="dataholder in entered.dataholders" :dataholder="dataholder" :key="dataholder.name" connected class="col-sm-6 mt-4 pb-2">
            <div><strong>Ready to connect</strong></div>
          </card-dataholder-connect>
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
