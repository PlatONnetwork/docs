---
id: Wasm_Contract_API
title: 合约API
sidebar_label: 合约API
---


## API

### 区块Api

#### platon_block_hash()

```cpp
h256 platon::platon_block_hash(int64_t num)
```

根据区块高度获取区块哈希。

* **参数**
    * `num：`块的高度
* **返回值**
    * 哈希值

#### platon_block_number()

```cpp
uint64_t platon_block_number()
```

获取当前块的高度。

* **返回值**
    * 当前块的高度

#### platon_coinbase()

```cpp
Address platon::platon_coinbase()
```

获取矿工节点的哈希值。

* **返回值**
    * 矿工节点的哈希

#### platon_unix_timestamp()

```cpp
int64_t platon::platon_unix_timestamp()
```

获取当前块的Unix时间戳。

* **返回值**
    * 当前块的Unix时间戳（秒）

#### platon_gas_limit()

```cpp
uint64_t platon_gas_limit()
```

获取当前区块的 gas limit

* **返回值**
    * 当前区块的 gas limit

### 交易API

#### platon_gas_price()

```cpp
u128 platon::platon_gas_price()
```

获取交易的 gas price.

* **返回值**
    * 交易的 gas price

#### platon_gas()

```cpp
uint64_t platon_gas()
```

获取交易的 gas 值

* **返回值**
    * 交易的 gas 值

#### platon_caller_nonce

```cpp
uint64_t platon_caller_nonce()
```

获取交易的 nonce 值

* **返回值**
    * 交易的 nonce 值

#### platon_call_value()

```cpp
u128 platon::platon_call_value()
```

获取当前交易的 value 值。

* **返回值**
    * 当前交易的 value 值

#### platon_caller()

```cpp
Address platon::platon_caller()
```

获取交易的发起者

* **返回值**
    * 交易发起者地址

#### platon_origin()

```cpp
Address platon::platon_origin()
```

获取交易的原始发起者

* **返回值**
    * 交易原始发起者的地址

#### platon_address()

```cpp
Address platon::platon_address()
```

获取交易的合约地址

* **返回值**
    * 合约地址

### 帐户Api

#### make_address() 1/2

```cpp
template <size_t M> std::pair<Address, bool> make_address(const char (&str)[M])
```
CDT 默认识别的地址是主网地址也就是地址前缀为lat，同时我们支持以太坊以地址格式,例如: "0x02ea8A5273d20f3e378a56D958a684004eDD0094"

将C风格字符串转换为地址对象。

* **参数**
    * `str：` C风格字符串
* **返回值**
    * 返回值为 pair，pair 的 second 表示成功或者失败，first 表示 Address 类型的地址。

#### make_address() 2/2

```cpp
std::pair<Address, bool> make_address(const std::string &str_address)
```
CDT 默认识别的地址是主网地址也就是地址前缀为lat，同时我们支持以太坊以地址格式,例如: "0x02ea8A5273d20f3e378a56D958a684004eDD0094"

将字符串转换为地址对象。

* **参数**
    * `str：` 字符串
* **返回值**
    * 返回值为 pair，pair 的 second 表示成功或者失败，first 表示 Address 类型的地址

#### platon_balance()

```cpp
Energon platon::platon_balance(const Address & addr)
```

根据地址获取余额。

* **参数**
    * `addr：`地址
* **返回值**
    * 地址余额

#### platon_transfer()

```cpp
bool platon::platon_transfer(const Address &addr, const Energon &amount)
```

将Energon的金额转移到地址。

* **参数**
    * `addr：`帐户地址
    * `amount：`Energon的数量
* **返回值**
    * 如果传输成功则为true，否则为false

#### platon::Energon Class

Energo是货币相关操作类

* **公共成员函数**
    * `Energon (u128 n)`
      构造一个新的Energon。

    * `const u128 Get () const`
      获得一定量的Von。

    * `const bytes Bytes () const`
      获取值的字节，字节使用大端表示。

    * `Energon & Add (const u128 &v)`
      添加量的 Von。

    * `Energon & Add (const Energon &rhs)`
      两个 Energon 对象相加

    * `Energon & operator+= (const Energon &rhs)`
      实现运算符+ =

* **构造函数和析构函数**

    * `platon::Energon::Energon(u128 n)`
      构造一个新的Energon。
        * **参数**
            * `n：` Von 数量

