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

其中，use属性既可以是简单形式的一个字符串表示应该使用哪个loader，也可以使用复杂的对象形式对loader进行一系列的配置。<br/>

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

