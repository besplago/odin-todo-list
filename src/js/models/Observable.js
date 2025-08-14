export class Observable {
  constructor() {
    this.listeners = [];
  }
  bind(callback) {
    this.listeners.push(callback);
  }
  _commit(data) {
    this.listeners.forEach((cb) => cb(data));
  }
}
