---
id: Solidity_Contract_Security_Dev_Guide
title: 安全指南
sidebar_label: 安全指南
---

在Solidity合约中，可以来处理代币，甚至是更值钱的东西。此外，合约的每次执行都是公开的，源代码通常也是公开的。在区块链世界里，合约一直都是黑客的主要攻击点，同时也造成了非常大的损失。所以合约的安全开发非常重要，可以考虑从以下几个方面来提高合约的安全性。

### 编译器bug

首先必须了解Solidity编译器本身的bug，尽量规避有问题的编译器版本或者存在问题的使用方式。Solidity编译器bug列表：https://solidity.readthedocs.io/en/latest/bugs.html 。

### 标准合约开发流程

如果想解决智能合约的安全问题，必须按照标准流程来开发合约。

1. 必须先完成详细的设计，充分考虑各种场景和异常情况。避免考虑不清楚，不全面引入的bug。
2. 开发过程中，要做到模块化和简洁化，复杂性会增加出错的风险。
3. 合约必须经过足够充分的review和测试才能发布到主网。
4. 保持对合约运行状态的关注，紧急状态下可以销毁合约或者提供类似紧急冻结的功能。

### 常见漏洞

#### 私有信息和随机性

智能合约中使用的所有内容都是公开可见的，即使是标记了局部变量和状态变量 `private` 。

如果你不想让矿工作弊，那么在智能合约中使用随机数就相当困难（在智能合约中使用随机数很难保证节点不作弊， 这是因为智能合约中的随机数一般要依赖计算节点的本地时间得到， 而本地时间是可以被恶意节点伪造的，因此这种方法并不安全。 通行的做法是采用链外off-chain 的第三方服务，比如 Oraclize 来获取随机数）。

#### 重入

任何从合约 A 到合约 B 的交互以及任何从合约 A 到合约 B 的 以太币的转移。都会将控制权交给合约 B。这使得合约 B 能够在交互结束前回调 A 中的代码。举个例子，下面的代码包含一个bug（它只是一个片段，而不是一个完整的契约）：

```
pragma solidity >=0.4.0 <0.7.0;

// THIS CONTRACT CONTAINS A BUG - DO NOT USE
contract Fund {
    /// Mapping of ether shares of the contract.
    mapping(address => uint) shares;
    /// Withdraw your share.
    function withdraw() public {
        if (msg.sender.send(shares[msg.sender]))
            shares[msg.sender] = 0;
    }
}
```

这里的问题不是很严重，因为有限的 gas 也作为 `send` 的一部分，但仍然暴露了一个缺陷：以太币的传输过程中总是可以包含代码执行，所以接收者可以是一个回调进入 `withdraw` 的合约。 这就会使其多次得到退款，从而将合约中的全部以太币提取。 特别地，下面的合约将允许一个攻击者多次得到退款，因为它使用了 `call` ，默认发送所有剩余的 gas：

```
pragma solidity >=0.4.0 <0.7.0;

// THIS CONTRACT CONTAINS A BUG - DO NOT USE
contract Fund {
    /// Mapping of ether shares of the contract.
    mapping(address => uint) shares;
    /// Withdraw your share.
    function withdraw() public {
        (bool success,) = msg.sender.call.value(shares[msg.sender])("");
        if (success)
            shares[msg.sender] = 0;
    }
}
```

为了避免重入，你可以使用下面撰写的“检查-生效-交互”（Checks-Effects-Interactions）模式：

```
pragma solidity >=0.4.11 <0.7.0;

contract Fund {
    /// Mapping of ether shares of the contract.
    mapping(address => uint) shares;
    /// Withdraw your share.
    function withdraw() public {
        uint share = shares[msg.sender];
        shares[msg.sender] = 0;
        msg.sender.transfer(share);
    }
}
```

请注意重入不仅是以太币传输的其中一个影响，还包括任何对另一个合约的函数调用。 更进一步说，你也不得不考虑多合约的情况。 一个被调用的合约可以修改你所依赖的另一个合约的状态。

#### gas 限制和循环

