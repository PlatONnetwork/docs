---
id: Ledger-hardware-wallet
title: Ledger 硬件钱包
sidebar_label: Ledger 硬件钱包
---

# Ledger 硬件钱包
<div>
<br />PlatON已初步集成Ledger硬件钱包（目前暂处于开发者模式中）。Ledger 是目前市面上最受欢迎硬件钱包之一，它通过最先进的安全芯片来保存私钥，为PlatON网络资产提供最高级别的安全性和可靠性。
<br />Samurai作为PlatON开源的web浏览器插件钱包，已完成对Lager硬件钱包支持，为用户提供更安全的资产存储和使用方式。
<br /> - 对交易进行验证和授权
<br /> - 为离线创建钱包和存储私钥提供一个冷存储选项
<br />
<br />通过使用Ledger硬件钱包来存储私钥和签署交易，私钥将不会您软件钱包接触，交易签署过程更安全和简单。
<br />注：未来ATON移动钱包也将支持Ledger 硬件钱包，敬请期待！
<br />
<br />本文将指导您完成Ledger 硬件钱包的配置，利用Ledger Nano硬件钱包完成Samurai交易签署操作过程。
<br />
</div>

## Ledger硬件钱包环境准备

### 初始化与程序安装：

<div>
<br />
<br />Ledger硬件钱包、Ledger live桌面应用程序、Samurai插件钱包准备。
<br />
<br />注：硬件钱包Ledger Nano S与Ledger Nano X操作基本一致，当前以Ledger Nano X为例。
<br />
</div>

#### Ledger 硬件钱包初始化

<div>
<br />
<br />【操作说明：分别按黑和白按钮为切换选择；同时按下黑、白按钮为确认】
<br />①　设置PIN识别密码：长按黑色按钮启动Ledger硬件钱包，PIN识别码设置输入并确认，如：图1.1.1；
<br />②　创建新设备【Set up as new device】与恢复【Restore from Recovery phrase】，我们这里选择恢复短语（助记词），如：图1.1.2；
<br />③　恢复短语（助记词）中，PlatON网络可以生成多种类型的助记词。这里是为了便于ATON的HD钱包助记词导入所以选择12位【12words】，如：图1.1.3；也可以选择24位  通过Ledger自主生成的助记词恢复；创建/恢复短语后进入Ledger硬件钱包应用程序页面，如：图1.1.4；需要到Ledger live桌面程序中安装Ledger硬件钱包的应用程序。
<br />注：Ledger与ATON助记词与Samurai助记词不兼容，相互导入请使用钱包私钥
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.1.1.png" width ="500" style={{zoom: '80%'}} />
</div> 
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.1.1</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.1.2.jpg" width ="500" style={{zoom: '80%'}} />
</div> 
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.1.2</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.1.3.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.1.3</div>
<br />

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.1.4.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.1.4</div>
<br />
</div>

#### Ledger live 桌面程序准备
<div>
<br />
<br />下载Ledger live 在本地安装；下载链接：
<br />https://www.ledger.com/ledger-live/download 操作安装如下图：图1.1.5和图1.1.6
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.1.5.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.1.5</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.1.6.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.1.6</div>

<br />
</div>

#### Samurai 钱包准备
<div>
<br />
<br />①　从 https://github.com/AlayaNetwork/Samurai/releases 下载并解压 Samurai 插件钱包，如：图1.1.7；
<br />②　打开Chrome浏览器，在地址栏输入chrome://extensions/并回车，进入到Chrome扩展程序管理页面；【打开】开发者模式开关，选择【加载已解压的扩展程序】，导入Samurai插件钱包解压的目录即可，如：图1.1.8和图1.1.9。
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.1.7.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.1.7</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.1.8.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.1.8</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.1.9.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.1.9</div>
<br />
</div>

### 安装PlatON硬件驱动程序（方式一）
<div>
<br />
<br />为Ledger硬件钱包添加【PlatON】硬件驱动程序—使用Ledger live桌面程序在Ledger硬件钱包添加【PlatON】应用程序。
<br />
<br />1)打开Ledger live桌面程序选择对应的Ledger硬件设备，如：图1.2.1；首次使用需要去设置PIN识别码，之前已经设置好的选择直接连接到应用程序；
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.2.1.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.2.1</div>
<br />
<br />2)连接桌面程序进行配对需要需要输入确认PIN识别密码，授权同意配对，如：图1.2.2；
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.2.2.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.2.2</div>
<br />

<br />3)Ledger live桌面应用程序添加下载安装PlatON应用：由于PlatON应用还没有正式上线Ledger live，目前属于尝鲜实验性功能，以供我们的专业爱好者/社区体验测试，所以需要用户手动去开启开发者模式才能把【PlatON】应用程序搜索到；建议大额交易暂时不进行体验测试。
<br />①　进入Ledger live桌面程序，首先在设置中把桌面程序设置为开发者模式，如：图1.2.3；
<br />②　接着在Manager中查找并安装【PlatON】应用程序，如：图1.2.4；下载安装完成后的下一步需要配合Samurai/MetaMask进行操作。
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.2.3.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.2.3</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.2.4.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.2.4</div>

