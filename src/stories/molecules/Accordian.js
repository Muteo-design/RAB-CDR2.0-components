import Tickbox from "../atoms/Tickbox";
import Chevron from "../atoms/Chevron";

const accordianHeader = `
<div class="border-bottom-0 rounded-top accordian-header border-color-secondary-2 no-select"
  v-on:click="isChecked= !isChecked">
  <i :class="'icon-36 icon-rab-' + icon" />
  <p class="accordian-title mb-1 font-weight-bold brand-primary-1">{{ title }}</p>
  <tickbox :checked="isChecked" class="flex-none"/>
</div>
`;

const footerTitle = `{{ isOpen ? "Hide" : "What's included" }}`;
const accordianFooter = `
<div class="border-top-0 rounded-bottom accordian-footer border-color-secondary-2 no-select"
  v-on:click="isOpen= !isOpen">
  <span class="mb-2 font-weight-bold brand-primary-1">${footerTitle}</span>
  <chevron :expanded="isOpen" class="flex-none"/>
</div>
`;

// ComponentAccordian
export default /*vueJSWidget.registerComponent('accordian',*/ {
  // v0.1.0
  template: `
  <div class='accordian'>
    ${accordianHeader}
    <div class="accordian-content">
      <slot/>
      <div :class="[ isOpen ? 'accordian-slider-open' : 'accordian-slider-closed' ]">
        <slot name="footer"/>
      </div>
    </div>
    ${accordianFooter}
  </div>
  `,
  components: { Tickbox, Chevron },
  props: {
    heading: String,
    title: String,
    footerTitle: String,
    icon: String,
  },
  data: function () {
    return {
      isChecked: this.isChecked,
      isOpen: this.isOpen,
    };
  },
  methods: {},
  computed: {},
};
