const arr1 = ['a', 'b', 'c', ["a", "b", "c", "d", "e", "f"]];
const arr2 = ['d', 'e', 'f'];
const arr3 = [1, 2, 3, 4, 5, 6, 7];



/**
 * var new_array = old_array.concat(value1[, value2[, ...[, valueN]]]) 
 *   合并多个数组
 *        返回一个新数组 不会对原数组操作
 *        省略 valueN  则返回此方法现存数组的浅拷贝
 */

function concat1() {
    return arr1.concat(arr2, arr3);
}

console.log(concat1())
// expected output: Array ["a", "b", "c", "d", "e", "f"]


/**
 *   arr.entries()
 *      返回一个 迭代对象
 *      包含数组的每个索引项的 键值对    通过返回对象的 next 方法获取
 */
function entries1() {
    return arr2.entries().next()
}

console.log(entries1())



/**
 *  every 方法 测试一个  数组内的所有元素 都满足条件   返回一个布尔值
 */
function every1() {

    return arr3.every((item) => item > 5)
}

console.log(every1())


function fill1() {
    return arr3.fill(0, 2, 4)
}

console.log(fill1())


function filter1() {
    return arr3.filter(item => item % 2)
}

console.log(filter1())


function find1() {
    return arr3.find(item => item >= 5)
}


console.log(find1())



console.log(arr3)

function findIndex1() {
    return arr3.findIndex(item => {
        console.log(111)
        return item >= 9
    })
}

console.log(findIndex1()) // -1



function flat1() {
    return arr1.flat(1)
}

console.log(flat1())


function flatMap1() {
    return arr1.flatMap(item => item + 2)
}

console.log(flatMap1())


function forEach1() {

    return arr3.forEach(item => console.log(item))
}

console.log(forEach1())

function includes1() {
    return arr2.includes('e')

}

console.log(includes1)


function indexOf1() {
    return arr2.indexOf('e')

}

console.log(indexOf1()) // 1

function join1() {
    return arr2.join('***')

}

console.log(join1()) // d***e***f


function keys1() {
    return arr2.keys()

}

console.log(keys1().next())


function lastIndexOf1() {
    return [1, 2, 3, 4, 5, 6, 7].lastIndexOf(5, -3)

}

console.log(lastIndexOf1())


function map1() {
    return arr1.map(item => item + 2)
}

console.log(map1())  // ["a2", "b2", "c2", "a,b,c,d,e,f2"]


function pop1() {
    return arr2.pop()
}


console.log(pop1())


function push1() {
    return arr2.push('f', 'g', 'h')
}


console.log(push1())


function reduce1() {

    return arr3.reduce((acc, item) => item+acc)
}

console.log(reduce1())

function reduceRight1() {

    return arr1.reduceRight((acc, item) => acc.concat(item))
}

console.log(reduceRight1())


function reverse1() {
    return arr3.reverse()
}

console.log(reverse1())


function shift1() {
    return arr2.shift()
}


console.log(shift1())


function slice1() {
    return arr2.slice(1)
}


console.log(slice1())


function some1() {

    return arr3.some( item => item % 2)
}

console.log(some1())


function sort1 () {
    return arr2.sort()
}

console.log(sort1())

function splice1 () {
    return arr2.splice(0, 2, 'e', 'g', 'i')
}

console.log(splice1())


function toString1 () {
    return arr1.toString()
}

console.log(toString1())


function values1 () {
    return arr1.values()
}

for (const iterator of values1()) {
    console.log(iterator)
}