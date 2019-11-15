# 功能说明

* 删除dist,`parcel build src/index.html --no-minify --public-url ./`发布
* 新增网站可以根据首字母直接通过键盘打开

# tips 

* 将背景图片jpg改为渐进式，并且使用cdn加速可以提高图片加载速度
* 在手机端浏览时发现有可以轻微左右滑动的bug,只需要添加这段代码即可解决
```
* {
    overflow-x:hidden;
}
```