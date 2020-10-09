##  Array

- 引用类型

####  array 定义

-  new Array()   
-  new Array(item, item, item...)     定义同时初始化
-  new Array(length)   定以指定长度的数组
-  []   字面量定义数组

####  类型判断

-  instanceof

####  数组赋值

-   Array[index] = value

####  数组取值

-   Array[index]

##### 数组不限制长度  不限制类型

#####  引用类型赋值  传递的是地址



####  数组内置方法

-   concat
    -   合并数组   返回一个新数组  不会更改现有数组
    -   省略 valueN 所有参数  则返回此方法现存数组的浅拷贝 

```javascript
const new_array = old_array.concat(value1[, value2[, ...[, valueN]]]) 
```

```javascript
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3) // ["a", "b", "c", "d", "e", "f"]
```

 

- copyWithin
  - target   复制到该起始位置  如果是 负数  target 从末尾开始计算
  - start     开始复制元素其实位置  默认为 0
  - end      开始复制元素的结束位置   不包括该元素位置 

```javascript
arr.copyWithin(target[, start[, end]])
```

 ```javascript
const array1 = ['a', 'b', 'c', 'd', 'e'];

console.log(array1.copyWithin(0, 3, 4));
// ["d", "b", "c", "d", "e"]

console.log(array1.copyWithin(1, 3));
// ["d", "d", "e", "d", "e"]
 ```



- entries
  - 返回一个迭代对象   包含数组中每个索引的   键值对
  - 通过 返回对象的 next 方法获得

 ```javascript
const array1 = ['a', 'b', 'c'];

const iterator1 = array1.entries();

console.log(iterator1.next().value); // [0, 'a']
 ```

- fill
  - 把 一个固定值  填充到数组中  起始索引到种植索引内的全部元素  不包括终止索引
  - value 固定值
  - start 起始索引位置   默认值 0
  - end 结束索引位置     默认值this.length

```javascript
arr.fill(value[, start[, end]])
```

 ```javascript
const arr3 = [1, 2, 3, 4, 5, 6, 7];
function fill1() {
    return arr3.fill(0, 2, 4)
}
console.log(fill1()) // [1, 2, 0, 0, 5, 6, 7]
 ```

- includes
  - 判断数组是否包含指定值   返回 true || false
  - valueToFind  需要查找的元素值
  - fromIndex   从fromIndex    负数为从后向前查询

```javascript
arr.includes(valueToFind[, fromIndex])
```

 ```javascript
const arr2 = ['d', 'e', 'f'];
function includes1() {
    return arr2.includes('e')
}

console.log(includes1()) // true
 ```



- indexOf
  - 判断数组是否包含指定值   返回 第一个符合条件的索引值    否则返回 -1
  - valueToFind  需要查找的元素值
  - fromIndex   从fromIndex   负数为从后向前查询

```javascript
arr.indexOf(valueToFind[, fromIndex])
```

```javascript
const arr2 = ['d', 'e', 'f'];
function indexOf1() {
    return arr2.indexOf('e')
}

console.log(indexOf1()) // 1
```



- lastIndexOf
  - 判断数组是否包含指定值  从后向前   返回 第一个符合条件的索引值    否则返回 -1
  - searchElement  需要查找的元素值
  - fromIndex   从fromIndex  正数为从后向前索引值   负数从后向前为偏移量

```javascript
arr.lastIndexOf(searchElement[, fromIndex])
```

```javascript
const arr3 = [1, 2, 3, 4, 5, 6, 7];
function lastIndexOf1() {
    return arr3.lastIndexOf(5, -4)

}

console.log(lastIndexOf1())
```





- join
  - 将数组 (类数组对象) 的所有元素以指定分隔符拼接成过一个字符串 并返回   
  - 如果只有一项 返回该项目不使用分隔符

```javascript
arr.join([separator])
```

```javascipt
const arr2 = ['d', 'e', 'f'];
function join1() {
    return arr2.join('***')
}

console.log(join1()) // d***e***f
```



- keys
  - 返回一个迭代对象   包含数组中每个索引的   键值对
  - 通过 返回对象的 next 方法获得

 ```javascript
function keys1() {
    return arr2.keys()


console.log(keys1().next())
 ```

-  pop
  - 从数组删除最后一个元素   并返回该元素的值  更改数组长度
  - 数组为空时  返回 undefined

