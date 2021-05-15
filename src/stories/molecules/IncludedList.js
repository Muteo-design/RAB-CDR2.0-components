export default {
  template: `
    <div>
      <div class="mb-2--5 font-weight-bold brand-primary-1">{{title}}</div>
        <ul class="mb-n3 pl-0 text-brand-copy-2 dual-columns list-unstyled bullet-check-green">
          <li v-for="listItem in list" :key="listItem">
              {{ listItem }}
          </li>  
        </ul>
    </div>
  `,
  props: {
    title: String,
    list: Array,
  },
  data: {},
  computed: {},
};
