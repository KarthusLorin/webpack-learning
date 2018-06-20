### 打包公共代码



#### 使用webpack.optimize.CommonsChunkPlugin

webpack打包公共代码主要依靠插件（plugin）：webpack.optimize.CommonsChunkPlugin。<br/>

该插件的使用很简单，只需要在plugins中引入该插件并传入配置项即可。

```js
{
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(option)
    ]
}
```



#### 配置

1.options.name or options.names<br/>

可以是字符串也可以是一个数组，该项表示该chunk的名称<br/>

2.options.filename<br/>

该项表示代码打包后的文件名<br/>

3.options.minChunks<br/>

可以使数字或函数，该项表示公共代码的定义，即出现次数多少次以上才是公共代码或者只有通过函数过滤器的才算公共代码<br/>

4.options.chunks<br/>

该项表示了提取代码的范围，即在哪几个代码块中提取公用代码<br/>

5.options.children & options.deepChildren<br/>

分别表示在entry的子模块（一级）中查找或者所有模块中查找共同依赖<br/>

6.options.async<br/>

该项表示创建异步公用代码块<br/>



#### webpack4升级

webpack4中，webpack.optimize.CommonsChunkPlugin被移除，取而代之的是webpack.optimize.SplitChunksPlugin。具体配置如下：

```js
new webpack.optimize.SplitChunksPlugin({
    chunks: "initial", // 必须三选一： "initial" | "all"(默认就是all) | "async"
    minSize: 0, // 最小尺寸，默认0
    minChunks: 1, // 最小 chunk ，默认1
    maxAsyncRequests: 1, // 最大异步请求数， 默认1
    maxInitialRequests: 1, // 最大初始化请求书，默认1
    name: function () {
    }, // 名称，此选项可接收 function
    cacheGroups: { // 这里开始设置缓存的 chunks
        priority: 0, // 缓存组优先级
        vendor: { // key 为entry中定义的 入口名称
            chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            name: "vendor", // 要缓存的 分隔出来的 chunk 名称
            minSize: 0,
            minChunks: 1,
            enforce: true,
            maxAsyncRequests: 1, // 最大异步请求数， 默认1
            maxInitialRequests: 1, // 最大初始化请求书，默认1
            reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
        }
    }
})
```

