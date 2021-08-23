---
id: Wasm_Operation_Principle
title: WebAssembly(Wasm)
sidebar_label: WebAssembly(Wasm)
---

## Preface

WASM (WebAssembly) is not a language, but a new bytecode format, a brand-new underlying binary grammar, and instruction code compiled by the compiler. Small in size, portable, fast in loading, and compatible with the latest format of the Web, WASM is a new technology to run portable programs safely and effectively. This article analyzes the introduction, advantages, operation mechanism and use of the PlatON WASM contract in detail.

## Introduction of WASM

WASM was mainly applied on the Web in the early days. As it continues to develop, it is used as the final format of smart contracts by increasing projects, and runs with the corresponding VM loaded, such as wavm and wagon. Bytecodes are parsed and operate in the core virtual machine module. 

The virtual machine (VM) refers to a complete computer system that is simulated by software, has functions of a complete hardware system and runs in an isolated environment, such as the Vmware virtual machine for operating system virtualization and the JVM virtual machine for the software operating environment. The virtual machine in the blockchain is a code operating environment built on the blockchain, mainly to process the smart contracts of the blockchain.

**Why does PlatON introduce the WASM virtual machine as a supplement to the EVM?** 

As the demand for virtual machines and smart contracts in blockchain applications grows, the blockchain virtual machine technology is being improved as time goes by. At present, WASM-based virtual machines have been significantly improved in terms of speed and performance, and support multiple high-level development languages such as C, C++, Rust, and Golang, lowering the development threshold. 

To facilitate the development of blockchain applications, PlatON has launched a dual virtual machine engine that supports the WASM virtual machine and the EVM at the same time. Blockchain applications that originally run on public chains that support EVM, such as Ethereum, can migrate easily and seamlessly if they need to use PlatON due to performance and other reasons. 

EVM is essentially a script program, a stack-based virtual machine, which needs to be executed after being translated into instructions by a compiler, which is quite inefficient. At the same time, EVM also has some problems in its architecture and use, such as: 

- *Strong coupling and difficult scalability*: The chain and the EVM are internally dependent upon each other;
- *Lack of a standard library*: There is basically no standard library in solidity, and you must independently code corresponding functions, such as string comparison.

Compared with EVM, WASM, as a kind of intermediate code, runs smart contracts faster, and can be developed in any familiar programming language (C/C++/Rust/Golang). It also has many other features:

- *Efficient performance*: Binary coding adopted has superior performance during program execution;
- *Support by multiple languages*: You can use C/C++/Rust/Golang and other languages to write the contract and then compile the contract into bytecode;
- *Abundant standard libraries*: There are abundant standard libraries available for use in different languages.

At the same time, WASM has been applied by a growing number of projects, including Ethereum that has introduced the EVM. The popularity of WASM has driven its community ecosystem to improve.

In order to adapt the existing WASM applications and developers familiar with WASM to the PlatON ecosystem, PlatON decided after comprehensive consideration to adopt dual virtual machines, that is, to introduce the WASM virtual machine as a supplement to the EVM.

## Advantages of PlatON to Introduce WASM

PlatON factored in some of the disadvantages of the EVM upon its decision to introduce the virtual machine. Right after the EVM was introduced, PlatON began the design and development of the WASM virtual machine, and kept making innovations and improvements in terms of scalability, stability, and operating efficiency. The main functions include:

- With a complete set of contract development kit [PlatON-CDT](https://github.com/PlatONnetwork/PlatON-CDT);
- Smaller contract bytecode. WASM binary code compiled by CDT suite is half smaller compared with other projects;
- With a smart contract framework [PlatON-Truffle](https://github.com/PlatONnetwork/platon-truffle) for rapid development;
- With support for string, address, hash, u128 and other data types;
- The gas mechanism introduced. Every time a contract instruction is executed, the corresponding gas will be deducted to ensure that the execution of the contract instruction can be terminated after a limited number of operations, thereby effectively preventing code from attacks of the infinite loop;
- Contract nested call introduced, which can immediately obtain the result of another contract call, making calls between contracts as convenient as function calls;
- With support for the automatic expansion of linear memory and caching WASM module to optimize the loading performance of the contract, thereby greatly improving the operating performance of the virtual machine.

Based on the application and optimization of WASM, PlatON's smart contract module boasts higher compatibility and performance, as well as better security and flexibility. After successfully integrating WASM and applying dual virtual machines, PlatON tested the performance of the EVM and WASM for comparison under the same environment.

The test results show that the execution efficiency of the WASM virtual machine is much higher than that of the EVM. EVM uses 256-bit machine code that greatly affects the performance of the execution and at the same time increases the memory usage.

PlatON has the following advantages after introducing the WASM virtual machine as part of the dual virtual machines:

- Mainstream WASM smart contracts can be easily and quickly migrated to the PlatON network;

- The threshold for contract developers is lowered, with little learning cost;

- Developers who use other WASM-based networks can be well-adapted to the WASM virtual machine and get started quickly;

- The execution of smart contracts is more efficient;

- Abundant development libraries can improve the efficiency of smart contract development.

  

## The Operating Mechanism of WASM

The WASM virtual machine is a completely independent sandbox. Fully isolated from the outside, the contract code runs inside the virtual machine, and cannot access the network, file system or other processes. At the same time, to prevent the virtual machine from executing too many computation instructions and falling into an infinite loop, both the gas mechanism and the timeout mechanism are introduced as dual controls.

**The working principle of dual virtual machines:**

<img src="/docs/img/en/Wasm.assets/wasm-dual.png"/>

As shown in the figure: Smart contracts written in languages such as solidity/c/c++ are compiled into bytecode by a compiler. At the same time, different types of contracts come with different bytecode features. By recognizing the features, the engine of the dual virtual machines of PlatON can select a specific virtual machine to load the bytecode, parse it, and then execute the corresponding function according to the instruction.

**Usage process of the smart contract:**

<img src="/docs/img/en/Wasm.assets/wasm-contract.webp"/>

As shown in the figure, you can use C++ to write a smart contract based on WASM, or solidity to write a smart contract that belongs to the EVM, then compile and generate bytecode and other information through the toolset, and then send it to a node on the PlatON network by the transaction through the SDK development toolset. That is a complete process of a contract-related transaction.

PlatON provides a complete WASM contract development kit named PlatON-CDT. Using this kit, you can quickly write smart contracts for the WASM virtual machine. The kit encapsulates various types of data, and is equipped with a simple API interface and detailed interface documentation. At the same time, you can also use the smart contract testing framework PlatON-Truffle for development, compilation, deployment, contract interface testing and other functions, which is convenient for developers to develop and test contracts.

PlatON provides an automated [Contract SDK](https://github.com/PlatONnetwork/client-sdk-java) generation tool, which can automatically generate the code for the back-end system to call the contract interface and can shield the parameter encoding and decoding details when calling the contract. In this way, it helps developers quickly integrate contract business into the system, so that they can be more focused on developing the business logic of smart contracts.


  ## Summary  

This article mainly discusses the background and original intention of PlatON to support the WASM virtual machine and introduces the unique advantages brought by the introduction of WASM. It also briefly explains the basic principles and operating mechanisms of the WASM virtual machine. With this article, the author hopes to provide some useful experience for community users, developers, and blockchain professionals participating in PlatON. From a bust to a boom, WASM will be applied in increasing projects as the underlying level of distributed application development in the future.
