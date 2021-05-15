import Tickbox from "../atoms/Tickbox";

const accordianHeader = `
<div :class="[ isOpen ? 'rounded-top border-bottom-0' : 'rounded border' ]" class="accordian-header border-color-secondary-2"
  v-on:click="isOpen = !isOpen">
  <i :class="'icon-32 icon-rab-' + icon" />
  <p class="h4 mb-1 font-weight-bold brand-primary-1">{{ title }}</p>
  <tickbox :checked="!isOpen" class="flex-none"/>
</div>
`;

// ComponentAccordian
export default /*vueJSWidget.registerComponent('accordian',*/ {
  // v0.1.0
  template: `
  <div class='accordian'>
    ${accordianHeader}
    <div :class="[ isOpen ? 'accordian-slider-open' : 'accordian-slider-closed' ]">
      <div class="accordian-content">
      <slot/>
    </div>
    </div>
  `,
  components: { Tickbox },
  props: {
    heading: String,
    title: String,
    icon: String,
  },
  data: function () {
    return {
      isOpen: this.isOpen,
    };
  },
  methods: {},
  computed: {},
};
