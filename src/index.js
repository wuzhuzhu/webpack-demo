import './style.css'
import Coin from './coin.png'
import { cube } from './math.js';
import _ from 'lodash'

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join([
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ])
  element.classList.add('hello');

  const myCoin = new Image()
  myCoin.src = Coin
  element.appendChild(myCoin)

  btn.innerHTML = 'Click me and check the console!';

  btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    const print = module.default;

    print();
  });

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}