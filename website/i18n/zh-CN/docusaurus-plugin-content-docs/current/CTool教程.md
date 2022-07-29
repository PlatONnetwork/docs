---
id: CTool_Manual
title: CTool教程
sidebar_label: CTool教程
---

CTool是PlatON网络钱包交易及合约交易的综合工具，方便使用者在PlatON网络上**安全，方便**地进行生成钱包，转账，合约交易等操作，此文档介绍了合约工具的运行环境和工具的使用方法。

出于对钱包和私钥管理安全性的要求，需要准备两套操作环境：

- 一套离线的操作环境，专门用于生成普通钱包和HD钱包，并保管钱包和私钥，以及对交易文件的离线签名，包括批量质押，批量转账、批量锁仓，批量合约等交易文件的离线签名。

- 一套在线的操作环境，用于向 PlatON 公链发送已经完成离线签名的交易，包括批量质押，批量转账、批量锁仓、批量合约等交易。

本文档按照如下操作流程进行描述：

## 1. 离线CTool工具的安装

### 1.1 硬件要求

一台没有 wifi 网线等网络链接的 windows10 系统电脑。

一个包括 CTool安装包 `CTool.exe` 的U盘。

一个存储数据的U盘，用于在离线机器和在线机器之间拷贝数据。

### 1.2 安装CTool

安全考虑，离线CTool应该安装在离线机器（不连接任何网络和WIFI）上。

**step1.** 下载CTool安装包

下载路径：https://download.platon.network/platon/CTool/CTool.exe。

**step2.** 通过安全存储介质（移动U盘或者移动硬盘）将安装文件 `CTool.exe` 转到**离线机器**下

**step3.** 在**离线机器**上安装CTool

双击 `CTool.exe` 进行安装。默认安装目录为 `C:\CTool` , 建议不要更改此安装目录。弹出界面显示**Completing the CTool Setup Wizard**信息表示安装成功，点击**Finish**即可。

### 1.3 修改config配置

为支持链的 chain-id 不同版本之间的变化，增加配置文件更改链id以及ip和rpc端口。配置文件路径： `C:\CTool\bin\config\config.json`，配置文件模板如下：

```json
{
	"wallet_file_base_dir": "C:\CTool\keystore\",
	"prikey_file_base_dir": "C:\CTool\priatekey\",
	"validator_file_base_dir": "C:\CTool\validator\",
	"unsigned_transaction_file_dir": "C:\CTool\unsigned_transaction\",
	"signed_transaction_file_dir": "C:\CTool\signed_transaction\",
	"transaction_result_dir": "C:\CTool\transaction_result\",
    "rpc_url":"http://127.0.0.1:6789",
	"chain_id": 100,
	"hrp_type": "lat"
}
```

> **字段说明：**
>
> - wallet_file_base_dir：生成普通钱包和HD钱包文件的目录；
> - prikey_file_base_dir：生成普通钱包和HD钱包私钥二维码的目录；
> - validator_file_base_dir：质押节点信息配置文件目录；
> - unsigned_transaction_file_dir：保存交易待签名文件目录；
> - signed_transaction_file_dir：保存交易签名文件目录；
> - transaction_result_dir：保存发送交易结果和校验交易结果目录；
> - rpc_url：调用节点rpc接口的路径；
> - chain_id：节点所在的链ID，PlatON主网为: 100;
> - hrp_type：bech32地址格式前缀；
> 
> **根据实际情况，修改此配置文件。**

### 1.4 文件模板

安装完成之后，生成钱包和交易相关的配置文件在：`C:\CTool\template`下；其中：

