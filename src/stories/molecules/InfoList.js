import Tickbox from "../atoms/Tickbox";

// ComponentInfoList
export default /*vueJSWidget.registerComponent('info-list',*/ {
  // v0.1.0
  template: `
    <div class='info-list'>
        <div class="info-list-column-1">
            <span class="h4 info-list-title font-weight-bold brand-primary-1">{{ title }}</span>
            <ul class="bullet-info info-list-bullet-info">
                <li v-for="infoText in infoList" :key="infoText">
                    {{ infoText }}
                </li>  
            </ul>
        </div>
        <div class="info-list-column-2"> <i class="info-list-logo icon-rab-logo-cdr"/></div>
    </div>
  `,
  components: { Tickbox },
  props: {
    title: String,
    infoList: Array,
  },
  data:{},
  methods: {},
  computed: {},
};