* **成员函数功能**
    * `Energon& platon::Energon::Add(const Energon & rhs)`
      添加量的Von。

        * **参数**
            * `rhs：`Von的数量
        * **返回值**
            * Energon的引用

    * `Energon& platon::Energon::Add(const u128 & v)`
      添加量的Von。

        * **参数**
            * `v：`Von的数量
        * **返回值**
            * Energon的引用

    * `const bytes platon::Energon::Bytes() const`
      获取值的字节，字节使用大端表示。

        * **返回值**
            * 值的字节

    * `const u128 platon::Energon::Get() const`
      获得一定量的Von。

        * **返回值**
            * Von量

    * `Energon& platon::Energon::operator+= ( const Energon & rhs)`
      实现运算符+ =

        * **参数**
            * `rhs：`Energon对象
        * **返回值**
            * Energon的引用

#### platon::WhiteList< TableName > Class

```cpp
template<Name::Raw TableName>
class platon::WhiteList< TableName >
```

持久存储白名单工具。

* **模板参数**
    * `Name：`白名单名称，在同一合约中，该名称应唯一

* **构造函数和析构函数**

    * `template<Name::Raw TableName>
      platon::WhiteList< TableName >::WhiteList ()`

构造一个新的清单。

* **公共成员函数**
    * `WhiteList ()`
      构造一个新的清单。

    * `void Add (const std::string &addr)`
      将地址添加到白名单。

    * `void Add (const Address &addr)`
      将地址添加到白名单。

    * `void Delete (const std::string &addr)`
      从白名单中删除地址。

    * `void Delete (const Address &addr)`
      从白名单中删除地址。

    * `bool Exists (const std::string &addr)`
      该地址是否存在于白名单中。

    * `bool Exists (const Address &addr)`
      该地址是否存在于白名单中。

* **成员函数功能**

    * `template<Name::Raw TableName>
      void platon::WhiteList< TableName >::Add ( const Address & addr)`
      将地址添加到白名单。

        * **参数**
            * `addr：`帐户地址

    * `template<Name::Raw TableName>
      void platon::WhiteList< TableName >::Add ( const std::string & addr)`
      将地址添加到白名单。

        * **参数**
            * `addr：`帐户地址

    * `template<Name::Raw TableName>
      void platon::WhiteList< TableName >::Delete ( const Address & addr)`
      从白名单中删除地址。

        * **参数**
            * `addr：`帐户地址

    * `template<Name::Raw TableName>
      void platon::WhiteList< TableName >::Delete ( const std::string & addr)`
      从白名单中删除地址。

        * **参数**
            * `addr：`帐户地址

    * `template<Name::Raw TableName>
      bool platon::WhiteList< TableName >::Exists ( const Address & addr)`
      该地址是否存在于白名单中。

        * **参数**
            * `addr：`帐户地址
        * **返回值**
            * 如果存在则为true，否则为false

    * `template<Name::Raw TableName>
      bool platon::WhiteList< TableName >::Exists ( const std::string & addr)`
      该地址是否存在于白名单中。

        * **参数**
            * `addr：`帐户地址
        * **返回值**
            * 如果存在则为true，否则为false

### 存储API

#### platon_set_state()

```cpp
void platon_set_state(const uint8_t *key, size_t klen, const uint8_t *value, size_t vlen)
```

设置状态对象

* **参数**
    * `key：`键
    * `Klen：`键的长度
    * `value：`值
    * `vlen：`值的长度

#### platon_get_state_length()

```cpp
size_t platon_get_state_length(const uint8_t *key, size_t klen)
```

获取键对应的值的长度

* **参数**
    * `key：`键
    * `Klen：`键的长度

* **返回值**
    * 键对应的值的长度

#### platon_get_state()

```cpp
size_t platon_get_state(const uint8_t *key, size_t klen, uint8_t *value, size_t vlen);
```

获取状态对象

* **参数**
    * `key：`键
    * `Klen：`密钥的长度
    * `value：`值
    * `vlen：`价值的长度

* **返回值**
    * 值的长度

#### platon::StorageType< StorageName, T > 模板类

```cpp
template<Name::Raw StorageName, typename T>
class platon::StorageType< StorageName, T >
```

* **模板参数**
    * `StorageName：`元素值名称，在同一合约中，该名称必须唯一
    * `T：`元素类型

