---
id: Wasm_Contract_API
title: Wasm API
sidebar_label: Wasm API
---




### block api

#### platon_block_hash()

```cpp
h256 platon::platon_block_hash(int64_t num)
```

Gets the block hash based on the block height.

* **Parameters**
    * `num:` Height of block
* **Returns**
    * Hash of block

#### platon_block_number()

```cpp
uint64_t platon_block_number()
```

Get the height of the current block

* **Returns**
    * the height of the current block

#### platon_coinbase()

```cpp
Address platon::platon_coinbase()
```

Gets the Hash of miner nodes.

* **Returns**
    * Hash of miner nodes

#### platon_unix_timestamp()

```cpp
int64_t platon::platon_unix_timestamp()
```

Get the unix timestamp of the current block.

* **Returns**
    * The unix timestamp of the current block (second)

#### platon_gas_limit()

```cpp
uint64_t platon_gas_limit()
```

Get the value of gas price limit

* **Returns**
    * the value of gas price limit

### transaction api

#### platon_gas_price()

```cpp
u128 platon::platon_gas_price()
```

Get the value of gas price.

* **Returns**
    * The value of gas price

#### platon_gas()

```cpp
uint64_t platon_gas()
```

Get the value of gas

* **Returns**
    * the value of gas

#### platon_caller_nonce

```cpp
uint64_t platon_caller_nonce()
```

Get the value of the caller's nonce

* **Returns**
    * the value of the caller's nonce

#### platon_call_value()

```cpp
u128 platon::platon_call_value()
```

Get the value of the current transaction value field.

* **Returns**
    * The value of the current transaction value field

#### platon_caller()

```cpp
Address platon::platon_caller()
```

Get the address of caller.

* **Returns**
    * The address of caller

#### platon_origin()

```cpp
Address platon::platon_origin()
```

Get the address of original caller.

* **Returns**
    * The address of original caller

#### platon_address()

```cpp
Address platon::platon_address()
```

Get the address of contract.

* **Returns**
    * The address of contract

### account api

#### make_address() 1/2

```cpp
template <size_t M> std::pair<Address, bool> make_address(const char (&str)[M])
```
The default address recognized by CDT is the main network address, that is, the address prefix is lat. If you want to recognize the test network address prefix is lax, you need to define the macro TESTNET, and you can put #define TESTNET on the first line of the contract.

Converts a c-style string to an address object.

* **Parameters**
    * `str：` C-style string
* **Returns**
    * The return value is pair, whose second represents success or failure, and whose first represents an Address of type Address.

#### make_address() 2/2

```cpp
std::pair<Address, bool> make_address(const std::string &str_address)
```
The default address recognized by CDT is the main network address, that is, the address prefix is lat. If you want to recognize the test network address prefix is lax, you need to define the macro TESTNET, and you can put #define TESTNET on the first line of the contract.

Converts a string to an address object.

* **Parameters**
    * `str：` string
* **Returns**
    * The return value is pair, whose second represents success or failure, and whose first represents an Address of type Address.

#### platon_balance()

```cpp
Energon platon::platon_balance(const Address & addr)
```

Get the balance based on the address.

* **Parameters**
    * `addr:` address
* **Returns**
    * The balance of the address

#### platon_transfer()

```cpp
bool platon::platon_transfer(const Address &addr, const Energon &amount)
```

Transfer the amount of Energon to address.

* **Parameters**
    * `addr:` Accounts address
    * `amount:` The amount of Energon
* **Returns**
    * true if transfer success, false otherwise

#### platon::Energon Class

Energo is a type of currency

* **Public Member Functions**
    * `Energon (u128 n)`
      Construct a new Energon.

    * `const u128 Get () const`
      Get amount of Von.

    * `const bytes Bytes () const`
      Get the bytes of value, the bytes use big-end representations.

    * `Energon & Add (const u128 &v)`
      Add amount of Von.

    * `Energon & Add (const Energon &rhs)`
      Add amount of Von.

    * `Energon & operator+= (const Energon &rhs)`
      Implement operator +=

