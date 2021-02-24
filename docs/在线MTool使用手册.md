---
id: OnLine_MTool_Manual
title: OnLine MTool Tutorials
sidebar_label: OnLine MTool Tutorials
---

## Install MTool

In addition, this document introduces the operation of MTool under Windows and Ubuntu respectively. Users can choose according to their own resources.

### Install MTool under Windows

#### Preparation before installation

execute command:

```
mtool-client --version
```

If the execution result shows error message, it indicates that the MTool has not been installed and you can skip the following instructions on how to uninstall the older version.

If the execution result shows the version number, timestamp and other information, it indicates that MTool has been installed. If the MTool is an old version, you need to back up important information at this time, and then manually uninstall the old version. The instructions are as follows:

**Step1. Backup directory**

Back up all files in the directory `C:\tools\mtool\current\keystore` to the D drive or other non `C:\tools` directory. After installing the new version, you need to copy the backup file back to the `C:\tools\mtool\current\keystore` directory.

**Step2. Uninstall old version**

Double-click `C:\tools\unins000.exe` to uninstall all old versions of MTool and other business tools.

#### Start installation

**Step1. Download MTool installation package**

On the online machine, copy the link http://download.platon.network/platon/mtool/windows/0.15.1/mtool-setup.exe  to the browser and download the MTool installation package.

**Step2. Install MTool**

Double-click mtool-setup.exe to install it. The default installation directory is C:\tools, and it is recommended not to change this installation directory. The pop-up interface displays the message **Completing the mtool Setup Wizard**, indicating that the installation was successful. Click **Finish**.

**Step3. Restart the terminal**

After installation is complete, you need to <font color=red>restart the terminal</font> for the newly added environment variables to take effect.

### Install MTool under Ubuntu

Proceed as follows:

**Step1. Download MTool toolkit**

```bash
wget http://download.platon.network/platon/mtool/linux/0.15.1/mtool-client.zip
```

**Step2. Extract the MTool toolkit**

```bash
(if ! command -v unzip;then sudo apt install unzip; fi;) && unzip mtool-client.zip && cd mtool-client
```

**Step3. Download script**

> The script is downloaded to the <font color=red>mtool-client</font> directory, otherwise the script cannot find the path of the new version of mtool.

```bash
wget http://download.platon.network/opensource/scripts/mtool_install.sh
```

**Step4. Execute command**

```bash
chmod +x mtool_install.sh && ./mtool_install.sh
```

> - When the message <font color=red>Install mtool succeed.</font> is displayed, MTool is successfully installed. If it is not successfully installed, please contact our official customer service to provide feedback on specific issues.

**Step5. Restart the session window**

After installation is complete, you need to <font color=red>restart the session window</font> for the newly added environment variables to take effect.

## MTool Environment Variable Description

The environment variables of MTool directories under Windows and Ubuntu are different:

- MTool directory
  - Windows: `%MTOOLDIR%`
  - Ubuntu: `$MTOOLDIR`

> Note:Users choose according to their installed system.

##  MTool Command Details

> Note: The follow-up command is the command format under Ubuntu. Under Windows, you need to modify `$MTOOLDIR` to `%MTOOLDIR%`.

### Create A Wallet

- Execute the command:

```shell
mtool-client account new staking
```

- Parameter description

