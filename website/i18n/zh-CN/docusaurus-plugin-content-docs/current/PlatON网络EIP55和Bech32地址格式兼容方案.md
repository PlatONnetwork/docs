---
id: eip55-bech32-compatible
title: EIP55和Bech32地址格式兼容方案
sidebar_label: EIP55和Bech32地址格式兼容方案
---

## JSON RPC接口

PlatON节点的[jsonrpc接口](https://devdocs.platon.network/docs/en/Json_Rpc)支持EIP55（0xxxxx...）地址和Bech32（latxxxxx...）两种地址格式，但是调用具体接口时的参数和返回值只能是选用某一种地址格式，不能混用，不同地址格式的使用方法如下。

- EIP55地址

  PlatON完全兼容以太坊的jsonrpc接口，要使用EIP55格式的地址，按照以太坊jsonrpc的方式调用即可。注意以下几点：

  1. 不能使用前缀为`platon_`的接口，必须修改为前缀`eth_`

  2. 前缀非为`platon_`和`eth_`的接口，PlatON增加了一个可选的字段`bech32`，该字段标记是否需要使用Bech32地址，默认值为EIP55，注意如果要使用EIP55格式，不能带 bech32 字段

     ```
     curl -X POST --data '{"jsonrpc":"2.0", "method": "txpool_contents", "params": [], "id": 1}'
     ```

     返回值为

     ```
     {"jsonrpc":"2.0","id":1,"result":["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]}
     ```

  3. 入参和返回值中的地址字段都是EIP55格式

- Bech32地址

  要使用Bech32地址，注意以下几点：

  1. 不能使用前缀为`eth_`的接口，必须修改为前缀`platon_`

  2. 前缀非为`platon_`和`eth_`的接口，PlatON增加了一个可选的字段`bech32`，该字段标记是否需要使用Bech32地址，默认值为EIP55，注意如果要使用Bench32格式，必须带`bech32`字段，并将其设置为`true`

     ```
     curl -X POST --data '{"jsonrpc":"2.0","bech32":true, "method": "txpool_contents", "params": [], "id": 1}'
     ```

     返回值为

     ```
     {"jsonrpc":"2.0","id":1,"result":["lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqp7pn3ep"]}
     ```

  3. 入参和返回值中的地址字段都是Bench32格式

## SDK

可以使用以太坊SDK和[PlatON SDK](https://devdocs.platon.network/docs/en/Java_SDK)调用PlatON，注意以下几点：

1. 使用以太坊SDK只能使用EIP55地址，不能使用Bech32地址
2. 使用PlatON SDK目前只能使用Bech32地址，不能使用EIP55地址

## DAPP如何兼容EIP55和Bech32

DAPP可以通过地址转换来实现业务上同时支持EIP55和Beh32两类地址，具体方法如下：

- 使用jsonrpc接口

  如果DAPP直接调用jsonrpc接口，可以选择以下任意一种方法：

  1. 将Bech32地址转换为EIP55地址，并按照前面介绍的EIP55地址的调用方法调用
  2. 将EIP55地址转换为Bech32地址，并按照前面介绍的Bech32地址的调用方法调用

- 使用SDK

  如果DAPP使用SDK调用PlatON，可以选择以下任意一种方法：

  1. 将Bech32地址转换为EIP55地址，并使用以太坊SDK调用
  2. 将EIP55地址转换为Bech32地址，并使用PlatON SDK调用

## 地址转换方法

PlatON的SDK中提供Bech32地址和EIP55地址之间的相互转换，支持三种开发语言。

- [python](https://devdocs.platon.network/docs/en/Python_SDK)

``` python
from platon_utils import to_bech32_address, to_checksum_address
to_bech32_address('0x0000000000000000000000000000000000000001', 'lat')
to_checksum_address('lat1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpfr7f80')
```

- [java](https://devdocs.platon.network/docs/en/Java_SDK)

``` java
Bech32.addressEncode("lat","0x676c0d9b7da640a25dabd5788612f5faa16cc6b9"));
Bech32.addressDecodeHex("lat1vakqmxma5eq2yhdt64ugvyh4l2ske34eay86pg"));
```

- [javascript](https://devdocs.platon.network/docs/en/JS_SDK/#web3utilstobech32address)

``` js
web3.utils.decodeBech32Address('lat', 'lat1zg69v7yszg69v7yszg69v7yszg69v7y30mluqx');
web3.utils.toBech32Address('lat', '0x1234567890123456789012345678901234567891');
```







