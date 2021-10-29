import { createCustomElement } from '@lsegurado/ls-element';
import { MyCounter } from '../Counter';

createCustomElement('my-root-element', {
  shadow: false,
  methods: {
    onCountChanged(ev: CustomEvent<number>){
      console.log(`New count value: ${ev.detail}`);
    }
  },
  render() {
    return (
      <MyCounter id="my-counter" oncountchanged={this.onCountChanged} />
    );
  }
});