* **公共成员功能**
    * `StorageType ()`
      构造一个新的存储类型对象

    * `StorageType (const T &d)`
      构造一个新的存储类型对象

    * `StorageType (const StorageType< StorageName, T > &)=delete`

    * `StorageType (const StorageType< StorageName, T > &&)=delete`

    * `~StorageType ()`
      销毁存储类型对象。刷新到区块链。

    * `T & operator= (const T &t)`

    * `template<typename P> bool operator== (const P &t) const`

    * `template<typename P> bool operator!= (const P &t) const`

    * `template<typename P> bool operator< (const P &t) const`

    * `template<typename P> bool operator>= (const P &t) const`

    * `template<typename P> bool operator<= (const P &t) const`

    * `template<typename P> bool operator> (const P &t) const`

    * `template<typename P> T & operator^= (const P &t) const`

    * `template<typename P> T operator^ (const P &t) const`

    * `template<typename P> T & operator|= (const P &t) const`

    * `template<typename P> T operator| (const P &t) const`

    * `template<typename P> T & operator&= (const P &t) const`

    * `template<typename P> T operator& (const P &t) const`

    * `T operator~ () const`

    * `T & operator<< (int offset)`

    * `T & operator>> (int offset)`

    * `T & operator++ ()`

    * `T operator++ (int)`

    * `T & operator[] (int i)`

    * `template<typename P> T & operator+= (const P &p)`

    * `template<typename P> T & operator-= (const P &p)`

    * `T & operator* ()`

    * `T *  operator-> ()`

    * `operator bool () const`

    * `T get () const`

    * `T & self ()`

#### platon::db::Array< TableName, Key, N > 模板类

```cpp
template<Name::Raw TableName, typename Key, unsigned N>
class platon::db::Array< TableName, Key, N >
```

* **成员类**
    * `class const_iterator
      Constant iterator.`

    * `class const_reverse_iterator
      Constant reverse iterator.`

    * `class iterator
      Iterator.`

* **Public Types**
    * `typedef std::reverse_iterator< iterator >  reverse_iterator`

* **公共成员函数**
    * `Array ()`

    * `Array (const Array< TableName, Key, N > &)=delete`

    * `Array (const Array< TableName, Key, N > &&)=delete`

    * `Array< TableName, Key, N > & operator= (const Array< TableName, Key, N > &)=delete`

    * `~Array ()`

    * `iterator begin ()`
      迭代器开始位置

    * `iterator end ()`
      迭代器结束位置

    * `reverse_iterator rbegin ()`
      反向迭代器开始位置。

    * `reverse_iterator rend ()`
      反向迭代器结束位置。

    * `const_iterator cbegin ()`
      常量迭代器开始位置。

    * `const_iterator cend ()`
      常量迭代器最终位置。

    * `const_reverse_iterator crbegin ()`
      常数反向迭代器的起始位置。

    * `const_reverse_iterator crend ()`
      常数反向迭代器的最终位置。

    * `Key & at (size_t pos)`
      获取指定的position元素。

    * `Key & operator[] (size_t pos)`
      括号运算符。

    * `size_t  size ()`
      数组大小

    * `Key get_const (size_t pos)`
      获取Const对象。不要刷新以缓存。

    * `void  set_const (size_t pos, const Key &key)`
      设置Const对象，请勿刷新以缓存。

* **静态公共属性**
    * `static const std::string  kType = "__array__"`

#### platon::db::Map< TableName, Key, Value > 模板类

```cpp
template<Name::Raw TableName, typename Key, typename Value>
class platon::db::Map< TableName, Key, Value >
```

实现map操作，map模板。

* **模板参数**
    * `TableName:` map的名称，map的名称在每个合约中应该是唯一的。
    * `Key：`键类型
    * `Value：`值类型

MapType::Traverse 默认值为Traverse，当Traverse需要额外的数据结构进行操作时，当不需要遍历操作时，将其设置为NoTraverse。

* **公共成员函数功能**
    * `Map ()`

    * `Map(const Map< TableName, Key, Value > &)=delete`

    * `Map(const Map< TableName, Key, Value > &&)=delete`

    * `Map< TableName, Key, Value > & operator= (const Map< TableName, Key, Value > &)=delete`

    * `~Map ()`
      销毁Map对象将数据刷新到区块链。

    * `bool insert (const Key &k, const Value &v)`
      插入新的键值对，更新为缓存。

    * `bool insert_const (const Key &k, const Value &v)`
      插入将不会更新到缓存的新键值对。适用于大量插入，插入后无需更新。

    * `Value  get_const (const Key &k)`
      获取Const对象，将不会加入缓存。

    * `Value & at (const Key &k)`
      获取值，将被添加到缓存中。

    * `void  erase (const Key &k)`
      删除键值对。

    * `Value & operator[] (const Key &k)`
      括号运算符。

    * `boolcontains (const Key &key)`
      检查容器中是否存在具有与key等效的键的元素。

    * `void  flush ()`
      将内存中的修改数据刷新到区块链。

