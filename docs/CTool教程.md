---
id: CTool_Manual
title: CTool tutorial
sidebar_label: CTool tutorial
---

CTool is an integrated tool kit for wallet/contract transactions on PlatON. It allows users to create wallets, transfer funds, and engage in contract transactions **safely and conveniently** on PlatON. This document introduces the operating environment of the contract tools and how they are used.  

To keep the wallet and private key safe and secure, users need to set up two operating environments:  

- An offline operating environment specifically used to generate regular/HD wallets and to store wallets and private keys, as well as offline signatures of transaction files, including batch operations for staking, transfers, locking, trading contracts, etc.  
- An online operating environment for sending PlatON offline-signed transactions, including batch operations for staking, transfers, locking, trading contracts, etc.  

More specifically, you will go through the process as below:  

## 1. Install the Offline CTool

### **1.1 Hardware Requirements**

A computer running Windows 10 without any Internet connection (e.g. WiFi and network cable).  

A USB flash drive that contains `CTool.exe` (the CTool installation package).  

A USB flash drive used to store and copy data (from/to the offline device/the online device).  

### **1.2 Install CTool**

For security concerns, the offline CTool should be installed on an offline device without any Internet connection.  

**step1.** Download the CTool installation package  

Download path: https://download.platon.network/platon/CTool/CTool.exe.

**step2.** Copy `CTool.exe` to **the offline device** through a secure storage medium, such as a USB flash drive or hard drive.  

**step3.** Install CTool on **the offline device**  

Double-click `CTool.exe`  to install CTool. The default installation directory is `C:\CTool`. We do not recommend changing this default setting. The popup window notice of “**Completing the CTool Setup Wizard**” indicates that CTool has been installed, and you can now click on **Finish.**  

### **1.3 Config Modification**

To support the different chain-id of the two versions, we added new config files to adjust the chain-id, as well as the ip and rpc ports. Config file path: `C:\CTool\bin\config\config.json`. Config file template:  

```json
{
	"wallet_file_base_dir": "C:\CTool\keystore\",
	"prikey_file_base_dir": "C:\CTool\priatekey\",
	"validator_file_base_dir": "C:\CTool\validator\",
	"unsigned_transaction_file_dir": "C:\CTool\unsigned_transaction\",
	"signed_transaction_file_dir": "C:\CTool\signed_transaction\",
	"transaction_result_dir": "C:\CTool\transaction_result\",
    "rpc_url":"http://127.0.0.1:6789",
	"chain_id": 210425,
	"hrp_type": "lat"
}
```

> **Fields:**
>
> - wallet_file_base_dir: the directory where regular/HD wallet files are generated;
>
> - prikey_file_base_dir: the directory where the private keys and QR codes of regular/HD wallets are generated;
>
> - validator_file_base_dir: the directory for staking node info and config files;
>
> - unsigned_transaction_file_dir: the directory where unsigned transactions are saved;
>
> - signed_transaction_file_dir: the directory where signed transaction files are saved;
>
> - transaction_result_dir: the directory where the results of sending and verifying transactions are saved;
>
> - rpc_url: the path for calling a node’s rpc interface;
>
> - chain_id: the ChainID of the current version used by the node (the ChainID of the PlatON mainnet: 210425);
>
> - hrp_type: the bech32 address format prefix;
>
>   **The above config file should be modified as appropriate.**  

### **1.4 File Templates**

After CTool is installed, you can find the config files relating to the generation of wallets and transactions under `C:\CTool\template`. Specifically:  

