export class AsyncAction {
    pending = false;
    constructor(work) {
        this.work = work;
    }
    schedule(state, delay = 0) {
        this.state = state;
        this.delay = delay;
        if (this.id !== null) {
            this.id = this.recycleAsyncId(this.id);
        }
        this.pending = true;
        this.id = this.requestAsyncId(delay);
    }

    requestAsyncId(delay = 0) {
        return setInterval(this.execute.bind(this), delay);
    }

    execute() {
        this.pending = false;
        this.work(this.state);
        if (this.pending === false && this.id !== null) {
            this.id = this.recycleAsyncId(this.id);
        }
    }

    recycleAsyncId(id) {
        if (id !== null) {
            clearInterval(id);
        }
        return null;
    }
}