* **静态公共属性**
    * `static const std::string  kType = "__map__"`

* **构造函数和析构函数**

    * `template<Name::Raw TableName, typename Key , typename Value >
      platon::db::Map< TableName, Key, Value >::Map ()`

    * `template<Name::Raw TableName, typename Key , typename Value >
      platon::db::Map< TableName, Key, Value >::Map (const Map< TableName, Key, Value > & )`

    * `template<Name::Raw TableName, typename Key , typename Value >
      platon::db::Map< TableName, Key, Value >::Map (const Map< TableName, Key, Value > && )`

    * `template<Name::Raw TableName, typename Key , typename Value >
      platon::db::Map< TableName, Key, Value >::~Map ()`

销毁Map对象将数据刷新到区块链。

* **成员函数功能**

    * `template<Name::Raw TableName, typename Key , typename Value >
      Value& platon::db::Map< TableName, Key, Value >::at ( const Key & k )`
      获取值，将被添加到缓存中。

        * **参数**

            * `k：`键
        * **返回值**

        * 值的引用
        * **示例：**

          ```cpp
          typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
          MapStr map;
          map.insert("hello", "world");
      assert(map.at["hello"] == "world");
        ```

    * `template<Name::Raw TableName, typename Key , typename Value >
      bool platon::db::Map< TableName, Key, Value >::contains ( const Key & key )`
      检查容器中是否存在具有与key等效的键的元素。

        * **参数**

            * `k：`键
        * **返回值**

        * 如果存在这样的元素，则为true，否则为false。
        * **示例：**

          ```cpp
           typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
           MapStr map;
           map.["hello"] = "world";
      assert(map.contains("hello"));
        ```

    * `template<Name::Raw TableName, typename Key , typename Value >
      void platon::db::Map< TableName, Key, Value >::erase ( const Key & k )`
      删除键值对。

        * **参数**

            * `k：`键
    * **示例：**

        ```cpp
        typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
        MapStr map;
        map.insert("hello", "world");
        map.erase("hello");
      ```

    * `template<Name::Raw TableName, typename Key , typename Value >
      void platon::db::Map< TableName, Key, Value >::flush ()`
      将内存中的修改数据刷新到区块链。

    * `template<Name::Raw TableName, typename Key , typename Value >
      Value platon::db::Map< TableName, Key, Value >::get_const ( const Key & k)`
      获取Const对象，将不会加入缓存。

        * **参数**

            * `k：`键
        * **返回值**

        * 价值
        * **示例：**

          ```cpp
          typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
          MapStr map;
          map.insert("hello", "world");
      assert(map.get_const["hello"] == "world");
        ```

    * `template<Name::Raw TableName, typename Key , typename Value >
      bool platon::db::Map< TableName, Key, Value >::insert ( const Key & k,
      const Value & v)`
      插入新的键值对，更新为缓存。

        * **参数**
            * `k：`键
            * `v：`值
        * **返回值**

            * true插入成功，false插入失败
    * **示例：**

        ```cpp
        typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
        MapStr map;
        map.insert("hello", "world");
        assert(map["hello"] == "world");
      ```

    * `template<Name::Raw TableName, typename Key , typename Value >
      bool platon::db::Map< TableName, Key, Value >::insert_const ( const Key & k,
      const Value & v)`
      插入将不会更新到缓存的新键值对。适用于大量插入，插入后无需更新。

        * **参数**
            * `k：`键
            * `v：`值
        * **返回值**

            * true插入成功，false插入失败
    * **示例：**

        ```cpp
        typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
        MapStr map;
        map.insert_const("hello", "world");
        assert(map["hello"] == "world");
      ```

    * `template<Name::Raw TableName, typename Key , typename Value >
      Map<TableName, Key, Value>& platon::db::Map< TableName, Key, Value >::operator= ( const Map< TableName, Key, Value > & )`

    * `template<Name::Raw TableName, typename Key , typename Value >
      Value& platon::db::Map< TableName, Key, Value >::operator[] ( const Key & k)`
      括号运算符。

        * **参数**

            * `k：`键
        * **返回值**

        * 价值与获取价值
        * **示例：**

          ```cpp
          typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
          MapStr map;
          map.["hello"] = "world";
          ```

