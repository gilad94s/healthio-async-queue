const EventEmitter = require('events');

class AsyncQueue extends EventEmitter {
    constructor(asyncFunc) {
        super();
        this.asyncFunc = asyncFunc;
        this._queue = [];
        this._currentlyRunning = false;
    }

    add(...args) {
        this._queue.push(args);
        this._run();
    }

    async _run() {
        if (!this._queue.length || this._currentlyRunning) {
            return;
        }

        const args = this._queue.shift();

        try {
            this._currentlyRunning = true;
            const response = await this.asyncFunc(...args);
            this.emit('success', response);

        } catch (e) {
            this.emit('error', e);

        } finally {
            this._currentlyRunning = false;
            this._run();
        }
    }
}

module.exports = AsyncQueue;