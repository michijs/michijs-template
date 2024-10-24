import { createCustomElement } from "@michijs/michijs";
import { MyCounter } from "../Counter";

createCustomElement("root-component", {
  shadow: false,
  methods: {
    onCountChanged(ev: CustomEvent<number>) {
      console.log(`New count value: ${ev.detail}`);
    },
  },
  render() {
    return <MyCounter oncountchanged={this.onCountChanged} />;
  },
});
