import { logEvent, isCompleted$, isProducing$ } from './utils.js'

const source = Rx.Observable.timer(0, 1000)
    .do(logEvent)
    .takeUntil(isCompleted$)

export default source;