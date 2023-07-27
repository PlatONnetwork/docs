---
id: PlaTrust-wallet-js-sdk-api
title: PlaTrust钱包 js-sdk-API说明
sidebar_label: PlaTrust钱包 js-sdk-API说明
---

# PlaTrust钱包 js-sdk-API说明

## 一. 枚举 (enum)

1. **Operation** 交易的调用方式

```
CALL: 跨合约 call 调用
DElEGATECALL: 跨合约 delegatecall 调用
```

2. **SignatureMode** 签名组成模式

```
guardians: 多签必须是钱包的 guardian 成员
owner: 多签必须是钱包的 owner 成员
session: session 免多签session模式下的单签
```


## 二. 类 (class)

1. **WalletLib**： 钱包基础库
2. **Bundler**：bundler rpc库
3. **Paymaster**：paymaster 操作库
4. **UserOperation**： 用户操作结构封装
5. **Callbase**: 组装调用钱包函数的 UserOperation 基础类
6. **ERC20**： 组装 ERC20 相关的函数调用的 UserOperation 入口 (依赖 Callbase 类)
7. **ERC721**： 组装 ERC721 相关的函数调用的 UserOperation 入口 (依赖 Callbase 类)
8. **ERC1155**： 组装 ERC1155 相关的函数调用的 UserOperation 入口 (依赖 Callbase 类)
9. **LAT**： 组装对钱包lat做转账的 UserOperation 入口 (依赖 Callbase 类)

## 三. 接口 (interface)

1. ApproveToken： ERC20 approve 参数封装
2. ExecutionResult： 交易正常执行的结果封装
3. ValidationResult： EIP-4337 定义执行校验userOp结果
4. FailedOp： 异常信息
5. Result：ExecutionResult、ValidationResult、FailedOp的包装信息
6. StakeInfo： 质押信息
7. ReturnInfo：执行模拟交易时返回的 gas 和内容
8. EstimateUserOpGas： 预估 userOp 的 gas 结果
9. ParsedTransaction：交易回执封装
10. UserOperationReceipt：userOp的执行回执信息
11. Logs：交易回执的logs封装


## 四. 全局函数

1. **encodeSignature**： 编码 userOp 的 signature 信息

```
encodeSignature(signatureMode, signature, validAfter?, validUntil?, aggregator?): string
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|signatureMode|BigNumber|签名模式，0：owner； 1： guardians； 2： session|Y|
|signature|string|十六进制的签名信息|Y|
|aggregator|string|聚合签名的聚合器地址|N|
|validAfter|BigNumber|签名有效期起始时间|N|
|validUntil|BigNumber|签名有效期结束时间|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|packedSignature|string|userOp的签名信息|


2. **decodeSignature**： 解码 userOp 的 signature 信息

```
decodeSignature(packedSignature): Object
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|packedSignature|string|userOp的签名信息|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|signatureMode|BigNumber|签名模式，0：owner； 1： guardians； 2： session|
|signature|string|十六进制的签名信息|
|aggregator|string|聚合签名的聚合器地址|
|validAfter|BigNumber|签名有效期起始时间|
|validUntil|BigNumber|签名有效期结束时间|


3. **packSignatureHash**： 求数据Hash的签名信息

```
packSignatureHash(hash, signatureMode?, validAfter?, validUntil?, aggregator?): string
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|hash|string|需要做签名的数据Hash信息|Y|
|signatureMode|BigNumber|签名模式，0：owner； 1： guardians； 2： session|N|
|aggregator|string|聚合签名的聚合器地址|N|
|validAfter|BigNumber|签名有效期起始时间|N|
|validUntil|BigNumber|签名有效期结束时间|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|_hash|string|keccak256(abi.encodePacked(hash,signatureMode,aggregator&validAfter&validUntil))的值|


4. **recoverAddress**： 解析出签名者账户地址

```
recoverAddress(msg, signature): string
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|msg|string|签名时用到的数据|Y|
|signature|string|签名信息|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|签名者账户地址|



5. **signMessage**： 使用私钥对消息进行签名

```
signMessage(msg, privateKey): string
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|msg|string|需要做签名的消息|Y|
|privateKey|string|私钥|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|签名|


## 五. WalletLib 对外函数


1. **构造函数** 

```
new WalletLib(singletonFactory?)
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|singletonFactory|string|钱包工厂合约地址|N|
>
>
返参说明：
>
>
WalletLib


2. **singletonFactory** 获取钱包的工厂合约地址

```
singletonFactory()：string 
```
>
>
入参说明：
>
>
无
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|钱包的工厂合约地址|


