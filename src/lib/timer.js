export default function timer (callback, delay) {
  var id, started, remaining = delay, running

  this.start = function () {
    if (!running) {
      running = true
      started = new Date()
      id = setTimeout(() => {
        this.pause();
        callback();
      }, remaining)
    }
  }

  this.pause = function () {
    if (running) {
      running = false
      clearTimeout(id)
      remaining -= new Date() - started
    }
  }

  this.toggle = function () {
    if (running) {
      this.pause();
    } else {
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
    if (running) {
      this.pause();
      remaining = 0;
      callback();
    } else {
      remaining = 0;
    }
  }

  this.restart = function () {
    if (running) {
      this.pause();
      remaining = delay;
      this.start();
    } else {
      remaining = delay;
    }
  }

  this.start()
}
