import {
    createInput,
    subscribingButtonElement,
    unsubscribingButtonElement,
    observers
} from './utils.js'

import source from './subject.js'

const subscriptions = [];

const addSubscription = () => {
    const input = createInput();
    const subscription = source.subscribe(observers(input));
    subscriptions.push({ subscription, input });
};
Rx.Observable.fromEvent(subscribingButtonElement, 'click').subscribe(addSubscription);

const removeSubscription = () => {
    if (subscriptions.length) {
        const { subscription, input } = subscriptions.pop();
        subscription.unsubscribe();
        input.remove();
    }
}
Rx.Observable.fromEvent(unsubscribingButtonElement, 'click').subscribe(removeSubscription);