### 编译ES6



#### Babel Presets

Babel Presets实际上就是Babel的编译规范的总结，常用的有以下几种：<br/>

1.es2015</br>

2.es2016</br>

3.es2017</br>

4.env：开发中最常使用的Presets，包括了es2015到最新版本的JS<br/>

5.babel-preset-react：专注于react相关<br/>

6.babel-preset-stage 0 - 3：还没规范组还没正式发布的各个阶段的版本</br>



#### 如何使用Babel Presets

在webpack.config.js中添加一个loader，loader是一个对象，含有必填两个属性：<br/>

1.`test`属性：用于标识出应该被对应的loader进行转换的某个或某些文件（正则表达式）<br/>

2.`use`属性：表示进行转换时，应该使用哪个loader<br/>

其中，use属性既可以是简单形式的一个字符串表示应该使用哪个loader，也可以使用复杂的对象形式对loader进行一系列的配置。

```js
module.exports = {
    entry: {
        app: 'app.js'
    },
    output: {
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: '/node_modules/' // 可选属性，表示忽略node_modules文件夹下的文件
            }
        ]
    }
}
```



#### Babel Presets的配置

Babel Presets含有一个`target`参数，用于指定目标进行特定的语法编译，比如：<br/>

targets.browsers，表示指定浏览器进行编译<br/>

targets.browsers: "last 2 versions"，表示对主流浏览器最后两个版本进行编译<br/>

targets.browsers: ">1%"，表示对全球大于1%占有率的浏览器都要支持<br/>

targets.chrome: "52"，表示针对52版本的chrome进行编译<br/>

实际使用，只需要在对应的presets数组中添加一个对象即可：

```js
module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['> 1%', 'last 2 versions']
                                }
                            }]
                        ]
                    }
                },
                exclude: '/node_modules/'
            }
        ]
    }
}
```



#### Babel Polyfill & Babel Runtime Transform

Babel Presets实际上处理的是语法，而许多es6+的API：如Generator、Set、Map、Array.from、Array.prototype.includes等并没有进行处理，在低级浏览器下运行会报错。此时，就需要Babel Polyfill以及Babel Runtime Transform来进行兼容性处理，在低级浏览器上实现而又保留相同的API，相当于垫片。<br/>

##### Babel Polyfill

Babel Polyfill是一个全局垫片，引入它之后，它会在浏览器的全局中进行一些全局变量的定义，缺点是污染了全局变量，好处是整个程序中的es6+API都可以进行直接调用，因为它在全局通过自己的方法重新实现了对应的API，兼容了低级浏览器。这种情况下，对开发应用有着很大的便利。但是，在开发框架时，无法忍受它的全局变量污染，所以它是专为应用准备的。<br/>

如果要使用Babel Polyfill，只需要：

```js
import 'babel-polyfill'
```

接下来，你就可以为所欲为的使用es6+方法开发应用了。

##### Babel Runtime Transform

Babel Runtime Transform与Babel Polyfill最大的区别在于，他是局部而不是全局的，不会污染全局变量。Babel Runtime Transform还有一个优点：多次局部引用不会重复把babel实现api的方法打入各个文件中，而会统一打到一个文件中，作为一个统一的整体（有点类似于Babel Polyfill的只定义一次），减少冗余代码。<br/>

使用Babel Runtime Transform相对来说要麻烦一些，需要配置.babelrc文件。

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [
            "last 2 versions"
          ]
        }
      }
    ]
  ],
  "plugins": ["@babel/transform-runtime"]
}
```

