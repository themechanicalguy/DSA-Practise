/**
 * An event emitter is a pattern that listens to a named event, fires a callback, then emits that event with a value. Sometimes this is referred to as a “pub/sub” model, or listener. It's referring to the same thing.
 */
// please complete the implementation
class EventEmitter {
  static id = 0;
  constructor() {
    this.callbackQueue = new Map();
  }
  subscribe(eventName, callback) {
    if (!this.callbackQueue.has(eventName)) {
      this.callbackQueue.set(eventName, []);
    }

    const arr = this.callbackQueue.get(eventName);
    arr.push({ cb: callback, id: EventEmitter.id });
    const id = EventEmitter.id;
    const cbQ = this.callbackQueue;
    EventEmitter.id++;

    const release = function () {
      const arr = this.callbackQueue.get(eventName);
      if (this.callbackQueue.has(eventName)) {
        this.callbackQueue.set(
          eventName,
          arr.filter((cb) => cb.id != id)
        );
        console.log(cbQ.entries());
      }
    };

    return { release: release.bind(this) };
  }

  emit(eventName, ...args) {
    const callbackArr = this.callbackQueue.get(eventName);
    console.log(callbackArr, 'cbarr');
    if (Array.isArray(callbackArr)) {
      callbackArr.forEach((cb) => cb.cb(...args));
    }
  }
}

const emitter = new EventEmitter();
const callback1 = (a, b, c) => console.log('Venkat', a + b + c);
const sub1 = emitter.subscribe('event1', callback1);
const sub2 = emitter.subscribe('event1', callback1);
emitter.emit('event1', 1, 2, 3);
sub2.release();
emitter.emit('event1', 4, 5, 6);
