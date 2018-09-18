# JavaScript 代码规范

* [1 结构](#1-结构)
  * [1.1 缩进](#11-缩进)
  * [1.2 换行](#12-换行)
  * [1.3 空格](#13-空格)
* [2 命名](#2-命名)

### 1 结构

#### 1.1 缩进

##### 使用 2 个空格作为缩进

```javascript
function() {
  const name
}
```

#### 1.2 换行

##### 左花括号 `{` 不要换行。
```javascript
if (condition) {
  // ...
}
```

##### 不同行为或逻辑的语句集，使用空行隔开，更易阅读。

```javascript
function setStyle(element, property, value) {
  if (element == null) return

  element.style[property] = value
}
```

##### 对象的属性和方法间保留空行

```javascript
const obj = {
  foo() {
  },

  bar() {
  }
}
```

#### 1.3 空格

##### 二元运算符两侧必须有一个空格，一元运算符与操作对象之间不允许有空格

```javascript
const x = y + 5

const isValid = !!valid
```

##### `if / for / while / switch / do / try / catch / finally` 关键字后以及 `else / {` 之前必须有一个空格。

```javascript
if (condition) {
  // ...
}

while (condition) {
  // ...
}

(function() {
})()
```

##### 在对象创建时，属性中的 `:` 之后必须有空格

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3
}
```


### 2 命名

#### 2.1 变量及常量

##### 标识符（变量、常量、函数、属性）：variableNamesLikeThis（驼峰式）

##### 局部变量：首字母小写的驼峰式

```javascript
let variableNamesLikeThis
```


##### 全局变量：首字母大写的驼峰式

```javascript
var VariableNamesLikeThis
```

##### 常量：全大写字母，单词间隔用“_”

```javascript
export const SET_PROJECT_INFO = 'SET_PROJECT_INFO'
```

##### VUEX state：首字母大写的驼峰式

```vuejs
state: {
  ProjectInfo: {
    info: ''
  },
},
```
##### 构造函数：首字母小写的驼峰式

```javascript
setProjectInfo() {
   // ...
}
```
