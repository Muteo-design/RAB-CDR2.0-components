ComponentVue_BankSelector
<template>
	<div class="rab-cdr">
	<!-- v0.6.0 -->
<!--	<div id="vue-{{question.id}}" class="rab-cdr">-->
		<p class="text-feature">{{ borrower.name ? borrower.name + ', ' : '' }}tell us about all the banks where you have accounts for transactions, savings, credit cards or loans.</p>
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
				:class="[ { 'border' : editingPills }, computedDataholders.length ? 'border-brand-primary-1' : 'border-danger', { 'hover-shadow-2': searchHovered } ]"/>
		</div>
		<div v-if="selectedDataholders.length > 0">
			<h5 class="mb-2">Banks selected: {{ selectedDataholders.length }}</h5>
			<div class="dataholder-selected-wrapper d-flex mr-n4" :class="{ 'flex-wrap overflow-auto mr-2': editingPills }">
				<button type="button" @click="editPills($event)"
					class="flex-none btn btn-info btn-pill w-auto h-auto px-4 pt-1 pb-2 m-0 mb-2 font-weight-bold">
					{{ editingPills ? 'Done' : 'Edit' }}
				</button>
				<div class="border-brand-primary-1 border-right-0 mx-2 mb-2"></div>
				<dataholder-pill v-for="dataholder in selectedDataholders" :dataholder="dataholder" :key="dataholder.id"
					:editing="editingPills" :dataholder-name-class="dataholderPillNameClass"
					@askDeselect="askDeselect($event)"></dataholder-pill>
			</div>
		</div>
		<div :class="{ 'conceal': editingPills }">
			<div class="dataholder-list-container mt-3 overflow-hidden" :class="{ 'pr-4': editingPills }">
				<div class="dataholder-list-wrapper pt-2 pr-2 mr-n3" :class="{ 'overflow-hidden': editingPills }">
					<div v-for="(dataholder, index) in computedDataholders" :key="dataholder.name"
						class="pb-sm-1" :class="{ 'pt-sm-1': index === 0 }">
						<label :tabindex="editingPills ? -1 : 0"
							class="dataholder-select-wrapper d-flex align-items-center justify-content-between w-100 rounded-lg border hover-border-brand-primary-3 bg-white hover-shadow-2 cursor-pointer p-2 mb-2">
							<dataholder-details :dataholder="dataholder" name-class="font-brand h5"></dataholder-details>
							<i v-if="editingPills && dataholder.selected" class="icon-rab-tickbox-close icon-24 m-2"></i>
							<tickbox v-else :checked="dataholder.selected" @update:checked="dataholder.selected = $event" class="flex-none"></tickbox>
						</label>
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
			deselectingDataholder: {}
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
	},
	computed: {
		borrower: function() {
			return this.entered.borrower;
		},
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
				var nameIndex = dataholder.name.toLowerCase().indexOf(vm.searchValue.toLowerCase());
				var aliasIndex = (dataholder.alias || '').toLowerCase().indexOf(vm.searchValue.toLowerCase());
				return (nameIndex || aliasIndex) > -1;
			});
		},
		selectedDataholders: function() {
			return this.alphaSortedDataholders.filter(function(dataholder) {
				return (dataholder.selected);
			});
		},
		dataholderPillNameClass: function() {
			return 'h7' + (this.editingPills ? ' mw-100' : '');
		},
	},
};
</script>

<style>
/* NOTE: These styles should not be directly copied to CC template. */
/* Can't use imported variables. Need to build first, then copy the output. */
@import '../../assets/css/variables.css';

/* TODO: These input states probably need to be graduated to theme in community.css */
.bank-search > input:focus {
	outline: none;
}

.bank-search > input::placeholder {
	color: var(--brand-copy-2);
	caret-color: var(--brand-primary-3);
}

.bank-search > input:hover::placeholder,
.bank-search > input:focus::placeholder {
	color: var(--brand-secondary-2);
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
	z-index: 1;
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
	overflow-x: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
	-webkit-overflow-scrolling: touch;
}

.dataholder-selected-wrapper::-webkit-scrollbar {
	display: none;
}
</style>
