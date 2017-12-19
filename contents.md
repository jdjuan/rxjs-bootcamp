# RxJS Boot Camp

## DAY 1

1. Intro
    1. Intro ES6: Arrow functions, spread/rest operator
    1. Intro German: Cold (Unicast)
    1. Intro Radiohead: Hot (Multicast)
    1. Reactive Programming:
        1. Observable Pattern + Iterator pattern + Functional Programming
        1. Observable + (Observer + Subject + Schedulers) + Operators (Creation/Instance)
    1. Intro Glitch
1. Installation: CDN, NPM, Angular
1. Sources 
    1. [Rxmarbles](http://rxmarbles.com)
    1. [LearnRX](https://www.learnrxjs.io/)
1. Operators types: Creation + Instance
    1. Creation Operators
        1. German Analogy
        1. Observable of() with simple observer
            1. EXERCISE: Create an app that once a button is fired, it subscribes and shows the content
        1. Observable from() with simple observer
        1. Observable range() with simple observer
            1. EXERCISE: Create an app that takes two inputs and prints a range in between those 2 values
        1. Observable create() using next
            1. Add errors, and complete
            1. Observer: success, error, complete
        1. Obsevable interval(), timer(x,y)
            1. Cancel: Unsubscribe()
            1. Unsubscribe: add()
            1. EXERCISE: Create an app that every 3 seconds prints a number. It only starts after 1 second. Unsubscribe after 10 seconds.
        1. FromEvent: Button Click and MouseDown
            1. EXERCISE: Create an app that changes the background color randomly every time the mouse moves
    1. Instance Operators
        1. Map: Multiply .from
        1. Delay: Used with .interval
        1. Filter: Filter greater than .from
            1. EXERCISE: Create a function that after 3 seconds, returns odd numbers multiplied by 2
        1. Skip: Skip first 2 from .interval
        1. Take: Take 3 interval
            1. EXERCISE: Create a function that only retrieves the first even number
        1. Find: It does it!
        1. Scan: Sum the numbers of an array
            1. EXERCISE: Create a button that every time it is clicked, it sums a variable
    1. CHOOSE ONE: Pluck, Pairwise, Distinc, SkipWhile, TakeWhile 
        1. Merge: Merge the events of 2 .from observables
            1. EXERCISE: Do it with 3 buttons
        1. Throttle: Get the last value emitted after window has happened
            1. EXERCISE: Change the background every 5 seconds when moving the mouse
        1. Debounce: Show me the last letter after it has happened 3 seconds

## DAY 2 

1. **Cold Observables vs Hot Observables + Producer + Unicast vs Multicast**
1. **Subject**
    1. Subject from Unicast (the type of subject determines the multicast behavior)
        1. To able to use the same object I can use multicast and then later connect.
        1. If nobody is listening, a hot observable, without RefCount(), would start firing right away.
        1. With RefCount once there are no subscribers, it becomes cold again
        1. The difference between publish and refCout, with share(), is that with the latter, once completed, it can start again, which is on the former
1. **Coding**
    1. **Create a hot multicast**
        1. `const subject = new Rx.Subject();`
        2. `source.subscribe(subject);`
        3. `export default subject;`
    1. **Show other types of subjects**
        1. `const subject = new Rx.BehaviorSubject('_'); // Age || Caching`
        2. `const subject = new Rx.ReplaySubject(3); // Partido de futbol`
        3. `const subject = new Rx.AsyncSubject(3); // En qué cerró la bolsa. La diferencia con el last es que el async subject sí me va a retornar el último incluso después de que la secuencia haya terminado`
    1. **Create a Connectable Observable**
        1. `source = source.multicast(subject); // ConnectableObservable`
        2. `isProducing$.subscribe(() => source.connect());`
    1. **Use publish shorthand**
        1. `.publish();`
        1. `isProducing$.subscribe(() => source.connect());`
    1. **Use Reference Count**
        1. `.publish().refCount(); // emits when there are subscribers, as long as the observable haven't completed`
        1. `.publishBehavior('-').refCount();`
        1. `.publishReplay(3).refCount();`
        1. `.publishLast().refCount();`
    1. **Use share to create a hot, multicast, ref count Observable**
        1. `.share(); // same as publish().refCount() except that after complete it CAN start again once there are new subscribers`
        1. `.shareReplay(); // SubjectReplay, it won't start again after completion even if it has no subscribers`
        1. `.shareReplay(1)` === `publishLast().refCount()`
1. **Real Examples**
    1. **Angular HTTP request:** Imports + Pipe Operator + Finish notation
    1. **Caching:** We want to AsyncSubject behavior for HttpRequest, but we want invalidate cache after a while (or no subscriptions available).
        1. Cache invalidation
    1. **Cancel Requests:** SwitchMap