- `wallet_file.xlsx`, the wallet config file, includes the configuration for generating regular/HD wallets;  

  > Note:
  >
  > - As the wallet and private key files are stored under **`the Private Key Manager\Wallet Type\Account Usage`** path, the three fields cannot contain special characters, such as `\`;

- `transfer_file.xlsx` is the transfer transaction config file;  

- `restrict_file.xlsx` is the locking transaction config file;  

Please modify the config files according to the template format.  

## **2. Install the Online CTool**

Refer to the installation of the offline CTool for the specific methods and steps.  

## **3. Operating Steps**

- Generate wallet           

  For security concerns, we recommend generating wallets on the offline machine;  

- About transactions  

  - Generating unsigned files and sending transactions are both operations that ought to be executed on the online device;  
  - Transactions are signed on the offline device;  

### **3.1 Generate Wallet**

Modify `wallet_file.xlsx` (the wallet config file) under `C:\CTool\template` in advance;  

#### **3.1.1 Generate Regular Wallet**

Execute the command:  

```shell
batch_generate_wallet -f C:\CTool\template\wallet_file.xlsx --empty_keystore
```

> -f: wallet config file path;  
>
> --empty_keystore: the command will empty the files in the wallet file directory and wallet private key directory, which correspond to the directories of `wallet_file_base_dir` and `prikey_file_base_dir`, specified in [1.3 Config Modification](#1.3 修改config配). Please use the command as appropriate. The files are not emptied by default.  
>
> After the command is executed, the regular wallet file and the regular wallet private key file will be generated under the configured directory; and the password file `password_xxxx.txt` corresponding to the wallet file is also generated. In particular, the password file format is `$address:$password`, in which `$address` represents the address, and `$password` corresponds to the plaintext. In addition, the plaintext is randomly generated, for instance:  
>
> ```txt
>lat1jhsv560t2cx7m90fwsu66uhegjtm2w7049s6d9:DWkRAJU8
> ```

#### **3.1.2 Generate HD Wallet**

Execute the command:  

```shell
batch_generate_wallet -f C:\CTool\template\wallet_file.xlsx -t hd
```

> -f: wallet config file path;  
>
> -t: wallet type (HD indicates that a hierarchical deterministic wallet will be generated);
>
> After the command is executed, the HD wallet file and the HD wallet private key file will be generated under the configured directory;  

### **3.2 Batch Transfer**

Modify `transfer_file.xlsx` (the transfer transaction config file) under `C:\CTool\template` in advance;  

- Generate the unsigned transfer transaction file  

Execute the command:  

``` bash
batch_unsigned_transfer_tx -f C:\CTool\template\transfer_file.xlsx
```

> Note:
>
> - -f: the transfer transaction config file;  
>
> After the command is executed, `unsigned_transfer_transactions.csv` (the unsigned transfer transaction file) will be generated under `unsigned_transaction_file_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  
>
> 

- Generate signed transfer transaction files  

Execute the command:  

``` bash
batch_signed_transfer_tx -f C:\CTool\unsigned_transaction\unsigned_transfer_transactions.csv -k C:\CTool\keystore
```

