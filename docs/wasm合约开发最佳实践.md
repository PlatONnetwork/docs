---
id: Wasm_Contract_Best_Practice
title: Best practices
sidebar_label: Best practices
---



### Introduction

This guide introduces users to some key points that need to be paid attention to
in the development of smart contracts, mainly in the practice of actual
development. Users can use this guide to quickly understand how to set a
reasonable fee for a transaction, how to avoid losing the fee due to transaction
failure, and how to encode a more standardized smart contract.

### Reasonable Cost Setting

When you need to deploy a contract on the main network of PlatON, you need to set a reasonable fee limit. The fee limit refers to the upper limit of the energy consumption cost of smart contract deployment/execution in PlatON. This restriction is mainly accomplished through Gas. Gas is the fuel value of the PlatON network world, which determines the normal operation of the PlatON network ecosystem. Gas is usually used to measure how much “work” is required to perform certain actions, and these workloads are the amount of fees that need to be paid to the PlatON network in order to perform the action. In a simple understanding, Gas is the commission for network miners, and is paid by LAT. Any transaction, contract execution, and data storage on the network need to use Gas.

PlatON is similar to Ethereum’s blockchain system. It uses `LAT` for payment and
maintenance networks. One `LAT` is divided into: `mLAT/uLAT/gVON/mVON/kVON/VON`, and `VON` is the smallest unit.

Gas consists of two parts: GasLimit and GasPrice. GasLimit is the maximum Gas consumption (minimum 21,000) that a user is willing to pay to perform an operation or confirm a transaction. GasPrice is the unit price of each Gas.

When a user sends a transaction, GasLimit and GasPrice are set. GasLimit * GasPrice is the user’s transaction cost, and the cost is rewarded to the miner as a commission.

The higher the GasPrice of the transaction, the higher the execution priority of the transaction and the greater the transaction cost. After each transaction is completed, the remaining unused Gas will be returned to the sender’s address account. It is important to note that if the execution of the transaction fails because the GasLimit is set too low, the Gas will not be returned to the user’s address at this time, and the user still needs to pay the energy cost for the failed transaction. Therefore, regardless of whether the transaction is executed successfully, the transaction sender needs to pay a certain calculation fee to the miner.

**LAT Unit Conversion**

| Unit     | VON Value | VON                                   |
| -------- | --------- | ------------------------------------- |
| VON      | 1         | 1                                     |
| kVON     | 1e3 VON   | 1,000                                 |
| mVON     | 1e6 VON   | 1,000,000                             |
| gVON     | 1e9 VON   | 1,000,000,000                         |
| microLAT | 1e12 VON  | 1,000,000,000,000                     |
| milliLAT | 1e15 VON  | 1,000,000,000,000,000                 |
| LAT      | 1e18 VON  | 1,000,000,000,000,000,000             |
| kLAT     | 1e21 VON  | 1,000,000,000,000,000,000,000         |
| mLAT     | 1e24 VON  | 1,000,000,000,000,000,000,000,000     |
| gLAT     | 1e27 VON  | 1,000,000,000,000,000,000,000,000,000 |

### Avoid Timeouts

Sending transactions on the PlatON network does not have the concept of timeout, but it will eventually stop according to the set gas limit value. If the limit value is lower than the consumption required for contract deployment, the transaction execution fails and the corresponding processing fee will be deducted. The fee setting cannot be infinite, because in the network, the block itself has a maximum GasLimit value. When the GasLimit of the transaction exceeds this value, the transaction will not be accepted.

If the call function of a published contract is called (a call is a stateless operation in the contract logic), there is a 5s timeout limit. If the contract logic is not executed within 5s, a timeout will occur and the virtual machine will forcely exit , causing the query to fail.

To avoid contract-related transaction failures, try breaking large contracts into smaller pieces and referencing each other as needed. To avoid infinite loops, be aware of common pitfalls and recursive calls.

### Punishment For Illegal Operations

If the smart contract is not compiled by a standard valid compiler, or the instruction code is changed at will, the opcode will be invalid. This type of contract not only fails to be deployed and executed successfully, but also generates a full amount (GasLimit * GasPrice) penalty. The transaction fee for the current transaction will be deducted. This is a very strong penalty. If the operator does not pay attention to this point and keep retrying, then the cost will be higher and the cost will be heavier.

In general, invalid opcodes have the following conditions:

- Manually changed the instruction code for the normally compiled contract
- The contract compiler version is not consistent with the contract version
  supported by the network lock
- Use float type to do operation

When operating a contract in the PlatON network. First, you must confirm the smart contract version supported by the current network, and then select the compiler of the corresponding version pair.

The normal operation is to use the latest Truffle/PlatON-CDT officially provided by PlatON to compile/deploy/execute the contract. At the same time, before switching to the main network, it must be validated on the test network.

### C/C++ Language Limit

**C/C++ features not supported**

- float type(float/double)
- typeid/dynamic_cast(-fno-rtti)
- try-catch(-fno-exception)
- features after C++17

**libc not supported header files**

- signal.h
- math.h
- locale.h
- errno.h
- uchar.h
- time.h

**libc++ not suppported header files**

- rand
- atomics
- thread
- random

