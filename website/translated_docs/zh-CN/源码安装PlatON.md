---
id: Install_PlatON
title: 源码安装PlatON
sidebar_label: 源码安装PlatON
---

本文档主要是针对有能力在PlatON区块链上进行源代码编译的用户。

- `PlatON`支持Windows和Ubuntu下进行源码编译安装。

## Windows源码编译

Windows编译环境需要符合以下条件：

- git：`2.19.1以上`
- go语言开发包：`go(1.14+)`
- mingw：`mingw（V8.1.0）`
- cmake: `3.0+`

可自行安装以上编译环境，在编译`PlatON`源码之前请确保以上环境可正常运行。

> 也可使用`Chocolatey`辅助安装编译环境（如果你还没有`chocolatey`，可以按照<https://chocolatey.org>上的说明进行安装），用管理员身份启动`PowerShell`，然后执行以下命令：
>
> 安装git：
>
> ```powershell
> choco install git
> ```
>
> 安装golang：
>
> ```powershell
> choco install golang
> ```
>
> 安装mingw：
>
> ```powershell
> choco install mingw
> ```
>
> 安装cmake：
>
> ```powershell
> choco install cmake --installargs 'ADD_CMAKE_TO_PATH=System'
> ```
>
> 利用`chocolatey`包管理器安装的软件大部分有默认的安装路径，部分软件可能会有各种各样的路径，这取决于软件的发布者。安装这些包将修改Path环境变量。最后安装路径可查看PATH，某些机器环境可能在 PATH 中找不到这些工具的安装路径，此时需手动添加。安装完之后请确保已安装的Go版本为1.11（或更高版本）。
>

> 注意：以下命令均需在`Git-bash`环境运行， 在任意目录下，鼠标右键，选中`Git Bash Here`，弹出`Git Bash`运行窗口。

- 获取源码

获取源码放到GOPATH路径下，其中`feature-mainnet-launch`为分支名称，届时切换到实际的分支：

```
mkdir -p $GOPATH/src/github.com/PlatONnetwork
cd $GOPATH/src/github.com/PlatONnetwork
git clone -b feature-mainnet-launch https://github.com/PlatONnetwork/PlatON-Go.git --recursive
```

- 添加bls依赖库到环境变量

```bash
echo 'export PATH=$PATH:"$GOPATH/src/github.com/PlatONnetwork/PlatON-Go/crypto/bls/bls_win/lib"' >> ~/.bashrc
source ~/.bashrc
```

- 编译

```bash
cd $GOPATH/src/github.com/PlatONnetwork/PlatON-Go
go run build/ci.go install ./cmd/platon
go run build/ci.go install ./cmd/platonkey
```

编译完成之后在`PlatON-Go/build/bin`目录下会生成`platon`、`platonkey`可执行文件，将这两个可执行文件拷贝到自己工作目录运行即可。

> 重复编译会覆盖之前生成的可执行文件。

## Ubuntu源码编译

**step1.** 安装编译环境（Ubuntu）：

- 系统版本：`Ubuntu 18.04.1 及以上`
- git：`2.19.1及以上`
- 编译器：`gcc(4.9.2+)`、`g++(5.0+)`
- go语言开发包：`go(1.14+)`
- cmake:`3.0+`

**step2.** 获取PlatON源码：

```bash
git clone -b feature-mainnet-launch https://github.com/PlatONnetwork/PlatON-Go.git --recursive
```

**step3.** 安装依赖库：

```bash
sudo apt update 
sudo apt install -y golang-go cmake llvm g++ libgmp-dev libssl-dev
```

**step4.** 编译：

```bash
cd PlatON-Go 
make all
```

编译完成之后在`./build/bin`目录下会生成`platon, platonkey`等一系列可执行文件。

**step5.** 拷贝二进制： 

```shell
sudo cp -f ./build/bin/platon /usr/bin/
sudo cp -f ./build/bin/platonkey /usr/bin/
```

源码编译成功！