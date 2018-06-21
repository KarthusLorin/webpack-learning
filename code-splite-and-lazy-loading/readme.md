### 代码分割和懒加载



#### require.ensure

webpack内置了一个方法：`require.ensure`，通过这个方法可以动态加载一个模块。



#### 配置

`require.ensure`接受四个参数：

1.[]: dependencies：依赖，但并不会立即执行，而是在callback中执行

2.callback：回调函数

3.errorCallback

4.chunkName



#### require.include

`require.include`可以引入一个模块，但不执行。当两个子模块同时依赖一个模块时，可以在父模块中提前加载该模块，当访问子模块时，不需要再次加载。



#### 代码分割

代码分割主要分为三种：

1.分离业务代码和第三方依赖

2.分离业务代码和业务公共代码和第三方依赖

3.分离首次加载和访问后加载的代码



