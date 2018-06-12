### 打包JS

#### 不配置webpack的情况下打包

在不配置webpack的情况下使用webpack打包JS，只需要在控制台输入：</br>
webpack 入口文件 出口文件

值得注意的一点是：
在webpakc4中，api有所改动，需要执行：<br/>
webpack 入口文件 -o 出口文件（打包生成的文件）
-o是output的简写

#### 兼容多种模块化规范

webpack兼容多种模块化规范，包括：<br/>
1.es6模块化规范：export、import <br/>
2.commonJS模块化规范：module.export、require <br/>
3.amd规范：define，require <br/>

值得一提的是，由于amd是异步加载规范，所以打包完成后，会单独对引用的模块进行打包，所以会生成两个bundle

#### 对webpack进行配置后进行打包

新建一个名为：webpack.config.js的文件，使用commonJS的规范配置webpack，在命令行中输入webpack即可进行打包

你也可以使用一个名字不为webpack.config.js的文件进行webpack配置，只不过运行的时候需要指定webpack配置文件：
webpack --config 配置文件

#### 关于出口路径

使用webpack.config.js打包后，出口文件的默认路径是在当前文件夹下生成dist文件夹，将打包后的文件放入dist文件夹。<br/>
如果需要修改出口路径，可以在output的path属性中修改路径。