* **Constructor & Destructor Documentation**

    * `platon::Energon::Energon(u128 n)`
      Construct a new Energon.
        * **Parameters**
            * `n:`amount of Von

* **Member Function Documentation**
    * `Energon& platon::Energon::Add(const Energon & rhs)`
      Add amount of Von.

        * **Parameters**
            * `rhs:`Amount of Von
        * **Returns**
            * The reference of Energon

    * `Energon& platon::Energon::Add(const u128 & v)`
      Add amount of Von.

        * **Parameters**
            * `v:` Amount of Von
        * **Returns**
            * The reference of Energon

    * `const bytes platon::Energon::Bytes() const`

      Get the bytes of value, the bytes use big-end representations.

        * **Returns**
            * The bytes of value

    * `const u128 platon::Energon::Get() const`

      Get amount of Von.

        * **Returns**
            * The amount of Von

    * `Energon& platon::Energon::operator+= ( const Energon & rhs)`

      Implement operator +=

        * **Parameters**
            * `rhs:` Energon object
        * **Returns**
            * The reference of Energon

#### platon::WhiteList< TableName > Class

```cpp
template<Name::Raw TableName>
class platon::WhiteList< TableName >
```

Persist storage whitelist implement.

* **Template Parameters**

* `Name:` Whitelist name, in the same contract, the name should be unique

* **Constructor & Destructor Documentation**

    * `template<Name::Raw TableName>
      platon::WhiteList< TableName >::WhiteList ()`

      Construct a new whitelist.

* **public Member Functions**
    * `WhiteList ()`
      Construct a new whitelist.

    * `void Add (const std::string &addr)`
      Add the address to whitelist.

    * `void Add (const Address &addr)`
      Add the address to whitelist.

    * `void Delete (const std::string &addr)`
      Delete the address from whitelist.

    * `void Delete (const Address &addr)`
      Delete the address from whitelist.

    * `bool Exists (const std::string &addr)`
      Whether the address exists in whitelist.

    * `bool Exists (const Address &addr)`
      Whether the address exists in whitelist.

* **Member Function Documentation**

    * `template<Name::Raw TableName>
      void platon::WhiteList< TableName >::Add ( const Address & addr)`

      Add the address to whitelist.

        * **Parameters**
            * `addr:` Accounts address

    * `template<Name::Raw TableName>
      void platon::WhiteList< TableName >::Add ( const std::string & addr)`
      Add the address to whitelist.

        * **Parameters**
            * `addr:` Accounts address

    * `template<Name::Raw TableName>
      void platon::WhiteList< TableName >::Delete ( const Address & addr)`
      Delete the address from whitelist.
        * **Parameters**
            * `addr:` Accounts address

    * `template<Name::Raw TableName>
      void platon::WhiteList< TableName >::Delete ( const std::string & addr)`
      Delete the address from whitelist.

        * **Parameters**
            * `addr:` Accounts address

    * `template<Name::Raw TableName>
      bool platon::WhiteList< TableName >::Exists ( const Address & addr)`
      Whether the address exists in whitelist.
        * **Parameters**
            * `addr:` Accounts address
        * **Returns**
            * true if exists, false otherwise

    * `template<Name::Raw TableName>
      bool platon::WhiteList< TableName >::Exists ( const std::string & addr)`
      Whether the address exists in whitelist.

        * **Parameters**
            * `addr:` Accounts address
        * **Returns**
            * true if exists, false otherwise

### storage api

#### platon_set_state()

```cpp
void platon_set_state(const uint8_t *key, size_t klen, const uint8_t *value, size_t vlen)
```

Set the state object

* **Parameters**
    * `key:` Key
    * `Klen:` The length of key
    * `value:` Value
    * `vlen:` The length of value

#### platon_get_state_length()

