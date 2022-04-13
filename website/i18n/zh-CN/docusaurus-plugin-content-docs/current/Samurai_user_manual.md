---
id: Samurai_user_manual
title: Samurai
sidebar_label: Samurai
---



Samurai是一款支持Alaya与PlatON网络的开源浏览器插件钱包工具，支持钱包创建、发送和接收ATP与LAT、以及允许Web DApp与Alaya或PlatON网络进行交互。

Samurai仅在您的设备上生成钱包密钥，因此只有您能访问您的钱包账户和数据。因此您需要安全保管钱包密钥（私钥、助记词）以及钱包密码。目前Samurai仅支持Chrome浏览器。



## 注意事项

Samurai基于MetaMask的8.0.10版本开源代码修改的浏览器插件钱包，主要是适配Alaya网络和PlatON网络。由于官方MetaMask自身存在一些bug，请用户使用Samurai时注意：

* **在交易确认页面不要点编辑按钮去编辑交易相关信息**。
* **在交易确认页面，点击确认按钮之前，请确认接收地址是否正确**。

## 安装

+ 从[Release地址](https://github.com/AlayaNetwork/Samurai/releases)下载Samurai插件包；
+ 解压Samurai插件包；
+ 打开Chrome浏览器，在地址栏输入`chrome://extensions/`并回车，进入到Chrome扩展程序管理页面；
+ 打开**开发者模式**开关，选择**加载已解压的扩展程序**，导入第2步解压的目录即可；

<img src="/docs/img/zh-CN/Samurai.assets/add-chrome.jpg" alt="加载已解压的扩展程序"/>

## 初始化

1. 点击浏览器地址栏右侧Samurai的图标，第一次使用时，会有一个提示，如下图：

<img src="/docs/img/zh-CN/Samurai.assets/samurai-welcome.jpg" alt="欢迎页"/>

2. 点击**开始使用**，接下来有两个选择，可以**创建钱包**也可以**导入钱包**。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-select-action.jpg" alt="选择钱包创建方式"/>

+ 导入钱包：

点击**导入钱包**，进入引导页，点击**I agree**进入下步即可。然后输入**钱包助记词**以及**密码**，点击**导入**->**全部完成**即可进入主界面。

注：当前Samurai助记词生成路径存在问题，不支持外部钱包应用生成的助记词导入。建议初次创建后，通过私钥导入。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-agreement.jpg" alt="用户隐私协议"/>

<img src="/docs/img/zh-CN/Samurai.assets/samurai-import-seed.jpg" alt="导入种子"/>

<img src="/docs/img/zh-CN/Samurai.assets/samurai-import-end.jpg" alt="导入成功"/>

<img src="/docs/img/zh-CN/Samurai.assets/samurai-import-home.jpg" alt="首页"/>

+ 创建钱包：

点击**创建钱包**，进入引导页，点击**I agree**进入下步即可。然后输入新钱包的**密码**，并点击**创建**。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-create-password.jpg" alt="创建密码"/>

进入助记词备份界面，点击“点击此处显示密语”可以显示新建账户的助记词(助记词需要防止被其他人看到, Samurai使用您提供的密码在本地加密此信息，且永远不会将其发送到服务器), 如果点击**稍后提醒**则直接就进入新建账户的Samurai主界面（不建议跳过）。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-create-seed.jpg" alt="备份助记词"/>

点击**下一步**，重新输入正确的助记词顺序，点击**确认**按钮->**全部完成**即可进入主界面。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-create-seed-confirm.jpg" alt="确认助记词"/>

<img src="/docs/img/zh-CN/Samurai.assets/samurai-import-end.jpg" alt="确认成功"/>

<img src="/docs/img/zh-CN/Samurai.assets/samurai-create-home.jpg" alt="首页"/>

## 交易操作

### 发送LAT

+ PlatON主网络下，在Samurai主界面上点击**发送**按钮，即可弹出**添加收件人**界面。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-send-address-input.jpg" alt="添加收件人"/>

+ 输入或者选择**个人账户间转账**的地址，进入到交易表单界面：

<img src="/docs/img/zh-CN/Samurai.assets/samurai-send-input.jpg" alt="交易表单"/>

+ 交易表单必须填写交易LAT的数量，系统会给出默认的交易费，当然也可以自己对该值做适当调整，完成表单后点击**下一步**进入待确认界面，该界面会显示总共花费的LAT数量(包含手续费)。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-send-confirm.jpg" alt="待确认页面"/>

+ 点击**确认**按钮即可完成LAT的发送，可以在主页面的**交易列表**中进行查看交易状态。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-tx-detail.jpg" alt="交易详情"/>

### 添加并发送代币

#### 添加代币

+ 进入主页面，点击**资产列表**->**添加代币**。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-home-add-token.jpg" alt="添加代币"/>

+ 在弹出添加代币界面框中，添加已连接的网络中存在的**代币合约地址**即可，Samurai会根据合约地址自动去获取代币的符号和精确小数点，完成后点击**下一步**。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-add-token-input.jpg" alt="添加代币信息"/>

+ 进入添加代币确认界面，界面会显示该账户下该代币的余额，点击**添加代币**即可添加成功。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-add-token-confirm.jpg" alt="确认添加代币"/>

添加成功后转入到该账户代币详情展示界面，里面显示代币的余额，也可以点击**发送**按钮进入代币的转账界面，同时主界面资产列表会显示该代币资产。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-token-display.jpg" alt="代币显示"/>

#### 代币转账

+ 可以在账户代币展示界面点击**发送**按钮发起代币转账，也可以在主界面资产列表界面点击对应代币的**SEND**按钮发起转账。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-assets-list.jpg" alt="发起代币转账"/>

+ 进入添加收件人界面，同发送LAT操作一样输入或者选择**个人账户间转账的地址**，进入到交易表单界面。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-send-token-input.jpg" alt="代币转账表单"/>

+ 交易表单必须填写交易的代币数量，点击下一步即可进入交易**确认**界面:

<img src="/docs/img/zh-CN/Samurai.assets/samurai-send-token-confirm.jpg" alt="交易确认"/>

+ 点击**确认**按钮即可完成代币的发送，可以在主页面的交易列表中进行查看交易状态。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-token-tx-detail.jpg" alt="代币交易详情"/>

## 创建账号与管理

### 创建账号

+ 点击Samurai主页顶部右侧钱包头像，在显示的下拉菜单中点击**创建账户**。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-home-create-account.jpg" alt="发起创建账户"/>

+ 进入创建账户表单界面，输入**账户名称**(下图例子是钱包2)，点击**创建**按钮。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-home-create-account-input.jpg" alt="账户信息"/>

+ 创建成功将进入新创建的钱包主页面，点击顶部右侧钱包头像可查看所有钱包账户列表。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-home-create-account-end.jpg" alt="账户创建成功"/>

### 导入账号

+ 点击Samurai主页顶部右侧钱包头像，在显示的下拉菜单中点击**导入账户**。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-home-import-account.jpg" alt="发起导入账户"/>

+ 进入导入账户表单界面，可以有两种导入模式选择(私钥/keystore json文件)。选择私钥模式，将私钥粘贴到表单即可，然后点击**导入**按钮。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-home-import-account-privatekey-input.jpg" alt="私钥导入"/>

选择导入keystore文件模式，选择**JSON文件**类型，点击**选择文件**，从本地目录选取keystore文件，然后输入keystore文件的密码，最后点击**导入**按钮。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-home-import-accout-keystore.jpg" alt="keystore导入"/>

+ 导入成功就进入新导入的钱包主页面，点击顶部右侧钱包头像可查看所有钱包账户列表。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-home-import-account-end.jpg" alt="导入成功"/>

## 网络管理

默认情况下，Samurai 连接到PlatON主网，也可以连接到其他网络。

### 切换网络

Samurai默认添加了PlatON主网、PlatON开发测试网、ALAYA主网、ALAYA开发测试网，您可以选择连接的网络。 单击“网络”并从四个网络中选择一个网络进行连接。

<img src="/docs/img/zh-CN/Samurai.assets/choose-network.jpg" alt="选择网络"/>

### 添加自定义网络

- 点击 **网络**-> **自定义RPC**。

<img src="/docs/img/zh-CN/Samurai.assets/choose-custom-network.jpg" alt="选择自定义网络"/>

- 进入新的网络配置界面，配置好表单后点击 **保存**。

<img src="/docs/img/zh-CN/Samurai.assets/custom-network-config.jpg" alt="配置自定义网络"/>

- Samurai 会尝试连接节点，如果节点连接失败，会弹出相应的对话框提示。

<img src="/docs/img/zh-CN/Samurai.assets/custom-network-connect-failed.jpg" alt="自定义网络连接失败"/>

- 如果连接成功，网络列表中会增加一个网络列表选项。

<img src="/docs/img/zh-CN/Samurai.assets/custom-network-connect-success.jpg" alt="自定义网络连接成功"/>

## 语言切换

+ 点击Samurai主页顶部右侧钱包头像，在显示的下拉菜单中点击**设置**。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-home-setting.jpg" alt="设置"/>

+ 进入设置主界面，然后点击**通用**-> 进入**当前语言**下拉框进行选择(支持多种语言)。

<img src="/docs/img/zh-CN/Samurai.assets/samurai-home-setting-language.jpg" alt="切换语言"/>