* **成员变量**
    * `template<Name::Raw TableName, typename Key , typename Value >
      const std::string platon::db::Map< TableName, Key, Value >::kType = "__map__"`

#### template<Name::Raw TableName, typename T, typename... Indices> class platon::db::MultiIndex< TableName, T, Indices >

MultiIndex支持惟一索引和普通索引。惟一索引应该放在参数的第一个位置。结构需要提供与index字段对应的get函数。

* **成员函数功能**
    * `template<Name::Raw TableName, typename T , typename... Indices>const_iterator platon::db::MultiIndex< TableName, T, Indices >::cbegin()`
      开始迭代器

        * **返回值**
            * const_iterator
        * **示例：**

      ```cpp
        struct Member {
        std::string name;
        uint8_t age;
        uint8_t sex;
        uint64_t $seq_;
        std::string Name() const { return name; }
        uint8_t Age() const { return age; }
        PLATON_SERIALIZE(Member, (name)(age)(sex))
      };
      MultiIndex<
        "table"_n, Member,
        IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                            IndexType::UniqueIndex>>,
        IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                            IndexType::NormalIndex>>>
        member_table;
      for (auto it = member_table.cbegin(); it != it_end; ++it){}
      ```

    * `template<Name::Raw TableName, typename T , typename... Indices>
      const_iterator platon::db::MultiIndex< TableName, T, Indices >::cend()`
      结束迭代器

        * **返回值**
            * const_iterator
        * **示例：**

      ```cpp
        struct Member {
        std::string name;
        uint8_t age;
        uint8_t sex;
        uint64_t $seq_;
        std::string Name() const { return name; }
        uint8_t Age() const { return age; }
        PLATON_SERIALIZE(Member, (name)(age)(sex))
      };
      MultiIndex<
        "table"_n, Member,
        IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                            IndexType::UniqueIndex>>,
        IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                            IndexType::NormalIndex>>>
        member_table;
      for (auto it = member_table.cbegin(); it != it_end; ++it){}
      ```

    * `template<Name::Raw TableName, typename T , typename... Indices> template<Name::Raw IndexName, typename KEY > size_t platon::db::MultiIndex< TableName, T, Indices >::count(const KEY &key)`

        * **返回值**
            * 获取与索引值对应的数据的数量
        * **示例：**

      ```cpp
      struct Member {
      std::string name;
      uint8_t age;
      uint8_t sex;
      uint64_t $seq_;
      std::string Name() const { return name; }
      uint8_t Age() const { return age; }
      PLATON_SERIALIZE(Member, (name)(age)(sex))
      };
      MultiIndex<
      "table"_n, Member,
        IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                          IndexType::UniqueIndex>>,
      IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                            IndexType::NormalIndex>>>
      member_table;
      auto count = member_table.count<"index2"_n>(uint8_t(10));
      ```

    * `template<Name::Raw TableName, typename T , typename... Indices> template<typename Lambda> std::pair<const_iterator, bool> platon::db::MultiIndex< TableName, T, Indices >::emplace(Lambda &constructor)`

        * **参数**
            * 数据项处理函数
        * **返回值**
            * 返回一个迭代器，该迭代器指示使用bool类型的插入是否成功。如果惟一索引冲突，则插入失败
        * **示例：**

      ```cpp
      struct Member {
        std::string name;
        uint8_t age;
        uint8_t sex;
        uint64_t $seq_;
        std::string Name() const { return name; }
        uint8_t Age() const { return age; }
        PLATON_SERIALIZE(Member, (name)(age)(sex))
      };
      MultiIndex<
        "table"_n, Member,
        IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                            IndexType::UniqueIndex>>,
        IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                            IndexType::NormalIndex>>>
        member_table;
      member_table.emplace([&](auto &m) {
        m.age = 10;
        m.name = "hello";
        m.sex = 1;
      });
      ```

    * `template<Name::Raw TableName, typename T , typename... Indices> void platon::db::MultiIndex< TableName, T, Indices >::erase(const_iterator position)`
      基于迭代器删除数据

        * **参数**
            * `position：`迭代器
        * **示例：**

      ```cpp
      struct Member {
      std::string name;
      uint8_t age;
      uint8_t sex;
      uint64_t $seq_;
      std::string Name() const { return name; }
      uint8_t Age() const { return age; }
      PLATON_SERIALIZE(Member, (name)(age)(sex))
      };
      MultiIndex<
      "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                        IndexType::UniqueIndex>>,
      IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
      member_table;
      auto vect_iter = member_table.find<"index"_n>(std::string("use to find data"));
      member_table.erase(vect_iter[0]);
      ```

    * `template<Name::Raw TableName, typename T , typename... Indices> template<Name::Raw IndexName, typename KEY > const_iterator platon::db::MultiIndex< TableName, T, Indices >::find(const KEY & key)`
      找到数据，只有一个唯一的索引是可用的。

        * **参数**
            * `key：`索引值
        * **返回值**
            * 结果迭代器。如果没有找到值为cend()。
        * **示例：**

      ```cpp
      struct Member {
      std::string name;
      uint8_t age;
      uint8_t sex;
      uint64_t $seq_;
      std::string Name() const { return name; }
      uint8_t Age() const { return age; }
      PLATON_SERIALIZE(Member, (name)(age)(sex))
      };
      MultiIndex<
      "table"_n, Member,
        IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                          IndexType::UniqueIndex>>,
      IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                            IndexType::NormalIndex>>>
      member_table;
      auto vect_iter = member_table.find<"index"_n>(std::string("use to find data"));
      ```

    * `template<Name::Raw TableName, typename T , typename... Indices> template<Name::Raw IndexName>auto platon::db::MultiIndex< TableName, T, Indices >::get_index()`
      获取非唯一索引的索引对象。

        * **返回值**
            * 索引对象
        * **示例：**

      ```cpp
      struct Member {
      std::string name;
      uint8_t age;
      uint8_t sex;
      uint64_t $seq_;
      std::string Name() const { return name; }
      uint8_t Age() const { return age; }
      PLATON_SERIALIZE(Member, (name)(age)(sex))
      };
      MultiIndex<
      "table"_n, Member,
        IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                          IndexType::UniqueIndex>>,
      IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                            IndexType::NormalIndex>>>
      member_table;
      auto index = member_table.get_index<"index2"_n>();
      ```

    * `template<Name::Raw TableName, typename T , typename... Indices> template<typename Lambda >void platon::db::MultiIndex< TableName, T, Indices >::modify(const_iterator position,Lambda && constructor)`
      基于迭代器修改数据，但不能修改所有与索引相关的字段。

        * **参数**
            * `position：`迭代器
            * `constructor：`更新目标对象的lambda函数
        * **示例：**

      ```cpp
      struct Member {
      std::string name;
      uint8_t age;
      uint8_t sex;
      uint64_t $seq_;
      std::string Name() const { return name; }
      uint8_t Age() const { return age; }
      PLATON_SERIALIZE(Member, (name)(age)(sex))
      };
      MultiIndex<
      "table"_n, Member,
        IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                          IndexType::UniqueIndex>>,
      IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                            IndexType::NormalIndex>>>
      member_table;
      member_table.modify(r.first, [&](auto &m) { m.sex = 15; });
      ```

