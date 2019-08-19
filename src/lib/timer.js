export default function timer (callback, delay) {
  var id, started, remaining = delay, running

  this.start = function () {
    running = true
    started = new Date()
    id = setTimeout(() => {
      this.pause();
      callback();
    }, remaining)
  }

  this.pause = function () {
    running = false
    clearTimeout(id)
    remaining -= new Date() - started
  }

  this.toggle = function () {
    if (running) {
      this.pause();
    }
    else {
      this.start();
    }
  }

  this.getProgress = function () {
    if (running) {
      this.pause()
      this.start()
    }

    return (delay - remaining) / delay;
  }

  this.getStateRunning = function () {
    return running
  }

  this.end = function () {
    this.pause();
    remaining = 0;
    callback();
  }

  this.restart = function () {
    this.pause();
    remaining = delay;
    this.start();
  }

  this.start()
}