### 编译Typescript



#### 安装

在如果需要webpack编译ts，那么按照惯例，需要安装typescript-loader。但是，事实上，typescript-loader有两个：<br/>

1.ts-loader：官方推荐的typescript-loader<br/>

2.awesome-typescript-loader：第三方开发者开发的typescript-loader，使用起来速度更快<br/>

由于是编译工具，所以，是作为开发时依赖安装（-D）：

```shell
npm install ts-loader --save-dev
或
npm install awesome-typescript-loader -save-dev
```



#### 配置tsconfig.json文件

ts的配置依赖于tsconfig.json文件，配置选项详情可以查看：[Compiler Options](http://www.typescriptlang.org/docs/handbook/compiler-options.html)<br/>

常用配置项有：compilerOptions，include，exclude等。

```json
{
  "compilerOptions": {
    "module": "commonjs",	// 指定生成commonJS模块系统的代码
    "target": "es5",		// 编译为es5版本的js
    "allowJs": true			// 是否允许js语法
  },
  "include": [
    "./src/*"				// 目标
  ],
  "exclude": [
    "./node_modules"		// 忽略
  ]
}
```



#### 配置webpack

配置webpack编译ts和常规流程一样：<br/>

1.在rules中设置test匹配文件<br/>

2.在use中给匹配到的文件设置loader<br/>

由于，ts文件以ts或tsx结尾，所以通过`/\.tsx?$/`来匹配，x?代表x可有可无。

```js
module.exports = {
    entry: {
        'app': './src/app.ts'
    },
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    }
}
```



#### 执行webpack编译ts

完成了以上配置，只需要在命令行中执行wbepakc命令即可完成ts的编译。