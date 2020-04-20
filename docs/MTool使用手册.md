---
id: MTool_Manual
title: MTool Tutorials
sidebar_label: MTool Tutorials
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

**step1. Duplicate Catalog**

Back up all files in the directory `C:\tools\mtool\current\keystore` to the D drive or other non `C:\tools` directory. After installing the new version, you need to copy the backup file back to the `C:\tools\mtool\current\keystore` directory.

**step2. Uninstall old version**

Double-click `C:\tools\unins000.exe` to uninstall all old versions of MTool and other business tools.

#### Start installation

**step1. Download MTool installation package**

On the online machine, copy the link <https://7w6qnuo9se.s3.eu-central-1.amazonaws.com/mtool/mtool-setup/0.11.0/mtool-setup.exe> or <http://47.91.153.183/mtool/mtool-setup/0.11.0/mtool-setup.exe> to the browser and download the MTool installation package.

**step2. Install MTool**

Double-click mtool-setup.exe to install it. The default installation directory is C:\tools, and it is recommended not to change this installation directory. The pop-up interface displays the message **Completing the mtool Setup Wizard**, indicating that the installation was successful. Click **Finish**.

### Install MTool under Ubuntu

Proceed as follows:

**step1. Download mtool toolkit**

```bash
wget https://7w6qnuo9se.s3.eu-central-1.amazonaws.com/mtool/0.11.0/mtool-client.zip
```

or

```bash
wget http://47.91.153.183/mtool/0.11.0/mtool-client.zip
```

**step2. Extract the mtool toolkit**

```bash
(if ! command -v unzip;then sudo apt install unzip; fi;) && unzip mtool-client.zip && cd mtool-client
```

**step3. Download script**

> The script is downloaded to the <font color=red>mtool-client</font> directory, otherwise the script cannot find the path of the new version of mtool.

```bash
wget https://7w6qnuo9se.s3.eu-central-1.amazonaws.com/opensource/scripts/mtool_install.sh
```

or

```bash
wget http://47.91.153.183/opensource/scripts/mtool_install.sh
```

**step4. execute command**

```bash
chmod +x mtool_install.sh && ./mtool_install.sh
```

> - When the message <font color=red>Install mtool succeed.</font> is displayed, MTool is successfully installed. If it is not successfully installed, please contact our official customer service to provide feedback on specific issues.

**step5. Restart the terminal**

After installation is complete, you need to <font color=red>restart the terminal</font> for the newly added environment variables to take effect.

## MTool Environment Variable Description 

The environment variables of MTool directories under Windows and Ubuntu are different:

- MTool Catalog
  - Windows:`%MTOOLDIR%`
  - Ubuntu:`$MTOOLDIR`

> Note:Users choose according to their installed system.

##  MTool Command Details 

### Create A Wallet 

- Execute the command:

```shell
mtool-client account new staking
```

- Parameter description

>staking: The name of the wallet to be created. Once the wallet is created successfully, a wallet file named `staking.json` will be generated in the directory `$MTOOLDIR/keystore`. 

### Ordinary transfer operation

- Excuting the command

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

- Excuting the command

```bash
mtool-client account list
```

### Query balance based on wallet name

- Excuting the command

```bash
mtool-client account balance $keystorename --config $MTOOLDIR/validator/validator_config.json
```

- Parameter description

> $ keystorename: wallet file name，example:staking.json

### Query balance based on address

- Excuting the command

```bash
mtool-client account balance -a $address --config $MTOOLDIR/validator/validator_config.json
```

- Parameter description

> a: wallet address

### Initiate a staking operation

If the deployment of the consensus node is complete and the block has been synchronized successfully, you can use MTool for staking operations. After the staking fund application is completed, ensure that the balance of the staking account is sufficient, and replace the staking amount according to the user's situation. The minimum threshold for staking is 1 million LAT.

Note: Please keep enough LAT in the staking account, so that the transactions initiated by the subsequent node management have sufficient transaction fees, such as voting for upgrading proposals, and unsecured transactions.