### 合约API

#### platon_destroy()

```cpp
bool platon::platon_destroy (const Address & addr)
```

销毁合约。

* **参数**
    * `addr：`合约地址
* **返回值**
    * 如果销毁成功，则为true，否则为false

#### platon_migrate_contract()

```cpp
template<typename value_type , typename gas_type >
bool platon::platon_migrate_contract ( Address & addr,
const bytes & init_args,
value_type  value,
gas_type  gas)
```

迁移合约。

* **参数**
    * `addr：`新合约的地址
    * `init_args：`输入参数
    * `value：`转账金额
    * `gas：`支付此交易的gas金额
* **返回值**
    * 如果迁移成功，则为true，否则为false

#### cross_call_args()

```cpp
template<typename... Args>
bytes platon::cross_call_args ( const std::string & method,
const Args &...  args)  
```

构造跨合约调用参数。

* **参数**
    * `method：`被调用合约的方法名称
    * `args：`对应于合约方法的参数
* **返回值**
    * 参数字节数组
#### platon_call() 

```cpp
template <typename value_type, typename gas_type, typename... Args>
inline bool platon_call(const Address &addr, const value_type &value,
const gas_type &gas, const std::string &method,
const Args &... args)
```

没有返回值的跨合约调用。

* **参数**
    * `addr：`要调用的合约地址
    * `value：`转移到合约的金额
    * `gas：`对应的合约方法估计消耗的gas
    * `method：`被调用合约的方法名称
    * `args：`对应于合约方法的参数