必须谨慎使用没有固定迭代次数的循环，例如依赖于存储 storage 值的循环：由于区块 gas 有限，交易只能消耗一定数量的 gas。无论是明确指出的还是正常运行过程中的，循环中的数次迭代操作所消耗的 gas 都有可能超出区块的 gas 限制，从而导致整个合约在某个时刻骤然停止。这可能不适用于只被用来从区块链中读取数据的 `view` 函数。 尽管如此，这些函数仍然可能会被其它合约当作链上on-chain操作的一部分来调用，并使那些操作骤然停止。 请在合约代码的说明文档中明确说明这些情况。

#### 发送和接收以太币

- 目前无论是合约还是“外部账户”都不能阻止有人给它们发送 以太币Ether。 合约可以对一个正常的转账做出反应并拒绝它，但还有些方法可以不通过创建消息来发送 以太币Ether。 其中一种方法就是单纯地向合约地址“挖矿”，另一种方法就是使用 `selfdestruct(x)` 。
- 如果一个合约收到了以太币（且没有函数被调用），就会执行 fallback 函数。 如果没有 fallback 函数，那么以太币 Ether 会被拒收（同时会抛出异常）。 在 fallback 函数执行过程中，合约只能依靠此时可用的“gas 津贴”（2300 gas）来执行。 这笔津贴并不足以用来完成任何方式的存储 storage 访问。 为了确保你的合约可以通过这种方式收到 以太币，请你核对 fallback 函数所需的 gas 数量。
- 有一种方法可以通过使用 `addr.call.value(x)("")` 向接收合约发送更多的 gas。 这本质上跟 `addr.transfer(x)` 是一样的， 只不过前者发送所有剩余的 gas，并且使得接收者有能力执行更加昂贵的操作（它只会返回一个错误代码，而且也不会自动传播这个错误）。 这可能包括回调发送合约或者你想不到的其它状态改变的情况。因此这种方法无论是给诚实用户还是恶意行为者都提供了极大的灵活性。
- 尽可能地使用最精确的单位来表示wei的数量，因为您会丢失由于缺乏精确性而舍入的任何值。
- 如果你想要使用 `address.transfer`以太币，你需要注意以下几个细节：
    1. 如果接收者是一个合约，它会执行自己的 fallback 函数，从而可以回调发送以太币的合约。
    2. 如果调用的深度超过 1024，发送以太币也会失败。由于调用者对调用深度有完全的控制权，他们可以强制使这次发送失败； 请考虑这种可能性，或者使用 `send` 并且确保每次都核对它的返回值。 更好的方法是使用一种接收者可以取回以太币的方式编写你的合约。
    3. 发送以太币也可能因为接收方合约的执行所需的 gas 多于分配的 gas 数量而失败（确切地说，是使用了 `require` ， `assert`， `revert` 或者因为这个操作过于昂贵） - “gas 不够用了”。 如果你使用 `transfer` 或者 `send` 的同时带有返回值检查，这就为接收者提供了在发送合约中阻断进程的方法。 再次说明，最佳实践是使用 [“取回”模式而不是“发送”模式](https://solidity.readthedocs.io/en/latest/common-patterns.html#withdrawal-pattern)。

#### 调用栈深度

外部函数调用随时会失败，因为它们超过了调用栈的上限 1024。 在这种情况下，Solidity 会抛出一个异常。 恶意行为者也许能够在与你的合约交互之前强制将调用栈设置成一个比较高的值。

请注意，使用 `.send()` 时如果超出调用栈 **并不会** 抛出异常，而是会返回 `false`。 低级的函数比如 `.call()`，`.delegatecall()` 和 `.staticcall()` 也都是这样的。

#### tx.origin

永远不要使用 tx.origin 做身份认证。假设你有一个如下的钱包合约：

```
pragma solidity >=0.5.0 <0.7.0;

// THIS CONTRACT CONTAINS A BUG - DO NOT USE
contract TxUserWallet {
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    function transferTo(address payable dest, uint amount) public {
        require(tx.origin == owner);
        dest.transfer(amount);
    }
}
```

现在有人欺骗你，将以太币发送到了这个恶意钱包的地址：

```
pragma solidity >=0.5.0 <0.7.0;

interface TxUserWallet {
    function transferTo(address payable dest, uint amount) external;
}

contract TxAttackWallet {
    address payable owner;

    constructor() public {
        owner = msg.sender;
    }

    function() external {
        TxUserWallet(msg.sender).transferTo(owner, msg.sender.balance);
    }
}
```

如果你的钱包检查过 `msg.sender` 为了获得授权，它将获取攻击钱包的地址，而不是所有者地址。但是通过检查 `tx.origin` ，它获取启动事务的原始地址，该地址仍然是所有者地址。攻击钱包会立即耗尽你所有的资金。

#### 二的补码/下溢/上溢

与许多编程语言一样，solidity的整数类型实际上不是整数。当值很小时，它们类似于整数，但如果数值较大，则表现不同。例如，以下是正确的： `uint8(255) + uint8(1) == 0` .这种情况被称为上溢。当执行的操作需要固定大小的变量来存储超出变量数据类型范围的数值（或数据块）时，就会发生这种情况。一个下溢的情况是： `uint8(0) - uint8(1) == 255` .

一般来说，阅读关于二的补码表示的限制，它甚至对有符号数有一些更特殊的边界情况。

尝试使用 `require` 将输入的大小限制在合理的范围内，并使用 [SMT checker](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html#smt-checker) 查找潜在的溢出，或使用类似的库 [SafeMath](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol) ，如果希望所有溢出都能还原。

代码 `require((balanceOf[_to] + _value) >= balanceOf[_to])` 还可以检查值是否符合期望。

#### 清理Mappings

Solidity `mapping` 类型(参考 [Mapping Types](https://solidity.readthedocs.io/en/latest/types.html#mapping-types)) 是仅存储键值的数据结构，不会跟踪分配了非零值的键索引。因此，在没有键索引信息的情况下，无法清除`mapping`。如果将`mapping`用作动态存储数组的基本类型，则删除或弹出该数组将不会对`mapping`元素产生影响。例如，如果将`mapping`用作 struct 的成员字段的类型，同时struct作为动态存储数组的基本类型，则会发生相同的情况。在包含`mapping`的结构或数组的分配中，也将忽略`mapping`。

```
pragma solidity >=0.5.0 <0.7.0;

contract Map {
    mapping (uint => uint)[] array;

    function allocate(uint _newMaps) public {
        for (uint i = 0; i < _newMaps; i++)
            array.push();
    }

    function writeMap(uint _map, uint _key, uint _value) public {
        array[_map][_key] = _value;
    }

    function readMap(uint _map, uint _key) public view returns (uint) {
        return array[_map][_key];
    }

    function eraseMaps() public {
        delete array;
    }
}
```

考虑上面的示例和以下调用顺序: `allocate(10)`, `writeMap(4, 128, 256)`. 此时, 调用 `readMap(4, 128)` 返回256。如果调用 `eraseMaps`，状态变量 `array` 的长度是0, 但它的 `mapping` 元素没有清零, 它们的信息仍然存储在合约的存储区。删除数组之后, 调用 `allocate(5)` 允许我们再次访问 `array[4]` , 此时即使不调用 `writeMap`，当调用 `readMap(4, 128)` 仍然会返回256。

如果必须删除`mapping`信息, 可以考虑使用类似 [iterable mapping](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol)库，从而允许遍历键并在适当的`mapping`中删除其值。

#### 权限控制错误

在智能合约中，合约开发者一般都会设置一些用于合约所有者，但如果开发者疏忽写错了函数权限，就有可能导致所有者转移等严重后果。

```
function initContract() public {
    owner = msg.reader;
}
```

上述代码函数就需要设置onlyOwner。

合约中不同函数应设置合理的权限。

#### 地址初始化问题

在EVM中，所有与地址有关的初始化时，都会赋予初值0。

如果一个address变量与0相等时，说明该变量可能未初始化或出现了未知的错误。

如果开发者在代码中初始化了某个address变量，但未赋予初值，或用户在发起某种操作时，误操作未赋予address变量，但在下面的代码中需要对这个变量做处理，就可能导致不必要的安全风险。

涉及到地址的函数中，建议加入require(_to!=address(0))验证，有效避免用户误操作或未知错误导致的不必要的损失。

#### 交易顺序依赖

由于交易在短暂的时间内会先存放到mempool中，所以在矿工将其打包进block之前，是可以知道会发生什么动作的。这对于一个去中心化的市场来说是麻烦的，因为可以查看到代币的交易信息，并且可以在它被打包进block之前改变交易顺序。避免这一点很困难，因为它归结为具体的合同本身。

例如，在市场上，最好实施批量拍卖（这也可以防止高频交易问题）。另一种使用预提交方案的方法。

#### 其他

不占满32个字节的类型可能包含“脏的高阶位”。如果访问 `msg.data` ，这尤其重要-这会造成延展性风险：那么可以设计使用原始字节参数0xff000001和0x00000001调用函数 f(uint8 x) 的交易。两者都输入了合约，就x而言，两者看起来都像数字1，但是msg.data会有所不同，因此，如果对任何内容使用keccak256(msg.data)，将获得不同的结果。

### 安全建议

#### 认真对待警告

如果编译器警告了你什么事，你最好修改一下，即使你不认为这个特定的警告不会产生安全隐患，因为那也有可能埋藏着其他的问题。 我们给出的任何编译器警告，都可以通过轻微的修改来去掉。

始终使用最新版本的编译器来通知所有最近引入的警告。

#### 限定以太币的数量

限定存储storage 在一个智能合约中以太币（或者其它tokens）的数量。 如果你的源代码、编译器或者平台出现了 bug，可能会导致这些资产丢失。 如果你想控制你的损失，就要限定以太币的数量。

#### 保持合约简练且模块化

保持你的合约短小精炼且易于理解。找出无关于其它合约或库的功能。 有关源码质量可以采用的一般建议： 限制局部变量的数量以及函数的长度等等。 将实现的函数文档化，这样别人看到代码的时候就可以理解你的意图，并判断代码是否按照正确的意图实现。

#### 使用“检查-生效-交互”（Checks-Effects-Interactions）模式

大多数函数会首先做一些检查工作（例如谁调用了函数，参数是否在取值范围之内，它们是否发送了足够的以太币，用户是否具有tokens等等）。这些检查工作应该首先被完成。

第二步，如果所有检查都通过了，应该接着进行会影响当前合约状态变量的那些处理。 与其它合约的交互应该是任何函数的最后一步。

早期合约延迟了一些效果的产生，为了等待外部函数调用以非错误状态返回。 由于上文所述的重入问题，这通常会导致严重的后果。

请注意，对已知合约的调用反过来也可能导致对未知合约的调用，所以最好是一直保持使用这个模式编写代码。

#### 包含故障-安全（Fail-Safe）模式

尽管将系统完全去中心化可以省去许多中间环节，但包含某种故障-安全模式仍然是好的做法，尤其是对于新的代码来说：

你可以在你的智能合约中增加一个函数实现某种程度上的自检查，比如“ 以太币是否会泄露？”， “通证的总和是否与合约的余额相等？”等等。 请记住，你不能使用太多的 gas，所以可能需要通过链外off-chain 计算来辅助。

如果自检查没有通过，合约就会自动切换到某种“故障安全”模式， 例如，关闭大部分功能，将控制权交给某个固定的可信第三方，或者将合约转换成一个简单的“退回我的钱”合约。

#### 认真检查函数权限

合约中不同函数应设置合理的权限。

检查合约中各函数是否正确使用了public、private等关键词进行可见性修饰，检查合约是否正确定义并使用了modifier对关键函数进行访问限制，避免越权导致的问题。

```
function initContract() public OnlyOwner {
    owner = msg.reader;
}
```

#### 要求同行评审

检查一段代码的人越多，发现的问题就越多。让检查者检查您的代码也有助于交叉检查您的代码是否易于理解——这是良好智能合约的一个非常重要的标准。

#### 其他

1. [更多安全建议](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)
2. [合约最佳实践](https://consensys.github.io/smart-contract-best-practices/)

### 安全工具

1. 以太坊形式化验证工具 [SMT checker](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html#smt-checker)。
2. 形式化验证工具：提供[离线VS Code插件](https://marketplace.visualstudio.com/items?itemName=Beosin.beosin-vaas-eth)，和[在线版](https://beosin.com/vaas/index.html#/audit/ptsj)。
3. 使用remix集成的安全扫描插件[MythX](https://docs.mythx.io/en/latest/)。

### 第三方审计

可以找专业的第三方审计公司进行安全审计如：[慢雾](https://www.slowmist.com/service-smart-contract-security-audit.html)。

---