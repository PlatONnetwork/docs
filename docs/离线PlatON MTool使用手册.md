---
id: OffLine_MTool_Manual
title: OffLine PlatON MTool Manual
sidebar_label: OffLine PlatON MTool Manual
---

## Introduction

In order to facilitate node transfer, pledge, delegation and governance and other related operations, PlatON provides PlatON MTool to assist users:

- PlatON MTool can support Ubuntu 18.04 and Windows 10. This document describes the installation and use under Windows and Ubuntu environments respectively. Users can choose according to their own resources.
- PlatON MTool provides two signature methods for pledge transactions: online signature and offline signature. This document describes offline signature operations. For online signature operations, please refer to [Online PlatON MTool Tutorial](/docs/zh-CN/OnLine_MTool_Manual).
- The main process of PlatON MTool offline signature method is: generate the file to be signed on the online machine, then sign the transaction on the offline machine, and finally send the signed transaction on the online machine.

## Install PlatON MTool

In addition, this document separately introduces the operation of PlatON MTool in Windows and Ubuntu environments. Users can choose according to their own resources; the following installation methods are installation on online machines. If you install on offline machines, you can use a mobile U disk or a mobile hard disk. Copy the installation package to the offline machine, the installation method is the same as the online installation method.

### Install PlatON MTool under Windows

#### Preparation before installation

Command line:

```
platon_mtool --version
```

If the execution result shows `Cannot recognize the "platon_mtool" item as the name of a cmdlet, function, script file, or executable program. Please check the spelling of the name. If you include the path, make sure that the path is correct, and then try again `, it means that there is no need to perform the following operations if the old version is not installed.

If the execution result shows the version number, timestamp and other information, it means that PlatON MTool has been installed. If PlatON MTool is an old version, you need to back up important information at this time, and then manually uninstall the old version. Operation steps:

**step1. Backup directory**

Put all the files under `C:\platon_mtool\mtool\current\keystore` to D drive or other directories other than `C:\platon_mtool`. After installing the new version, you need to copy the backup file back to the `C:\platon_mtool\mtool\current\keystore` directory.

**step2. Uninstall the old version**

Double-click `C:\platon_mtool\unins000.exe` to uninstall all old versions of PlatON MTool and other business platon_mtool.

#### start installation

**step1. Download the PlatON MTool installation package**

On the online machine, copy the link <https://download.platon.network/platon/mtool/windows/1.0.0/platon_mtool.exe> to the browser to download the PlatON MTool installation package.

**step2. Install PlatON MTool**

Double-click platon_mtool.exe to install. The default installation directory is C:\platon_mtool, it is recommended not to change this installation directory. The pop-up interface displays **Completing the mtool Setup Wizard** message indicating that the installation is successful, just click **Finish**.

**step3. Restart the terminal**

After the installation is complete, you need to <font color=red>restart the terminal (do not restart the server, close the CMD window or PowerShell window and reopen the window)</font> to make the newly added environment variables take effect.

### Install PlatON MTool under Ubuntu

Proceed as follows:

**step1. Download PlatON MTool Toolkit**

``` bash
wget https://download.platon.network/platon/mtool/linux/1.0.0/platon_mtool.zip
```

**step2. Unzip PlatON MTool toolkit**

``` bash
(if! command -v unzip;then sudo apt install unzip; fi;) && unzip platon_mtool.zip && cd platon_mtool
```

**step3. Download the script**

>The script is downloaded to the <font color=red>platon_mtool</font> directory, otherwise the script cannot find the path of the new version of mtool.

``` bash
wget https://download.platon.network/platon/scripts/mtool_install.sh
```

**step4. Execute command**

```
chmod +x mtool_install.sh && ./mtool_install.sh
```

>-When it prompts <font color=red>Install platon mtool succeed.</font>, it means that the PlatON MTool installation is successful. If the installation is not successful, please feedback specific questions through our official customer service contact information.

**step5. Restart the session window**

After the installation is complete, you need to <font color=red>restart the session window  (do not restart the server, close the session window or SSH tool to reopen the window)</font> to make the newly added environment variables take effect.

## PlatON MTool environment variable description

The environment variables used in the PlatON MTool directory under Windows and Ubuntu are different:

