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

  this.start()
}