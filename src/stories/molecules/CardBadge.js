// ComponentCardBadge
// [[
export default/*vueJSWidget.registerComponent('card-badge',*/ {
  // v0.1.0
  template: `
    <div class="rounded-lg border px-3 pt-4 pb-3 my-4 text-center shadow-1">
      <div class="mx-auto rounded-circle border-brand-primary-2 border-heavy bg-white content-box icon-48 p-2 mt-n5 mb-2">
        <slot/>
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