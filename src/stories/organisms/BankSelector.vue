<template>
  <!-- <div id="vue-{{question.id}}" class="rab-cdr">-->
  <div class="rab-cdr">
    <slot/>
    <bank-search @searchchanged="setSearch"></bank-search>
    <!--    <p class="dataholder-selected-heading">{{ selectedDataholders.length }} bank{{ plural }} selected</p>-->
    <div v-if="selectedDataholders.length > 0">
      <h5 class="mb-1">Banks selected: {{ selectedDataholders.length }}</h5>
      <div class="dataholder-selected-wrapper" :class="{ 'editing-pills': editingPills }">
        <button type="button" @click="editPills($event)"
                class="flex-none btn btn-pill btn-info px-4 pt-2 pb-1 m-0 w-auto h-auto mb-2">
          {{ editingPills ? 'Done' : 'Edit' }}
        </button>
        <div class="ml-2 border-left border-dark pr-2 mb-2"/>
        <div v-for="dataholder in selectedDataholders" :key="dataholder.name"
             class="dataholder-pill d-flex align-items-center justify-content-between py-2 pl-2 bg-white border border-brand-primary-one rounded-pill mr-2 mb-2 mw-100 text-tiny">
          <dataholder-details :dataholder="dataholder" small/>
          <div class="flex-none pl-2">
            <i v-if="editingPills" @click="deselect(dataholder)" class="icon-rab-close icon-2 cursor-pointer"/>
            <i v-else class="icon-rab-check icon-2"/>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ 'conceal': editingPills }">
      <div class="dataholder-list-container pt-2 mt-3" :class="{ 'overflow-hidden pr-4': editingPills }">
        <div class="dataholder-list-wrapper" :class="{ 'overflow-hidden': editingPills }">
          <label v-for="dataholder in computedDataholders" :key="dataholder.name" tabindex="0"
                 class="dataholder-select-wrapper d-flex flex-row align-items-center justify-content-between w-100 rounded-lg border bg-white cursor-pointer px-2 py-1 mb-2">
            <dataholder-details :dataholder="dataholder" class="font-brand text-large"/>
            <tickbox :checked="dataholder.selected" @update:checked="dataholder.selected = $event" class="flex-none"/>
          </label>
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
      searchValue: '',
      editingPills: false,
    };
  },
  methods: {
    setSearch: function(value) {
      this.searchValue = value;
    },
    deselect: function(dataholder) {
      dataholder.selected = !dataholder.selected;
      if (!this.selectedDataholders.length) {
        this.editingPills = false;
      }
    },
    editPills: function(event) {
      this.editingPills = !this.editingPills;
      event.currentTarget.blur();
    },
  },
  computed: {
    alphaSortedDataholders: function() {
      return this.entered.dataholders.sort(function(a, b) {
        return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1;
      });
    },
    computedDataholders: function() {
      var vm = this;
      if (this.searchValue === '') {
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
    plural: function() {
      var selectedLength = this.selectedDataholders.length;
      return (selectedLength > 1 || selectedLength === 0) ? 's' : '';
    },
  },
};
</script>

<style>
.dataholder-list-container {
  padding-right: 1rem;
  margin-right: -1rem;
  position: relative;
}
.dataholder-list-container:before,
.dataholder-list-container:after {
  content: '';
  display: block;
  height: 1px;
  background: #bdbdbd;
  position: absolute;
  left: 0;
  right: 1rem;
  box-shadow: 0 0 5px #ccc;
}
.dataholder-list-container:before {
  top: 0;
}
.dataholder-list-container:after {
  bottom: 0;
}
.dataholder-list-wrapper {
  height: 300px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: 0.5rem;
  padding-right: 0.5rem;
  margin-right: -1rem;
}

.dataholder-list-wrapper::-webkit-scrollbar {
  width: 0.5rem
}

.dataholder-list-wrapper::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(1, 80, 96, 0.5) 0%, rgba(255, 255, 255, 0) 181.48%), rgba(1, 80, 96, 0.65);
  border-radius: 0.25rem;
}

@media (min-width: 768px) {
  .dataholder-list-wrapper {
    height: 500px;
  }
}

.dataholder-selected-wrapper {
  display: flex;
  margin-right: -1.5rem;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.dataholder-selected-wrapper::-webkit-scrollbar {
  display: none;
}
.dataholder-selected-wrapper.editing-pills {
  flex-wrap: wrap;
  overflow-y: none;
  overflow-x: none;
  margin-right: -0;
}

.dataholder-select-wrapper:hover {
  background: #fefefe;
  border-color: #015060 !important;
  box-shadow: 0px 2px 4px rgba(117, 117, 117, 0.1), 0px 4px 5px rgba(117, 117, 117, 0.08), 0px 1px 10px rgba(117, 117, 117, 0.12);
}
</style>