<br />
</div>


### 安装PlatON硬件驱动程序（方式二）
<div>
<br />
<br />为Ledger硬件钱包添加【PlatON】硬件驱动程序—使用Ledger live App配对在Ledger硬件钱包添加【PlatON】应用程序。
<br />1)打开Ledger live App程序选择对应的Ledger硬件设备，如：图1.3.1；首次使用需要去设置PIN识别码，之前已经设置好的选择直接连接到应用程序。
<br />
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.3.1.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.3.1</div>

<br />
<br />2)需要用Ledger 硬件钱包与Ledger live App程序进行配对，如：图1.3.1.1；选择自己的Ledger 硬件钱包与Ledger live App程序都需要确认配对，如：图1.3.2、图1.3.3、图1.3.4；确认后才能配对成功，如：图1.3.5；配对前需要保证Ledger硬件钱包是解锁状态并且蓝牙Bluetooth是开启，正常情况下Ledger硬件钱包一直都是开启状态，不用手动设置；另外前置条件：已经完成【1.1】设置。
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.3.1.1.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.3.1.1</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.3.2.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.3.2</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.3.3.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.3.3</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.3.4.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.3.4</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.3.5.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.3.5</div>

<br />
<br />3)Ledger live App中，为Ledger硬件钱包添加【PlatON】应用程序：
资产组合页面：点击右上角【设置】，如：图1.3.6；选择【实验性功能】，在实验性功能【Developer mode】中打开开发者模式，如：图1.3.7。
管理器页面：选择自己的Ledger硬件钱包设备，打开应用程序目录，如：图1.3.8；应用程序中查找下载安装【PlatON】应用程序，如：图1.3.9；下载安装完成后的下一步需要配合Samurai/MetaMask进行操作。
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.3.6.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.3.6</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.3.7.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.3.7</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.3.8.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.3.8</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure1.3.9.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图1.3.9</div>

<br />
</div>

## 用Ledger硬件钱包签名完成交易
### 选择PlatON硬件驱动应用
<div>
<br />
<br />前置条件：需完成上面【1.】的环境准备；接着Ledger硬件钱包需要选择PlatON硬件驱动应用，显示【application is ready】，如：图2.1.1；
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure2.1.1.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图2.1.1</div>
<br />
</div>

### Samurai配对并解锁Ledger硬件钱包
<div>
<br />
<br />用Samurai随机创建一个账户，进入Samurai插件钱包主页面，选择【链接硬件钱包】配对，如：图2.2.1；链接配对成功后选择账户进行解锁硬件钱包，如：图2.2.2。
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure2.2.1.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图2.2.1</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure2.2.2.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图2.2.2</div>
<br />
</div>

### Ledger硬件钱包完成签名转账交易；
<div>
<br />
<br />Samurai读取并进入硬件钱包页面，选择转账发送操作，如：图2.3.1；Ledger硬件钱包收到签名并确认，如：图2.3.2和图2.3.3；确认后完成签名转账交易，如：图2.3.4。
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure2.3.1.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图2.3.1</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure2.3.2.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图2.3.2</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure2.3.3.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图2.3.3</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure2.3.4.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图2.3.4</div>
<br />
<br />注：Samurai基于MetaMask的8.0.10版本开源代码修改的浏览器插件钱包，因此MetaMask操与Ledger硬件钱包的交互基本一致。
<br />
<br />
</div>

## Ledger硬件钱包管理
### 修改PIN识别码
<div>
<br />
<br />黑白按钮同时按下保持3秒，选择设置【Setting Manage device】，如：图3.1.1；选择【Security】安全设置，如：图3.1.2；选择【Change PIN】如：图3.1.3；最后设置新的PIN识别码；
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure3.1.1.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图3.1.1</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure3.1.2.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图3.1.2</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure3.1.3.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图3.1.3</div>
<br />
</div>

### 重置Ledger硬件钱包；
<div>
<br />
<br />黑白按钮同时按下保持3秒，选择设置【Setting Manage device】，如：图3.1.1；选择【Security】安全设置，如：图3.1.2；选择【Reset device】如：图3.2.1；重置选择恢复【Restore from Recovery phrase】短语（助记词）如：图1.1.2；
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure3.2.1.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图3.2.1</div>
<br />
<br />
</div>

## 注意事项
<div>
<br />
<br /> - Ledger硬件钱包进入PlatON应用时，不能进入【application is ready】状态，显示【Pending】状态，如：图4.1.1时，需要重新插一次USB进入应用，或者重启重新进入应用；直到进入【application is ready】状态，如：图4.1.2。
<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure4.1.1.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图4.1.1</div>

<br />
<div>
<img src="/docs/en/img/zh-CN/ledger/Figure4.1.2.png" width ="500" style={{zoom: '80%'}} />
</div>
<br /><div class="text" style={{width: "400px", textAlign: "center"}}>图4.1.2</div>
<br />
</div>