> Note:
>
> -f: the unsigned transfer transaction file;  
>
> -k: the path of the wallet file for transfer transactions; if the wallet is provided externally, you will need to name the wallet the address and then add the address and password of the wallet file to the current password file `password.txt` following the format `$address:$password`.  
>
> After the command is executed, `signed_transfer_transaction.csv` (the signed transfer transaction file) will be generated under `signed_transaction_file_dir`, specified in [1.3 Config Modification](#1.3 修改config配).



- Send batch transfer transactions  

Execute the command:  

```bash
batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_transfer_transaction.csv -t transfer --no-wait
```

> Note:
>
> -f: the signed transfer transaction file;  
>
> -t: transaction type, including staking\transfer\restrict;  
>
> -s: sleep time after sending each transaction (measured in milliseconds; default: 100 ms);
>
> --no-wait: the transaction hash will be directly returned, without waiting for the receipt; `--wait: wait for the transaction receipt (it will take longer to send transactions by this means)`;
>
> Print information such as the transaction hash and the balance of the from/to address accounts before the transfer (unit: ATP). After all the transactions are sent, `transfer_transaction_result.csv` (the transaction result file) will be generated under `transaction_result_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  
>
> 
>
> **Verify transactions:**
>
> - Use the generated result file `transfer_transaction_result.csv` to verify whether the transaction was successful:  
>
> ```shell
> verify_transaction_result -f C:\CTool\template\transfer_file.xlsx -r C:\CTool\transaction_result\transfer_transaction_result.csv -t transfer
> ```
>
> After verification, `check_transfer_result_XXXXXXXXXXX.csv` (a test file) will be generated, which records information such as the balance of the from/to address accounts before and after the transfer (unit: ATP);  
>
> Where `err_transfer_result_XXXXXXXXXXX.csv` is generated, the transaction is abnormal, and you will need to resend the transfer transaction using `transfer_file_XXXXXXXXXXX.xlsx`.  



### 3.3 Batch Staking Nodes

Modify `staking_file.xlsx` (the batch staking config file) under `C:\CTool\template` in advance;  

- **Generate the unsigned batch staking file**  

Execute the command:  

``` bash
batch_unsigned_staking_tx -f C:\CTool\template\staking_file.xlsx
```

> Note:
>
> - -f: the node staking info file  
>
> After the command is executed, `unsigned_staking_transactions.csv` (the unsigned staking transaction file) will be generated under `unsigned_transaction_file_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  



- **Generate the signed staking transaction file**

Execute the command:  

``` bash
batch_signed_staking_tx -f C:\CTool\unsigned_transaction\unsigned_staking_transactions.csv -k C:\CTool\keystore
```

> Note:
>
> -f: the unsigned staking transaction file;  
>
> -k: the path of the wallet file for staking addresses; if the wallet is provided externally, you will need to name the wallet the address and then add the address and password of the wallet file to the current password file `password.txt` following the format `$address:$password`.  
>
> After the command is executed, `signed_staking_transaction.csv` (the signed staking transaction file) will be generated under `signed_transaction_file_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  



- **Send node staking transactions**  

Execute the command:  

```bash
batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_staking_transaction.csv -t staking --no-wait
```

> Note:
>
> -f: Signed staking transaction file;  
>
> -t: transaction type, including staking\transfer\restrict;  
>
> -s: sleep time after sending each transaction (measured in milliseconds; default: 100 ms);  
>
> --no-wait: the transaction hash will be directly returned, without waiting for the receipt; `--wait: wait for the transaction receipt (it will take longer to send transactions by this means)`;
>
> Print information such as the transaction hash and the transaction type. After all the transactions are sent, `staking_transaction_result.csv` (the transaction result file) will be generated under `transaction_result_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  
>
> 
>
> **Check whether the transactions are on the chain:**  
>
> - To check whether all the transactions are on the chain, execute:  
>
> ```shell
> batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_staking_transaction.csv -t staking --check
> ```
>
>   > - If `not all transactions are on the chain, please wait!!!` pops up, then not all the transactions are on the chain. In this case, please wait, and do not **verify transactions** (repeat the above command after a while);  
>   > - If `all transactions are on the chain.` pops up, then all the transactions are on the chain, and you can **verify the transactions** to see whether they are successful;  
>
> 
>
> **Verify transactions:**
>
> - Use the generated result file `staking_transaction_result.csv` to verify whether the transaction was successful:  
>
> ```shell
> verify_transaction_result -f C:\CTool\template\staking_file.xlsx -r C:\CTool\transaction_result\staking_transaction_result.csv -t staking
> ```
>
> After verification, `check_staking_result_XXXXXXXXXXX.csv` (a test file) will be generated, which records information such as the balance of the staking accounts (unit: LAT) and staking nodes before and after the transfer;  
>
> Where `err_staking_result_XXXXXXXXXXX.csv` is generated, the transaction is abnormal, and you will need to resend the staking transaction using `staking_file_XXXXXXXXXXX.xlsx`.  



### **3.4 Batch Locking**

- Generate the unsigned locking transaction file  

Execute the command:  

```bash
batch_unsigned_restrict_tx -f C:\CTool\template\restrict_file.xlsx
```

> Note:
>
> - -f: the batch locking config file  
>
> After the command is executed, `unsigned_restrict_transaction.csv` (the unsigned locking transaction file) will be generated under `unsigned_transaction_file_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  



- Generate the signed locking transaction file  

Execute the command:

```bash
batch_signed_restrict_tx -f C:\CTool\unsigned_transaction\unsigned_restrict_transaction.csv -k C:\CTool\keystore
```

> Note:
>
> -f: the unsigned locking transaction file  
>
> -k: the path of the wallet file for locking transactions; if the wallet is provided externally, you will need to name the wallet the address and then add the address and password of the wallet file to the current password file `password.txt` following the format `$address:$password`.  
>
> After the command is executed, `signed_restrict_transaction.csv` (the signed locking transaction file) will be generated under `signed_transaction_file_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  



- Send locking transactions  

Execute the command:

```bash
batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_restrict_transaction.csv -t restrict --no-wait
```

> Note:
>
> -f: the signed locking transaction file;  
>
> -t: transaction type, including staking\transfer\restrict;  
>
> -s: sleep time after sending each transaction (measured in milliseconds; default: 100 ms);  
>
> --no-wait: the transaction hash will be directly returned, without waiting for the receipt; `--wait: wait for the transaction receipt (it will take longer to send transactions by this means)`;
>
> Print information such as the transaction hash and the transaction type. After all the transactions are sent, `restrict_transaction_result.csv` (the statistics file) will be generated.  
>
> 
>
> **Check whether the transactions are on the chain:**  
>
> - To check whether all the transactions are on the chain, execute: 
>
> ```shell
> batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_restrict_transaction.csv -t restrict --check
> ```
>
>   > - If `not all transactions are on the chain, please wait!!!` pops up, then not all the transactions are on the chain. In this case, please wait, and do not **verify transactions** (repeat the above command after a while);  
>   > - If `all transactions are on the chain.` pops up, then all the transactions are on the chain, and you can **verify the transactions** to see whether they are successful;  
>
> 
>
> **Verify transactions:**  
>
> - Use the generated result file `restrict_transaction_result.csv` to verify whether the transaction was successful:  
>
> ```shell
> verify_transaction_result -f C:\CTool\template\restrict_file.xlsx -r C:\CTool\transaction_result\restrict_transaction_result.csv -t restrict
> ```
>
> After verification, `check_restrict_result_XXXXXXXXXXX.csv` (a test file) will be generated, which records information such as the free balance of the from account (unit: LAT) before and after the locking;  
>
> Where `err_restrict_result_XXXXXXXXXXX.csv` is generated, the transaction is abnormal, and you will need to resend the locking transaction using `restrict_file_XXXXXXXXXXX.xlsx`.  



### **3.5 General Contract Transaction (Batch)**

- Acquire the abi and bin files of the contract  

- Copy the abi and bin files  to the device where CTool is installed;  

- Generate the config file template for contract transactions  

  ```bash
  generate_erc20_file -a $abi_path -c contractName -n func_name -s $save_dir
  ```

  > Parameters:
  >
  > -a: the path of the contract abi file;  
  >
  > -c: the contract name; if not specified, the default name ERC20 will be used;  
  >
  > -n: the function name; if not specified, the default name constructor will be used, which indicates contract deployment;  
  >
  > -s: the directory where the file is saved; if not specified, the file will be saved in the current directory;
  >
  > 
  >
  > After the command is executed, the config file `{$contractName}_{$func_name}_file.xlsx` will be generated under `$save_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  
  >
  > In particular, “from” indicates the address that initiates the contract transaction, “contract_address” represents the contract address, and param_xxx refers to the parameters of the function;  
  
- Edit the config file of contract transactions  

  Edit `{$contractName}_{$func_name}_file.xlsx` according to specific needs;  

  

- Generate the unsigned contract transaction file  

  Copy the edited config file of contract transactions to the online device where CTool is installed, and execute:  

```shell
batch_unsigned_erc20_tx -f {$contractName}_{$func_name}_file.xlsx -a $abi_path -b $bin_path -c $contractName -d $contract_address -n $func_name
```

> Parameters:
>
> -f: the path of the contract transaction file;  
>
> -a: the path of the contract abi file;  
>
> -b: the path of the contract bin file;  
>
> -c: the contract name;  
>
> -d: the erc2.0 contract address; if not specified, the address will be read from the `contract_address` field in the contract transaction file; **when specifying the address, please change $contract_address to an authentic contract address;** if contract deployment is required, then no address should be specified;  
>
> -n: the function name; if not specified, the default name `transfer` will be used, which indicates contract transfer transaction; if contract deployment is required, then the name should be specified as **constructor**;  
>
> 
>
> After the command is executed, `unsigned_{$contractName}_{$func_name}_transactions.csv` (the unsigned contract transaction file) will be generated under`unsigned_transaction_file_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  



- Sign contract transactions  

```shell
batch_signed_erc20_tx -f C:\CTool\unsigned_transaction\unsigned_{$contractName}_{$func_name}_transactions.csv -k C:\CTool\keystore
```

> Parameters:
>
> -f: the unsigned erc2.0 contract transaction file;  
>
> -k: the path of the wallet file for transfer transactions; if the wallet is provided externally, you will need to name the wallet the address and then add the address and password of the wallet file to the current password file `password.txt` following the format `$address:$password`;  
>
> After the command is executed, `signed_{$contractName}_{$func_name}_transactions.csv` (the unsigned contract transaction file) will be generated under `signed_transaction_file_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  



- Send the contract transaction  

```shell
batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_{$contractName}_{$func_name}_transactions.csv -t erc20 --no-wait
```

> Parameters:
>
> -f: the signed contract transaction file;  
>
> -t: transaction type, including staking\transfer\restrict\erc20;  
>
> -s: sleep time after sending each transaction (measured in milliseconds; default: 100 ms);  
>
> --no-wait: the transaction hash will be directly returned, without waiting for the receipt; `--wait: wait for the transaction receipt (it will take longer to send transactions by this means). If contract deployment is required, then the result files will need to save the contract address, and this parameter will be needed`;
>
> 
>
> After the command is executed, `{$contractName}_{$func_name}_transaction_result.csv` (the signed contract transaction file) will be generated under `transaction_result_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  
>
> 
>
> **Check whether the transactions are on the chain:**  
>
> - To check whether all the transactions are on the chain, execute:  
>
> ```shell
> batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_{$contractName}_{$func_name}_transactions.csv -t erc20 --check
> ```
>
>   > - If `not all transactions are on the chain, please wait!!!` pops up, then not all the transactions are on the chain. In this case, please wait, and do not **verify transactions** (repeat the above command after a while);
>   > - If `all transactions are on the chain.` pops up, then all the transactions are on the chain, and you can **verify the transactions** to see whether they are successful;

​         

- Verify contract transactions  

Use the generated result file `{contractName}_{func_name}_transaction_result.csv` to verify whether the transaction was successful:  

```shell
verify_transaction_result -f {$contractName}_{$func_name}_file.xlsx -r C:\CTool\transaction_result\{$contractName}_{$func_name}_transaction_result.csv -t erc20
```

After verification, `check_{$contractName}_{$func_name}_result_XXXXXXXXXXX.csv` (a test file) will be generated, which records information such as the verification result of contract transfer transactions;  

Where `err_{$contractName}_{$func_name}_result_XXXXXXXXXXX.csv` is generated, the transaction is abnormal, and you will need to resend the contract transaction using `{$contractName}_{$func_name}_file_XXXXXXXXXXX.xlsx`.  

​        

### 3.6 **Batch NFT Transaction**

#### **3.6.1 Contract Deployment**

- Generate the unsigned contract deployment file  

  Copy the edited config file of contract deployment transactions `C:\CTool\template\erc721_constructor_file.xlsx` to the online device where CTool is installed, and execute:  

```shell
batch_unsigned_erc20_tx -f C:\CTool\template\erc721_constructor_file.xlsx -a C:\CTool\bin\contract\erc721.abi -b C:\CTool\bin\contract\erc721.bin -c ERC721 -n constructor
```

> Parameters:
>
> -f: the path of the contract transaction file;  
>
> -a: the path of the NFT contract abi file;  
>
> -b: the path of the NFT contract bin file;  
>
> -c: the NFT contract name;  
>
> -n: the NFT contract interface name; `constructor` refers to the contract constructor name and is used for contract deployment;  
>
> 
>
> After the command is executed, `unsigned_ERC721_deploy_transactions.csv` (the unsigned contract transaction file) will be generated under `unsigned_transaction_file_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  



- Sign erc721 contract transactions  

```shell
batch_signed_erc20_tx -f C:\CTool\unsigned_transaction\unsigned_ERC721_deploy_transactions.csv -k C:\CTool\keystore
```

> Parameters:
>
> -f: the unsigned contract transaction file;  
>
> -k: the path of the wallet file for transfer transactions; if the wallet is provided externally, you will need to name the wallet the address and then add the address and password of the wallet file to the current password file `password.txt` following the format `$address:$password`;  
>
> After the command is executed, `signed_ERC721_deploy_transactions.csv` (the signed contract transaction file) will be generated under `signed_transaction_file_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  



- Send contract transactions  

```shell
batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_ERC721_deploy_transactions.csv -t erc20 --no-wait
```

> Parameters:
>
> -f: the signed contract transaction file;  
>
> -t: transaction type, including staking\transfer\restrict\erc20;
>
> s: sleep time after sending each transaction (measured in milliseconds; default: 100 ms); this parameter will become invalid when the specified `-m` is greater than 0;
>
> --no-wait: the transaction hash will be directly returned, without waiting for the receipt; `--wait: wait for the transaction receipt (it will take longer to send transactions by this means). If contract deployment is required, then the result files will need to save the contract address, and this parameter will be needed`;
>
> 
>
> After the command is executed, `ERC721_deploy_transaction_result.csv` (the signed contract transaction file) will be generated under `transaction_result_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  
>
> 
>
> **Check whether the transactions are on the chain:** 
>
> - To check whether all the transactions are on the chain, execute:   
>
> ```shell
> batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_ERC721_deploy_transactions.csv -t erc20 --check
> ```
>
>   > - If `not all transactions are on the chain, please wait!!!` pops up, then not all the transactions are on the chain. In this case, please wait, and do not **verify transactions** (repeat the above command after a while);
>   > - If `all transactions are on the chain.` pops up, then all the transactions are on the chain, and you can **verify the transactions** to see whether they are successful;



- Verify contract transactions

Use the generated result file `ERC721_deploy_transaction_result.csv` to verify whether the transaction was successful:

```shell
verify_transaction_result -f C:\CTool\template\erc721_constructor_file.xlsx -r C:\CTool\transaction_result\ERC721_deploy_transaction_result.csv -t erc20
```

After verification, `check_ERC721_deploy_result_XXXXXXXXXXX.csv` (a test file) will be generated, which records the verification result of the erc721 contract transaction;  

Where `err_ERC721_deploy_result_XXXXXXXXXXX.csv` is generated, the transaction is abnormal, and you will need to resend the erc721 contract transaction using `ERC721_deploy_file_XXXXXXXXXXX.xlsx`.  



#### **3.6.2 Batch Minting**

- Generate the unsigned batch minting  transaction file

  Copy the edited config file of contract transfer transactions `C:\CTool\template\erc721_mint_file.xlsx` to the online device where CTool is installed, and execute:  

```shell
batch_unsigned_erc20_tx -f C:\CTool\template\erc721_mint_file.xlsx -a C:\CTool\bin\contract\erc721.abi -b C:\CTool\bin\contract\erc721.bin -c ERC721 -n mint -d $contract_address
```

> Parameters:
>
> -f: the path of the contract transaction file;  
>
> -a: the path of the NFT contract abi file;  
>
> -b: the path of the NFT contract bin file;  
>
> -c: the NFT contract name;
>
> -n: the NFT contract interface name; `constructor` refers to the contract constructor name and is used for contract deployment;
>
> -d: the contract address; if not specified, the address will be read from the `contract_address` field in the contract transaction file; **when specifying the address, please change $contract_address to an authentic contract address,** which can be acquired from [contract deployment](#3.12.1%20%E9%83%A8%E7%BD%B2%E5%90%88%E7);  
>
> After the command is executed, `unsigned_ERC721_mint_transactions.csv` (the unsigned contract transaction file) will be generated under `unsigned_transaction_file_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  



- Sign erc721 contract transactions  

```shell
batch_signed_erc20_tx -f C:\CTool\unsigned_transaction\unsigned_ERC721_mint_transactions.csv -k C:\CTool\keystore
```

> Parameters:
>
> -f: the unsigned contract transaction file;  
>
> -k: the path of the wallet file for transfer transactions; if the wallet is provided externally, you will need to name the wallet the address and then add the address and password of the wallet file to the current password file `password.txt` following the format `$address:$password`;
>
> After the command is executed, `signed_ERC721_mint_transactions.csv` (the signed contract transaction file) will be generated under `signed_transaction_file_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  



- Send erc721 contract transactions  

```shell
batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_ERC721_mint_transactions.csv -t erc20 --no-wait
```

> Parameters:
>
> -f: the signed contract transaction file;  
>
> -t: transaction type; including staking/transfer/restrict/erc20;
>
> s: sleep time after sending each transaction (measured in milliseconds; default: 100 ms); this parameter will become invalid when the specified `-m` is greater than 0;
>
> --no-wait: the transaction hash will be directly returned, without waiting for the receipt; `--wait: wait for the transaction receipt (it will take longer to send transactions by this means)`;
>
> 
>
> After the command is executed, `ERC721_mint_transaction_result.csv` (the signed contract transaction file) will be generated under `transaction_result_dir`, specified in [1.3 Config Modification](#1.3 修改config配).  
>
> 
>
> **Check whether the transactions are on the chain:**  
>
> - To check whether all the transactions are on the chain, execute:  
>
> ```shell
> batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_ERC721_mint_transactions.csv -t erc20 --check
> ```
>
>   > - If `not all transactions are on the chain, please wait!!!` pops up, then not all the transactions are on the chain. In this case, please wait, and do not **verify transactions** (repeat the above command after a while);
>   > - If `all transactions are on the chain.` pops up, then all the transactions are on the chain, and you can **verify the transactions** to see whether they are successful;



- Verify contract transactions

Use the generated result file `ERC721_mint_transaction_result.csv` to verify whether the transaction was successful:  

```shell
verify_transaction_result -f C:\CTool\template\erc721_mint_file.xlsx -r C:\CTool\transaction_result\ERC721_mint_transaction_result.csv -t erc20
```

After verification, `check_ERC721_mint_result_XXXXXXXXXXX.csv` (a test file) will be generated, which records the verification result of the contract minting transaction;

Where `err_ERC721_mint_result_XXXXXXXXXXX.csv` is generated, the transaction is abnormal, and you will need to resend the erc721 contract transaction using `ERC721_mint_file_XXXXXXXXXXX.xlsx`.

#### **3.6.3 Batch NFT Transactions**

- Edit the config file of erc721 contract transactions  

  Edit `C:\CTool\template\erc721_safeTransferFrom_file.xlsx` according to specific needs;  

  | from | contract_address | param_from | param_to | param_tokenId |
  | ---- | ---------------- | ---------- | -------- | ------------- |
  |      |                  |            |          |               |

  > Fields:
  >
  > - from: the address for sending contract transactions, i.e. the minting address `$param_from`;
  > - contract_address: the erc721 contract address；
  > - param_from: the minting address;
  > - param_to: the voting/recipient NFT wallet;
  > - param_tokenId: the token ID;

- Generate the unsigned erc721 contract transfer transaction file  

  Copy the edited config file of contract transfer transactions `C:\CTool\template\erc721_safeTransferFrom_file.xlsx` to the online device where CTool is installed, and execute:

```shell
batch_unsigned_erc20_tx -f C:\CTool\template\erc721_safeTransferFrom_file.xlsx -a  C:\CTool\bin\contract\erc721.abi -b C:\CTool\bin\contract\erc721.bin -c erc721 -d $contract_address -n safeTransferFrom 
```

> Parameters:
>
> -f: the path of the contract transaction file;
>
> -a: the path of the erc721 contract abi file;
>
> -b: the path of the erc721 contract bin file;
>
> -c: the erc721 contract name;
>
> -d: the erc721 contract address; if not specified, the address will be read from the `contract_address` field in the contract transaction file; **when specifying the address, please change $contract_address to an authentic contract address;**
>
> -n: the function name; if not specified, the default name `transfer` will be used, i.e. erc721 contract transfer transaction;
>
> After the command is executed, `unsigned_erc721_safeTransferFrom_transactions.csv` (the unsigned contract transaction file) will be generated under `unsigned_transaction_file_dir`, specified in [1.3 Config Modification](#1.3 修改config配).



- Sign erc721 contract transactions

```shell
batch_signed_erc20_tx -f C:\CTool\unsigned_transaction\unsigned_erc721_safeTransferFrom_transactions.csv -k C:\CTool\keystore
```

> Parameters:
>
> -f: the unsigned erc2.0 contract transaction file;
>
> -k: the path of the wallet file for transfer transactions; if the wallet is provided externally, you will need to name the wallet the address and then add the address and password of the wallet file to the current password file `password.txt` following the format `$address:$password`;
>
> After the command is executed, `signed_erc721_safeTransferFrom_transactions.csv` (the signed contract transaction file) will be generated under `signed_transaction_file_dir`, specified in [1.3 Config Modification](#1.3 修改config配).



- Send erc721 contract transactions

```shell
batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_erc721_safeTransferFrom_transactions.csv -t erc20 -n 1 -m 20 --no-wait
```

> Parameters:
>
> -f: the signed contract transaction file;
>
> -t: transaction type, including staking\transfer\restrict\erc20;
>
> -s: sleep time after sending each transaction (measured in milliseconds; default: 100 ms); this parameter will become invalid when the specified `-m` is greater than 0;
>
> -n: the minimum sleep time after sending each transaction (measured in minutes; 0 by default);
>
> -m: the maximum sleep time after sending each transaction (measured in minutes; 0 by default);
>
> --no-wait: the transaction hash will be directly returned, without waiting for the receipt; `--wait: wait for the transaction receipt (it will take longer to send transactions by this means)`;
>
> 
>
> After the command is executed, `erc721_safeTransferFrom_transaction_result.csv` (the signed contract transaction file) will be generated under `transaction_result_dir`, specified in [1.3 Config Modification](#1.3 修改config配).
>



> **Check whether the transactions are on the chain:**
>
> - To check whether all the transactions are on the chain, execute:  
>
> ```shell
> batch_send_raw_transaction -f C:\CTool\signed_transaction\signed_erc721_safeTransferFrom_transactions.csv -t erc20 --check
> ```
>
>   > - If `not all transactions are on the chain, please wait!!!` pops up, then not all the transactions are on the chain. In this case, please wait, and do not **verify transactions** (repeat the above command after a while);
>   > - If `all transactions are on the chain.` pops up, then all the transactions are on the chain, and you can **verify the transactions** to see whether they are successful;



- Verify contract transactions

Use the generated result file `erc721_safeTransferFrom_transaction_result.csv` to verify whether the transaction was successful:

```shell
verify_transaction_result -f C:\CTool\template\erc721_safeTransferFrom_file.xlsx -r C:\CTool\transaction_result\erc721_safeTransferFrom_transaction_result.csv -t erc20
```

After verification, `check_erc721_safeTransferFrom_result_XXXXXXXXXXX.csv` (a test file) will be generated, which records the verification result of the erc721 contract transaction;

Where `err_erc721_safeTransferFrom_result_XXXXXXXXXXX.csv` is generated, the transaction is abnormal, and you will need to resend the erc721 contract transaction using `erc721_safeTransferFrom_file_XXXXXXXXXXX.xlsx`.

