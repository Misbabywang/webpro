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





#### 数组遍历

-   for 循环

```javascript
for (let i =0, i <= 5; i++) {
    console.log(i)
}

for (let i =16, i-=1) {
    console.log(i)
}
```

-  for ... in 循环遍历数组

```javascript
for(var i in arr){
	console.log(i,arr[i]);
}
```

