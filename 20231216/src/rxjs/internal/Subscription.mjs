export class Subscription {
    _finalizers = [];
    unsubscribe() {
        const { _finalizers } = this;
        if (_finalizers) {
            for (const finalizer of _finalizers) {
                finalizer();
            }
        }
    }
    add(teardown) {
        this._finalizers.push(teardown);
    }
}