- Excuting the command

```bash
mtool-client staking --amount 1000000 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

Prompt:**please input keystore password:**Enter the password of the staking wallet and press Enter. If the following information is displayed, the staking is successful:

```bash
operation finished
transaction hash:
0x89b964d27d0caf1d8bf268f721eb123c4af57aed36187bea90b262f4769eeb9b
SUCCESS
```

- Parameters Description

> amount: staking amount, not less than 1000000lat-staking threshold, no more than 8 decimal places
>
> restrictedamount: not less than 1000000lat- staking threshold, no more than 8 decimal points (staking using locked balance)

### Modify validator information operation

- Excuting the command

```bash
mtool-client update_validator --name VerifierName --url "http://www.platon.com" --identity IdentifyID --delegated-reward-rate 100 --reward 0x33d253386582f38c66cb5819bfbdaad0910339b3 --introduction "Modify the verifier information operation" --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> name: validator name, no more than 30 bytes, supports letters, numbers, spaces, underscores and #, must start with a letter
>
> url: official website path, no more than 70 bytes, composed of alphanumeric characters
>
> identity: identity authentication ID, no more than 140 bytes, corresponds to the `externalId` field in the validator_config.json configuration file
>
> delegated-reward-rate: delegated reward ratio, unit: million points, integer, range 0 ~ 10000, If you enter 5000, it means that the dividend ratio is 50%
>
> reward: return address, 42 characters (alphanumeric)
>
> introduction: introduction, brief description of the validator, no more than 280 bytes, English is recommended
>
> a: When executing the command, use the values in the configuration file as parameters to modify the verifier information

### Decommissioning operation

- Excuting the command

```bash
mtool-client unstaking --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> None

### Increase staking operation

- Excuting the command

```bash
mtool-client increasestaking --amount 5000000 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> amount: Use the account balance to increase the staking amount (LAT), the minimum added value is not less than 10, and the decimal point does not exceed 8 digits
>
> restrictedamount: use the account balance to increase the amount of staking, not less than 10 staking threshold, the decimal point does not exceed 8

### Submit Text Proposal

- Excuting the command

```bash
mtool-client submit_textproposal --pid_id 100 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> pid_id: GitHub ID

### Submit upgrade proposal operation

- Excuting the command

```bash
mtool-client submit_versionproposal --newversion 0.8.0 --end_voting_rounds 345 --pid_id 100 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> newversion: target upgrade version, x.x.x, number punctuation
>
> end_voting_rounds: the number of voting consensus rounds, the number of voting consensus rounds N, must satisfy 0 < N <= 4838 (about 2 weeks)
>
> pid_id: GitHub ID

### Submit Cancel Proposal

- Excuting the command

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

- Excuting the command

```bash
mtool-client vote_textproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> proposalid: text proposal ID, that is, the hash of the proposal transaction, 66 characters, alphanumeric
>
> opinion: voting options, yes, no, abstain-choose one

### Upgrade proposal voting operation

- Excuting the command

```bash
mtool-client vote_versionproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> proposalid: upgrade proposal ID, that is, the hash of the proposed transaction, 66 characters, alphanumeric

### Cancel proposal voting

- Excuting the command

```bash
mtool-client vote_cancelproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> proposalid: Cancel the proposal ID, that is, the hash of the proposed transaction, 66 characters, composed of alphanumeric characters
>
> opinion: voting options, yes, no, abstain-choose one

### Submit parameter proposal operation

- Excuting the command

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

- Excuting the command

```bash
mtool-client vote_paramproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> proposalid: Cancel the proposal ID, that is, the hash of the proposed transaction, 66 characters, composed of alphanumeric characters
>
> opinion: voting options, yes, no, abstain-choose one

### Version declaration operation

- Excuting the command

```bash
mtool-client declare_version --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> None

### View help

- Excuting the command

```bash
mtool-client -h
```

- Parameter Description

> None