- PlatON MTool catalog

  - Windows: `%PLATON_MTOOLDIR%`

  - Ubuntu: `$PLATON_MTOOLDIR`

> Note: **`Users choose environment variables according to the system they have installed. `**
>

## Detailed explanation of PlatON MTool wallet commands

> Note: The follow-up command is the command format under Ubuntu. Under Windows, you need to modify `$PLATON_MTOOLDIR` to `%PLATON_MTOOLDIR%`.

### Create a cold wallet

- Command line

```shell
platon_mtool account new staking
```

- Parameter Description

>staking: The generated wallet name. After entering the same password twice, the wallet file `staking.json` will be generated under the directory `$PLATON_MTOOLDIR/keystore` after the creation is successful, and the following information will be printed:
>
>```shell
>-name: staking
>-type: NORMAL
>-address:
lat124xmsmd0uf5cvk7v3s36eytqezqsjfcxfw2lmr
>-public key: 0x9521cd81ba28d5d1c23bb7ddb7042d146375203d35000c0289178027abd4dc09bca30257739df166201e73497485242f41d5f50d46bc3c7e4385f81bde560db0
>
>Important write this Private Key in a safe place.
>It is the important way to recover your account if you ever forget your password.
>4630b6d86bc74bffd4ca8cfc18bceec562cb40fc5080c258452a04a69bc1ee07
>
>Important write this mnemonic phrase in a safe place.
>It is the important way to recover your account if you ever forget your password.
>worry jewel penalty jealous expect embark outer eternal verb rebuild rice kidney
> ```
>
>The wallet address format is adjusted to Bech32, where:
>
>`lat124xmsmd0uf5cvk7v3s36eytqezqsjfcxfw2lmr`: account address;
>
>`4630b6d86bc74bffd4ca8cfc18bceec562cb40fc5080c258452a04a69bc1ee07` is the wallet private key;
>
>`worry jewel penalty jealous expect embark outer eternal verb rebuild rice kidney` is the mnemonic phrase.
>
>For security reasons, users need to back up the wallet's private key or mnemonic phrase (either all or one of them), which can be used for recovery when the wallet is lost. It is recommended that users back up the mnemonic phrase or private key to a secure storage medium, such as an offline machine.

### Restore wallet

If the wallet file is lost, you can use the backup private key or mnemonic to restore it, as follows:

- Command line

  Recovery by private key:

  ```shell
  platon_mtool account recover -k staking
  ```

  > Prompt to enter the new wallet password and backup private key, as follows:
  >
  > ```shell
  > Enter a passphrase to encrypt your key to disk:
  > Repeat the passphrase:
  > Enter your 64bit Private Key:
  > 4630b6d86bc74bffd4ca8cfc18bceec562cb40fc5080c258452a04a69bc1ee07
  > ```

  or

  Recovery by mnemonic:

  ```shell
  platon_mtool account recover -m staking
  ```

  >Prompt to enter the new wallet password and backup mnemonic, as follows:
  >
  >```shell
  >Enter a passphrase to encrypt your key to disk:
  >Repeat the passphrase:
  >Enter your bip39 mnemonic:
  >worry jewel penalty jealous expect embark outer eternal verb rebuild rice kidney
  > ```

- Parameter Description

  staking: The name of the wallet.

  After successful restoration, the wallet file `staking.json` will be generated under the directory `$PLATON_MTOOLDIR/keystore`.



### Create an observation wallet

Execute the command to generate an observation wallet:

```shell
platon_mtool create_observewallet --keystore $PLATON_MTOOLDIR/keystore/staking.json
```

- Parameter Description

  keystore: indicates the path of the cold wallet.

> The following prompt indicates that the observation wallet is successfully created:
>
> please input keystore password:
> SUCCESS
> wallet created at: C:\platon_mtool\mtool\current\keystore\staking_observed.json

### View wallet list

- Command line

```bash
platon_mtool account list
```

### Query balance according to wallet name

- Command line

```bash
platon_mtool account balance $keystorename --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- Variable description

>$keystorename: wallet file name, such as staking.json

### Check balance based on address

- Command line

```bash
platon_mtool account balance -a $address --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- Parameters

> a: wallet address



