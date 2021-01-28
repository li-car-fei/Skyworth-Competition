# store 全局缓存的使用

## 初始化

在 `app.js` 中引入并且注册初始化全局缓存

```javascript
import initGlobalData from "./API/store/index";

App({
  // todo
});

// 全局挂载store 管理数据
getApp().globalData = initGlobalData(config.appName, [
  { Storage: false, description: { key: "test", data: 1 } },
]);
```

`initGlobalData` 的入参形式如下：

```bash
{
    name: '初始化store名称', // 可根据store隔离环境
    storeArray:[{
        Storage: bool,       // 是否进行小程序缓存
        description:{
            key: 'test',    // 数据key
            data: 1         // 数据data
        }
    }]
}
```

注意，`Storage:false` 的数据不会存入小程序缓存，在小程序刷新后会丢失，按需求进行设置

## set get

使用全局 store 实例进行缓存的`set`与`get`

```javascript
getApp().globalData.set(description, ...options);

// description结构：
// {
//         Storage: bool,       // 是否进行小程序缓存
//         description:{
//             key: 'test',    // 数据key
//             data: 1         // 数据data
//         }
// }

getApp().globalData.get(key);
// 根据key获取缓存数据
```

## on of

`getApp().globalData.on(key, listener)` 设置缓存数据监听器，当数据改变时，监听器依次调用
`getApp().globalData.off(key, listener)` 移除监听器

`listener` 函数的入参形式：

```bash
{
    oldData: 原来的数据,
    newData: 新设置的数据,
    ...options: 调用set时追加的参数
}
```
