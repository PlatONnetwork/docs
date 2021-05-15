---
id: PlatEye
title: PlatEye
sidebar_label: PlatEye
---

PlatEye区块链浏览器项目的目的在于丰富区块链浏览器功能，以及对链上数据进行专业的数据挖掘，同时为门户引流，提高生态曝光度，增加Alaya和PlatON的区块链可信透明性，打造用户友好专业的Alaya/PlatON区块链浏览器。https://www.alayascan.com 可以进行访问。

## 主要技术

使用高吞吐、低延迟的分布式流式数据处理框架Apache Flink，对最新数据进行统计。把需要检索的交易、合约等数据进行处理后存入 Elastic Search集群，支持毫秒级查询检索，结合MySql数据库。前端使用Vue.js框架，后端使用java，使用前后端分离的开发方式开发，CDN使用Cloudflare。链上信息通过节点rpc进行获取。同时需要修改客户端，获取当前交易池中的交易，用于统计交易池中交易被打包时间和gas费用间的关系。

## 功能说明

### 首页

* 浏览器首页展示当前ATP的最新信息，并滚动显示最新区块和最新交易列表。
* 提供区块/地址/交易搜索栏，可利用浏览器提供的查询功能查询区块/地址/交易信息。

### 查询功能

在Header或浏览器首页的搜索框通过输入区块高度、地址或者交易哈希值可以进行查询，分别返回区块、地址以及交易的具体信息。

### 地址持仓排名

PlatEye浏览器提供查看地址持仓排名功能。点击导航栏的区块链，点击地址，即可查看地址列表及排名信息。地址可按照总金额，流动金额，锁仓金额，以及总质押金额等进行排名。点击地址即可跳转到地址详情页面查看该地址的详细信息。

### 链上信息监控

交易列表和详细信息查看、大额交易监控、锁仓余额统计等。

### 节点列表排名及节点详情查看

可以查看节点列表，详情页统计该节点相关数据，提供快照下载。


## 浏览器公开API使用说明

* 接口文档
  * 文档说明: https://api.alayascan.com/file/docs/#/home
  * BasePath: https://api.alayascan.com/alaya-api/
  * 可以用postman进行接口的测试
* 首页接口
  * 基础数据: /alaya-api/home/chainStatistic。推送ATP基础数据，如当前高度、出块节点ID等。
  * 出块趋势: /alaya-api/home/blockStatistic。推送最新的50条出块趋势数据。
  * 验证人列表: /alaya-api/home/stakingList。推送最新8条验证人信息。
* 地址接口
  * 地址详情: /alaya-api/address/details。返回指定地址等详细信息。
  * 地址锁仓详情: /alaya-api/address/rpplanDetail。查询链上实时锁仓余额信息及锁仓计划。
* 区块接口
  * 区块列表: /alaya-api/block/blockList。推送全部出块列表。
  * 节点区块列表: /alaya-api/block/blockListByNodeId。指定节点全部出块列表。
  * 区块详情: /alaya-api/block/blockDetails。返回指定区块的详细信息。
* 节点接口
  * 汇总数据: /alaya-api/staking/statistic。推送ATP全部节点的汇总数据，5秒推送一次。
  * 实时节点列表: /alaya-api/staking/aliveStakingList。推送全部实时验证节点。
  * 历史节点列表: /alaya-api/staking/historyStakingList。推送退出节点列表。
  * 已锁定节点列表: /alaya-api/staking/lockedStakingList。推送零出块惩罚中节点列表。
  * 节点详情: /alaya-api/staking/stakingDetails。提供验证节点详细信息查看功能。
  * 节点操作记录: /alaya-api/staking/stakingOptRecordList。提供节点操作记录查询功能，例如创建提案，投票等。
  * 节点委托列表: /alaya-api/staking/delegationListByStaking。节点相关的委托列表查询功能。
  * 地址委托列表: /alaya-api/staking/delegationListByAddress。地址相关的委托列表查询功能。
* 交易接口
  * 交易列表: /alaya-api/transaction/transactionList。推送全部交易列表。
  * 区块交易列表: /alaya-api/transaction/transactionListByBlock。推送区块相关的交易列表。
  * 地址交易列表: /alaya-api/transaction/transactionListByAddress。推送地址相关的交易列表。
  * 交易详情: /alaya-api/transaction/transactionDetails。返回指定交易的详细信息。
  * 地址领取奖励列表: /alaya-api/transaction/queryClaimByAddress。返回当前地址下所有节点领取奖励情况。
  * 节点相关领取奖励列表: /alaya-api/transaction/queryClaimByStaking。节点相关的领取奖励列表查询功能。