```cpp
size_t platon_get_state_length(const uint8_t *key, size_t klen)
```

Get the length of state object

* **Parameters**
  *`key:` Key
    * `Klen:` The length of key

* **Returns**
    * The length of state object

#### platon_get_state()

```cpp
size_t platon_get_state(const uint8_t *key, size_t klen, uint8_t *value, size_t vlen);
```

Get the state object

* **Parameters**
    * `key:` Key
    * `Klen:` The length of key
    * `value:` Value
    * `vlen:` The length of value

* **Returns**
    * The length of value

#### platon::StorageType< StorageName, T > Class Template

```cpp
template<Name::Raw StorageName, typename T>
class platon::StorageType< StorageName, T >
```

* **Template Parameters**
    * `StorageName:` Element value name, in the same contract, the name needs to be unique
    * `T:` Element type

* **Public Member Functions**
    * `StorageType ()`
      Construct a new Storage Type object

    * `StorageType (const T &d)`
      Construct a new Storage Type object

    * `StorageType (const StorageType< StorageName, T > &)=delete`

    * `StorageType (const StorageType< StorageName, T > &&)=delete`

    * `~StorageType ()`
      Destroy the Storage Type object. Refresh to blockchain.

    * `T & operator= (const T &t)`

    * `template<typename P> bool operator== (const P &t) const`

    * `template<typename P> bool operator!= (const P &t) const`

    * `template<typename P> bool operator< (const P &t) const`

    * `template<typename P> bool operator>= (const P &t) const`

    * `template<typename P> bool operator<= (const P &t) const`

    * `template<typename P> bool operator> (const P &t) const`

    * `template<typename P> T & operator^= (const P &t) const`

    * `template<typename P> T  operator^ (const P &t) const`

    * `template<typename P> T & operator|= (const P &t) const`

    * `template<typename P> T  operator| (const P &t) const`

    * `template<typename P> T & operator&= (const P &t) const`

    * `template<typename P> T  operator& (const P &t) const`

    * `T  operator~ () const`

    * `T & operator<< (int offset)`

    * `T & operator>> (int offset)`

    * `T & operator++ ()`

    * `T  operator++ (int)`

    * `T & operator[] (int i)`

    * `template<typename P> T & operator+= (const P &p)`

    * `template<typename P> T & operator-= (const P &p)`

    * `T & operator* ()`

    * `T *  operator-> ()`

    * `operator bool () const`

    * `T  get () const`

    * `T & self ()`

#### platon::db::Array< TableName, Key, N > Class Template

```cpp
template<Name::Raw TableName, typename Key, unsigned N>
class platon::db::Array< TableName, Key, N >
```

* **Classes**
    * `class const_iterator
      Constant iterator.`

    * `class const_reverse_iterator
      Constant reverse iterator.`

    * `class iterator
      Iterator.`

* **Public Types**
    * `typedef std::reverse_iterator< iterator >  reverse_iterator`

* **Public Member Functions**
    * `Array ()`

    * `Array (const Array< TableName, Key, N > &)=delete`

    * `Array (const Array< TableName, Key, N > &&)=delete`

    * `Array< TableName, Key, N > & operator= (const Array< TableName, Key, N > &)=delete`

    * `~Array ()`

    * `iterator begin ()`
      iterator start position

    * `iterator end ()`
      iterator end position

    * `reverse_iterator rbegin ()`
      Reverse iterator start position.

    * `reverse_iterator rend ()`
      Reverse iterator end position.

    * `const_iterator cbegin ()`
      Constant iterator start position.

    * `const_iterator cend ()`
      Constant iterator end position.

    * `const_reverse_iterator crbegin ()`
      Inverse constant iterator start position.

    * `const_reverse_iterator crend ()`
      Inverse constant iterator end position.

    * `Key & at (size_t pos)`
      Get the specified position element.

    * `Key & operator[] (size_t pos)`
      Bracket operator.

    * `size_t  size ()`
      array size

    * `Key get_const (size_t pos)`
      Get the Const object. Do not flush to cache.

    * `void  set_const (size_t pos, const Key &key)`
      Set the Const object, Do not flush to cache.

