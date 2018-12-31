
## Subject

  [Source](https://github.com/ReactiveX/rxjs/blob/master/doc/subject.md)

- A subject is a type of Observable that allow **multicasted** values. Regular observables are **unicasted**, which means every subscription is independent.
- Subjects pretty much keep a list of every observer, and once an event is emitted, it is triggered for all of them. Subjects are like event emitters.
- only values emitted after the subscription are received
- Every subject is an Observable, which means you can subscribe to it. From the perspective of the observer, you can't tell if you are observing an **unicast or multicast** observable
- When you subscribe to a subject you are not triggering a new execution of events, you are just registering a new observer.
- Some other types of subjects are: BehaviorSubject, ReplaySubject y AsyncSubject.
- An analogy is thinking of ordering food. With unicast observables, for every friend that arrives, I go and make a new call, but with subjects I can just use the same request for everybody else.

```
var subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(1);
subject.next(2);
```

```
observerA: 1
observerB: 1
observerA: 2
observerB: 2
```

- Every subject can be Observer as well, which means they can be passed to the next function of another observable(for example a **unicast** observable). In such cases, every observer in the list(of the subject) ends up recieving shared information although ultimately coming from an unicast observable 


```
var subject = new Rx.Subject();
subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});
var observable = Rx.Observable.from([1, 2, 3]);
observable.subscribe(subject);
```

```
observerA: 1
observerB: 1
observerA: 2
observerB: 2
observerA: 3
observerB: 3
```

- Above can be written in this way

```
var source = Rx.Observable.from([1, 2, 3]);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);

// These are, under the hood, `subject.subscribe({...})`:
multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
multicasted.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

// This is, under the hood, `source.subscribe(subject)`:
multicasted.connect();
```

- **Reference counting:** Calling connect() manually and handling the Subscription is often cumbersome. Usually, we want to automatically connect when the first Observer arrives, and automatically cancel the shared execution when the last Observer unsubscribes. Consider the following example where subscriptions occur as outlined by this list:
  1. First Observer subscribes to the multicasted Observable
  2. The multicasted Observable is connected
  3. The next value 0 is delivered to the first Observer
  4. Second Observer subscribes to the multicasted Observable
  5. The next value 1 is delivered to the first Observer
  6. The next value 1 is delivered to the second Observer
  7. First Observer unsubscribes from the multicasted Observable
  8. The next value 2 is delivered to the second Observer
  9. Second Observer unsubscribes from the multicasted Observable
  10. The connection to the multicasted Observable is unsubscribed
- To achieve that with explicit calls to `connect()`, we write the following code:

```
var source = Rx.Observable.interval(500);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);
var subscription1, subscription2, subscriptionConnect;

subscription1 = multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
// We should call `connect()` here, because the first
// subscriber to `multicasted` is interested in consuming values
subscriptionConnect = multicasted.connect();

setTimeout(() => {
  subscription2 = multicasted.subscribe({
    next: (v) => console.log('observerB: ' + v)
  });
}, 600);

setTimeout(() => {
  subscription1.unsubscribe();
}, 1200);

// We should unsubscribe the shared Observable execution here,
// because `multicasted` would have no more subscribers after this
setTimeout(() => {
  subscription2.unsubscribe();
  subscriptionConnect.unsubscribe(); // for the shared Observable execution
}, 2000);
```

- Yet, we can use `refCount()` to achieve the same:

```
var source = Rx.Observable.interval(500);
var subject = new Rx.Subject();
var refCounted = source.multicast(subject).refCount();
var subscription1, subscription2, subscriptionConnect;

// This calls `connect()`, because
// it is the first subscriber to `refCounted`
console.log('observerA subscribed');
subscription1 = refCounted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

setTimeout(() => {
  console.log('observerB subscribed');
  subscription2 = refCounted.subscribe({
    next: (v) => console.log('observerB: ' + v)
  });
}, 600);

setTimeout(() => {
  console.log('observerA unsubscribed');
  subscription1.unsubscribe();
}, 1200);

// This is when the shared Observable execution will stop, because
// `refCounted` would have no more subscribers after this
setTimeout(() => {
  console.log('observerB unsubscribed');
  subscription2.unsubscribe();
}, 2000);
```

- Which outputs:

```
observerA subscribed
observerA: 0
observerB subscribed
observerA: 1
observerB: 1
observerA unsubscribed
observerB: 2
observerB unsubscribed
```

- Behavior Subject in the other hand return the last emitted value of the source to new subscribers
- Replay Subject re plays a segment of buffered values to new subscribers
- Async Subject emits the last value only when the source has completed. 


ReplaySubject stores all the values that it has published. Therefore, when you subscribe to it, you automatically receive an entire history of values that it has published, even though your subscription might have come in after certain values have been pushed out. BehaviorSubject is similar to ReplaySubject, except that it only stored the last value it published. BehaviourSubject also requires a default value upon initialization. This value is sent to observers when no other value has been received by the subject yet. This means that all subscribers will receive a value instantly on subscribe, unless the Subject has already completed.
You can use the AsyncSubject type for situations when the source observable is hot and might complete before any observer can subscribe to it. In this case, AsyncSubject can still provide the last value and publish it to any future subscribers.

## Hot vs Cold Observables

Cold observables start running upon subscription, i.e., the observable sequence only starts pushing values to the observers when Subscribe is called. Values are also not shared among subscribers. This is different from hot observables such as mouse move events or stock tickers which are already producing values even before a subscription is active. When an observer subscribes to a hot observable sequence, it will get all values in the stream that are emitted after it subscribes. The hot observable sequence is shared among all subscribers, and each subscriber is pushed the next value in the sequence. For example, even if no one has subscribed to a particular stock ticker, the ticker will continue to update its value based on market movement. When a subscriber registers interest in this ticker, it will automatically receive the next tick.

## Analogies

- A behavior subject is like your age
- A normal subject is like your birthday party


It helps to think of cold and hot Observables as movies or performances that one can watch ("subscribe").

* Cold Observables: movies.
* Hot Observables: live performances.
* Hot Observables replayed: live performances recorded on video.

Whenever you watch a movie, your run of the movie is independent of anyone else's run, even though all movie watchers see the same effects. On the other hand, a live performance is shared to multiple viewers. If you arrive late to a live performance, you will simply miss some of it. However, if it was recorded on video (in RxJS this would happen with a BehaviorSubject or a ReplaySubject), you can watch a "movie" of the live performance. A `.publish().refCount()` live performance is one where the artists quit playing when no one is watching, and start playing again when there is at least one person in the audience.
