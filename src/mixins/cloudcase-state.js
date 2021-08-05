export default {
  props: {
    // Requires a JSON object string
    enteredData: String,
    textData: String,
    disabled: Boolean,
  },
  created() {
    if (this.enteredData) {
      this.setEntered();
    }
    if (this.textData) {
      this.setText();
    }
  },
  methods: {
    setEntered() {
      this.entered = JSON.parse(this.enteredData);
    },
    setText() {
      this.text = this.textData;
    },
  },
  watch: {
    enteredData() {
      this.setEntered();
    },
    textData() {
      this.setText();
    },
  },
};
