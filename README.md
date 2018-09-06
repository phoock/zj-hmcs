# hmcs-v1.0

#### 项目介绍
海绵城市后台系统

#### 软件架构
1. 使用react前端框架
2. 使用npm包管理工具
3. css皮肤 https://webthemez.com/demo/insight-free-bootstrap-html5-admin-template/ui-elements.html + antd

#### webpack配置说明

1. Html html-webpack-plugin 生成单独的html文件,并将对应的.js和.css文件插入到合适的位置
2. 脚本 babel + babel-preset-react
3. 样式 css-loader + sass-loader 处理成js文件 再用 style-loader处理成dom里的标签
4. 图片/字体 url-loader + file-loader
5. extract-text-webpack-plugin 样式打包成单独文件
6. CommonsChunkPlugin, 提出通用模块(当一个模块被引用了N次,就会放在一个公共的通用模块里)
7. webpack-dev-server 为webpack项目提供web服务  使用2.9.7
8. css模块化modules&importLoaders=



#### 2018/5/23
  1. 设置路由,并创建基本页面

#### 2018/6/1
  1. 内涝应急指挥系统基本页面
