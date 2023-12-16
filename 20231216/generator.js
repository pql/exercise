function* generator() {
    yield 1;
    yield 2;
    yield 3;
}
const it = generator();
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);