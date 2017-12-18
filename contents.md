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

1. Angular imports