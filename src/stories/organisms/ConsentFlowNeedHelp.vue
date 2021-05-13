<template>
  <!-- <div id="vue-{{question.id}}" class="rab-cdr">-->
  <div class="rab-cdr">
    <div class="border rounded-lg shadow-1 px-3 px-sm-4 pt-3 pt-sm-4 pb-2 pb-sm-3 mt-4">
      <div class="p-2">
        <h3>We need your help</h3>
        <ul class="bullet-info-warning pl-0">
          <li>At this time, not all banks feature CDR. We still need more information to process your application, so please provide online statements for all accounts listed below. You can upload the PDFs later, but within the next 30 days.</li>
        </ul>
        <div class="row d-sm-flex flex-wrap">
          <card-dataholder-connect v-for="dataholder in entered.dataholders" :dataholder="dataholder" :key="dataholder.name" class="col-sm-6 mt-3 mt-sm-4 pb-2">
            <div>This means we will need you to upload statements for accounts held at this bank instead.</div>
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