3. **getInitCode** 获取钱包的initCode

```
getInitCode(walletFactory, walletLogic, initializer, salt): string
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletFactory|string|钱包的工厂合约地址|Y|
|walletLogic|string|钱包的逻辑合约地址|Y|
|initializer|string|钱包初始化编码 (setUp函数的编码)|Y|
|salt|string|盐 (控制 create2 生成钱包反事实地址)|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|钱包的initCode|


4. **getNonce** 获取钱包的nonce值

```
getNonce(walletAddress, etherProvider, defaultBlock?): Promise<number>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包的工厂合约地址|Y|
|etherProvider|ethers.providers.BaseProvider |ethers.js 的 provider 如：ethers.provider|Y|
|defaultBlock|string|earliest、latest、pending，默认：latest|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|number|钱包的nonce|


5. **getPaymasterData** 获取组装userOp时的paymaster调用信息

```
getPaymasterData(payMasterAddress, token, maxCost): string
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|payMasterAddress|string|paymaster地址|Y|
|token|string|paymaster接受的token地址|Y|
|maxCost|BigNumber|最大花费|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|number|paymaster调用信息|


6. **getSetupCode** 获取钱包实例的setUp调用编码

```
getSetupCode(entryPoint, owners, threshold, to, data, fallbackHandler, lockPeriod): string
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|entryPoint|string|entryPoint合约地址|Y|
|owners|string[]|钱包的多个持有者，至少传入一个|Y|
|threshold|BigNumber|钱包持有者的多签阈值|Y|
|to|string|钱包的 module 的调用 to 参数|Y|
|data|string|钱包的 module 的调用 calldata 信息 (十六进制)|Y|
|fallbackHandler|string|钱包的 fallback 处理合约地址|Y|
|lockPeriod|BigNumber|钱包的锁定时长，【建议设为 1周】 (单位: ms)|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|setUp调用编码|



