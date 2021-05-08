// 代码的封装性和可读性固然重要，但是代码的正确性更为重要。
// 如果你是一个初级工程师，可能你无法写出高封装性的代码，
// 但是你也必须保证你所提交的代码是正确的，否则就会造成业务逻辑失败。
// 可能你会觉的这个话题很滑稽，我怎么可能将错误的代码提交呢？
// 但在实际开发中，我们可能会写出错误的代码而不自知。
// 比如：洗牌算法的陷阱。

// 考虑这样一个抽奖场景：给定一组生成好的抽奖号码，然后我们需要实现一个模块。
// 这个模块的功能是将这组号码打散（即，洗牌）然后输出一个中奖的号码。
// 那这个打散号码的JS片段如下：
// 错误1.0
// function shuffle (items) {
//   return [...items].sort((a,b) => Math.random() > 0.5 ? -1 : 1)
// }

// 测试代码 错误1.0
// function shuffle(items) {
//   return items.sort((a, b) => Math.random() > 0.5 ? -1 : 1);
// }

// const weights = Array(9).fill(0);

// for(let i = 0; i < 10000; i++) {
//   const testItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//   shuffle(testItems);
//   testItems.forEach((item, idx) => weights[idx] += item);
// }

// console.log(weights);
// [45503, 45530, 49547, 50257, 50399, 50356, 50693, 52002, 55713]
// 每次结果有变化，但总的来说前面的数字小，后面的数字大

// 正确2.0
// function shuffle (items) {
//   items = [...items]
//   const ret = []
//   while (items.length) {
//     const idx = Math.floor(Math.random() * items.length)
//     ret.push(items.splice(idx,1)[0])
//   }
//   return ret
// }

// let items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(shuffle(items))
// 测试代码 正确2.0
// const weights = Array(9).fill(0);

// for(let i = 0; i < 10000; i++) {
//   const testItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//   shuffle(testItems).forEach((item, idx) => weights[idx] += item);
// }
// console.log(weights);

// 正确 3.0
function shuffle (items) {
  items = [...items]
  for (let i=items.length; i>0; i--) {
    const idx = Math.floor(Math.random() * i)
   
    ;[items[idx], items[i - 1]] = [items[i - 1], items[idx]]
  }
  return items
}
let items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(shuffle(items))

// 测试代码 正确3.0
const weights = Array(9).fill(0);
for(let i = 0; i < 100000; i++) {
  const testItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffle(testItems).forEach((item, idx) => weights[idx] += item);
}
console.log(weights);



// 4.0 目前没看懂
// https://juejin.cn/book/6891929939616989188/section/6891930943884689421
// function* shuffle(items) {
//   items = [...items];
//   for(let i = items.length; i > 0; i--) {
//     const idx = Math.floor(Math.random() * i);
//     [items[idx], items[i - 1]] = [items[i - 1], items[idx]];
//     yield items[i - 1];
//   }
// }

// let items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// items = shuffle(items);
// console.log(...items);

// 演示代码
// function *shuffle(items) {
//   items = [...items];
//   for(let i = items.length; i > 0; i--) {
//     const idx = Math.floor(Math.random() * i);
//     [items[idx], items[i - 1]] = [items[i - 1], items[idx]];
//     yield items[i - 1];
//   }
// }

// let items = [...new Array(100).keys()];

// let n = 0;
// // 100个号随机抽取5个
// for(let item of shuffle(items)) {
//   console.log(item);
//   if(n++ >= 5) break;
// }


