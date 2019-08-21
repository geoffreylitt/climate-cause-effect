import causes from "./data/causes";
import effects from "./data/effects";
import { writable, readable } from 'svelte/store';
import libTimer from './lib/timer'

class CauseEffectSlides {
  constructor(causes, effects) {
    this.causes = this.shuffle(causes)
    this.effects = this.shuffle(effects)
    this.length = Math.min(this.causes.length, this.effects.length)
    this.index = 0
    // instances of this class are a readable store
    // which internally write to a writeable store
    const { subscribe, set, update } = writable({cause: this.causes[this.index], effect: this.effects[this.index]});
    this.subscribe = subscribe
    this._set = set
    this._update = update
  }

  // always keep first item the same, in order to make
  // clientside rendering deterministic
  shuffle(a) {
    const out = this.pureShuffle(a.slice(1))
    out.unshift(a[0])
    return out
  }

  // called after load, true shuffle is fine
  reshuffle() {
    this.causes = this.pureShuffle(causes)
    this.effects = this.pureShuffle(effects)
    this.index = 0
    this._set({cause: this.causes[this.index], effect: this.effects[this.index]})
  }

  next() {
    this.index = this.mod(this.index + 1, this.length)
    this._set({cause: this.causes[this.index], effect: this.effects[this.index]})
  }

  prev() {
    this.index = this.mod(this.index - 1, this.length)
    this._set({cause: this.causes[this.index], effect: this.effects[this.index]})
  }

  mod(n, m) {
    return ((n % m) + m) % m;
  }

  pureShuffle(a) {
    return a.reduce((l, e, i) => {
      const j = Math.floor(Math.random()*(a.length-i)+i); // j is in [i, a.length[
      [ a[i], a[j] ] = [ a[j], a[i] ];
      return a;
    }, a)
  }
}

// slides can be referenced as $slides for dynamically updated
// values, but slides is also an object with slides.next() and
// slides.prev() methods
const slides = new CauseEffectSlides(causes, effects);

function createControls() {
  const { subscribe, set, update } = writable(0);

  let timer;

  // the timer should run on a loop, starting
  // new timer every time it finishes
  let startNewTimer = () => {
    return new libTimer(() => {
      slides.next();
      timer = startNewTimer();
    }, 10000);
  };

  timer = startNewTimer();
  // upon creation, the timer is immediately
  // paused (waiting for the home page to be
  // mounted)
  timer.pause();
  set({ playing: timer.getStateRunning() });

  return {
    subscribe,
    start: () => {
      timer.start()
      set({ playing: timer.getStateRunning() });
    },
    pause: () => {
      timer.pause();
      set({ playing: timer.getStateRunning() });
    },
    toggle: () => {
      timer.toggle();
      set({ playing: timer.getStateRunning() });
    },
    getProgress: () => {
      return timer.getProgress();
    },
    restart: () => {
      timer.restart();
      set({ playing: timer.getStateRunning() });
    },
    next: () => {
      timer.end();
      set({ playing: timer.getStateRunning() });
    },
    prev: () => {
      timer.restart();
      slides.prev();
      set({ playing: timer.getStateRunning() });
    }
  };
}

const controls = createControls();

export {
  slides,
  controls
}
