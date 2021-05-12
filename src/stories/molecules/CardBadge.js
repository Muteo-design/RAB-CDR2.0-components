// CardBadgeComponent
// [[
export default /*vueJSWidget.registerComponent('card-badge',*/ {
  // v0.1.0
  template: `
    <div class="rounded-lg border pt-4 px-3 pb-2 my-4 text-center shadow-1">
      <div class="mx-auto d-inline-block position-relative rounded-circle border-brand-primary-2 border-heavy bg-white mt-n5 mb-2 content-box icon-4 p-2">
        <div class="center-xy">
          <slot/>
        </div>
      </div>
      <h4 class="mb-1">{{ heading }}</h4>
      <p class="h6">{{ text }}</p>
    </div>
  `,
  props: {
    heading: String,
    text: String,
  },
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
};