7. **getWalletCode** 获取钱包实部署编码 
```
getWalletCode(walletLogicAddress, walletProxyConfig?): string
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletLogicAddress|string|钱包逻辑合约地址|Y|
|walletProxyConfig|struct|proxy的配置(包含proxy的ABI和proxy的bytecode)|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|实际要用来做部署的walletproxy的编码(包含了walletProxyConfig中的bytecode)|



8. **lockWalletOp** 组装锁定钱包的userOp

```
lockWalletOp(walletAddress, etherProvider, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包地址|Y|
|etherProvider|ethers.providers.BaseProvider |ethers.js 的 provider 如：ethers.provider|Y|
|paymasterAndData|string|paymaster的调用信息|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|



9. **unlockWalletOp** 组装解锁钱包的userOp

```
unlockWalletOp(walletAddress, etherProvider, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包地址|Y|
|etherProvider|ethers.providers.BaseProvider |ethers.js 的 provider 如：ethers.provider|Y|
|paymasterAndData|string|paymaster的调用信息|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|



10. **activateWalletOp** 组装部署钱包的userOp

```
activateWalletOp(walletLogic, initializer, paymasterAndData, salt, walletFactory, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): UserOperation
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletLogic|string|钱包逻辑合约地址|Y|
|initializer|string |初始化钱包函数调用编码|Y|
|paymasterAndData|string|paymaster的调用信息|Y|
|salt|string|创建钱包时使用的盐 (控制 create2 生成钱包反事实地址)|Y|
|walletFactory|string|钱包工厂合约地址|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|



11. **calculateWalletAddress** 计算钱包地址 (create2 反事实地址)

```
calculateWalletAddress(walletLogic, initializer, salt, walletFactory): string
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletLogic|string|钱包逻辑合约地址|Y|
|initializer|string |初始化钱包函数调用编码|Y|
|salt|string|创建钱包时使用的盐 (控制 create2 生成钱包反事实地址)|Y|
|walletFactory|string|钱包工厂合约地址|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|钱包地址|


12. **addOwnerWithThresholdOp** 添加钱包owner及更新多签阈值

```
addOwnerWithThresholdOp(walletAddress, etherProvider, owner, threshold, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
|owner|string|设置钱包的 owner|Y|
|threshold|number|钱包多签阈值|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|N|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|N|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|N|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|N|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|N|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|


13. **changeThresholdOp** 更新多签阈值

```
changeThresholdOp(walletAddress, etherProvider, threshold, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
|threshold|number|钱包多签阈值|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|N|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|N|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|N|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|N|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|N|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|


14. **changeThresholdOp** 更新多签阈值

```
changeThresholdOp(walletAddress, etherProvider, threshold, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
|threshold|number|钱包多签阈值|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|N|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|N|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|N|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|N|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|N|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|


15. **getThreshold** 获取钱包的多签阈值

```
getThreshold(walletAddress, etherProvider): Promise<number>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|number|多签阈值|


16. **swapOwnerOp** 替换某个钱包的持有者

```
swapOwnerOp(walletAddress, etherProvider, prevOwner, oldOwner, newOwner, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
|prevOwner|string|被替换的owner的前置owner|Y|
|oldOwner|string|被替换的owner|Y|
|newOwner|string|新的owner|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|N|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|N|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|N|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|N|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|N|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|


17. **removeOwnerOp** 移除某个钱包的持有者

```
removeOwnerOp(walletAddress, etherProvider, prevOwner, owner, threshold, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
|prevOwner|string|被移除的owner的前置owner|Y|
|owner|string|被移除的owner|Y|
|threshold|number|新的多签阈值 (不需要更新，则传入旧值)|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|N|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|N|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|N|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|N|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|N|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|


18. **getOwners** 获取钱包的持有者列表

```
getOwners(walletAddress, etherProvider): Promise<Array<string>>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|Array<string>|钱包的持有者列表|


19. **isOwner** 校验某账户是否为钱包的持有者

```
isOwner(owner, walletAddress, etherProvider): Promise<boolean>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|owner|string|被校验的账户地址|Y|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|boolean|是否为钱包的持有者, true: 是; false: 不是|


20. **startSessionOp** 开启免多签session

```
startSessionOp(walletAddress, etherProvider, sessionUser, duration, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
|sessionUser|string|钱包session所属者|Y|
|duration|number|钱包session有效时长 (单位: ms)|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|N|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|N|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|N|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|N|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|N|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|


21. **clearSessionOp** 关闭免多签session

```
clearSessionOp(walletAddress, etherProvider, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|N|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|N|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|N|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|N|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|N|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|


22. **enableModuleOp** 启用module

```
enableModuleOp(walletAddress, etherProvider, module, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
|module|string|module地址|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|N|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|N|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|N|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|N|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|N|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|


23. **disableModuleOp** 弃用module

```
disableModuleOp(walletAddress, etherProvider, prevModule, module, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
|prevModule|string|被弃用module的前置module地址|Y|
|module|string|被弃用的module地址|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|N|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|N|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|N|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|N|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|N|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|


24. **isEnabledModule** 校验某地址是否为有效module

```
isEnabledModule(module, walletAddress, etherProvider): Promise<boolean>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|module|string|module地址|Y|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|boolean|是否为有效module, true: 是; false: 无效|


25. **isEnabledModules** 校验一组地址是否为有效module

```
isEnabledModules(modules, walletAddress, etherProvider): Promise<boolean>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|modules|string[]|一组module地址|Y|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|boolean|是否为有效module, true: 是; false: 无效|


26. **getModulesPaginated** 分页返回module数组

```
getModulesPaginated(start, pageSize, walletAddress, etherProvider): Promise<any[]>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|start|string|分页起始的module地址|Y|
|pageSize|number|页宽度|Y|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|any[]|返回的module列表和下一页开始的module地址 (理论上，第一个元素为module列表，第二个元素为下一页开始的module地址)|


27. **lockWalletOp** 锁定钱包

```
lockWalletOp(walletAddress, etherProvider, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|N|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|N|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|N|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|N|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|N|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|


28. **unlockWalletOp** 解锁钱包

```
unlockWalletOp(walletAddress, etherProvider, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|N|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|N|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|N|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|N|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|N|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|


29. **isLocked** 校验钱包是否被锁定

```
isLocked(walletAddress, etherProvider): Promise<boolean>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|boolean|钱包是否被锁定, true: 是; false: 没被锁|


30. **getLock** 获取钱包的锁定时长

```
getLock(walletAddress, etherProvider): Promise<number>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|number|钱包被锁定的过期时长 (单位: ms)|


31. **setFallbackHandlerOp** 设置钱包的拓展功能处理器

```
setFallbackHandlerOp(walletAddress, etherProvider, handler, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
|handler|string|钱包拓展功能合约地址|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|N|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|N|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|N|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|N|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|N|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|


32. **getEntryPoint** 获取钱包的 EntryPoint 地址

```
getEntryPoint(walletAddress, etherProvider): Promise<string>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|钱包的 EntryPoint 地址|


33. **withdrawDepositOp** 提取钱包自身质押到 EtryPoint 中的垫付金额

```
withdrawDepositOp(walletAddress, etherProvider, withdrawAddress, amount, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
|withdrawAddress|string||Y|
|amount|number|钱包拓展功能合约地址|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|N|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|N|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|N|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|N|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|N|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|组装好的userOp|


34. **addDeposit** 钱包本身质押垫付款到 EntryPoint 

```
addDeposit(walletAddress, signer, value): Promise<any>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|signer|ethers.Wallet|ethers.js 的 Wallet 如：ethers.Wallet|Y|
|value|string|质押的垫付金额|Y|
>
>
返参说明：
>
>
无


35. **getDeposit** 查询钱包本身质押垫付款余额

```
getDeposit(walletAddress, etherProvider): Promise<number>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包代理合约地址|Y|
|etherProvider|ethers.providers.BaseProvider|ethers.js 的 provider 如：ethers.provider|Y|
>
>
返参说明：
>
>
|-|number|钱包本身质押垫付款余额|



## 六. Bundler 对外函数

1. **构造函数** 

```
new Bundler(entryPoint, etherProvider, bundlerApiURL, timeout?)
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|entryPoint|string|entryPoint合约地址|Y|
|etherProvider|ethers.providers.BaseProvider |ethers.js 的 provider 如：ethers.provider|Y|
|bundlerApiURL|string |bundler的url|Y|
|timeout|ApiTimeOut|超时时间选项，web3ApiRequestTimeout： web3 api请求超时时间；web3ApiResponseTimeout： web3 api响应超时时间；bundlerApiRequestTimeout： bundler api请求超时时间；bundlerApiResponseTimeout：bundler api响应超时时间|N|
>
>
返参说明：
>
>
Bundler



2. **platon_chainId** (EIP-4337规范)返回 EIP-155 链 ID

```
platon_chainId(timeout?): Promise<string>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|timeout|number|超时时间|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|chain id|



3. **platon_estimateUserOperationGas** (EIP-4337规范)估计 UserOperation 的气体值

```
platon_estimateUserOperationGas(userOp, timeout?): Promise<EstimateUserOpGas>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|userOp|UserOperation|用户操作|Y|
|timeout|number|超时时间|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|EstimateUserOpGas|预估gas结果|



4. **platon_getUserOperationByHash** (EIP-4337规范)根据 eth_sendUserOperation 返回的哈希值（userOpHash）返回一个UserOperation

```
platon_getUserOperationByHash(userOpHash, timeout?): Promise<null | UserOperationReceipt>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|userOpHash|string|userOp的Hash|Y|
|timeout|number|超时时间|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperationReceipt|EIP-4337 规范定义返回信息|



5. **platon_getUserOperationReceipt** (EIP-4337规范)根据 eth_sendUserOperation 返回的哈希值（userOpHash）返回一个 UserOperation 收据

```
platon_getUserOperationReceipt(userOpHash, timeout?): Promise<null | UserOperationReceipt>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|userOpHash|string|userOp的Hash|Y|
|timeout|number|超时时间|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperationReceipt|EIP-4337 规范定义返回信息|



6. **platon_sendUserOperation** (EIP-4337规范)向bundler的User Operation 池提交一个User Operation 对象

```
platon_sendUserOperation(userOp, timeout?): Promise<string>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|userOp|UserOperation|userOp信息|Y|
|timeout|number|超时时间|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|EIP-4337 规范userOpHash|



7. **platon_supportedEntryPoints** (EIP-4337规范)返回bundler支持的entryPoint合约地址数组

```
platon_supportedEntryPoints(timeout?): Promise<string[]>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|timeout|number|超时时间|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string[]|entryPoint合约地址数组|




8. **sendUserOperation** 向bundler的User Operation 池提交一个User Operation 对象 (并追加监听)

```
sendUserOperation(userOp, timeout?, receiptTimeout?, receiptInterval?): EventEmitter
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|userOp|UserOperation|userOp信息|Y|
|timeout|number|请求bundler超时时间|N|
|receiptTimeout|number|监听超时时间|N|
|receiptInterval|number|监听时间间隔|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|EventEmitter|js监听器|



9. **simulateHandleOp** 调用 userOp 的模拟执行

```
simulateHandleOp(op, target?, targetCallData?): Promise<Result>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|op|UserOperation|userOp信息|Y|
|target|string|target如果非零，则为在userOp模拟后要调用的目标地址。如果调用，则targetSuccess和TargetResult设置为调用的返回值|N|
|targetCallData|string|要传递到目标地址的callData|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|Result|执行结果|



10. **simulateValidation** 调用 userOp 的模拟校验

```
simulateValidation(op): Promise<Result>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|op|UserOperation|userOp信息|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|Result|执行结果|



## 七. Paymaster 对外函数

1. **构造函数** 

```
new Paymaster(payMasterAddress, wallet)
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|payMasterAddress|string|paymaster地址|Y|
|wallet|ethers.Wallet|ethers.js 的 wallet 实例(其实就是 paymaster 的owner) |Y|
>
>
返参说明：
>
>
Paymaster



2. **addSupportedToken** 增加支持补偿token类别

```
addSupportedToken(token, priceOracle): Promise<any>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|token|string|token地址|Y|
|priceOracle|string|token的价格预言机地址|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|transaction receipt|交易收据|



3. **removeSupportedToken** 移除支持补偿token类别

```
removeSupportedToken(token): Promise<any>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|token|string|token地址|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|transaction receipt|交易收据|




4. **paymasterSupportedToken** 检出支持补偿token类别

```
paymasterSupportedToken(tokens): Promise<string[]>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|tokens|string[]|token地址|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string[]|token地址|


5. **entryPoint** 获取paymaster所属的 entrypoint 合约地址

```
entryPoint(): Promise<any>
```
>
>
入参说明：
>
>
无
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|address|entrypoint 合约地址|



6. **addStake** 增加质押

```
addStake(extraUnstakeDelaySec, value): Promise<any>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|extraUnstakeDelaySec|number|取消质押延迟秒数|Y|
|value|string|十六进制质押金额，单位为：lat|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|transaction receipt|交易收据|



7. **deposit** 增加垫付金额

```
deposit(value): Promise<any>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|value|string|十六进制质押金额，单位为：lat|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|transaction receipt|交易收据|



8. **unlockStake** 解除质押

```
unlockStake(): Promise<any>
```
>
>
入参说明：
>
>
无
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|transaction receipt|交易收据|



9. **withdrawStake** 提取质押金额

```
withdrawStake(withdrawAddress): Promise<any>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|withdrawAddress|string|用于接收撤销的质押金的账户地址|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|transaction receipt|交易收据|



10. **withdrawTo** 提取垫付金额

```
withdrawTo(withdrawAddress, amount): Promise<any>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|withdrawAddress|string|用于接收提取的垫付金的账户地址|Y|
|amount|string|被提取的垫付金，单位：lat|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|transaction receipt|交易收据|



11. **withdrawToken** 提取被补偿的token

```
withdrawToken(token, to, amount): Promise<any>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|token|string|被提取的补偿金的token地址|Y|
|to|string|用于接收提取的补偿金的账户地址|Y|
|amount|string|被提取的补偿金|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|transaction receipt|交易收据|




12. **getDeposit** 获取剩余垫付金余额

```
getDeposit(): Promise<any>
```
>
>
入参说明：
>
>
无
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|number|垫付金余额|




13. **getExchangePrice** 获取 token 价格信息

```
getExchangePrice(token, fetchTokenDecimals?): Promise<{ decimals: number ; price: BigNumber ; tokenDecimals: undefined | number  }>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|token|string|token地址|Y|
|fetchTokenDecimals|boolean|是否获取token最小精度|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|price|BigNumber|token价格|
|decimals|number|token价格小数位|
|tokenDecimals|number|token的最小精度|



## 八. UserOperation 对外函数

1. **构造函数** 

```
new UserOperation(sender?, nonce?, initCode?, callData?, callGasLimit?, maxFeePerGas?, maxPriorityFeePerGas?, paymasterAndData?, verificationGasLimit?, preVerificationGas?, signature?)
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|s s
|sender|string|进行操作的钱包 (就是钱包合约的地址,但是在第一次部署时是发起者的EOA地址)|N|
|nonce|number|钱包中设置的抗重放参数，也用作首次创建钱包的盐|N|
|initCode|string|本设计的创建钱包均由定义好的 wallet 模板合约部署 (EIP-1167)，故该字段为空值|N|
|callData|string|sender 在主执行调用期间传递给的数据 (具体执行内容 钱包通过用户的请求转成的opcode)|N|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|N|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|N|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|N|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|N|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|N|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|N|
|signature|string|多个Owner的签名，多个Onwer对 userOperation 的签名|N|
>
>
返参说明：
>
>
UserOperation



2. **addSupportedToken** 序列化 UserOperation

```
Serialized(): void
```
>
>
入参说明：
>
>
无
>
>
返参说明：
>
>
无



3. **callDataCost** 计算调用成本

```
callDataCost(): number
```
>
>
入参说明：
>
>
无
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|BigNumber|调用成本|



4. **getStruct** 获取序列化后 UserOperation

```
getStruct(): SerializedUserOperation
```
>
>
入参说明：
>
>
无
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|sender|string|进行操作的钱包 (就是钱包合约的地址,但是在第一次部署时是发起者的EOA地址)|
|nonce|number|钱包中设置的抗重放参数，也用作首次创建钱包的盐|
|initCode|string|本设计的创建钱包均由定义好的 wallet 模板合约部署 (EIP-1167)，故该字段为空值|
|callData|string|sender 在主执行调用期间传递给的数据 (具体执行内容 钱包通过用户的请求转成的opcode)|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|
|signature|string|多个Owner的签名，多个Onwer对 userOperation 的签名|




5. **getUserOpHash** 获取 UserOperation Hash

```
getUserOpHash(entryPointAddress, chainId): string
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|entryPointAddress|string|entrypoint合约地址|Y|
|chainId|number|chainId|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|USerOperation的Hash值|



6. **getUserOpHashFromContract** 获取 UserOperation Hash

```
getUserOpHashFromContract(entryPointAddress, etherProvider, defaultBlock?): Promise<string>
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|entryPointAddress|string|entrypoint合约地址|Y|
|etherProvider|ethers.providers.BaseProvider |ethers.js 的 provider 如：ethers.provider|Y|
|defaultBlock|string|earliest、latest、pending，默认：latest|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|USerOperation的Hash值|




7. **packUserOp** 组装 UserOperation 的 EIP-712 信息

```
packUserOp(forSignature?): string
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|forSignature|boolean|是否为了求 signature 值时的EIP-712信息，true： 不包含 signature 值； false： 包含 signature 值|N|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|USerOperation的EIP-712信息|




8. **signWithSignature** 根据签名及签名模式等填充 UserOperation的 signature 字段的值

```
signWithSignature(signature, signatureMode?, validAfter?, validUntil?): void
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|signature|string|签名消息|Y|
|signatureMode|SignatureMode|签名模式，0：owner； 1： guardians； 2： session|N|
|validAfter|number|签名有效期起始时间|N|
|validUntil|number|签名有效期结束时间|N|
>
>
返参说明：
>
>
无



9. **toJSON** 将 UserOperation 转换成Json格式信息 

```
toJSON(): string
```
>
>
入参说明：
>
>
无
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|json格式的UserOperation信息|



10. **toTuple** 将 UserOperation 转换成 tuple 格式信息 

```
toTuple(): string
```
>
>
入参说明：
>
>
无
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|string|tuple格式的UserOperation信息|


11. **fromJSON** 将 json格式信息转换成 UserOperation

```
fromJSON(json): UserOperation
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|json|string|json格式的UserOperation信息|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|UserOperation信息|



12. **fromObject** 将 object 格式信息转换成 UserOperation

```
fromObject(obj): UserOperation
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|obj|object|object格式的UserOperation信息|Y|
>
>
返参说明：
>
>
|字段名|类型|说明|
|---|---|---|
|-|UserOperation|UserOperation信息|



## 九. Callbase 对外函数

1. **createOp** 创建对钱包(executeFromModule)调用的 UserOperation 

```
createOp(
        walletAddress: string,
        nonce: NumberLike,
        paymasterAndData: string,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
        data: string,
    ) : UserOperation
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|进行操作的钱包 (就是钱包合约的地址,但是在第一次部署时是发起者的EOA地址)|Y|
|nonce|number|钱包中设置的抗重放参数，也用作首次创建钱包的盐|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
|data|string|调用钱包合约 executeFromModule 的入参 (即：钱包其他函数的调用编码)|Y|
>
>
返参说明：
>
>
UserOperation



2. **createOpByBatch** 创建对钱包(executeBatchFromModule)调用的 UserOperation 

```
createOpByBatch(
        walletAddress: string,
        nonce: NumberLike,
        paymasterAndData: string,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
        datas: string[],
    ) : UserOperation
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|进行操作的钱包 (就是钱包合约的地址,但是在第一次部署时是发起者的EOA地址)|Y|
|nonce|number|钱包中设置的抗重放参数，也用作首次创建钱包的盐|Y|
|paymasterAndData|string|paymaster的合约地址及发送给paymaster的数据,现在paymaster的实现还不明确,如果使用我们自己的paymaster则不需要此值,固定为 0x0就行|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
|datas|string[]|调用钱包合约 executeBatchFromModule 的入参 (即：钱包其他函数的调用编码)|Y|
>
>
返参说明：
>
>
UserOperation



## 十. ERC20 对外函数

1. **构造函数** 

```
new ERC20();
```
>
>
入参说明：
>
>
无
>
>
返参说明：
>
>
ERC20



2. **approve** 创建对 ERC20 的 approve 函数调用编码的 UserOperation

```
approve(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
            maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
            verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _spender: string, _value: string) : UserOperation
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包地址|Y|
|nonce|number|钱包 nonce|Y|
|paymasterAddress|string|paymaster地址|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
|`_token`|string|操作的ERC20 token地址|Y|
|`_spender`|string|approve 的`_spender`参数|Y|
|`_value`|string|approve 的`_value`参数|Y|
>
>
返参说明：
>
>
UserOperation



3. **transferFrom** 创建对 ERC20 的 transferFrom 函数调用编码的 UserOperation

```
transferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                 maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                 verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _value: string) : UserOperation
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包地址|Y|
|nonce|number|钱包 nonce|Y|
|paymasterAddress|string|paymaster地址|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
|`_token`|string|操作的ERC20 token地址|Y|
|`_from`|string|transferFrom 的`_from`参数|Y|
|`_to`|string|transferFrom 的`_to`参数|Y|
|`_value`|string|transferFrom 的`_value`参数|Y|
>
>
返参说明：
>
>
UserOperation



4. **transfer** 创建对 ERC20 的 transfer 函数调用编码的 UserOperation

```
transfer(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
             maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
             verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _to: string, _value: string) : UserOperation
```
>
>
入参说明：
>
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包地址|Y|
|nonce|number|钱包 nonce|Y|
|paymasterAddress|string|paymaster地址|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
|`_token`|string|操作的ERC20 token地址|Y|
|`_to`|string|transfer 的`_to`参数|Y|
|`_value`|string|transfer 的`_value`参数|Y|
>
>
返参说明：
>
>
UserOperation



## 十一. ERC721 对外函数

1. **构造函数** 

```
new ERC721();
```
>
>
入参说明：
>
>
无
>
>
返参说明：
>
>
ERC721



2. **approve** 创建对 ERC721 的 approve 函数调用编码的 UserOperation

```
approve(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
            maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
            verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _spender: string, _tokenId: string) : UserOperation
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包地址|Y|
|nonce|number|钱包 nonce|Y|
|paymasterAddress|string|paymaster地址|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
|`_token`|string|操作的ERC20 token地址|Y|
|`_spender`|string|approve 的`_spender`参数|Y|
|`_tokenId`|string|approve 的`_tokenId`参数|Y|
>
>
返参说明：
>
>
UserOperation



3. **transferFrom** 创建对 ERC721 的 transferFrom 函数调用编码的 UserOperation

```
transferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                 maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                 verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _tokenId: string) : UserOperation
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包地址|Y|
|nonce|number|钱包 nonce|Y|
|paymasterAddress|string|paymaster地址|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
|`_token`|string|操作的ERC20 token地址|Y|
|`_from`|string|transferFrom 的`_from`参数|Y|
|`_to`|string|transferFrom 的`_to`参数|Y|
|`_tokenId`|string|transferFrom 的`_tokenId`参数|Y|
>
>
返参说明：
>
>
UserOperation



4. **transfer** 创建对 ERC721 的 transfer 函数调用编码的 UserOperation

```
transfer(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
             maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
             verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _to: string, _tokenId: string) : UserOperation
```
>
>
入参说明：
>
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包地址|Y|
|nonce|number|钱包 nonce|Y|
|paymasterAddress|string|paymaster地址|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
|`_token`|string|操作的ERC20 token地址|Y|
|`_to`|string|transfer 的`_to`参数|Y|
|`_tokenId`|string|transfer 的`_tokenId`参数|Y|
>
>
返参说明：
>
>
UserOperation



5. **safeTransferFrom** 创建对 ERC721 的 safeTransferFrom 函数调用编码的 UserOperation

```
safeTransferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                     maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                     verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _tokenId: string) : UserOperation
```
>
>
入参说明：
>
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包地址|Y|
|nonce|number|钱包 nonce|Y|
|paymasterAddress|string|paymaster地址|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
|`_token`|string|操作的ERC20 token地址|Y|
|`_from`|string|safeTransferFrom 的`_from`参数|Y|
|`_to`|string|safeTransferFrom 的`_to`参数|Y|
|`_tokenId`|string|safeTransferFrom 的`_tokenId`参数|Y|
>
>
返参说明：
>
>
UserOperation



6. **setApprovalForAll** 创建对 ERC721 的 setApprovalForAll 函数调用编码的 UserOperation

```
setApprovalForAll(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                      maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                      verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _operator: string, _approved: boolean) : UserOperation
```
>
>
入参说明：
>
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包地址|Y|
|nonce|number|钱包 nonce|Y|
|paymasterAddress|string|paymaster地址|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
|`_token`|string|操作的ERC20 token地址|Y|
|`_operator`|string|setApprovalForAll 的`_operator`参数|Y|
|`_approved`|boolean|setApprovalForAll 的`_approved`参数|Y|
>
>
返参说明：
>
>
UserOperation




## 十二. ERC1155 对外函数

1. **构造函数** 

```
new ERC1155();
```
>
>
入参说明：
>
>
无
>
>
返参说明：
>
>
ERC1155



2. **safeTransferFrom** 创建对 ERC1155 的 safeTransferFrom 函数调用编码的 UserOperation

```
safeTransferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                     maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                     verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _id: string, _value: string, _data: string)  : UserOperation
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包地址|Y|
|nonce|number|钱包 nonce|Y|
|paymasterAddress|string|paymaster地址|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
|`_token`|string|操作的ERC20 token地址|Y|
|`_from`|string|safeTransferFrom 的`_from`参数|Y|
|`_to`|string|safeTransferFrom 的`_to`参数|Y|
|`_id`|string|safeTransferFrom 的`_id`参数|Y|
|`_value`|string|safeTransferFrom 的`_value`参数|Y|
|`_data`|string|safeTransferFrom 的`_data`参数|Y|
>
>
返参说明：
>
>
UserOperation



3. **safeBatchTransferFrom** 创建对 ERC1155 的 safeBatchTransferFrom 函数调用编码的 UserOperation

```
safeBatchTransferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                          maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                          verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _ids: string, _values: string, _data: string) : UserOperation
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包地址|Y|
|nonce|number|钱包 nonce|Y|
|paymasterAddress|string|paymaster地址|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
|`_token`|string|操作的ERC20 token地址|Y|
|`_from`|string|safeBatchTransferFrom 的`_from`参数|Y|
|`_to`|string|safeBatchTransferFrom 的`_to`参数|Y|
|`_ids`|string|safeBatchTransferFrom 的`_ids`参数|Y|
|`_values`|string|safeBatchTransferFrom 的`_value`参数|Y|
|`_data`|string|safeBatchTransferFrom 的`_data`参数|Y|
>
>
返参说明：
>
>
UserOperation




4. **setApprovalForAll** 创建对 ERC1155 的 setApprovalForAll 函数调用编码的 UserOperation

```
setApprovalForAll(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                      maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                      verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _operator: string, _approved: boolean) : UserOperation
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包地址|Y|
|nonce|number|钱包 nonce|Y|
|paymasterAddress|string|paymaster地址|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|callGasLimit|number|分配主执行调用的gas (本机模拟计算出,执行callData的gas)|Y|
|verificationGasLimit|number|为验证步骤分配的gas (函数validateUserOp()/validatePaymasterUserOp()使用的gas)|Y|
|preVerificationGas|number|为补偿预验证执行和调用数据的 bundler 而支付的gas (额外准备的小部分gas 应对一些常规例如循环等逻辑gas的消耗)|Y|
|`_token`|string|操作的ERC20 token地址|Y|
|`_operator`|string|setApprovalForAll 的`_operator`参数|Y|
|`_approved`|string|setApprovalForAll 的`_approved`参数|Y|
>
>
返参说明：
>
>
UserOperation




## 十三. LAT 对外函数

1. **构造函数** 

```
new LAT();
```
>
>
入参说明：
>
>
无
>
>
返参说明：
>
>
LAT



2. **transfer** 创建对 LAT 的转账调用编码的 UserOperation

```
transfer(walletAddress: string,
        nonce: NumberLike, paymasterAddress: string,
        maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, to: string, value: string) : UserOperation
```
>
>
入参说明：
>
>
|字段名|类型|说明|是否必须|
|---|---|---|---|
|walletAddress|string|钱包地址|Y|
|nonce|number|钱包 nonce|Y|
|paymasterAddress|string|paymaster地址|Y|
|maxFeePerGas|number|每种gas的最高费用，也就是 gas价格（类似于EIP-1559 max_fee_per_gas）|Y|
|maxPriorityFeePerGas|number|每种gas的最高优先权费用，也就是 EIP1559中分配给矿工的费用 (类似于 EIP-1559 max_priority_fee_per_gas)|Y|
|to|string|lat接收人账户地址|Y|
|value|string|转账的lat数额|Y|
>
>
返参说明：
>
>
UserOperation