* **Static Public Attributes**
    * `static const std::string  kType = "__array__"`

#### platon::db::Map< TableName, Key, Value > Class Template

```cpp
template<Name::Raw TableName, typename Key, typename Value>
class platon::db::Map< TableName, Key, Value >
```

Implement map operations, Map templates.

* **Template Parameters**
    * `TableName:` The name of the Map, the name of the Map should be unique within each contract.
    * `Key:` key type
    * `Value:` value type

  MapType::Traverse The default is Traverse, when Traverse needs extra data structure to operate, set to NoTraverse when no traversal operation is needed.

* **Public Member Functions**
    * `Map ()`

    * `Map(const Map< TableName, Key, Value > &)=delete`

    * `Map(const Map< TableName, Key, Value > &&)=delete`

    * `Map< TableName, Key, Value > & operator= (const Map< TableName, Key, Value > &)=delete`

    * `~Map ()`
      Destroy the Map object Refresh data to the blockchain.

    * `bool insert (const Key &k, const Value &v)`
      Insert a new key-value pair, Update to cache.

    * `bool insert_const (const Key &k, const Value &v)`
      Insert a new key-value pair that will not be updated to the cache. Suitable for large number of inserts, no updates after insertion.

    * `Value  get_const (const Key &k)`
      Get the Const object, will not join the cache.

    * `Value & at (const Key &k)`
      Get value, will be added to the cache.

    * `void  erase (const Key &k)`
      Delete key-value pairs.

    * `Value & operator[] (const Key &k)`
      Bracket operator.

    * `boolcontains (const Key &key)`
      Checks if there is an element with key equivalent to key in the container.

    * `void  flush ()`
      Refresh the modified data in memory to the blockchain.

* **Static Public Attributes**

* `static const std::string  kType = "__map__"`

* **Constructor & Destructor Documentation**

    * `template<Name::Raw TableName, typename Key , typename Value >
      platon::db::Map< TableName, Key, Value >::Map ()`

    * `template<Name::Raw TableName, typename Key , typename Value >
      platon::db::Map< TableName, Key, Value >::Map (const Map< TableName, Key, Value > & )`

    * `template<Name::Raw TableName, typename Key , typename Value >
      platon::db::Map< TableName, Key, Value >::Map (const Map< TableName, Key, Value > && )`

    * `template<Name::Raw TableName, typename Key , typename Value >
      platon::db::Map< TableName, Key, Value >::~Map ()`

Destroy the Map object Refresh data to the blockchain.

