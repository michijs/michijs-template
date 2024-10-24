import { createCustomElement, EventDispatcher } from "@michijs/michijs";
import { style } from "./index.css";

export const MyCounter = createCustomElement("my-counter", {
  reflectedAttributes: {
    count: 0,
  },
  methods: {
    decrementCount() {
      this.count(this.count() - 1);
    },
    incrementCount() {
      this.count(this.count() + 1);
    },
  },
  events: {
    countChanged: new EventDispatcher<number>(),
  },
  adoptedStyleSheets: { style },
  render() {
    this.count.subscribe(this.countChanged);
    return (
      <>
        <button onpointerup={this.decrementCount}>-</button>
        <span>{this.count}</span>
        <button onpointerup={this.incrementCount}>+</button>
      </>
    );
  },
});
