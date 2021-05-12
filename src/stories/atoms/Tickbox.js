export default {
  template: `
    <div class="rounded p-2 hover-bg-brand-secondary-3"
         @mouseenter="hover = true"
         @mouseleave="hover = false"
         :class="[ disabled ? 'cursor-not-allowed' : 'cursor-pointer' ]">
      <i class="icon-1" :class="iconName"/>
      <input type="checkbox" class="d-none" v-model="checkedLocal" :disabled="disabled">
    </div>
  `,
  props: {
    checked: Boolean,
    disabled: Boolean,
  },
  data: function() {
    return {
      hover: false,
      isChecked: this.checked,
    };
  },
  methods: {
    setHover: function(value) {
      if (!this.disabled) {
        this.hover = value;
      }
    },
  },
  computed: {
    iconName: function() {
      if (this.isChecked) {
        return 'icon-rab-tickbox-active' + (this.disabled ? '-disabled' : '');
      } else {
        return 'icon-rab-tickbox' + (this.disabled ? '-disabled' : (this.hover ? '-hover' : ''));
      }
    },
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