* **Member Function Documentation**

    * `template<Name::Raw TableName, typename Key , typename Value >
      Value& platon::db::Map< TableName, Key, Value >::at ( const Key & k )`
      Get value, will be added to the cache.

        * **Parameters**

            * `k:` Key
        * **Returns**

        * Value&
        * **Example:**

          ```cpp
          typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
          MapStr map;
          map.insert("hello", "world");
          assert(map.at["hello"] == "world");
          ```
      ```
      
        ```
      
    * `template<Name::Raw TableName, typename Key , typename Value >
      bool platon::db::Map< TableName, Key, Value >::contains ( const Key & key )`
      Checks if there is an element with key equivalent to key in the container.

        * **Parameters**

            * `k:` Key
        * **Returns**

        * true if there is such an element, otherwise false.
        * **Example:**

          ```cpp
           typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
           MapStr map;
           map.["hello"] = "world";
          assert(map.contains("hello"));
          ```
      ```
      
        ```
      
    * `template<Name::Raw TableName, typename Key , typename Value >
      void platon::db::Map< TableName, Key, Value >::erase ( const Key & k )`
      Delete key-value pairs.

        * **Parameters**

            * `k:` Key
    * **Example:**

        ```cpp
        typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
        MapStr map;
        map.insert("hello", "world");
        map.erase("hello");
      ```

    * `template<Name::Raw TableName, typename Key , typename Value >
      void platon::db::Map< TableName, Key, Value >::flush ()`
      Refresh the modified data in memory to the blockchain.

    * `template<Name::Raw TableName, typename Key , typename Value >
      Value platon::db::Map< TableName, Key, Value >::get_const ( const Key & k)`
      Get the Const object, will not join the cache.

        * **Parameters**

            * `k:` Key
        * **Returns**

        * Value
        * **Example:**

          ```cpp
          typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
          MapStr map;
          map.insert("hello", "world");
          assert(map.get_const["hello"] == "world");
          ```
      ```
      
        ```
      
    * `template<Name::Raw TableName, typename Key , typename Value >
      bool platon::db::Map< TableName, Key, Value >::insert ( const Key & k,
      const Value & v)`
      Insert a new key-value pair, Update to cache.

        * **Parameters**
            * `k:` Key
            * `v:` Value
        * **Returns**

            * true if insert successfully,false otherwise.
    * **Example:**

        ```cpp
        typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
        MapStr map;
        map.insert("hello", "world");
        assert(map["hello"] == "world");
      ```

    * `template<Name::Raw TableName, typename Key , typename Value >
      bool platon::db::Map< TableName, Key, Value >::insert_const ( const Key & k,
      const Value & v)`
      Insert a new key-value pair that will not be updated to the cache. Suitable for large number of inserts, no updates after insertion.

        * **Parameters**
            * `k:` Key
            * `v:` Value
        * **Returns**

            * true if insert successfully,false otherwise.
    * **Example:**

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
      Bracket operator.

        * **Parameters**

            * `k:` Key
        * **Returns**

        * Value& Get Value
        * **Example:**

          ```cpp
          typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
          MapStr map;
          map.["hello"] = "world";
          ```

* **Member Data Documentation**
    * `template<Name::Raw TableName, typename Key , typename Value >
      const std::string platon::db::Map< TableName, Key, Value >::kType = "__map__"`

#### template<Name::Raw TableName, typename T, typename... Indices> class platon::db::MultiIndex< TableName, T, Indices >

MultiIndex supports unique indexes and ordinary indexes. The unique index should be placed first in the parameter. The structure needs to provide the get function corresponding to the index field.

* **Member Function Documentation**
    * `template<Name::Raw TableName, typename T , typename... Indices>const_iterator platon::db::MultiIndex< TableName, T, Indices >::cbegin()`
      Iterator start position

        * **Returns**
            * const_iterator
        * **Example:**

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
      Iterator end position

        * **Returns**
            * const_iterator
        * **Example:**

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

        * **Returns**
            * Gets the number of data corresponding to the index value
        * **Example:**

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

        * **Parameters**
            * constructor of value
        * **Returns**
            * Returns an iterator that indicates whether the insertion was successful with the bool type. If unique index conflicts, the insertion fails
        * **Example:**

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
      erase data based on iterator

        * **Parameters**
            * `position:` position of iterator
        * **Example:**

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
      Find the data, Only a unique index is available.

        * **Parameters**
            * `key:` key of index
        * **Returns**
            * the first iterator. cend() if not found.
        * **Example:**

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
      Gets the index object of a non-unique index.

        * **Returns**
            * index object
        * **Example:**

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
      Modify data based on iterator, but cannot modify all index-related fields .

        * **Parameters**
            * `position:` position of iterator
            * `constructor:` lambda function that updates the target object
        * **Example:**

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


### contract api

#### platon_destroy()

```cpp
bool platon::platon_destroy ( const Address & addr)
```

Destory contract.

* **Parameters**
    * `addr:` Address of the contract
* **Returns**
    * true if destroy successfully, false otherwise

#### platon_migrate_contract()

