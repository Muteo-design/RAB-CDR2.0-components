<template>
<!-- FIXME: Vue can't interpolate inside attributes -->
<!-- <div id="vue-{{question.id}}" class="rab-cdr">-->
  <div class="rab-cdr">
    <bank-search @searchchanged="setSearch"></bank-search>
    <div v-if="selectedDataholders.length > 0">
      <p class="dataholder-selected-heading">Selected banks</p>
      <div class="dataholder-selected-wrapper">
        <dataholder-selected-pill v-for="dataholder in selectedDataholders" :dataholder="dataholder" v-bind:key="dataholder.name" @deselect="dataholder.selected = !dataholder.selected"></dataholder-selected-pill>
      </div>
    </div>
    <div class="dataholder-list-wrapper">
      <dataholder-select v-for="dataholder in computedDataholders" :dataholder="dataholder" @selected="dataholder.selected = $event" v-bind:key="dataholder.name"></dataholder-select>
    </div>
  </div>
</template>

<script>

export default {
  // FIXME: Only adding this prop to support storybook behaviour
  props: {
    enteredData: Object
  },
  // FIXME: Should be a function
  // data: {
  //   searchValue: "",
  //   // REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
  //   entered: {
  //     dataholders: []
  //   },
  // },
  data: function() {
    return {
      searchValue: "",
      // REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
      entered: this.enteredData
    }
  },
  methods: {
    setSearch: function(value) {
      this.searchValue = value;
    },
  },
  computed: {
    alphaSortedDataholders: function() {
      return this.entered.dataholders.sort(function(a,b) {
        return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1;
      });
    },
    computedDataholders: function() {
      var vm = this;
      if (this.searchValue == "") {
        return this.alphaSortedDataholders;
      }
      return vm.alphaSortedDataholders.filter(function(dataholder) {
        return (dataholder.name.toLowerCase().indexOf(vm.searchValue.toLowerCase()) > -1);
      });
    },
    selectedDataholders: function() {
      return this.alphaSortedDataholders.filter(function(dataholder) {
        return (dataholder.selected);
      });
    },
  },
  // FIXME: Only adding this watcher in an attempt to support storybook behaviour
  watch: {
    enteredData: function (value) {
      this.entered = value;
    }
  },
};
</script>
