import cute from './pretty-logging.js'

Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

const createInput = () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'long';
    const inputs = document.getElementById('inputs');
    inputs.appendChild(input);
    return input;
};

const subscribingButtonElement = document.querySelector('.subscribe-button');
const unsubscribingButtonElement = document.querySelector('.unsubscribe-button');
const completeButtonElement = document.querySelector('.complete-button');
const produceButtonElement = document.querySelector('.produce-button');

const isCompleted$ = Rx.Observable.fromEvent(completeButtonElement, 'click')
const isProducing$ = Rx.Observable.fromEvent(produceButtonElement, 'click')

const logEvent = (x) => cute.info('Event: ' + x);
const show = (text, element) => element.value += text + ' ';
const next = (element) => (x) => show(x, element);
const error = (x) => cute.error(x);
const complete = () => cute.success('completed');

const observers = (element) => ({ next: next(element), error, complete });


export {
    cute,
    isCompleted$,
    isProducing$,
    createInput,
    subscribingButtonElement,
    unsubscribingButtonElement,
    produceButtonElement,
    logEvent,
    observers
}