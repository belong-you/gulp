(async () => {
    let num = 0;
    await num ++;
})()

// -------------------------
function* fn1() {
    yield 1;
    yield 2;
}
// -------------------------
const pro1 = new Promise((res, rej) => {
    res(1);
})
const pro2 = pro1.then(res => {
    return res * 2;
});
pro2.then(res => {
    console.log(res + 1)
})