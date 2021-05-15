export default {
  template: `
    <div>
      <span class="mb-2 font-weight-bold brand-primary-1">{{title}}</span>
      <p class="h6 text-brand-copy-2">{{body}}</p>
    </div>
  `,
  props: {
    title: String,
    body: String,
  },
  data: function () {
    return {
      title: this.title,
      body: this.body,
    };
  },
  computed: {},
};