- `wallet_file.xlsx`为钱包配置文件；其中包括生成普通钱包和生成HD钱包配置；

  > 注意：
  >
  > - 钱包文件和私钥文件保存在：**`私钥管理人\钱包类型\账户用途`**路径下，所以**`私钥管理人，钱包类型，账户用途`**这三个字段的值不能含有特殊字符，如：`\`等；

- `transfer_file.xlsx`为转账交易配置文件；

- `restrict_file.xlsx`为锁仓交易配置文件；

用户请根据文件模板格式进行修改。

## 2.在线CTool工具的安装

操作方式和步骤参考离线CTool工具的安装。

## 3. 操作步骤

- 生成钱包

  出于安全考虑，建议在离线机器上生成；

- 交易相关

  - 生成待签名文件和发送交易在在线机器上执行；
  - 签名交易在离线机器上执行；

### 3.1 生成钱包

提前对`C:\CTool\template`下的钱包配置文件`wallet_file.xlsx`进行修改；

#### 3.1.1 生成普通钱包

执行命令：

```shell
batch_generate_wallet -f C:\CTool\template\wallet_file.xlsx --empty_keystore
```

> -f:   钱包配置文件路径；
>
> --empty_keystore：表示清空钱包文件目录和钱包私钥目录下的文件，其中钱包文件目录和钱包私钥目录分别对应[1.3 修改config配置](#1.3 修改config配置) 的`wallet_file_base_dir`和`prikey_file_base_dir`对应的目录；此参数请酌情使用，默认为不清空；
>
> 
>
> 执行完成之后，在配置的目录下生成普通钱包文件和普通钱包私钥文件；并生成钱包文件对应的钱包密码密码文件`password_xxxx.txt`，其中密码文件格式为：`$address:$password`，`$address`为地址，`$password`为密码明文，其中密码明文为随机生成，如：
>
> ```txt
>lat1jhsv560t2cx7m90fwsu66uhegjtm2w7049s6d9:DWkRAJU8
> ```

#### 3.1.2 生成HD钱包

执行命令：

```shell
batch_generate_wallet -f C:\CTool\template\wallet_file.xlsx -t hd
```

> -f:   钱包配置文件路径；
>
> -t：钱包类型，其中hd表示分层钱包；
>
> 执行完成之后，在配置的目录下生成HD钱包文件和HD钱包私钥文件；

### 3.2 批量转账

提前对`C:\CTool\template`下的转账交易配置文件`transfer_file.xlsx`进行修改；

- 生成转账交易待签名文件

执行命令：

``` bash
batch_unsigned_transfer_tx -f C:\CTool\template\transfer_file.xlsx
```

> 说明：
>
> - -f:  转账交易配置文件；
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`unsigned_transaction_file_dir`目录下生成待签名转账交易文件：`unsigned_transfer_transactions.csv`文件。



- 生成转账交易签名文件

执行命令：

``` bash
batch_signed_transfer_tx -f C:\CTool\unsigned_transaction\unsigned_transfer_transactions.csv -k C:\CTool\keystore
```

> 说明：
>
> -f: 转账交易待签名文件；
>
> -k: 转账交易钱包文件所在路径；如果钱包为外部提供，需要将钱包名命名为地址；并在钱包文件当前的密码文件`password.txt`下按格式`$address:$password`添加钱包文件的地址和密码；
>
> 
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`signed_transaction_file_dir`目录下生成转账交易签名文件：`signed_transfer_transaction.csv`文件。



- 发送批量转账交易

执行命令：

```bash
batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_transfer_transaction.csv -t transfer --no-wait
```

> 说明：
>
> -f: 转账交易签名文件；
>
> -t: 交易类型；包括staking\transfer\restrict；
>
> -s: 发完每笔交易的休眠时间，单位毫秒，默认100ms；
>
> --no-wait：不等交易回执，直接返回交易hash；`--wait：表示等待交易回执（此方式发送交易较慢）`
>
> 打印交易hash，转账前from，to地址账户的金额（单位为ATP）等信息，并在发送完成所有交易之后在[1.3 修改config配置](#1.3 修改config配置) 的`transaction_result_dir`目录下生成发送交易结果文件：`transfer_transaction_result.csv`文件。
>
> 
>
> **交易检测：**
>
> - 使用生成的结果文件`transfer_transaction_result.csv`校验交易是否成功：
>
>   ```shell
>   verify_transaction_result -f C:\CTool\template\transfer_file.xlsx -r C:\CTool\transaction_result\transfer_transaction_result.csv -t transfer
>   ```
>
>   检查完成后生成检测文件：`check_transfer_result_XXXXXXXXXXX.csv`文件，此文件记录转账前后from，to地址账户的金额（单位为ATP）等信息；
>
>   如果生成`err_transfer_result_XXXXXXXXXXX.csv`表示有异常交易，需要使用`transfer_file_XXXXXXXXXXX.xlsx`文件，重发转账交易。



### 3.3 批量质押节点

提前对`C:\CTool\template`下的批量质押配置文件`staking_file.xlsx`进行修改；

- **生成批量质押待签名文件**

执行命令：

``` bash
batch_unsigned_staking_tx -f C:\CTool\template\staking_file.xlsx
```

> 说明：
>
> - -f:  节点质押信息文件；
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`unsigned_transaction_file_dir`目录下生成待签名质押交易文件：`unsigned_staking_transactions.csv`文件。



- **生成质押交易签名文件**

执行命令：

``` bash
batch_signed_staking_tx -f C:\CTool\unsigned_transaction\unsigned_staking_transactions.csv -k C:\CTool\keystore
```

> 说明：
>
> -f: 质押交易待签名文件；
>
> -k: 质押地址的钱包文件所在路径；如果钱包为外部提供，需要将钱包名命名为地址；并在钱包文件当前的密码文件`password.txt`下按格式`$address:$password`添加钱包文件的地址和密码；
>
> 
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`signed_transaction_file_dir`目录下生成质押交易签名文件：`signed_staking_transaction.csv`文件。



- **发送节点质押交易**

执行命令：

```bash
batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_staking_transaction.csv -t staking --no-wait
```

> 说明：
>
> -f:  质押交易签名文件；
>
> -t: 交易类型；包括staking\transfer\restrict；
>
> -s: 发完每笔交易的休眠时间，单位毫秒，默认100ms；
>
> --no-wait：不等交易回执，直接返回交易hash；`--wait：表示等待交易回执（此方式发送交易较慢）`
>
> 打印交易hash，交易类型等信息，并在发送完成所有交易之后在[1.3 修改config配置](#1.3 修改config配置) 的`transaction_result_dir`目录下生成发送交易结果文件：`staking_transaction_result.csv`文件。
>
> 
>
> **检查交易是否上链：**
>
> - 检查交易是否全部上链，执行：
>
>   ```shell
>   batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_staking_transaction.csv -t staking --check
>   ```
>
>   > - 如果提示：`not all transactions are on the chain, please wait!!!`，表示交易还没有全部上链，请等待，先不要进行**交易检测**的操作（过一会再重复执行一次上述命令）；
>   > - 如果提示：`all transactions are on the chain.`，表示交易全部上链，可以进行进行**交易检测**的操作，进行交易是否成功的检查；
>
> 
>
> **交易检测：**
>
> - 使用生成的结果文件`staking_transaction_result.csv`校验交易是否成功：
>
>   ```shell
>   verify_transaction_result -f C:\CTool\template\staking_file.xlsx -r C:\CTool\transaction_result\staking_transaction_result.csv -t staking
>   ```
>
>   检查完成后生成检测文件：`check_staking_result_XXXXXXXXXXX.csv`文件，此文件记录转账前后质押地址账户的金额（单位为LAT）和质押节点，以及交易结果等信息；
>
>   如果生成`err_staking_result_XXXXXXXXXXX.csv`表示有异常交易，需要根据异常情况解决问题后，使用`staking_file_XXXXXXXXXXX.xlsx`文件，重发质押交易。
> 



### 3.4 批量锁仓

- 生成锁仓交易待签名文件

执行命令：

```bash
batch_unsigned_restrict_tx -f C:\CTool\template\restrict_file.xlsx
```

> 说明：
>
> - -f:  批量锁仓分配文件
> 
>执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`unsigned_transaction_file_dir`目录下生成待签名锁仓交易文件：`unsigned_restrict_transaction.csv`文件。



- 生成锁仓分配交易签名文件

执行命令：

```bash
batch_signed_restrict_tx -f C:\CTool\unsigned_transaction\unsigned_restrict_transaction.csv -k C:\CTool\keystore
```

> 说明：
>
> -f:  锁仓交易待签名文件；
>
> -k: 锁仓交易钱包文件所在路径；如果钱包为外部提供，需要将钱包名命名为地址；并在钱包文件当前的密码文件`password.txt`下按格式`$address:$password`添加钱包文件的地址和密码；；
>
> 
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`signed_transaction_file_dir`目录下生成锁仓交易签名文件：`signed_restrict_transaction.csv`文件。



- 发送锁仓分配交易

执行命令：

```bash
batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_restrict_transaction.csv -t restrict --no-wait
```

> 说明：
>
> -f:  锁仓交易签名文件；
>
> -t: 交易类型；包括staking\transfer\restrict；
>
> -s: 发完每笔交易的休眠时间，单位毫秒，默认100ms；
>
> --no-wait：不等交易回执，直接返回交易hash；`--wait：表示等待交易回执（此方式发送交易较慢）`
>
> 打印交易hash，交易类型等信息，并在发送完成所有交易之后生成统计文件：`restrict_transaction_result.csv`。
>
> 
>
> **检查交易是否上链：**
>
> - 检查交易是否全部上链，执行：
>
>   ```shell
>   batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_restrict_transaction.csv -t restrict --check
>   ```
>
>   > - 如果提示：`not all transactions are on the chain, please wait!!!`，表示交易还没有全部上链，请等待，先不要进行**交易检测**的操作（过一会再重复执行一次上述命令）；
>   > - 如果提示：`all transactions are on the chain.`，表示交易全部上链，可以进行进行**交易检测**的操作，进行交易是否成功的检查；
>
> 
>
> **交易检测：**
>
> - 使用生成的结果文件`restrict_transaction_result.csv`校验交易是否成功：
>
>   ```shell
>   verify_transaction_result -f C:\CTool\template\restrict_file.xlsx -r C:\CTool\transaction_result\restrict_transaction_result.csv -t restrict
>   ```
>
>   检查完成后生成检测文件：`check_restrict_result_XXXXXXXXXXX.csv`文件，此文件记录锁仓前后from地址账户的自由金额（单位为LAT）等信息；
>
>   如果生成`err_restrict_result_XXXXXXXXXXX.csv`表示有异常交易，需要使用`restrict_file_XXXXXXXXXXX.xlsx`文件，重发锁仓交易。
> 



### 3.5 通用合约交易（批量）

- 准备合约的abi和bin文件

  将abi和bin文件拷贝到工具的机器上；

- 生成合约交易配置文件模板

  ```bash
  generate_erc20_file -a $abi_path -c contractName -n func_name -s $save_dir
  ```

  > 参数说明：
  >
  > -a：合约abi文件的路径；
  >
  > -c：合约名称，不指定时默认为ERC20；
  >
  > -n：函数名称，不指定时默认为constructor，表示部署合约；
  >
  > -s：保存文件所在目录，不指定时保存在当前目录下；
  >
  > 
  >
  > 执行成功后在`$save_dir`目录下生成`{$contractName}_{$func_name}_file.xlsx`配置文件；
  >
  > 其中文件中的from表示发起合约交易的地址，contract_address表示合约地址；param_xxx表示函数的参数；

- 编辑合约交易配置文件

  通过根据具体的需求对`{$contractName}_{$func_name}_file.xlsx`文件进行编辑；

  

- 生成合约交易待签名文件

  将编辑好的合约交易配置文件拷贝到工具所在的在线机器上，执行：

```shell
batch_unsigned_erc20_tx -f {$contractName}_{$func_name}_file.xlsx -a $abi_path -b $bin_path -c $contractName -d $contract_address -n $func_name
```

> 参数说明：
>
> -f：合约交易文件路径；
>
> -a：合约abi文件的路径；
>
> -b：合约bin文件的路径；
>
> -c：合约名称；
>
> -d：erc2.0合约地址，不指定时，从合约交易文件中的`contract_address`字段中读取；**指定时请将	    $contract_address修改为真实的合约地址**；如果是部署合约则不用指定；
>
> -n：合约函数名称，不指定时，默认为：`transfer`，即合约转账交易；如果是部署合约，则需指定为：**constructor**；
>
> 
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`unsigned_transaction_file_dir`目录下生成待签名合约交易文件：`unsigned_{$contractName}_{$func_name}_transactions.csv`文件。



- 签名合约交易

```shell
batch_signed_erc20_tx -f C:\CTool\unsigned_transaction\unsigned_{$contractName}_{$func_name}_transactions.csv -k C:\CTool\keystore
```

> 参数说明：
>
> -f: erc2.0合约交易待签名文件；
>
> -k: 转账交易钱包文件所在路径；如果钱包为外部提供，需要将钱包名命名为地址；并在钱包文件当前的密码文件`password.txt`下按格式`$address:$password`添加钱包文件的地址和密码；；
>
> 
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`signed_transaction_file_dir`目录下生成合约交易签名文件：`signed_{$contractName}_{$func_name}_transactions.csv`文件。



- 发送合约交易

```shell
batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_{$contractName}_{$func_name}_transactions.csv -t erc20 --no-wait
```

> 参数说明：
>
> -f: 合约交易签名文件；
>
> -t: 交易类型；包括staking\transfer\restrict\erc20；
>
> -s: 发完每笔交易的休眠时间，单位毫秒，默认100ms；
>
> --no-wait：不等交易回执，直接返回交易hash；`--wait：表示等待交易回执（此方式发送交易较慢）, 如果部署合约时，结果文件需要保存合约地址，需要使用此参数`；
>
> 
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`transaction_result_dir`目录下生成合约交易签名文件：`{$contractName}_{$func_name}_transaction_result.csv`文件。
>
> 
>
> **检查交易是否上链：**
>
> - 检查交易是否全部上链，执行：
>
>   ```shell
>   batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_{$contractName}_{$func_name}_transactions.csv -t erc20 --check
>   ```
>
>   > - 如果提示：`not all transactions are on the chain, please wait!!!`，表示交易还没有全部上链，请等待，先不要进行**交易检测**的操作（过一会再重复执行一次上述命令）；
>   > - 如果提示：`all transactions are on the chain.`，表示交易全部上链，可以进行进行**交易检测**的操作，进行交易是否成功的检查；



- 校验合约交易

使用生成的结果文件`{contractName}_{func_name}_transaction_result.csv`校验交易是否成功：

```shell
verify_transaction_result -f {$contractName}_{$func_name}_file.xlsx -r C:\CTool\transaction_result\{$contractName}_{$func_name}_transaction_result.csv -t erc20
```

检查完成后生成检测文件：`check_{$contractName}_{$func_name}_result_XXXXXXXXXXX.csv`文件，此文件记录合约转账交易校验结果信息；

如果生成`err_{$contractName}_{$func_name}_result_XXXXXXXXXXX.csv`表示有异常交易，需要使用`{$contractName}_{$func_name}_file_XXXXXXXXXXX.xlsx`文件，重发合约交易。

### 3.6 批量NFT交易

#### 3.6.1 部署合约

- 生成部署合约待签名文件

  将编辑好的合约部署交易配置文件`C:\CTool\template\erc721_constructor_file.xlsx`拷贝到工具所在的在线机器上，执行：

```shell
batch_unsigned_erc20_tx -f C:\CTool\template\erc721_constructor_file.xlsx -a C:\CTool\bin\contract\erc721.abi -b C:\CTool\bin\contract\erc721.bin -c ERC721 -n constructor
```

> 参数说明：
>
> -f：合约交易文件路径；
>
> -a：NFT合约abi文件的路径；
>
> -b：NFT合约bin文件的路径；
>
> -c：NFT合约名称；
>
> -n：NFT合约接口名称，`constructor`合约构造函数名称，用于部署合约使用；
>
> 
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`unsigned_transaction_file_dir`目录下生成待签名合约交易文件：`unsigned_ERC721_deploy_transactions.csv`文件。



- 签名erc721合约交易

```shell
batch_signed_erc20_tx -f C:\CTool\unsigned_transaction\unsigned_ERC721_deploy_transactions.csv -k C:\CTool\keystore
```

> 参数说明：
>
> -f: 合约交易待签名文件；
>
> -k: 转账交易钱包文件所在路径；如果钱包为外部提供，需要将钱包名命名为地址；并在钱包文件当前的密码文件`password.txt`下按格式`$address:$password`添加钱包文件的地址和密码；；
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`signed_transaction_file_dir`目录下生成合约交易签名文件：`signed_ERC721_deploy_transactions.csv`文件。



- 发送合约交易

```shell
batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_ERC721_deploy_transactions.csv -t erc20 --no-wait
```

> 参数说明：
>
> -f: 合约交易签名文件；
>
> -t: 交易类型；包括staking\transfer\restrict\erc20；
>
> -s: 发完每笔交易的休眠时间，单位毫秒，默认100ms，当指定`-m`大于0时此参数无效；
>
> --no-wait：不等交易回执，直接返回交易hash；`--wait：表示等待交易回执（此方式发送交易较慢），如果部署合约时，结果文件需要保存合约地址，需要使用此参数`；
>
> 
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`transaction_result_dir`目录下生成合约交易签名文件：`ERC721_deploy_transaction_result.csv`文件。
>
> 
>
> **检查交易是否上链：**
>
> - 检查交易是否全部上链，执行：
>
>   ```shell
>   batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_ERC721_deploy_transactions.csv -t erc20 --check
>   ```
>
>   > - 如果提示：`not all transactions are on the chain, please wait!!!`，表示交易还没有全部上链，请等待，先不要进行**交易检测**的操作（过一会再重复执行一次上述命令）；
>   > - 如果提示：`all transactions are on the chain.`，表示交易全部上链，可以进行进行**交易检测**的操作，进行交易是否成功的检查；



- 校验合约交易

使用生成的结果文件`ERC721_deploy_transaction_result.csv`校验交易是否成功：

```shell
verify_transaction_result -f C:\CTool\template\erc721_constructor_file.xlsx -r C:\CTool\transaction_result\ERC721_deploy_transaction_result.csv -t erc20
```

检查完成后生成检测文件：`check_ERC721_deploy_result_XXXXXXXXXXX.csv`文件，此文件记录erc721合约交易校验结果信息；

如果生成`err_ERC721_deploy_result_XXXXXXXXXXX.csv`表示有异常交易，需要使用`ERC721_deploy_file_XXXXXXXXXXX.xlsx`文件，重发erc721合约交易。



#### 3.6.2 批量铸币

- 生成批量铸币交易待签名文件

  将编辑好的合约转账交易配置文件`C:\CTool\template\erc721_mint_file.xlsx`拷贝到工具所在的在线机器上，执行：

```shell
batch_unsigned_erc20_tx -f C:\CTool\template\erc721_mint_file.xlsx -a C:\CTool\bin\contract\erc721.abi -b C:\CTool\bin\contract\erc721.bin -c ERC721 -n mint -d $contract_address
```

> 参数说明：
>
> -f：合约交易文件路径；
>
> -a：NFT合约abi文件的路径；
>
> -b：NFT合约bin文件的路径；
>
> -c：NFT合约名称；
>
> -n：NFT合约接口名称，`constructor`合约构造函数名称，用于部署合约使用；
>
> -d：合约地址，不指定时，从合约交易文件中的`contract_address`字段中读取；**指定时请将	    $contract_address修改为真实的合约地址**，可从[部署合约](#3.12.1 部署合约)返回中获取；
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`unsigned_transaction_file_dir`目录下生成待签名合约交易文件：`unsigned_ERC721_mint_transactions.csv`文件。



- 签名erc721合约交易

```shell
batch_signed_erc20_tx -f C:\CTool\unsigned_transaction\unsigned_ERC721_mint_transactions.csv -k C:\CTool\keystore
```

> 参数说明：
>
> -f: 合约交易待签名文件；
>
> -k: 转账交易钱包文件所在路径；如果钱包为外部提供，需要将钱包名命名为地址；并在钱包文件当前的密码文件`password.txt`下按格式`$address:$password`添加钱包文件的地址和密码；；
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`signed_transaction_file_dir`目录下生成合约交易签名文件：`signed_ERC721_mint_transactions.csv`文件。



- 发送erc721合约交易

```shell
batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_ERC721_mint_transactions.csv -t erc20 --no-wait
```

> 参数说明：
>
> -f: 合约交易签名文件；
>
> -t: 交易类型；包括staking/transfer/restrict/erc20；
>
> -s: 发完每笔交易的休眠时间，单位毫秒，默认100ms，当指定`-m`大于0时此参数无效；
>
> --no-wait：不等交易回执，直接返回交易hash；`--wait：表示等待交易回执（此方式发送交易较慢）`；
>
> 
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`transaction_result_dir`目录下生成合约交易签名文件：`ERC721_mint_transaction_result.csv`文件。
>
> 
>
> **检查交易是否上链：**
>
> - 检查交易是否全部上链，执行：
>
>   ```shell
>   batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_ERC721_mint_transactions.csv -t erc20 --check
>   ```
>
>   > - 如果提示：`not all transactions are on the chain, please wait!!!`，表示交易还没有全部上链，请等待，先不要进行**交易检测**的操作（过一会再重复执行一次上述命令）；
>   > - 如果提示：`all transactions are on the chain.`，表示交易全部上链，可以进行进行**交易检测**的操作，进行交易是否成功的检查；



- 校验合约交易

使用生成的结果文件`ERC721_mint_transaction_result.csv`校验交易是否成功：

```shell
verify_transaction_result -f C:\CTool\template\erc721_mint_file.xlsx -r C:\CTool\transaction_result\ERC721_mint_transaction_result.csv -t erc20
```

检查完成后生成检测文件：`check_ERC721_mint_result_XXXXXXXXXXX.csv`文件，此文件记录合约铸币交易校验结果信息；

如果生成`err_ERC721_mint_result_XXXXXXXXXXX.csv`表示有异常交易，需要使用`ERC721_mint_file_XXXXXXXXXXX.xlsx`文件，重发erc721合约交易。

#### 3.6.3 批量NFT转账

- 编辑erc721合约转账交易配置文件

  通过根据具体的需求对`C:\CTool\template\erc721_safeTransferFrom_file.xlsx`文件进行编辑；

  | from | contract_address | param_from | param_to | param_tokenId |
  | ---- | ---------------- | ---------- | -------- | ------------- |
  |      |                  |            |          |               |

  > 字段说明：
  >
  > - from：发送合约转账交易地址；即为铸币地址`$param_from`；
  > - contract_address：erc721合约地址；
  > - param_from：铸币地址；
  > - param_to：NFT投票接收钱包；
  > - param_tokenId：令牌ID;

- 生成erc721合约转账交易待签名文件

  将编辑好的合约转账交易配置文件`C:\CTool\template\erc721_safeTransferFrom_file.xlsx`拷贝到工具所在的在线机器上，执行：

```shell
batch_unsigned_erc20_tx -f C:\CTool\template\erc721_safeTransferFrom_file.xlsx -a  C:\CTool\bin\contract\erc721.abi -b C:\CTool\bin\contract\erc721.bin -c erc721 -d $contract_address -n safeTransferFrom 
```

> 参数说明：
>
> -f：合约交易文件路径；
>
> -a：erc721合约abi文件的路径；
>
> -b：erc721合约bin文件的路径；
>
> -c：erc721合约名称；
>
> -d：erc721合约地址，不指定时，从合约交易文件中的`contract_address`字段中读取；**指定时请将	    $contract_address修改为真实的合约地址**；
>
> -n：合约函数名称，不指定时，默认为：`transfer`，即erc721合约转账交易；
>
> 
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`unsigned_transaction_file_dir`目录下生成待签名合约交易文件：`unsigned_erc721_safeTransferFrom_transactions.csv`文件。



- 签名erc721合约交易

```shell
batch_signed_erc20_tx -f C:\CTool\unsigned_transaction\unsigned_erc721_safeTransferFrom_transactions.csv -k C:\CTool\keystore
```

> 参数说明：
>
> -f: erc2.0合约交易待签名文件；
>
> -k: 转账交易钱包文件所在路径；如果钱包为外部提供，需要将钱包名命名为地址；并在钱包文件当前的密码文件`password.txt`下按格式`$address:$password`添加钱包文件的地址和密码；；
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`signed_transaction_file_dir`目录下生成合约交易签名文件：`signed_erc721_safeTransferFrom_transactions.csv`文件。



- 发送erc721合约交易

```shell
batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_erc721_safeTransferFrom_transactions.csv -t erc20 -n 1 -m 20 --no-wait
```

> 参数说明：
>
> -f: 合约交易签名文件；
>
> -t: 交易类型；包括staking\transfer\restrict\erc20；
>
> -s: 发完每笔交易的休眠时间，单位毫秒，默认100ms，当指定`-m`大于0时此参数无效；
>
> -n: 发完每笔交易的最小休眠时间，单位分钟，默认为0；
>
> -m: 发完每笔交易的最大休眠时间，单位分钟，默认为0；
>
> --no-wait：不等交易回执，直接返回交易hash；`--wait：表示等待交易回执（此方式发送交易较慢）`；
>
> 
>
> 执行成功后在[1.3 修改config配置](#1.3 修改config配置) 的`transaction_result_dir`目录下生成合约交易签名文件：`erc721_safeTransferFrom_transaction_result.csv`文件。
>
> 
>
> **检查交易是否上链：**
>
> - 检查交易是否全部上链，执行：
>
>   ```shell
>   batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_erc721_safeTransferFrom_transactions.csv -t erc20 --check
>   ```
>
>   > - 如果提示：`not all transactions are on the chain, please wait!!!`，表示交易还没有全部上链，请等待，先不要进行**交易检测**的操作（过一会再重复执行一次上述命令）；
>   > - 如果提示：`all transactions are on the chain.`，表示交易全部上链，可以进行进行**交易检测**的操作，进行交易是否成功的检查；



- 校验合约交易

使用生成的结果文件`erc721_safeTransferFrom_transaction_result.csv`校验交易是否成功：

```shell
verify_transaction_result -f C:\CTool\template\erc721_safeTransferFrom_file.xlsx -r C:\CTool\transaction_result\erc721_safeTransferFrom_transaction_result.csv -t erc20
```

检查完成后生成检测文件：`check_erc721_safeTransferFrom_result_XXXXXXXXXXX.csv`文件，此文件记录erc721合约转账交易校验结果信息；

如果生成`err_erc721_safeTransferFrom_result_XXXXXXXXXXX.csv`表示有异常交易，需要使用`erc721_safeTransferFrom_file_XXXXXXXXXXX.xlsx`文件，重发erc721合约交易。