### Coding Standards
#### Naming rules

- The style of a name immediately informs us what sort of thing the named entity
  is: a type, a variable, a function, a constant, a macro, etc.

- Use terminology within the blockchain industry.

- Use as few abbreviations as possible. If you must use them, it is recommended
  to use public abbreviations and custom abbreviations.

- Filenames should be all lowercase and can include underscores (_) or dashes
  (-).

- For smart contracts, the file name is consistent with the contract name.

- Type names start with a capital letter and have a capital letter for each new
  word, with no underscores: `MyExcitingClass`, `MyExcitingEnum`.

- The names of variables (including function parameters) and data members are
  all lowercase, with underscores between words. Data members of classes (but
  not structs) additionally have trailing underscores. For instance:
  `a_local_variable`, `a_struct_data_member`, `a_class_data_member_`.

- Variables declared constexpr or const, and whose value is fixed for the
  duration of the program, are named with a leading "k" followed by mixed case.
  Underscores can be used as separators in the rare cases where capitalization
  cannot be used for separation. For example:
  ```cpp
  const int kDaysInAWeek = 7;
  ```

- Regular functions have mixed case; accessors and mutators may be named like
  variables: `MyExcitingFunction()`, `MyExcitingMethod()`,
  `my_exciting_member_variable()`, `set_my_exciting_member_variable()`

- Enumerators (for both scoped and unscoped enums) should be named either like
  constants or like macros: either `kEnumName` or `ENUM_NAME`.

- If you are naming something that is analogous to an existing C or C++ entity
  then you can follow the existing naming convention scheme.

#### Document Format For Smart Contracts

File Layout Rules:

- Generally more than 1000 lines of program code is difficult to read, try to
  avoid the situation that the number of lines of code in a file is too long.
  Each contract document should contain only a single contract class or contract
  interface.

Order Of Files:

- Notes on files: All contract source files have a note at the beginning, which
  lists the copyright statement, file name, function description, and creation
  and modification records of the file.
- Remarks for class or interface: Comments should be made before class and
  interface definitions, including descriptions of classes and interfaces,
  latest modifiers, version numbers, reference links, etc.
- The order of class member: first the public level, then the protection
  level, and finally the private level.
- Member functions: Functions within a contract should be grouped by module, not by
  scope or access permissions.

#### Feature Uses Advice

##### Structs vs Classes

Use a struct only for passive objects that carry data; everything else is a
class.

The struct and class keywords behave almost identically in C++. We add our own
semantic meanings to each keyword, so you should use the appropriate keyword for
the data-type you're defining.

Structs should be used for passive objects that carry data, and may have
associated constants, but lack any functionality other than access/setting the
data members. All fields must be public, and accessed directly rather than
through getter/setter methods. The struct must not have invariants that imply
relationships between different fields, since direct user access to those fields
may break those invariants. Methods should not provide behavior but should only
be used to set up the data members, e.g., constructor, destructor, Initialize(),
Reset().

If more functionality or invariants are required, a class is more appropriate.
If in doubt, make it a class.

##### Inheritance

Composition is often more appropriate than inheritance. When using inheritance,
make it `public`.

All inheritance should be public. If you want to do private inheritance, you
should be including an instance of the base class as a member instead.

Do not overuse implementation inheritance. Composition is often more
appropriate. Try to restrict the use of inheritance to the "is-a" case: Bar
subclasses Foo if it can reasonably be said that Bar "is a kind of" Foo.



##### Multiple Inheritance

Multiple inheritance is especially problematic, because it often imposes a
higher performance overhead (in fact, the performance drop from single
inheritance to multiple inheritance can often be greater than the performance
drop from ordinary to virtual dispatch), and because it risks leading to
"diamond" inheritance patterns, which are prone to ambiguity, confusion, and
outright bugs.

**Multiple implementation inheritance is strongly discouraged.**

##### move

The `std::move` introduced in C++11 can effectively transfer resources to other
objects. In our practice, use `std :: move` can effectively reduce the
consumption of `Gas`, especially when using containers. When returning a value,
it should return rvalue references and use `std::move` to convert lvalue
references to rvalue references to reduce Gas consumption. For example:

```cpp
std::vector<std::string>&& get_vec() {
    std::vector<std::string> v;
    // ignore
    return std::move(v); // very important
}
```
#### auto

The `auto` keyword can automatically deduced from its initializer. Used with
containers and iterators can simplify code. For example:

```cpp
std::map<std::string, std::string> my_map;
for (auto it = my_map.begin(); it != my_map.end(); it++) {
    // ignore
}
```
##### Reference Arguments

Suggest using reference arguments as function parameters. Reference parameters
can reduce unnecessary replication and reduce unnecessary memory allocation. For us
WASM virtual machines, memory allocation is an expensive operation.

##### Containers

The C ++ standard library provides some commonly used containers (map, vector, list, etc.), and you should carefully read the corresponding interface documentation when using it. It is important to note that the `operator[]` oper ator of map, according to the interface documentation, when the key does not exist, the insert action will be performed. For contract development, when using `StorageType` to store the map, do not use` operator [] `to determine whether the key exists, but use` find () ` .

---