```javascript
const arr2 = ['d', 'e', 'f'];
function pop1() {
	return arr2.pop()
}

console.log(pop1()) // 'f'
```

- shift
  - 从数组删除第一个元素   并返回该元素的值  更改数组长度
  - 数组为空时  返回 undefined

```javascript
const arr2 = ['d', 'e', 'f'];
function pop1() {
	return arr2.pop()
}

console.log(pop1()) // 'd'
```

- unshift
  - 将多个元素添加到数组开头  返回数组长度

```javascript
const arr2 = ['d', 'e', 'f'];
functionfunction push1() {
    return arr2.push('f', 'g', 'h')
}

console.log(push1()) // 6
```



- push
  - 将多个元素添加到数组末尾  返回数组长度

 ```javascript
const arr2 = ['d', 'e', 'f'];
functionfunction push1() {
    return arr2.push('f', 'g', 'h')
}

console.log(push1()) // 6
 ```

- reverse
  -  将数组中元素的位置颠倒  会改变原数组

```javascript
const arr2 = ['d', 'e', 'f'];
function reverse1() {
    return arr2.reverse()
}

console.log(reverse1()) // ['f', 'e', 'd']
```



- slice
  - 将数组进行切片  返回一个新数组
  - start 提取起始索引  默认0
  - end  提取终止索引   默认结束

 ```javascript
arr.slice([begin[, end]])
 ```

```javascript
const arr2 = ['d', 'e', 'f'];
function slice1() {
    return arr2.slice(1, 2)
}

console.log(slice1()) // 'e'
```

-  splice
   - 删除, 替换现有元素  或添加新元素修改数组   返回被删除的内容 (数组形式)   改变原数组
   - start   被操作的其实 索引
   - deleteCount  删除数据
   - item1 item2   添加的数据  从 satrt开始

```javascript
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```

```javascript
const arr2 = ['e', 'f', 'g']
function splice1 () {
    return arr2.splice(0, 2, 'e', 'g', 'i')
}

console.log(splice1()) // e, f
```



-  sort
   - 将数组的元素 默认转化为内字符串  按照 UTF-16  进行排序  改变原数组
   - 接收一个参数 compareFunction   按照某种顺序进行排列

```javascript
const arr2 = ['d', 'e', 'f'];
function sort1 () {
    return arr2.sort()
}

console.log(sort1()) //['d', 'e', 'f']; 
```

- toString
  - 数组里面所有元素  转换为字符串 并返回  

 ```javascript
const arr1 = ['a', 'b', 'c', ["a", "b", "c", "d", "e", "f"]];
function toString1 () {
    return arr1.toString()
}

console.log(toString1()) // a,b,c,a,b,c,d,e,f
 ```

 

- values
  - 返回 数组迭代 对象    包含数组中每个索引值

```javascript
const arr1 = ['e', 'f', 'g']
function values1 () {
    return arr1.values()
}

for (const iterator of values1()) {
    console.log(iterator) // e, f, g
}
```



#### 数组遍历

- for 循环

```javascript
for (let i =0, i <= 5; i++) {
    console.log(i)
}

for (let i =16, i-=1) {
    console.log(i)
}
```

- for ... in 循环遍历数组

```javascript
for(var i in arr){
	console.log(i,arr[i]);
}
```

- every
  - 判断 数组内的所有元素 都满足条件   返回一个布尔值 
  - 若 收到一个空数组   此方法在一切情况下都返回true
  - element  数组当前项
  - index  当前项索引
  - array   当前数组
  - thisArg  执行  callback  回调函数时的 this 值

```javascript
arr.every(callback(element[, index[, array]])[, thisArg])
```

```javascript
const arr3 = [1, 2, 3, 4, 5, 6, 7];
function every1() {

    return arr3.every((item)  => item > 5)
}

console.log(every1())
```

- filter
  - 筛选数组满足条件的元素    返回一个新数组
  - element  数组当前项
  - index  当前项索引
  - array   当前数组
  - thisArg   执行 callback函数时 this 指向

```javascript
arr.filter(callback(element[, index[, array]])[, thisArg])
```

```javascript
const arr3 = [1, 2, 3, 4, 5, 6, 7];
function filter1 () {
    return arr3.filter(item => item % 2)
}

console.log(filter1()) // [1, 3, 5, 7]
```

- find
  - 筛选数组满足条件的第一个元素 并返回     否则返回 undefined  会中断循环
  - element  数组当前项
  - index  当前项索引
  - array   当前数组
  - thisArg   执行 callback函数时 this 指向