>staking: The name of the wallet to be created. Once the wallet is created successfully, a wallet file named `staking.json` will be generated in the directory `$MTOOLDIR/keystore`, And print the following information:
>
>```shell
>-name: staking
>-type: NORMAL
>-address:
lat124xmsmd0uf5cvk7v3s36eytqezqsjfcxfw2lmr
>-public key: 0x9521cd81ba28d5d1c23bb7ddb7042d146375203d35000c0289178027abd4dc09bca30257739df166201e73497485242f41d5f50d46bc3c7e4385f81bde560db0
>Important write this Private Key in a safe place.
>It is the important way to recover your account if you ever forget your password.
>4630b6d86bc74bffd4ca8cfc18bceec562cb40fc5080c258452a04a69bc1ee07
>
>Important write this mnemonic phrase in a safe place.
>It is the important way to recover your account if you ever forget your password.
>worry jewel penalty jealous expect embark outer eternal verb rebuild rice kidney
>```
>
>  Wallet address format adjusted to Bech32, among them:
>
>`lat124xmsmd0uf5cvk7v3s36eytqezqsjfcxfw2lmr`: account address;
>
>`4630b6d86bc74bffd4ca8cfc18bceec562cb40fc5080c258452a04a69bc1ee07` : the private key of the wallet;
>
>`worry jewel penalty jealous expect embark outer eternal verb rebuild rice kidney`: the mnemonic words.
>
>  For security reasons, users need to back up the wallet private key or mnemonic words (both can be backed up, or one of them can be backed up). When the wallet is lost, it can be used for recovery. It is recommended that users back up mnemonic words or private keys to a secure storage medium, such as an offline machine.

### Recover wallet file

 If the wallet file is lost, you can restore it with the backed up private key or mnemonic as follows:

- Execute the command:

   Recovery via private key:

  ```shell
  mtool-client account recover -k staking
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

   Recovery through mnemonics:

  ```shell
  mtool-client account recover -m staking
  ```

  >  Prompt to enter a new wallet password and backup mnemonic words, as follows:
  >
  >  ```shell
  >   Enter a passphrase to encrypt your key to disk:
  >   Repeat the passphrase:
  >   Enter your bip39 mnemonic:
  >   worry jewel penalty jealous expect embark outer eternal verb rebuild rice kidney
  >  ```

- Parameter description

  staking：wallet name.

   After successful restoration, the wallet file staking.json will be generated under the directory `$MTOOLDIR/keystore`.

### Ordinary transfer operation

- Command line

```bash
mtool-client tx transfer --keystore $MTOOLDIR/keystore/staking.json --amount "1" --recipient $ to_address --config $MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> keystore: path of the wallet sending the transaction
>
> amount: transfer amount, unit: LAT
>
> recipient: receiving address

### View wallet list

- Command line

```bash
mtool-client account list
```

### Query balance based on wallet name

- Command line

```bash
mtool-client account balance $keystorename --config $MTOOLDIR/validator/validator_config.json
```

- Parameter description

> $ keystorename: wallet file name，example:staking.json

### Query balance based on address

- Command line

```bash
mtool-client account balance -a $address --config $MTOOLDIR/validator/validator_config.json
```

- Parameter description

> a: wallet address

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
mtool-client create_restricting --config $MTOOLDIR/validator/validator_config.json --keystore $MTOOLDIR/keystore/staking.json --file ./restricting_plans.json
```

- Parameter Description

> config：node configuration file
>
> keytore: wallet file
>
> file: restricting plan description file


### Initiate a staking operation

If the deployment of the consensus node is complete and the block has been synchronized successfully, you can use MTool for staking operations. After the staking fund application is completed, ensure that the balance of the staking account is sufficient, and replace the staking amount according to the user's situation. The minimum threshold for staking is ten thousand LAT.

Note: Please keep enough LAT in the staking account, so that the transactions initiated by the subsequent node management have sufficient transaction fees, such as voting for upgrading proposals, and unsecured transactions.

- Command line

```bash
mtool-client staking --config $MTOOLDIR/validator/validator_config.json --keystore $MTOOLDIR/keystore/staking.json --amount 10000 --benefit_address xxx196278ns22j23awdfj9f2d4vz0pedld8a2fzwwj --delegated_reward_rate 5000 --node_name myNode --website www.mywebsite.com --details myNodeDescription --external_id 121412312
```

Prompt:**please input keystore password:**Enter the password of the staking wallet and press Enter. If the following information is displayed, the staking is successful:

```bash
operation finished
transaction hash:
0x89b964d27d0caf1d8bf268f721eb123c4af57aed36187bea90b262f4769eeb9b
SUCCESS
```

- Parameters Description

> config：node configuration file
>
> keystore: staking wallet file
>
> amount: staking amount, not less than 100000lat-staking threshold, no more than 8 decimal places
>
> restrictedamount: not less than 100000lat- staking threshold, no more than 8 decimal points (staking using locked balance)
>
> autoamount: Not less than 100000lat-Priority to use the lock-up balance staking, if the lock-up balance is not enough for the staking deposit, then use free amount staking
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
> external_id：node Icon ID of keybase.io, or identity authentication ID


### Modify validator information operation

- Command line

```bash
mtool-client update_validator --config $MTOOLDIR/validator/validator_config.json --keystore $MTOOLDIR/keystore/staking.json --node_name myNode --website www.mywebsite.com --external_id 121412312 --delegated_reward_rate 6000 --benefit_address lax1x0f9xwr9steccekttqvml0d26zgsxwdnhq3fkv --details "Modify the verifier information operation"
```

- Parameters Description

> config：node configuration file
>
> keystore: staking wallet file
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
> external_id\[option\]：node Icon ID of keybase.io, or identity authentication ID

### Decommissioning operation

<font color=red>**It takes 168 settlement cycles to withdraw from the pledge, please be careful!**</font>

- Command line

```bash
mtool-client unstaking --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> None

