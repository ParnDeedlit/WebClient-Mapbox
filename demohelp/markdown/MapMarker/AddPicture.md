### Marker 样式
> Marker的样式与常规的css样式一致，因此该示例相对容易实现

---
#### 提交BUG
> 找到bug请提交,我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Mapbox/issues)

---
#### Mapbox样式

[官方Marker API](https://www.mapbox.com/mapbox-gl-js/api#marker)

---
#### 方法

|方法名|参数|返回值|说明|
|:---|:---|:---|:---|
|addTo(map)|map|Marker.this|将这个Marker标注添加到地图上|
|remove()|无|Marker.this |将这个Marker标注添加到地图上|
|getLngLat()|无|[Lnglat](https://www.mapbox.com/mapbox-gl-js/api/#lnglat)|返回该标注的经纬度对象|
|setLngLat(lnglat)|lnglat|Marker.this|设置该标注的经纬度信息|
|getElement()|无|[HTML5 Element](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)|返回该标注的html信息|
|setPopup(popup)|[Popup](https://www.mapbox.com/mapbox-gl-js/api#popup)|Marker.this|针对该标注绑定一个Popup信息|
|getPopup()|无|[Popup](https://www.mapbox.com/mapbox-gl-js/api#popup)|返回该标注的Popup对象|
|togglePopup()|无|Marker.this|触发该标注的Popup对象|
|getOffset()|无|[Point](https://www.mapbox.com/mapbox-gl-js/api#point)|返回该标注的偏移值|
|setOffset(offset)|offset|[Offset](https://www.mapbox.com/mapbox-gl-js/api/#pointlike)|设置该标注的偏移值|

> `Offset`这个属性的示例可以参考[Offset](https://www.mapbox.com/mapbox-gl-js/example/custom-marker-icons/),说实话这个用处相对较少