```javascript
arr.find(callback(element[, index[, array]])[, thisArg])
```

```javascript
function find1 () {
    return arr3.find(item => item >= 5)
}

console.log(find1()) // 5
```

- findIndex
  - 筛选数组满足条件的第一个元素的索引 并返回     否则返回 -1  会中断循环
  - element  数组当前项
  - index  当前项索引
  - array   当前数组
  - thisArg   执行 callback函数时 this 指向

```javascript
arr.findIndex(callback(element[, index[, array]])[, thisArg])
```

```javascript
const arr3 = [1, 2, 3, 4, 5, 6, 7];
function findIndex1 () {
    return arr3.findIndex(item => item >= 5)
}

console.log(findIndex1()) // 4
```

- flat 
  - 将多维数组  整合成一个数组并返回
  - depath 深度   默认值为1

```javascript
arr.flat(depath)
```

```javascript
const arr1 = ['a', 'b', 'c',  ["a", "b", "c", "d", "e", "f"]];
function flat1() {
    return arr1.flat(1)
}

console.log(flat1())  // ["a", "b", "c", "a", "b", "c", "d", "e", "f"]
```

- flatMap
  - 将多维数组 映射每个元素  整合成一个数组 并返回
  - currentValue 数组当前项
  - index  当前项索引
  - array   当前数组
  - thisArg   执行 callback函数时 this 指向

```javascript
const new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // return element for new_array
}[, thisArg])
```

```javascript
const arr1 = ['a', 'b', 'c',  ["a", "b", "c", "d", "e", "f"]];
function flatMap1() {
    return arr1.flatMap(item => item +2)
}

console.log(flatMap1()) // ["a2", "b2", "c2", "a,b,c,d,e,f2"]
```

-  forEach 
  - 无返回值
  - currentValue 数组当前项
  - index  当前项索引
  - array   当前数组
  - thisArg   执行 callback函数时 this 指向

```javascript
arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
```

```javascript
const arr3 = [1, 2, 3, 4, 5, 6, 7];
function forEach1() {
    return arr3.forEach(item => console.log(item))
}

console.log(forEach1()) // 1, 2, 3, 4, 5, 6, 7
```

-  map
  - 返回一个原数组执行回调函数结果组成的新数组
  - currentValue 数组当前项
  - index  当前项索引
  - array   当前数组
  - thisArg   执行 callback函数时 this 指向

```javascript
const new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])
```

```javascript
const arr1 = ['a', 'b', 'c',  ["a", "b", "c", "d", "e", "f"]];
function map1() {
    return arr1.map(item => item + 2)
}

console.log(map1())  // ["a2", "b2", "c2", "a,b,c,d,e,f2"]
```



-  reduce
  - 结果返回为 单个值
  - accumulator  累计回调的值
  - currentValue 数组当前项
  - index  当前项索引
  - array   当前数组
  - initialValue  累加器的值  默认为数组第一个   若空数组 没有初始值报错

```javascript
arr.reduce(callback(accumulator, currentValue[,index [, array]])[, thisArg])
```

```javascript
const arr3 = [1, 2, 3, 4, 5, 6, 7];
function reduce1() {
    return arr3.reduce((acc, item) => item+acc)
}

console.log(reduce1()) // 21
```



- reduceRight
  - 接收一个函数作为累加器  
  - 数组的每个值  (从右到左将其减少为单个值)
  - accumulator  累计回调的值
  - currentValue 数组当前项
  - index  当前项索引
  - array   当前数组
  - initialValue  累加器的值  默认为数组最后一个  若空数组 没有初始值报错

```javascript
arr.reduceRight(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

```javascript
function reduceRight1() {
    return arr1.reduceRight((acc, item) => acc.concat(item))
}

console.log(reduceRight1())
["a", "b", "c", "d", "e", "f", "c", "b", "a"]
```



- some
  - 检测数组是否有一个元素  满足条件   返回  true || false
  - element 数组当前项
  - index  当前项索引
  - array   当前数组
  - thisArg  执行 `callback` 时使用的 `this` 值。 

```javascript
arr.some(callback(element[, index[, array]])[, thisArg])
```

```javascript
const arr3 = [1, 2, 3, 4, 5, 6, 7];
function some1() {
    return arr3.some( item => item % 2)
}

console.log(some1())  // true
```



