# 支持uniapp、微信小程序、和原生h5的axios库
## 安装方式
- npm install -D mp-axios
- yarn add mp-axios

## 使用文档
- 参考[axios文档](http://www.axios-js.com/zh-cn/docs/)，使用方式一模一样

## 小程序的配置
| 小程序有不同配置，新增了enableHttp2、enableQuic、dataType、enableCache配置对应者小程序的参数配置。也缺少了某些设置项，如进度监听，取消请求等等。小程序的取消请求请参考[微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)
