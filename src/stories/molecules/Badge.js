export default {
  template: `
    <div class="rounded-lg border pt-4 px-3 py-2 my-4 text-center shadow-subtle">
      <div class="mx-auto d-inline-block position-relative rounded-circle border-heavy border-brand-primary-two bg-white mt-n5 mb-2 content-box icon-4 p-2">
        <div class="center-xy">
          <slot/>
        </div>
      </div>
      <h4 class="mb-1 text-small">{{ heading }}</h4>
      <p class="text-small">{{ text }}</p>
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