const next = (x) => console.log(x);
const error = (x) => console.warn(x);
const complete = () => console.info('Complete');
const buttons = document.querySelectorAll('.button');

// Pluck, Pairwise, Distinc, Skipwhile, TakeWhile
                        1        2            3
    4      5          6          7          8
// const observers = {next, error, complete};

// const source = Rx.Observable.timer(0, 1000)
//                             .throttleTime(5000)

// let source = Rx.Observable.fromEvent(buttons, 'click')
//                           .merge(Rx.Observable.timer(0, 2000))
//                           .scan((acc, x)=> acc+1, 0);

source.subscribe(observers);



