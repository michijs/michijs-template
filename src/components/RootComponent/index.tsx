import { AutonomousCustomElement, h, LSCustomElement } from '@lsegurado/ls-element';
import Counter from '../Counter';

@AutonomousCustomElement()
export class MyRootComponent extends HTMLElement implements LSCustomElement {

  onCountChanged(ev: CustomEvent<number>){
    console.log(`New count value: ${ev.detail}`);
  }

  render() {
    return (
      <Counter id="my-counter" oncountchanged={this.onCountChanged} />
    );
  }
}