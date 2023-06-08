---
id: eip55-bech32-compatible
title: EIP55 and Bech32 address format compatibility scheme
sidebar_label: EIP55 and Bech32 address
---

## JSON RPC interface

The [jsonrpc interface](https://devdocs.platon.network/docs/en/Json_Rpc) of PlatON node supports EIP55 (0xxxxx...) address and Bech32 (latxxxxx...) Two kinds of address formats, but the parameters and return values when calling a specific interface can only be selected a certain address format, can not be mixed, the use of different address formats are as follows.

- EIP55 address

  PlatON is fully compatible with the jsonrpc interface of Ethernet. To use the address in EIP55 format, just follow the way of calling Ethernet jsonrpc. Note the following points.

  1. cannot use the interface prefixed with `platon_`, must be modified to prefix `eth_`

  2. for interfaces with prefixes other than `platon_` and `eth_`, PlatON adds an optional field `bech32`, which marks whether the Bech32 address needs to be used, with the default value of EIP55, note that if you want to use the EIP55 format, you cannot take the bech32 field

     ```
     curl -X POST --data '{"jsonrpc":"2.0", "method": "txpool_contents", "params": [], "id": 1}'
     ```

     The return value is

     ```
     {"jsonrpc":"2.0","id":1,"result":["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]}
     ```

  3. The address fields in both the input and return values are in EIP55 format

- Bech32 address

  To use Bech32 addresses, note the following.

  1. you cannot use an interface prefixed with `eth_`, you must modify it to be prefixed with `platon_`

  2. for interfaces with prefixes other than `platon_` and `eth_`, PlatON adds an optional field `bech32` which marks whether or not a Bech32 address needs to be used, the default value is EIP55, note that if you want to use the Bench32 format, you must bring the `bech32` field and set it to `true`

     ```
     curl -X POST --data '{"jsonrpc":"2.0","bech32":true, "method": "txpool_contents", "params": [], "id": 1}'
     ```

     The return value is

     ```
     {"jsonrpc":"2.0","id":1,"result":["lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqp7pn3ep"]}
     ```

  3. the address fields in both the input and return values are in Bench32 format

## SDK

PlatON can be called using the Ethernet SDK and the [PlatON SDK](https://devdocs.platon.network/docs/en/Java_SDK), noting the following points.

1. you can only use the EIP55 address with the Ethernet SDK, not the Bech32 address
2. Using PlatON SDK can only use Bech32 address at the moment, not EIP55 address

## How DAPP is compatible with EIP55 and Bech32

DAPP can achieve business support for both EIP55 and Bech32 addresses through address translation as follows.

- Use jsonrpc interface

  If the DAPP calls the jsonrpc interface directly, it can choose any of the following methods.

  1. convert the Bech32 address to EIP55 address and call the EIP55 address according to the call method introduced earlier
  2. convert the EIP55 address to Bech32 address, and call the Bech32 address according to the call method described above

- Using SDK

  If the DAPP uses the SDK to call PlatON, it can choose any of the following methods.

  1. Convert the Bech32 address to an EIP55 address and call it using the Ethernet SDK
  2. Convert EIP55 address to Bech32 address and call with PlatON SDK

## Address conversion method

The interconversion between Bech32 addresses and EIP55 addresses is provided in PlatON's SDK, which supports three development languages.

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