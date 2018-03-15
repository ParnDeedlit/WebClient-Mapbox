#### 第三方矢量瓦片的地址
[ *** accessToken获取方式,请不要使用下面的key，有流量限制 *** ](https://www.mapbox.com/account/access-tokens)

---

`地址如下所示：`
``` html
"https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt"
```

---

#### `根目录json文档表格`
``` json
{
    "version": 8,  //必须是8
    "name": "Mapbox Streets",
    "sprite": "mapbox://sprites/mapbox/streets-v8",
    "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    "sources": {...},
    "layers": [...]
}
```

#### `参数表格`
|参数 |类型 |说明 |
|:----|:----|:----|
|`version`|Number数字型|这个一般不改变，必须是8，之前的是老版本，已废弃|
|name|String 字符串|对应MapGis的整个地图文档的名字|
|`sprite`|String 字符串|对应MapGis的`符号库`，采取svg实现|
|`glyphs`|String 字符串|对应MapGis的`字体库`，采取pbf实现|
|`sources`|json 对象|对应MapGis的`HDF、数据库`，提供各种矢量瓦片的原始数据|
|`layers`|json 数组|对应MapGis的地图文档的`单个图层`，提供各种矢量瓦片的颜色，样式信息|

---

#### layers json文档说明
``` json
{
    "id": "mapillary", //这个可以随便改名字
    "type": "line",    //该图层对应的类型，是什么类型的数据就对应其类型即可
    "source": {
        "type": "vector",  //矢量瓦片是vector,栅格瓦片是raster
        "tiles":  //对应的URL地址 ["https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt"],
        "minzoom": 6,//最小可见级别
        "maxzoom": 14//最大可见级别
    },
    "source-layer": "mapillary-sequences",//特别注意，这里一定要与裁图时候的图层名字一一对应，这里一定不能乱改名字
    "layout": {
        "line-cap": "round",  // 圆角
        "line-join": "round"  // 圆头
    },
    "paint": {
        "line-opacity": 0.6,  //透明度
        "line-color": "rgb(53, 175, 109)", //线颜色
        "line-width": 2 //线宽
    }
}
```

#### `layers参数表格`
|参数 |类型 |说明 |
|:----|:----|:----|
|id|String|该第三方地图图层的名称|
|type|String|(line/fill)表示该图层的数据类型，请参考 [类型](https://www.mapbox.com/mapbox-gl-js/style-spec/#layers)|
|source|String|数据源信息,表示该数据是那个网页提供的|
|`source-layer`|String 字符串|`特别重要`，该名字不可以随便命名，必须和裁图的时候图层的`名字一样`|
|layout|json对象|表示该图层的各种可见不可见、尖角圆角等[layout参数](https://www.mapbox.com/mapbox-gl-js/style-spec/#layout-property)|
|paint|json对象|表示该图层的样式信息，一般是颜色和宽度等[paint参数](https://www.mapbox.com/mapbox-gl-js/style-spec/#paint-property)|

## `特别重要的source-layer`
``` bash
Õ`
mapillary-sequences.ªÖ&
"	èè	R2

$
'M
«§
"	°
Ð>
```
> 为什么说不能随意改动source-layer的名字，主要是请求的每张瓦片的格式如下（不是png图片了，而是pbf二进制文件）。该对应的文件中[瓦片示例](https://d25uarhxywzl1j.cloudfront.net/v0.1/12/1051/1522.mvt)， 上面所示，存在一个图层的名字是`mapillary-sequences`，这个记录了改图层的几何、属性信息。如果改为`mapillary-sequences111`这个名字，它会去找名字为`mapillary-sequences111`的图层的信息，而该文件中没有对应的图层信息，因此无法在前端展示该图层。
