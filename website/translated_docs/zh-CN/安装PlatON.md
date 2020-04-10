---
id: Install_PlatON
title: 安装PlatON
sidebar_label: 安装PlatON
---

本文档主要是针对在PlatON区块链上构建应用程序的开发人员的入门指南。

- `PlatON`支持Windows和Ubuntu下进行源码编译安装。

## Windows源码编译

Windows编译环境需要符合以下条件：

- git：`2.19.1以上`
- go语言开发包：`go(1.7+)`
- mingw：`mingw（V8.1.0）`
- cmake: `3.0+`

可自行安装以上编译环境，在编译`PlatON`源码之前请确保以上环境可正常运行。

> 也可使用`Chocolatey`辅助安装编译环境（如果你还没有`chocolatey`，可以按照<https://chocolatey.org>上的说明进行安装），用管理员身份启动`PowerShell`，然后执行以下命令：
>
> 安装git：
>
> ```
> choco install git
> ```
>
> 安装golang：
>
> ```
> choco install golang
> ```
>
> 安装mingw：
>
> ```
> choco install mingw
> ```
>
> 安装cmake：
>
> ```
> choco install cmake
> ```
>
> 利用`chocolatey`包管理器安装的软件大部分有默认的安装路径，部分软件可能会有各种各样的路径，这取决于软件的发布者。安装这些包将修改Path环境变量。最后安装路径可查看PATH，某些机器环境可能在 PATH 中找不到这些工具的安装路径，此时需手动添加。安装完之后请确保已安装的Go版本为1.7（或更高版本）。
>
> 例如：安装cmake之后，在CMD命令行中键入cmake，如果提示找不到该命令，则需要在path中添加cmake安装的路径。

- 获取源码

在当前`%GOPATH%`目录下创建`src/github.com/PlatONnetwork/`和`bin`目录，在`PlatONnetwork`目录下克隆`PlatON-GO`的源码，其中`release-0.10.0`为分支名称，届时切换到实际的分支：

```
cd src/github.com/PlatONnetwork/;
git clone -b release-0.10.0 https://github.com/PlatONnetwork/PlatON-Go.git --recursive
```

- 编译

> 以下编译命令均需在`Git-bash`环境运行， 且步骤1中编译环境都已经成功安装！

进入源码目录`PlatON-Go`：

```
cd PlatON-Go
```

在编译源码目录之前在源码目录`PlatON-Go`下执行以下脚本编译所需依赖库：

```
./build/build_deps.sh
```

由于编译依赖bls库，需要把PlatON-Go\crypto\bls\bls_win\lib配置到系统的path环境变量里面,
否则会报`exit status 3221225781`错误。

在源码目录`PlatON-Go`下执行以下编译命令可生成`platon`、`keytool`可执行文件，如下：

```
go run build/ci.go install ./cmd/platon
go run build/ci.go install ./cmd/keytool
```

编译完成之后在`PlatON-Go/build/bin`目录下会生成`platon`、`keytool`可执行文件，将这两个可执行文件拷贝到自己工作目录运行即可。

> 重复编译会覆盖之前生成的可执行文件。

## Ubuntu源码编译

**step1.** 安装编译环境（Ubuntu）：

- 系统版本：`Ubuntu 18.04.1 及以上`
- git：`2.19.1及以上`
- 编译器：`gcc(4.9.2+)`、`g++(5.0+)`
- go语言开发包：`go(1.7+)`
- cmake:`3.0+`

**step2.** 获取PlatON源码：

```bash
git clone -b release-0.10.0 https://github.com/PlatONnetwork/PlatON-Go.git --recursive
```

**step3.** 安装依赖库：

```bash
sudo apt update && sudo apt install golang-go cmake llvm g++ libgmp-dev libssl-dev
```

**step4.** 编译：

```bash
cd PlatON-Go && make all
```

编译完成之后在`./build/bin`目录下会生成`platon, keytool`等一系列可执行文件。

**step5.** 拷贝二进制： 

```shell
sudo cp -f ./build/bin/platon /usr/bin/ && sudo cp -f ./build/bin/keytool /usr/bin/
```

源码编译成功！