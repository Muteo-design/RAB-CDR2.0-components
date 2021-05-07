<template>
  <!-- <div id="vue-{{question.id}}" class="rab-cdr">-->
  <div class="rab-cdr">
    <div class="border rounded shadow-subtle p-4">
      <h4>We can connect with your banks</h4>
      <ul class="bullet-arrow-green pl-0">
        <li>At this time, not all banks feature CDR. We still need more information to process your application, so please provide online statements for all accounts listed below. You can upload the PDFs later, but within the next 30 days.</li>
      </ul>
      <div class="row d-sm-flex">
        <div v-for="dataholder in entered.dataholders" class="col-sm-6 d-flex align-items-stretch mt-4">
          <div class="rounded border bg-gray p-4 w-100">
            <dataholder-details :dataholder="dataholder" class="mb-4"/>
            <p>Connection status</p>
            <p><strong>We cannot connect your data from this bank. </strong></p>
            <p class="mb-0">This means we will need you to upload statements for accounts held at this bank instead.</p>
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
