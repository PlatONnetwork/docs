## 启动

安装依赖包：`yarn install`

**将`editedJs/HeaderNav.js`替换`node_modules/docusaurus/lib/core/nav/HeaderNav.js`**

启动命令：`yarn start`

## 部署
先进入到`website`目录，然后在`git bash`环境下执行命令：

```shell
GIT_USER=luo-dahui \yarn run publish-gh-pages
```

> GIT_USER：为github用户名，具有提交到文档仓库的权限
>
> publish-gh-pages：为部署到github pages的脚本，脚本会先build，然后将生成的网站文件推送到`ghpages`新分支上。