```cpp
template<typename value_type , typename gas_type >
bool platon::platon_migrate_contract ( Address & addr,
const bytes & init_args,
value_type  value,
gas_type  gas)
```

Migrate contract.

* **Parameters**
    * `addr:` The address of new contract
    * `init_args:` The input arguments
    * `value:` Transfer amount
    * `gas:` Pay amount of gas for this transaction
* **Returns**
    * true if migration successfully, false otherwise

#### cross_call_args()

```cpp
template<typename... Args>
bytes platon::cross_call_args ( const std::string & method,
const Args &...  args)  
```

Construct the Parameters of the call across contracts.

* **Parameters**
    * `method:` The method name of the invoked contract
    * `args:` The Parameters corresponding to the contract method
* **Returns**
    * Parameter byte array

#### platon_call() 

```cpp
template <typename value_type, typename gas_type, typename... Args>
inline bool platon_call(const Address &addr, const value_type &value,
const gas_type &gas, const std::string &method,
const Args &... args)
```

Cross-contract call without return value.

* **Parameters**
    * `addr：`The contract address to be invoked
    * `value：`The amount transferred to the contract
    * `gas：`The called contract method estimates the gas consumed
    * `method：`The method name of the invoked contract
    * `args：`The Parameters corresponding to the contract method
* **Returns**
    
  * Call success or failure
  
* **Example:**

   ```cpp
   auto address_pair =make_address("lax10jc0t4ndqarj4q6ujl3g3ycmufgc77epxg02lt");
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

Cross-contract call with return value.

* **Parameters**
    * `addr：`The contract address to be invoked
    * `value：`The amount transferred to the contract
    * `gas：`The called contract method estimates the gas consumed
    * `method：`The method name of the invoked contract
    * `args：`The Parameters corresponding to the contract method
* **Returns**
    
* Return value and call success or failure
    
* **Example:**

   ```cpp
  auto address_pair =make_address("lax10jc0t4ndqarj4q6ujl3g3ycmufgc77epxg02lt"); 
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

Cross-contract proxy call without return value.

* **Parameters**
    * `addr：`The contract address to be invoked
    * `gas：`The called contract method estimates the gas consumed
    * `method：`The method name of the invoked contract
    * `args：`The Parameters corresponding to the contract method
* **Returns**
    
  * Call success or failure
  
* **Example:**

  ```cpp
   auto address_pair =make_address("lax10jc0t4ndqarj4q6ujl3g3ycmufgc77epxg02lt");
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

Cross-contract proxy call with return value.

* **Parameters**
    * `addr：`The contract address to be invoked
    * `gas：`The called contract method estimates the gas consumed
    * `method：`The method name of the invoked contract
    * `args：`The Parameters corresponding to the contract method
* **Returns**
    
  * Return value and call success or failure
  
* **Example:**

  ```cpp
  auto address_pair = make_address("lax10jc0t4ndqarj4q6ujl3g3ycmufgc77epxg02lt"); 
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

Gets the return value of calling contract methods across contracts.

* **Template Parameters**
    * `T:` The output value type
* **Parameters**
    * `t:` The value returned by the contract method

#### platon_event

```cpp
void platon_event(const uint8_t *topic, size_t topic_len, const uint8_t *args,
                  size_t args_len);
```

Post event to VM

* **Parameters**
    * `topic:` The topic of event
    * `topic_len:` The length of topic
    * `args:` The arguments
    * `args_len:` The length of arguments

### exception api

#### platon_panic

```cpp
void platon_panic(void);
```

Terminate transaction, deduct all gas given by transaction

#### platon_revert

```cpp
void platon_revert(void);
```

Terminate the transaction and deduct the gas consumed

### other api

#### platon_sha3()

```cpp
h256 platon::platon_sha3 ( const bytes & data )
```

Sh3 algorithm.

* **Parameters**
    * `data:` Binary data
* **Returns**
    * The Hash of the data

---
