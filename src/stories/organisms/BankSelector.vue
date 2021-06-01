ComponentVue_BankSelector
<template>
	<div class="rab-cdr">
	<!-- v0.10.0 -->
	<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
		<div @click="focusSearchInput()" class="bank-search position-relative" :class="{ 'conceal': editingPills }">
			<div class="position-absolute center-y p-4" :class="{ 'pointer-none': !searchValue }">
				<i v-if="searchValue" class="center-xy icon-rab-arrow-left-gray cursor-pointer" @click="searchValue = ''"></i>
				<i v-else class="center-xy" :class="[ searchFocussed || searchHovered || editingPills ? 'icon-rab-search-gray' : 'icon-rab-search']"></i>
			</div>
			<input type="text" ref="search" name="search" id="search" placeholder="Find your bank"
				v-model="searchValue" :disabled="editingPills"
				@mouseenter="searchHovered = true" @mouseleave="searchHovered = false"
				@focus="searchFocussed = true" @blur="searchFocussed = false"
				class="h-auto w-100 rounded bg-white pl-5 py-3 pr-3 font-brand h5"
				:class="[ { 'border' : editingPills }, (searchValue && !filteredBanks.match.length) ? 'border-danger' : 'border-brand-primary-1', { 'hover-shadow-2': searchHovered } ]"/>
		</div>
		<div v-if="selectedBanks.length > 0">
			<h6 class="mt-3 mb-2">Banks selected: {{ selectedBanks.length }}</h6>
			<div class="bank-selected-wrapper d-flex" :class="[ editingPills ? 'flex-wrap overflow-auto' : 'mr-n4' ]">
				<button type="button" @click="editPills($event)"
					class="flex-none btn btn-info btn-pill w-auto h-auto px-4 pt-1 pb-2 m-0 mb-2 font-weight-bold">
					{{ editingPills ? 'Done' : 'Edit' }}
				</button>
				<div class="border-brand-primary-1 border-right-0 mx-2 mb-2"></div>
				<bank-pill v-for="bank in selectedBanks" :key="bank.id"
					:bank="bank" :editing="editingPills" :truncate="!editingPills"
					@ask-deselect="askDeselect($event)">
				</bank-pill>
			</div>
		</div>
		<div :class="{ 'conceal': editingPills }">
			<div v-if="!searchMatch" class="alert alert-validate">
				We can't find this bank. Try again or choose <strong>My bank is not listed</strong>
			</div>
			<div class="bank-list-container mt-3 overflow-hidden" :class="{ 'pr-4': editingPills }">
				<div class="bank-list-wrapper pt-2 pr-2 mr-n3" :class="{ 'overflow-hidden': editingPills }">
					<div v-if="searchMatch">
						<bank-select v-for="(bank, index) in filteredBanks.match" :key="bank.id"
							:bank="bank" :editing="editingPills" @update:selected="bank.selected = $event"
							:class="{ 'pt-sm-1': index === 0 }">
						</bank-select>
					</div>
					<div v-if="filteredBanks.other.length">
						<h6 v-if="searchMatch" class="my-1">Other banks:</h6>
						<bank-select v-for="(bank, index) in filteredBanks.other" :key="bank.id"
							:bank="bank" :editing="editingPills" @update:selected="bank.selected = $event"
							:class="{ 'pt-sm-1': index === 0 }">
						</bank-select>
					</div>
				</div>
			</div>
		</div>
		<teleport to="#vue-modal">
			<div v-if="modalActive" class="rab-cdr">
				<h1 class="font-italic">Are you sure you want to remove this bank?</h1>
				<p class="mb-4">A complete banking history will help us to provide you with the best possible offer.</p>
				<bank-pill :bank="deselectingBank" disabled small class="d-inline-block"></bank-pill>
				<div class="text-center mt-4">
					<button type="button" @click="closeModal" class="btn btn-modal">Keep bank</button>
					<button type="button" @click="deselect(deselectingBank)" class="btn btn-modal">Remove Bank</button>
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
				banks: [],
			},
			text: '',
			searchValue: '',
			searchHovered: false,
			searchFocussed: false,
			editingPills: false,
			modalActive: false,
			deselectingBank: {},
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
		askDeselect: function(bank) {
			var vm = this;
			this.deselectingBank = bank;
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
			this.deselectingBank = {};
		},
		deselect: function(bank) {
			bank.selected = !bank.selected;
			if (!this.selectedBanks.length) {
				this.editingPills = false;
			}
			this.closeModal();
		},
		editPills: function(event) {
			this.editingPills = !this.editingPills;
			event.currentTarget.blur();
		},
		alphaSortedBanks: function() {
			return this.entered.bank.sort(function(a, b) {
				return (a.name.toLowerCase() > b.name.toLowerCase() || a.id === 'other') ? 1 : -1;
			});
		},
	},
	computed: {
		filteredBanks: function() {
			var results = {
				match: [],
				other: [],
			};
			var searchValue = this.searchValue;
			if (searchValue === '') {
				results.match = this.alphaSortedBanks();
			} else {
				var otherBanks;
				this.alphaSortedBanks().forEach(function(bank) {
					if (bank.id === 'other') {
						otherBanks = bank;
					} else {
						var nameIndex = bank.name.toLowerCase().indexOf(searchValue.toLowerCase());
						var aliasIndex = (bank.alias || '').toLowerCase().indexOf(searchValue.toLowerCase());
						if ((nameIndex > -1) || (aliasIndex > -1)) {
							results.match.push(bank);
						} else {
							results.other.push(bank);
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
		selectedBanks: function() {
			return this.alphaSortedBanks().filter(function(bank) {
				return (bank.selected);
			});
		},
		searchMatch: function() {
			return this.filteredBanks.match.length > 0;
		},
	},
};
</script>
