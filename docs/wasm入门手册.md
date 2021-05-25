---
id: Wasm_Dev_Manual
title: Getting started
sidebar_label: Getting started
---



### Introduction

This tutorial is mainly to guide users to create a simple HelloWorld smart contract using wasm language on PlatON, compile, deploy, and call this contract through platon-truffle.If you want to use a richer API.

### Platon-truffle Introduction

Platon-truffle is a tool provided by PlatON that can compile, deploy, and invoke smart contracts locally. For specific installation and usage manuals, refer to:

- Platon-truffle develop tools[specific installation](https://platon-truffle.readthedocs.io/en/v1.0.0/getting-started/installation.html)
- Platon-truffle develop tools[usage manuals](https://platon-truffle.readthedocs.io/en/v1.0.0/)


### Create HelloWorld Contract

```cpp
#include <platon/platon.hpp>
#include <string>
using namespace platon;

class message {
   public:
      std::string head;
      PLATON_SERIALIZE(message, (head))
};

class my_message : public message {
   public:
      std::string body;
      std::string end;
      PLATON_SERIALIZE_DERIVED(my_message, message, (body)(end))
};

CONTRACT HelloWorld : public platon::Contract{
   public:
      ACTION void init(const my_message &one_message){
        info.self().push_back(one_message);
      }

      ACTION void add_message(const my_message &one_message){
          info.self().push_back(one_message);
      }

      CONST uint8_t get_message_size(){
          return info.self().size();
      }

      CONST std::string get_message_body(const uint8_t index){
          return info.self()[index].body;
      }

   private:
      platon::StorageType<"myvector"_n, std::vector<my_message>> info;
};

PLATON_DISPATCH(HelloWorld, (init)(add_message)(get_message_size)(get_message_body))

```

Contract Files Description:
- Each contract file has only one contract class. The contract class is decorated with Contract. It must be publicly inherited from platon :: Contract and must have an init function.

- ACTION and CONST qualified member functions represent callable functions, and such member functions cannot be overloaded. The ACTION function will modify the data on the chain. The CONST function just queries the attributes and does not modify the data on the chain.

- The type in the callable function parameter list is a custom type. In this type definition, you need to add the PLATON_SERIALIZE macro to declare the serialization function. This type inherits from other types. You need to add the PLATON_SERIALIZE_DERIVED macro to declare the serialization function.

- Callable functions can only be called externally if the unified entry function is defined in the PLATON_DISPATCH macro.

- At present, platon will persistently store member variables of the contract class. The member variables must be of type platon :: StorageType. The first parameter string of the platon :: StorageType template is followed by _n, and the string must be .12345abcdefghijklmnopqrstuvwxyz. 32 characters Characters. The second parameter is the concrete type of the actual storage. Member function modification member variables need to obtain an instance of a specific type through the self () function, and then execute the corresponding instance function.

- The second parameter type of the platon :: StorageType template is a custom type. A PLATON_SERIALIZE macro must be added to this type definition to declare a serialization function. This type inherits from other types. A PLATON_SERIALIZE_DERIVED macro must be added to declare a serialization function.




### Compile HelloWorld Contract

**Step1.** Creat new directory for HelloWorld project

```
mkdir HelloWorld && cd HelloWorld
```
- The following commands are performed in the HelloWorld directory without special instructions

**Step2.**  Init project

```
platon-truffle init
```
After the command is executed, project directory structure is as follows:

- `contracts/` wasm contract directory

- `migrations/` depoly file directory

- `test/` test script directory

- `truffle-config.js` platon-truffle config

**Step3.** Move HelloWorld contract compiled in to HelloWorld/contracts/

```
ls contracts/
```
- HelloWorld.cpp

**Step4.** Modify the platon-truffle configuration file truffle-config.js and add the compiled wasm contract version number

```
vim truffle-config.js
```

Truffle-config.js content is  as follows:
```
compilers: {
     wasm: {
           version: "1.0.0"
     }
}
```

**Step5.**  Compile contract

```
platon-truffle compile
```
After the command is executed, project directory structure is as follows:

- `build/` wasm contract directory after compiled
- `build/contracts/HelloWorld.abi.json`  HelloWorld contract compiled abi interface file
- `build/contracts/HelloWorld.wasm`  HelloWorld contract compiled binary

### Deploly HelloWorld Contract

**Step1.** Setting config  information for blockchain in truffle-config.js

```
vim truffle-config.js
```
Set blockchain network  info
```
networks: {
	development: {
       host: "10.1.1.6",     // blockchain server address
       port: 8806,            // server port
       network_id: "*",       // Any network (default: none)
       from: "lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc",
       gas: 999999,
       gasPrice: 1000000000,
	},
}
```

**step2.**  Unlock wallet account

Enter the platon-truffle console

```
platon-truffle console
```

Import the private key (you can skip this step if you have already imported it)
```
web3.platon.personal.importRawKey("Your wallet private key","Your wallet password");
```
Successful import will see the address corresponding to the private key as follows：
```
'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc'
```

Unlock wallet account
```
 web3.platon.personal.unlockAccount('Your wallet address','Your wallet password',999999);
```
After unlocking successfully, you will see the following information：
```
ture
```

**Step3.** Deploy contract

```
platon-truffle deploy --wasm --contract-name HelloWorld --params '[[["1"], "2", "3"]]'
```
- `HelloWorld` deployed contract
- `params` parameters of contract init function

If deploying successfully，you will see log info as follows:
```
receipt:  { blockHash:
   '0x266733b693ba650315a59c34e72804c06ca3e27fab145625797bd42259b572c5',
  blockNumber: 70441,
  contractAddress: 'lat1nk4errnjlulaz5y57xt4djkx3h4jjl7yy9dzqn',
  cumulativeGasUsed: 291314,
  from: 'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc',
  gasUsed: 291314,
  logs: [],
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: null,
  transactionHash:
   '0x60946ebf0ccddc76a0234353435de73e7901888227fb2f03922fb0ce265a4e9d',
  transactionIndex: 0 }
  contract HelloWorld deployed successfully
======================

   > transactionHash:     0x60946ebf0ccddc76a0234353435de73e7901888227fb2f03922fb0ce265a4e9d
   > contract address:    lat1nk4errnjlulaz5y57xt4djkx3h4jjl7yy9dzqn
   > block number:        70441
   > block timestamp:     1583247148341
   > account:             lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc
   > balance:             3533694129556768659166595001485837031654967793751237866225582808584074296
   > gas limit:           100000000
   > gas used:            291314
   > gas price:           0.000000050000000004 LAT
   > total cost:          0.014565700001165256 LAT
```

### Call HelloWorld Contract

**Step1.**  Enter the platon-truffle console

```
platon-truffle console
```
- You can execute command in platon-truffle console

**Step2.**  Create contract object

```json
var abi = [{"baseclass":[],"fields":[{"name":"head","type":"string"}],"name":"message","type":"struct"},{"baseclass":["message"],"fields":[{"name":"body","type":"string"},{"name":"end","type":"string"}],"name":"my_message","type":"struct"},{"constant":false,"input":[{"name":"one_message","type":"my_message"}],"name":"init","output":"void","type":"Action"},{"constant":false,"input":[{"name":"one_message","type":"my_message"}],"name":"add_message","output":"void","type":"Action"},{"constant":true,"input":[],"name":"get_message_size","output":"uint8","type":"Action"},{"constant":true,"input":[{"name":"index","type":"uint8"}],"name":"get_message_body","output":"string","type":"Action"}];
var contractAddr = 'lat1nk4errnjlulaz5y57xt4djkx3h4jjl7yy9dzqn';

var helloworld = new web3.platon.Contract(abi,contractAddr,{vmType: 1 }); 
```

Description：
- `abi`  the interface provided by the contract to external calls，the abi  in the file compiled ：`HelloWorld/build/contracts/HelloWorld.json`
- `contractAddr` contract address
- `helloWorld` contract object created

**Step3.**  Call contract

```javascript
helloworld.methods.add_message('[[["5"], "6", "7"]]').send({
	from: 'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc',gas: 999999
}).on('receipt', function(receipt) {
	console.log(receipt);
}).on('error', console.error);
```

Description：
- `helloWorld` the contract object created
- `methods` specify the call method
- `add_message`  method in the HelloWorld contract with a custom my_message input
- `from` caller's wallet address
- `on` listen to the result of the contract method executed. If failed, it will print the error info. If succeeded, the console will print the receipt as belows:

```
{ blockHash:
   '0x669c7b8cb938cc30845e08dc4ceda08f2e17207c267ade97dc5458b445405736',
  blockNumber: 74665,
  contractAddress: null,
  cumulativeGasUsed: 108549,
  from: 'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc',
  gasUsed: 108549,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'lat1nk4errnjlulaz5y57xt4djkx3h4jjl7yy9dzqn',
  transactionHash:
   '0x2b5e590df7e70ad428b1ccb06bda5dcce47f84c4d981c2fb475aca9ec9d0000a',
  transactionIndex: 0,
  events: {} }
{ blockHash:
   '0x669c7b8cb938cc30845e08dc4ceda08f2e17207c267ade97dc5458b445405736',
  blockNumber: 74665,
  contractAddress: null,
  cumulativeGasUsed: 108549,
  from: 'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc',
  gasUsed: 108549,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'lat1nk4errnjlulaz5y57xt4djkx3h4jjl7yy9dzqn',
  transactionHash:
   '0x2b5e590df7e70ad428b1ccb06bda5dcce47f84c4d981c2fb475aca9ec9d0000a',
  transactionIndex: 0,
  events: {} }
```

**Step4.**  Query contract

```javascript
helloworld.methods.get_message_body(0).call()
```
Description：

- `helloWorld` the contract object created
- `methods` specify the call method
- `get_message_body` method in the HelloWorld contract, which has an input parameter of type int
- `call` specify the query method

---

## FAQ

### About Compile

1. How to use `platon-cpp` for compile multiple `cpp` files?

    ```shell
    platon-cpp ./test.cpp ./test1.cpp
    ```

   Only allowing exists one contract class.

2. How to specified output directory and filename when use `platon-cpp`
   to compile contract?

   Use `-o` flag, and must be specified output directory and filename at the
   same time.

   ```shell
   platon-cpp ./test.cpp -o ./out/test.wasm
   ```

3. What data types does ABI support?

   Generate ABI supported types and conversion rules as follows:

| Type                  | ABI                |
| --------------------- | ------------------ |
| bool                  | bool               |
| uint8_t               | uint8              |
| uint16_t              | uint16             |
| uint32_t              | uint32             |
| uint64_t              | uint64             |
| int8_t                | int8               |
| int16_t               | int16              |
| int32_t               | int32              |
| int64_t               | int64              |
| bytes                 | uint8\[\]          |
| std::string           | string             |
| std::vector&lt;T&gt;  | T\[\]              |
| std::array\[T, N\]    | T\[N\]             |
| std::pair&lt;T, U&gt; | pair&lt;T, U&gt;   |
| std::set&lt;T&gt;     | set&lt;T&gt;       |
| std::map&lt;T, V&gt;  | map&lt;T, V&gt;    |
| std::list&lt;T&gt;    | list&lt;T&gt;      |
| FixedHash&lt;N&gt;    | FixedHash&lt;N&gt; |
| u128                  | uint128            |
| bigint                | uint128            |

### About Contract

1. How to output contract debug logs in the `platon` process?

    - Add `#undef NDEBUG` at the first line of contract codes, and must before
      header file included.

      ```cpp
      #undef NDEBUG
      
      #include <platon/platon.hpp>
      
      //...
      ```

    - `platon` startup command specifies log level 4 and enable debug flag.

        ```cpp
        ./platon --debug --verbosity 4 ...
        ```

2. How to write a contract can effectively reduce Gas consumption?

    - Use reference arguments
      ```cpp
      void test(const std::string& str) {}
      ```

    - Return rvalue reference

    ```cpp
    std::vector<std::string>&& test() {
        std::vector<std::string> v;
        // ...
        return std::move(v);
    }
    ```

    - Try not to apply for large blocks of memory

3. What should I pay attention to when using `StorageType`?

    - Should be initialized in `init()`
      ```cpp
       CONTRAT Hello : public Contract {
       public:
         ACTION void init() {
             s_.self() = "test";
         }
       private:
         StorageType<"test"_n, std::string> s_;
       };
      ```
    ```
      
    - It is recommended to use a specialized type of `StorageType` directly
      
      + Uint8
      + Int8
      + Uint16
      + Int16
      + Uint
      + Int
      + Uint64
      + Int64
      + String
      + Vector
      + Set
      + Map
      + Array
      + Tuple
    ```

4. What is the difference between `StorageType` and `platon::db::Map`,
   `platon::db::Array`?

   From the underlying storage level, the implementation of `StorageType` is
   serialized as a whole, and then stored in the database. `platon::db::Map`
   and `platon::db::Array` serialize each element of the container as K/V is
   stored to the database. For large-scale data, `platon::db::Map` and
   `platon::db::Array` perform better.

   When implementing a contract, a suitable storage structure should be
   selected based on the size of the data.

5. RLP serialization/deserialization What C++ standard library types are
   supported?

   The following C ++ standard library types are supported:

    - std::string
    - std::vector
    - std::map
    - std::list
    - std::array
    - std::set
    - std::pair
    - std::tuple

6. How do custom types support RLP serialization/deserialization?

    - Macro `PLATON_SERIALIZE` for common types
    ```cpp
       struct Base {
       int a;
       std::string b;
    
       PLATON_SERIALIZE(Base, (a)(b));
       };
    ```
    - The derived class uses the macro `PLATON_SERIALIZE_DERIVED`, and the base class also uses the macro `PLATON_SERIALIZE`

    ```cpp
    struct Derived : public Base {
      int c;
      int d;
    
      PLATON_SERIALIZE_DERIVED(Derived, Base, (c)(d));
    };
    ```