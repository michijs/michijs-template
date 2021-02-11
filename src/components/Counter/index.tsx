import { AutonomousCustomElement, h, AdoptedStyle, EventDispatcher, CustomEventDispatcher, LSCustomElement, HTMLAttributes, Attribute, CustomElementWrapper, Observer } from '@lsegurado/ls-element';
import style from './index.css';

@AutonomousCustomElement()
export class MyCounter extends HTMLElement implements LSCustomElement {
	@Attribute() count = 0;
	@EventDispatcher() countChanged: CustomEventDispatcher<number>;

	@Observer('count')
	onChangeCount(newValue: number, _oldValue: number) {
	  this.countChanged.dispatch(newValue);
	}

	decrementCount() {
	  this.count--;
	}

	incrementCount() {
	  this.count++;
	}

	render() {
	  return (
	    <>
	      <AdoptedStyle parentRef={this} id="style">{style}</AdoptedStyle>
	      <button id="decrement-count" onpointerup={this.decrementCount}>-</button>
	      <span id="count">{this.count}</span>
	      <button id="increment-count" onpointerup={this.incrementCount}>+</button>
	    </>
	  );
	}
}

type CounterAttributes = {
	oncountchanged?: (event: CustomEvent<number>) => void;
} & HTMLAttributes;

export default CustomElementWrapper<CounterAttributes>(MyCounter);