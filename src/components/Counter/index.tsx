import { createCustomElement, EventDispatcher } from "@michijs/michijs";
import { style } from "./index.css";

export const MyCounter = createCustomElement("my-counter", {
  reflectedAttributes: {
    count: 0,
  },
  methods: {
    decrementCount() {
      this.count--;
    },
    incrementCount() {
      this.count++;
    },
  },
  events: {
    countChanged: new EventDispatcher<number>(),
  },
  adoptedStyleSheets: [style],
  observe: {
    count() {
      this.countChanged(this.count);
    },
  },
  render() {
    return (
      <>
        <button onpointerup={this.decrementCount}>-</button>
        <span>{this.count}</span>
        <button onpointerup={this.incrementCount}>+</button>
      </>
    );
  },
});
