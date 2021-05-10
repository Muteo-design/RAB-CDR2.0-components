export default {
  template: `
    <div class="rounded py-2 hover-bg-brand-secondary-three"
         :class="[ disabled ? 'cursor-not-allowed' : 'cursor-pointer' ]">
      <i class="icon-2" :class="variation"/>
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
    variation: function() {
      if (this.isChecked) {
        return 'icon-rab-tickbox-active' + (this.disabled ? '-disabled' : '');
      } else {
        return 'icon-rab-tickbox' + (this.disabled ? '-disabled' : '');
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