### Increase staking operation

- Command line

```bash
mtool-client increasestaking --amount 5000000 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> amount: Use the account balance to increase the staking amount (LAT), the minimum added value is not less than 10, and the decimal point does not exceed 8 digits
>
> restrictedamount: use the account balance to increase the amount of staking, not less than 10 staking threshold, the decimal point does not exceed 8

### Submit Text Proposal

- Command line

```bash
mtool-client submit_textproposal --pid_id 100 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> pid_id: GitHub ID

### Submit upgrade proposal operation

- Command line

```bash
mtool-client submit_versionproposal --newversion 0.15.1 --end_voting_rounds 345 --pid_id 100 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> newversion: target upgrade version, x.x.x, number punctuation
>
> end_voting_rounds: the number of voting consensus rounds, the number of voting consensus rounds N, must satisfy 0 < N <= 4838 (about 2 weeks)
>
> pid_id: GitHub ID

### Submit Cancel Proposal

- Command line

```bash
mtool-client submit_cancelproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --end_voting_rounds 12 --pid_id 100 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR_validator/validator
```

- Parameters Description

> proposalid: the ID of the proposal that needs to be cancelled
>
> end_voting_rounds: the number of voting consensus rounds, the number of voting consensus rounds N, must satisfy 0 < N <= 4838 (about 2 weeks)
>
> pid_id: GitHub ID

### Text proposal voting operation

- Command line

```bash
mtool-client vote_textproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> proposalid: text proposal ID, that is, the hash of the proposal transaction, 66 characters, alphanumeric
>
> opinion: voting options, yes, no, abstain-choose one

### Upgrade proposal voting operation

- Command line

```bash
mtool-client vote_versionproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> proposalid: upgrade proposal ID, that is, the hash of the proposed transaction, 66 characters, alphanumeric

### Cancel proposal voting

- Command line

```bash
mtool-client vote_cancelproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> proposalid: Cancel the proposal ID, that is, the hash of the proposed transaction, 66 characters, composed of alphanumeric characters
>
> opinion: voting options, yes, no, abstain-choose one

### Submit parameter proposal operation

- Command line

```bash
mtool-client submit_paramproposal --pid_id 200 --module $ module --paramname $ paramname --paramvalue $ paramvalue --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> module: governance module parameters
>
> paramname: the name of the governance module parameter, pay attention to the case of the letters
>
> paramvalue: Governance module parameter value
>
> pid_id: GitHub ID

### Parameter proposal voting operation

- Command line

```bash
mtool-client vote_paramproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> proposalid: Cancel the proposal ID, that is, the hash of the proposed transaction, 66 characters, composed of alphanumeric characters
>
> opinion: voting options, yes, no, abstain-choose one

### Version declaration operation

- Command line

```bash
mtool-client declare_version --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> None

### View help

- Command line

```bash
mtool-client -h
```

- Parameter Description

> None
