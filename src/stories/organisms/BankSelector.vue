ComponentVue_BankSelector
<template>
	<div class="rab-cdr">
	<!-- v0.7.0 -->
	<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
<!--		<p class="text-feature">{{ borrower.name ? borrower.name + ', ' : '' }}tell us about all the banks where you have accounts for transactions, savings, credit cards or loans.</p>-->
		<div @click="focusSearchInput()" class="bank-search position-relative" :class="{ 'conceal': editingPills }">
			<div class="position-absolute center-y p-4"
				:class="{ 'pointer-none': !searchValue }">
				<i v-if="searchValue" class="center-xy icon-rab-arrow-left-gray cursor-pointer" @click="searchValue = ''"></i>
				<i v-else class="center-xy" :class="[ searchFocussed || searchHovered || editingPills ? 'icon-rab-search-gray' : 'icon-rab-search']"></i>
			</div>
			<input type="text" ref="search" name="search" id="search" placeholder="Find your bank"
				v-model="searchValue" :disabled="editingPills"
				@mouseenter="searchHovered = true" @mouseleave="searchHovered = false"
				@focus="searchFocussed = true" @blur="searchFocussed = false"
				class="h-auto w-100 rounded bg-white pl-5 py-3 pr-3 font-brand h5"
				:class="[ { 'border' : editingPills }, (searchValue && !filteredDataholders.match.length) ? 'border-danger' : 'border-brand-primary-1', { 'hover-shadow-2': searchHovered } ]"/>
		</div>
		<div v-if="selectedDataholders.length > 0">
			<h5 class="mb-2">Banks selected: {{ selectedDataholders.length }}</h5>
			<div class="dataholder-selected-wrapper d-flex mr-n4" :class="{ 'flex-wrap overflow-auto mr-2': editingPills }">
				<button type="button" @click="editPills($event)"
					class="flex-none btn btn-info btn-pill w-auto h-auto px-4 pt-1 pb-2 m-0 mb-2 font-weight-bold">
					{{ editingPills ? 'Done' : 'Edit' }}
				</button>
				<div class="border-brand-primary-1 border-right-0 mx-2 mb-2"></div>
				<dataholder-pill v-for="dataholder in selectedDataholders" :key="dataholder.id"
					:dataholder="dataholder" :editing="editingPills" :dataholder-name-class="dataholderPillNameClass"
					@askDeselect="askDeselect($event)">
				</dataholder-pill>
			</div>
		</div>
		<div :class="{ 'conceal': editingPills }">
			<div v-if="!searchMatch" class="alert alert-validate">
				We can't find this bank. Try again or choose <strong>Other banks</strong>
			</div>
			<div class="dataholder-list-container mt-3 overflow-hidden" :class="{ 'pr-4': editingPills }">
				<div class="dataholder-list-wrapper pt-2 pr-2 mr-n3" :class="{ 'overflow-hidden': editingPills }">
					<div v-if="searchMatch">
						<dataholder-select v-for="(dataholder, index) in filteredDataholders.match" :key="dataholder.id"
							:dataholder="dataholder" :editing="editingPills"
							@update:checked="dataholder.selected = $event"
							:class="{ 'pt-sm-1': index === 0 }">
						</dataholder-select>
					</div>
					<div v-if="filteredDataholders.other.length">
						<h5 v-if="searchMatch" class="my-1">Other results:</h5>
						<dataholder-select v-for="(dataholder, index) in filteredDataholders.other" :key="dataholder.id"
							:dataholder="dataholder" :editing="editingPills" :class="{ 'pt-sm-1': index === 0 }">
						</dataholder-select>
					</div>
				</div>
			</div>
		</div>
		<teleport to="#vue-modal">
			<div v-if="modalActive" class="rab-cdr">
				<h1 class="font-italic">Are you sure you want to remove this bank?</h1>
				<p class="mb-4">A complete banking history will help us to provide you with the best possible offer.</p>
				<dataholder-pill :dataholder="deselectingDataholder" disabled dataholder-name-class="h7" class="d-inline-block"></dataholder-pill>
				<div class="text-center mt-4">
					<button type="button" @click="closeModal" class="btn btn-modal">Keep bank</button>
					<button type="button" @click="deselect(deselectingDataholder)" class="btn btn-modal">Remove Bank</button>
				</div>
			</div>
		</teleport>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			// REQUIRED PROPERTY - state to be shared with the rules engine - this is the entered value of the question
			entered: {
				dataholders: [],
				borrower: {},
			},
			searchValue: '',
			searchHovered: false,
			searchFocussed: false,
			editingPills: false,
			modalActive: false,
			deselectingDataholder: {},
		};
	},
	methods: {
		focusSearchInput: function() {
			this.searchFocussed = true;
			this.$refs.search.focus();
		},
		setSearch: function(value) {
			this.searchValue = value;
		},
		askDeselect: function(dataholder) {
			var vm = this;
			this.deselectingDataholder = dataholder;
			this.modalActive = true;

			// Show modal
			CCExtension.showVueModal(function() {
				// Close modal callback
				vm.closeModal();
			});
		},
		closeModal: function() {
			CCExtension.closeVueModal();
			this.modalActive = false;
			this.deselectingDataholder = {};
		},
		deselect: function(dataholder) {
			dataholder.selected = !dataholder.selected;
			if (!this.selectedDataholders.length) {
				this.editingPills = false;
			}
			this.closeModal();
		},
		editPills: function(event) {
			this.editingPills = !this.editingPills;
			event.currentTarget.blur();
		},
		alphaSortedDataholders: function() {
			return this.entered.dataholders.sort(function(a, b) {
				return (a.name.toLowerCase() > b.name.toLowerCase() || a.id === 'other') ? 1 : -1;
			});
		},
	},
	computed: {
		borrower: function() {
			return this.entered.borrower;
		},
		filteredDataholders: function() {
			var results = {
				match: [],
				other: [],
			};
			var searchValue = this.searchValue;
			if (searchValue === '') {
				results.match = this.alphaSortedDataholders();
			} else {
				var otherBanks;
				this.alphaSortedDataholders().forEach(function(dataholder) {
					if (dataholder.id === 'other') {
						otherBanks = dataholder;
					} else {
						var nameIndex = dataholder.name.toLowerCase().indexOf(searchValue.toLowerCase());
						var aliasIndex = (dataholder.alias || '').toLowerCase().indexOf(searchValue.toLowerCase());
						if ((nameIndex > -1) || (aliasIndex > -1)) {
							results.match.push(dataholder);
						} else {
							results.other.push(dataholder);
						}
					}
				});
				if (results.match.length === 0) {
					results.other.unshift(otherBanks);
				} else {
					results.other.push(otherBanks);
				}
			}
			return results;
		},
		selectedDataholders: function() {
			return this.alphaSortedDataholders().filter(function(dataholder) {
				return (dataholder.selected);
			});
		},
		dataholderPillNameClass: function() {
			return 'h7' + (this.editingPills ? ' mw-100' : '');
		},
		searchMatch: function() {
			return this.filteredDataholders.match.length > 0;
		}
	},
};
</script>
