<template>
  <!-- <div id="vue-{{question.id}}" class="rab-cdr">-->
  <div class="rab-cdr">
    <p class="text-feature">Michael, tell us about all the banks where you have accounts for transactions, savings, credit cards or loans.</p>
    <div @click="focusSearchInput()"
         class="bank-search d-flex align-items-center rounded bg-white shadow-1 p-3"
         :class="[ editingPills ? 'border conceal' : 'border-brand-primary-1' ]">
      <i v-if="searchValue" class="icon-rab-arrow-left-gray cursor-pointer mr-1" @click="searchValue = ''"/>
      <i v-else class="icon-rab-search-gray mr-1"/>
      <input type="text" ref="search" name="search" id="search" placeholder="Find your bank"
             v-model="searchValue" :disabled="editingPills"
             class="border-0 h-auto w-100 ml-2 font-brand h5 mb-n1"/>
    </div>
    <div v-if="selectedDataholders.length > 0">
      <h5 class="mb-1">Banks selected: {{ selectedDataholders.length }}</h5>
      <div class="dataholder-selected-wrapper" :class="{ 'editing-pills': editingPills }">
        <button type="button" @click="editPills($event)"
                class="flex-none btn btn-info btn-pill w-auto h-auto px-4 pt-2 pb-1 m-0 mb-2 font-weight-bold">
          {{ editingPills ? 'Done' : 'Edit' }}
        </button>
        <div class="border-brand-primary-1 border-right-0 mx-2 mb-2"/>
        <div v-for="dataholder in selectedDataholders" :key="dataholder.name"
             class="dataholder-pill border-brand-primary-1 rounded-pill bg-white p-1 mr-2 mb-2 mw-100">
          <div class="d-flex align-items-center justify-content-between border-thick border-transparent">
            <dataholder-details :dataholder="dataholder" smallLogo name-class="text-tiny"/>
            <div class="flex-none pl-2">
              <i v-if="editingPills" @click="deselect(dataholder)" class="icon-rab-close icon-1 cursor-pointer"/>
              <i v-else class="icon-rab-check icon-1"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ 'conceal': editingPills }">
      <div class="dataholder-list-container mt-3 overflow-hidden" :class="{ 'pr-4': editingPills }">
        <div class="dataholder-list-wrapper pt-2 mt-sm-1" :class="{ 'overflow-hidden': editingPills }">
          <div v-for="dataholder in computedDataholders" :key="dataholder.name" class="pb-sm-1 ">
            <label tabindex="0" class="dataholder-select-wrapper d-flex flex-row align-items-center justify-content-between w-100 rounded-lg border bg-white cursor-pointer p-2 mb-2">
              <dataholder-details :dataholder="dataholder" name-class="font-brand h5 mb-n1 p-sm-1"/>
              <tickbox :checked="dataholder.selected" @update:checked="dataholder.selected = $event" class="flex-none"/>
            </label>
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
      searchValue: '',
      editingPills: false,
    };
  },
  methods: {
    focusSearchInput: function() {
      this.$refs.search.focus();
    },
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
@import '../../assets/css/variables.css';

.bank-search > input:focus {
  outline: none;
}

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
  background: var(--brand-secondary-2);
  position: absolute;
  left: 0;
  right: 1rem;
  box-shadow: 0 0 5px var(--brand-secondary-2);
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
  overflow: auto;
  margin-right: 0;
}

.dataholder-select-wrapper:hover {
  border-color: var(--brand-primary-3) !important;
  box-shadow: var(--shadow-2);
}
</style>
