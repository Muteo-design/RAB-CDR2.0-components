export default {
  template: `
    <div class="rounded py-2 hover-bg-brand-secondary-3"
         :class="[ disabled ? 'cursor-not-allowed' : 'cursor-pointer' ]">
         <h1>JC Testing.</h1>
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
};