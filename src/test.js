class EventEmitter {
  on(eventName, listener) {
    if (!this[eventName]) {
      this[eventName] = [listener]
    } else {
      this[eventName].push(listener)
    }
  }
  emit(eventName, ...args) {
    const matchEventListeners = this[eventName]
    if (!matchEventListeners) return
    matchEventListeners.foreach((listener) => listener(...args))
  }
}