## Offline PlatON MTool transaction process

The main process of PlatON MTool offline signature method is: generate the file to be signed on the online machine, then sign the transaction on the offline machine, and finally send the signed transaction on the online machine. Taking the transfer transaction as an example, the steps are as follows. For the operation of generating the file to be signed for other transactions, refer to the [PlatON MTool Transaction Command Details] (# PlatON MTool Transaction Command Details) chapter.

### Generate transaction pending signature file

Execute on **online machine**:

```shell
platon_mtool tx transfer --address $PLATON_MTOOLDIR/keystore/staking_observed.json --amount "1" --recipient $to_address --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- Parameter Description:

> address: Observation wallet path for sending transactions;
>
> amount: transfer amount, unit: LAT;
>
> recipient: recipient address;

The following information is printed, indicating successful execution:

```shell
Transfer unsigned raw: H4sIAAAAAAAAAGWOPW/DIBRF/8ubPfDhGsdrp0oZMmSrMiCMDUGADTiGRPnvoVGHSn3T1ZHuPe8Ba/j0ozwH7iIXSXt31DHB8P0Abv3masTo3zUgFNfua4SBIIxoBVPwFgbgKeM9pLweppERJTrGXH+n1KY+5Wtujckfy247JqF2NvdWnssiYagjM49HbXWVEvzWVHAKWsg/XzTgvPshtIHkf5UlxKL2tBVkCJnZnNWtm/dyn/qbiIdrNHFlysDzUjvaypi4Xepmh2jbMor6luLnC0n7ZKsMAQAA
File generated on: $PLATON_MTOOLDIR/transaction_details/transaction_detail_20191108114241.csv
```

Among them, `transaction_detail_20191108114241.csv` is the file to be signed for the transfer transaction, which needs to be copied to the offline machine for signature;

### Signature transaction

Execute on the offline machine where the cold wallet is kept:

```shell
platon_mtool offlinesign --filelocation $PLATON_MTOOLDIR/transaction_details/transaction_detail_20191108114241.csv
```

Note: $PLATON_MTOOLDIR/transaction_details/transaction_detail_20191108114241.csv is the file to be signed generated in the previous step, modified to the actual file to be signed.

Enter the corresponding cold wallet password and return the signed file. The content of the file is as follows:

```shell
 ┌────────┬───────┬────────┬────────┬────────┬──── ────┬────────┬───────┬──────┐
│Type │From │To │Account │Amount │Fee │Nonce │Create │Chain │
│ │ │ │Type │ │ │ │Time │Id │
├────────┼────────┼────────┼────────┼────────┼──── ────┼────────┼───────┼───────┤
│STAKING │0xa1548d│0x100000│FREE_AMO│5000000.│0.043210│0 │2019-10│100 │
│ │d61010a7│00000000│UNT_TYPE│00000000│00000000│ │-11T13:│ │
│ │42cd66fb│00000000│ │00000000│0000 │ │54:06.8│ │
│ │86324ab3│00000000│ │00 │ │ │97 │ │
│ │e2935586│00000000│ │ │ │ │ │ │
│ │4a │02 │ │ │ │ │ │ │
└────────┴────────┴────────┴────────┴────────┴──── ────┴────────┴───────┴──────┘
Need load 1 wallets for address: [0xa1548dd61010a742cd66fb86324ab3e29355864a]

operation finished
SUCCESS
File generated on transaction_signature/transaction_signature_20191108114625.csv
total: 1, to be signed: 1
success: 1, failure: 0
```

Note: transaction_signature/transaction_signature_20191108114625.csv is the signed transaction file, copy the transaction signature file to the online machine;



### Send signed transaction

Send transaction in **online machine**:

```shell
platon_mtool send_signedtx --filelocation $PLATON_MTOOLDIR/transaction_signature/transaction_signature_20191108114625.csv --config $PLATON_MTOOLDIR/validator/validator_config.json
```

Note: transaction_signature_20191108114625.csv is the transaction signature file generated in the previous step, modified to the actual signature file.

Enter `yes` to return the transaction result:

```bash
Send Transaction? (yes|no)
yes
transaction 1 success
transaction hash: 0xf14f74386e6ef9027c48582d7faed3b50ab1ffdd047d6ba3afcf27791afb4e9b
SUCCESS
total: 1
success: 1, failure: 0
```

Note: Prompt success and return transaction hash means that the signature transaction is sent successfully, otherwise the signature transaction fails.

## Detailed explanation of PlatON MTool trading commands

This chapter mainly describes the relevant commands for generating the csv format transaction to-be-signed file on the **online machine**. The generated csv file will be saved in the `$PLATON_MTOOLDIR/transaction_details` directory. For the complete transaction process of sending offline signatures, please refer to the [Offline PlatON MTool Transaction Process] (#Offline PlatON MTool Transaction Process) chapter.

### Ordinary transfer operations

- Command line

```shell
platon_mtool tx transfer --address $PLATON_MTOOLDIR/keystore/staking_observed.json --amount "1" --recipient $to_address --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> address: Observation wallet path for sending transactions;
>
> amount: transfer amount, unit: LAT;
>
> recipient: recipient address;


### Create a new restricting plans

Creating a new restricting plan, node's LATs will be transferred to a specified precompiled contract. The LATs will be transferred to the specified account multiple times at specified intervals. Before creating a new restricting, you need to create a restricting plan description file in json format.

- restricting plan description file，retricting_plans.json

```json
{
  "account":"lat12jn6835z96ez93flwezrwu4xpv8e4zathsyxdn",
  "plans":[
    {"epoch": 5000,"amount": 100},
    {"epoch": 6000,"amount": 100},
    {"epoch": 7000,"amount": 100}
  ]
}
```

> account：the specified account that will received LAT from the estricting plan.
>
> epoch：the number of epoch to wait for a transfer plan (Greater than or equal to 1)
>
> amount：the number of LAT to be transferred. Unit: LAT


- command line

```bash
platon_mtool create_restricting --config $PLATON_MTOOLDIR/validator/validator_config.json --address $PLATON_MTOOLDIR/keystore/staking_observed.json --file ./restricting_plans.json
```

- Parameter Description

> config：node configuration file
>
> address: observation wallet file
>
> file: restricting plan description file


### Initiate a pledge operation

If the consensus node deployment is complete and the blocks have been successfully synchronized, you can use PlatON MTool to pledge operations. After the pledge fund application is completed, ensure that the pledge account balance is sufficient, and replace the pledge deposit amount according to the user's situation. The minimum pledge threshold is 100,000 LAT.

Note: Please keep enough LAT in the pledge account to prepare for the subsequent transactions managed by the initiating node to have sufficient transaction fees, such as voting for upgrade proposals, unstaking transactions and other transactions.

- Command line

```bash
platon_mtool staking --config $PLATON_MTOOLDIR/validator/validator_config.json --address $PLATON_MTOOLDIR/keystore/staking_observed.json --amount 100000 --benefit_address xxx196278ns22j23awdfj9f2d4vz0pedld8a2fzwwj --delegated_reward_rate 5000 --node_name myNode --website www.mywebsite.com --details myNodeDescription --external_id 121412312
```
- Parameter Description

> config：node configuration file
>
> address: pledge observation wallet file
>
> amount: pledge amount, no less than 100000LAT-pledge threshold, no more than 8 decimal places (use free amount pledge)
>
> restricted amount: not less than 100000LAT-pledge threshold, no more than 8 decimal places (using locked balance pledge)
>
> autoamount: Not less than 100000LAT-Priority to use the lock-up balance staking, if the lock-up balance is not enough for the staking deposit, then use free amount staking
>
> benefit_address: benefit account to receive block-packing reward and staking reward
>
> delegated_reward_rate：Delegated bonus ratio, type is integer range is \[0,10000\], unit: ten thousand percent, e.g. enter 5000, it means the bonus ratio is 50%
>
> node_name：node name，30 bytes(beginning with a letter, including alphabet, number, space, _, -, #)
>
> website：node website, 30 bytes
>
> details：node description, 280 bytes
>
> external_id：node Icon ID of [keybase.io](https://keybase.io), or identity authentication ID


### Modify validator information operation

- Command line

```bash
platon_mtool update_validator --config $PLATON_MTOOLDIR/validator/validator_config.json --address $PLATON_MTOOLDIR/keystore/staking_observed.json --node_name myNode --website www.mywebsite.com --external_id 121412312 --delegated_reward_rate 6000 --benefit_address lax1x0f9xwr9steccekttqvml0d26zgsxwdnhq3fkv --details "Modify the verifier information operation"
```

- Parameter Description

> config：node configuration file
>
> address: pledge observation wallet file
>
> benefit_address\[option\]: benefit account to receive block-packing reward and staking reward
>
> delegated_reward_rate\[option\]：Delegated bonus ratio, type is integer range is \[0,10000\], unit: ten thousand percent, e.g. enter 5000, it means the bonus ratio is 50%
>
> node_nam\[option\]e：node name，30 bytes(beginning with a letter, including alphabet, number, space, _, -, #)
>
> website\[option\]：node website, 30 bytes
>
> details\[option\]：node description, 280 bytes
>
> external_id\[option\]：node Icon ID of [keybase.io](https://keybase.io), or identity authentication ID

### Unpledge operation

<font color=red>**It takes 168 settlement cycles to withdraw from the pledge, please be careful!**</font>

- Command line

```bash
platon_mtool unstaking --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> None

### Increase pledge operation

- Command line

```bash
platon_mtool increasestaking --amount 5000000 --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> amount: Use the account balance to increase the pledge amount (LAT), no less than 10 minimum increase value, no more than 8 decimal places
>
> restricted amount: Use the account lock balance to increase the pledge amount, no less than 10 pledge threshold, no more than 8 decimal places (use locked balance pledge)

### Submit text proposal operation

- Command line

```bash
platon_mtool submit_textproposal --pid_id 100 --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> pid_id: GitHub ID

### Submit an upgrade proposal operation

- Command line

```bash
platon_mtool submit_versionproposal --newversion 0.15.1 --end_voting_rounds 345 --pid_id 100 --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> newversion: target upgrade version, x.x.x, number plus punctuation
>
> end_voting_rounds: the number of voting consensus rounds, the number of voting consensus rounds N, must satisfy 0 <N <= 4838 (about 2 weeks)
>
> pid_id: GitHub ID

### Submit proposal cancellation

- Command line

```bash
platon_mtool submit_cancelproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --end_voting_rounds 12 --pid_id 100 --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator/validator
```

- Parameter Description

> proposalid: proposal ID that needs to be cancelled, that is, the hash used to initiate the proposal transaction, 66 characters, alphanumeric
>
> end_voting_rounds: the number of voting consensus rounds, the number of voting consensus rounds N, must satisfy 0 <N <= 4838 (about 2 weeks)
>
> pid_id: GitHub ID

### Text proposal voting operation

- Command line

```bash
platon_mtool vote_textproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> proposalid: text proposal ID, which is the hash used to initiate the proposal transaction, 66 characters, alphanumeric
>
> opinion: voting options, yes, no, abstain-choose one of three

### Upgrade proposal voting operation

- Command line

```bash
platon_mtool vote_versionproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> proposalid: upgrade proposal ID, that is, the hash used to initiate the proposal transaction, 66 characters, alphanumeric

### Cancel proposal voting operation

- Command line

```bash
platon_mtool vote_cancelproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> proposalid: cancel proposal ID, that is, the hash used to initiate the proposal transaction, 66 characters, alphanumeric composition
>
> opinion: voting options, yes, no, abstain-choose one of three

### Submit parameter proposal operation

- Command line

```bash
platon_mtool submit_paramproposal --pid_id 200 --module $module --paramname $paramname --paramvalue $paramvalue --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> module: management module parameters
>
> paramname: management module parameter name, pay attention to letter case
>
> paramvalue: governance module parameter value
>
> pid_id: GitHub ID

### Parameter proposal voting operation

- Command line

``` bash
platon_mtool vote_paramproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> proposalid: cancel proposal ID, that is, the hash used to initiate the proposal transaction, 66 characters, alphanumeric
>
> opinion: voting options, yes, no, abstain-choose one of three

### Version statement operation

- Command line

```bash
platon_mtool declare_version --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> None

### View help

- Command line

```bash
platon_mtool -h
```

- Parameter Description

> None