* **返回值**
    * 调用成功或者失败
  
* **示例：**

   ```cpp
   auto address_pair =make_address("lat10jc0t4ndqarj4q6ujl3g3ycmufgc77epxg02lt");
   bool result = platon_call(address_pair.first, uint32_t(100), uint32_t(100), "add", 1,2,3);
   if(!result){
     platon_throw("cross call fail");
   }
   ```
#### platon_call_with_return_value() 

```cpp
template <typename return_type, typename value_type, typename gas_type, typename... Args>
inline auto platon_call_with_return_value(const Address &addr,
const value_type &value,
const gas_type &gas,
const std::string &method,
const Args &... args)
```

带返回值的跨合约调用。

* **参数**
    * `addr：`要调用的合约地址
    * `value：`转移到合约的金额
    * `gas：`对应的合约方法估计消耗的gas
    * `method：`被调用合约的方法名称
    * `args：`对应于合约方法的参数
* **返回值**
    * 返回值和调用成功或者失败

* **示例：**

   ```cpp
  auto address_pair =make_address("lat10jc0t4ndqarj4q6ujl3g3ycmufgc77epxg02lt"); 
  auto result = platon_call_with_return_value<int>(address_pair.first, uint32_t(100), uint32_t(100), "add", 1,2,3);
  if(!result.second){
    platon_throw("cross call fail");
  }
   ```
#### platon_delegate_call()

```cpp
template <typename gas_type, typename... Args>
inline bool platon_delegate_call(const Address &addr, const gas_type &gas,
const std::string &method,
const Args &... args) 
```

没有返回值的跨合约代理调用。

* **参数**
    * `addr：`要调用的合约地址
    * `gas：`对应的合约方法估计消耗的gas
    * `method：`被调用合约的方法名称
    * `args：`对应于合约方法的参数
* **返回值**
    * 调用成功或者失败
  
* **示例：**

  ```cpp
   auto address_pair =make_address("lat10jc0t4ndqarj4q6ujl3g3ycmufgc77epxg02lt");
   bool result = platon_delegate_call(address_pair.first, uint32_t(100), uint32_t(100), "add", 1,2,3);
   if(!result){
     platon_throw("cross call fail");
   }
  ```
#### platon_delegate_call_with_return_value()

```cpp
template <typename return_type, typename gas_type, typename... Args>
inline auto platon_delegate_call_with_return_value(const Address &addr,
const gas_type &gas,
const std::string &method,
const Args &... args) 
```

有返回值的跨合约代理调用。

* **参数**
    * `addr：`要调用的合约地址
    * `gas：`对应的合约方法估计消耗的gas
    * `method：`被调用合约的方法名称
    * `args：`对应于合约方法的参数
* **返回值**
    * 返回值和调用成功或者失败
  
* **示例：**

  ```cpp
  auto address_pair = make_address("lat10jc0t4ndqarj4q6ujl3g3ycmufgc77epxg02lt"); 
  auto result = platon_delegate_call_with_return_value<int>(address_pair.first, uint32_t(100), "add", 1,2,3);
  if(!result.secnod){
    platon_throw("cross call fail");
  }
  ```

#### get_call_output()

```cpp
template<typename T >
void platon::get_call_output ( T & t)
```

获取跨合约调用合约方法的返回值。

* **模板参数**
    * `T：`输出值类型
* **参数**
    * `t：`合约方法返回的值

#### platon_event

```cpp
void platon_event(const uint8_t *topic, size_t topic_len, const uint8_t *args,
                  size_t args_len);
```

发布事件

* **参数**
    * `topic：`事件的主题
    * `topic_len：`主题的长度
    * `args：`参数
    * `args_len：`参数的长度

### 异常API

#### platon_panic

```cpp
void platon_panic(void);
```

终止交易，扣除交易的所有gas

#### platon_revert

```cpp
void platon_revert(void);
```

终止交易并扣除消耗的gas

### 其他API

#### platon_sha3()

```cpp
h256 platon::platon_sha3 ( const bytes & data )
```

Sh3算法。

* **参数**
    * `data：`二进制数据
* **返回**
    * 数据哈希

---
