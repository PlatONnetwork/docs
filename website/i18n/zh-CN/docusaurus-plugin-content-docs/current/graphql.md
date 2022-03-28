---
id: GraphQL_Server
title: GraphQL Server
sidebar_label: GraphQL Server
---


除了JSON-RPC API之外，PlatON 还支持[EIP-1767](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1767.md)指定的 GraphQL API 。GraphQL 允许您指定作为查询的一部分需要对象的哪些字段，从而消除了客户端填写不需要的字段的额外负载。它还允许将几个传统的 JSON-RPC 请求组合到一个查询中，从而减少开销和提高性能。

GraphQL 端点使用了 JSON-RPC 使用的 HTTP 进行传输。因此，您必须启用和配置相关`--http`标志以及`--graphql`标志本身：

```bash
platon --http --graphql
```

现在您可以开始查询`http://localhost:6789/graphql`. 要更改端口，您需要提供`--http.port`，例如：

```bash
platon --http --http.port 9545 --graphql
```

由于PlatON提供对EIP55和bech32双地址格式的支持,因此如果在graphql中想要使用bech32的地址,需要在url中加入platon,如`http://localhost:6789/platon/graphql`,否则默认是EIP55的地址格式.

### GraphiQL
立即开始并尝试查询的一种简单方法是 PlatON 附带的 GraphiQL 界面。打开它访问`http://localhost:8545/graphql/ui`。要了解它是如何工作的，让我们读取块号 6000000 中所有交易的发送人、接收人和转账金额。在 GraphiQL 中试试这个：
```graphql
query txInfo {
    block (number: 6000000) { transactions { hash from { address } to { address } value } }
}
```

GraphiQL 还提供了一种探索 PlatON 提供的模式的方法，以帮助您制定查询，您可以在右侧栏中看到这些模式。在标题下Root Types单击Query以查看高级类型及其字段。

由于PlatON提供对EIP55和bech32双地址格式的支持,因此如果在GraphiQL中想要使用bech32的地址,需要在url中加入platon,如`http://localhost:6789/graphql/ui`,否则默认是EIP55的地址格式.


### 查询
从 PlatON 读取数据是 GraphQL 的最多的用法。但是，在 UI 中尝试查询后，您可能希望以编程方式进行。您可以查阅[官方文档](https://graphql.org/code/)以查找适合您语言的绑定。或者使用您最喜欢的工具来发送 HTTP 请求。为了完整起见，我们在这里简要介绍两种方法。首先通过 cURL，然后通过 JS 脚本。

以下是通过 cURL 获取最新块编号的方法。注意数据部分使用 JSON 对象：
```bash
❯ curl -X POST http://localhost:6789/graphql -H "Content-Type: application/json" --data '{ "query": "query { block { number } }" }'
{"data":{"block":{"number":6004069}}}
```

或者将 JSON 化的查询存储在一个文件中（我们称之为block-num.query）并执行以下操作：

```bash
❯ curl -X POST http://localhost:6789/graphql -H "Content-Type: application/json" --data '@block-num.query'
```

在 JS 中执行一个简单的查询如下所示。在这里，我们使用轻量级库graphql-request来执行请求。注意在查询中使用变量而不是硬编码块号：

```javascript
const { request, gql } = require('graphql-request')

const query = gql`
    query blockInfo($number: Long) {
        block (number: $number) { hash stateRoot }
    }
`
request('http://localhost:8545/graphql', query, { number: '6004067' })
    .then((res) => { console.log(res) })
    .catch((err) => { console.log(err) })
```






