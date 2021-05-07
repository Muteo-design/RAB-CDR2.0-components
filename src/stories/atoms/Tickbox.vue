<template>
  <div class="dataholder-select-check"
       @mouseenter="setHover(true)"
       @mouseleave="setHover(false)"
       :class="[ disabled ? 'cursor-not-allowed' : 'cursor-pointer', { 'bg-gray': hover }]">
    <span class="dataholder-select-check-icon">
      <svg v-if="isChecked" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" :fill="disabled ? color.muted : color.highlight"/>
        <path d="M8.42486 12.0186C8.08394 11.6752 7.54847 11.6938 7.22885 12.0601C6.90924 12.4263 6.92651 13.0016 7.26744 13.345L10.652 16.7541C11.0154 17.1201 11.5929 17.0714 11.8986 16.649L17.8217 8.46725C18.1086 8.07094 18.0421 7.49978 17.6732 7.19154C17.3044 6.8833 16.7728 6.95469 16.4859 7.351L11.1325 14.7458L8.42486 12.0186Z" fill="#FFFFFF"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M19 24H5c-2.8 0-5-2.2-5-5V5c0-2.8 2.2-5 5-5h14c2.8 0 5 2.2 5 5v14c0 2.8-2.2 5-5 5zM5 1C2.8 1 1 2.8 1 5v14c0 2.2 1.8 4 4 4h14c2.2 0 4-1.8 4-4V5c0-2.2-1.8-4-4-4H5z" :fill="disabled ? color.muted : color.highlight"/>
        <path v-if="!disabled" d="M17.6 11.1c.5 0 1 .4 1 .8s-.4.8-1 .8H6.8c-.5 0-1-.4-1-.8s.4-.8 1-.8h10.8z" fill-rule="evenodd" clip-rule="evenodd" :fill="hover ? color.highlight : color.muted"/>
      </svg>
      <input type="checkbox" class="d-none" v-model="checkedLocal" :disabled="disabled">
    </span>
  </div>
</template>

<script>
export default {
  props: {
    checked: Boolean,
    disabled: Boolean,
  },
  data: function() {
    return {
      hover: false,
      isChecked: this.checked,
      color: {
        highlight: '#015060',
        muted: '#CBD6E1',
      },
    };
  },
  methods: {
    setHover: function(value) {
      if (!this.disabled) {
        this.hover = value;
      }
    }
  },
  computed: {
    checkedLocal: {
      get: function() {
        this.isChecked = this.checked;
        return this.checked;
      },
      set: function(value) {
        this.isChecked = value;
        this.$emit('update:checked', value);
      },
    },
  },
};
</script>

<style>
.dataholder-select-check {
  padding: 0.3rem;
  border-radius: 0.5rem;
}
</style>