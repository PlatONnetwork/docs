---
id: PlaTrust-wallet-js-sdk-api
title: PlaTrust Wallet js-sdk-API
sidebar_label: PlaTrust Wallet js-sdk-API
---

# PlaTrust Wallet js-sdk-API

## 1. Enumerations (enum)

1. **Operation:** Transaction call methods

```
CALL: Cross-contract call
DElEGATECALL: Cross-contract delegatecall
```

2. **SignatureMode:** Signature composition modes

```
guardians: Multi-signature must be wallet's guardian members
owner: Multi-signature must be wallet's owner members
session: Single-signature under session mode without multi-signature
```

## 2. Classes (class)


1. **WalletLib:** Wallet base library
2. **Bundler:** Bundler RPC library
3. **Paymaster:** Paymaster operation library
4. **UserOperation:** Encapsulation of user operations structure
5. **Callbase:** Base class for assembling wallet function calls in UserOperation
6. **ERC20:** UserOperation entry for assembling ERC20 related function calls (Depends on Callbase class)
7. **ERC721:** UserOperation entry for assembling ERC721 related function calls (Depends on Callbase class)
8. **ERC1155:** UserOperation entry for assembling ERC1155 related function calls (Depends on Callbase class)
9. **LAT:** UserOperation entry for assembling LAT transfer related function calls (Depends on Callbase class)

## 3. Interfaces (interface)


1.  **ApproveToken:** Encapsulation of ERC20 approve parameters
2.  **ExecutionResult:** Encapsulation of transaction normal execution results
3.  **ValidationResult:** Definition of the execution verification userOp result according to EIP-4337
4.  **FailedOp:** Exception information
5.  **Result:** Wrapper information for ExecutionResult, ValidationResult, and FailedOp
6.  **StakeInfo:** Staking information
7.  **ReturnInfo:** Gas and content returned when simulating a transaction
8.  **EstimateUserOpGas:** Estimation result of userOp gas
9.  **ParsedTransaction:** Encapsulation of transaction receipt
10. **UserOperationReceipt:** Execution receipt information of userOp
11. **Logs:** Encapsulation of transaction receipt logs


## 4. Global Functions

1. **encodeSignature:** Encodes the signature information of userOp.
>
```
encodeSignature(signatureMode, signature, validAfter?, validUntil?, aggregator?): string
```
>
Input Parameters:
>
>
| Field Name    | Type      | Description                                            | Required |
| ------------- | --------- | ------------------------------------------------------ | -------- |
| signatureMode | BigNumber | Signature mode, 0: owner; 1: guardians; 2: session     | Y        |
| signature     | string    | Hexadecimal signature information                      | Y        |
| aggregator    | string    | Aggregator address for aggregate signatures (optional) | N        |
| validAfter    | BigNumber | Signature's valid-after timestamp (optional)           | N        |
| validUntil    | BigNumber | Signature's valid-until timestamp (optional)           | N        |
>
>
Return Parameters:
>
| Field Name      | Type   | Description                     |
| --------------- | ------ | ------------------------------- |
| packedSignature | string | Signature information of userOp |
>
>
2. **decodeSignature:** Decodes the signature information of userOp.
>
```
decodeSignature(packedSignature): Object
```
>
>
Input Parameters:
>
| Field Name      | Type   | Description                     | Required |
| --------------- | ------ | ------------------------------- | -------- |
| packedSignature | string | Signature information of userOp | Y        |
>
>
Return Parameters:
>
```
| Field Name    | Type      | Description                                        |
| ------------- | --------- | -------------------------------------------------- |
| signatureMode | BigNumber | Signature mode, 0: owner; 1: guardians; 2: session |
| signature     | string    | Hexadecimal signature information                  |
| aggregator    | string    | Aggregator address for aggregate signatures        |
| validAfter    | BigNumber | Signature's valid-after timestamp                  |
| validUntil    | BigNumber | Signature's valid-until timestamp                  |
```
>
>
3. **packSignatureHash:** Computes the signature information of a data hash.
>
```
packSignatureHash(hash, signatureMode?, validAfter?, validUntil?, aggregator?): string
```
>
>
Input Parameters:
>
>
| Field Name    | Type      | Description                                            | Required |
| ------------- | --------- | ------------------------------------------------------ | -------- |
| hash          | string    | Data hash to be signed                                 | Y        |
| signatureMode | BigNumber | Signature mode, 0: owner; 1: guardians; 2: session     | N        |
| aggregator    | string    | Aggregator address for aggregate signatures (optional) | N        |
| validAfter    | BigNumber | Signature's valid-after timestamp (optional)           | N        |
| validUntil    | BigNumber | Signature's valid-until timestamp (optional)           | N        |
>
>
>
Return Parameters:
>
>
| Field Name | Type   | Description                                                                      |
| ---------- | ------ | -------------------------------------------------------------------------------- |
| _hash      | string | keccak256(abi.encodePacked(hash,signatureMode,aggregator&validAfter&validUntil)) |
>
>
>
4. **recoverAddress:** Resolves the signer's account address.
>
>
```
recoverAddress(msg, signature): string
```
>
>
Input Parameters:
>
>
| Field Name | Type   | Description           | Required |
| ---------- | ------ | --------------------- | -------- |
| msg        | string | Data used for signing | Y        |
| signature  | string | Signature information | Y        |
>
>
Return Parameters:
>
>
| Field Name | Type   | Description              |
| ---------- | ------ | ------------------------ |
| -          | string | Signer's account address |
>
>
>
5. **signMessage:** Signs a message using a private key.
>
>
```
signMessage(msg, privateKey): string
```
>
>
Input Parameters:
>
>
| Field Name | Type   | Description          | Required |
| ---------- | ------ | -------------------- | -------- |
| msg        | string | Message to be signed | Y        |
| privateKey | string | Private key          | Y        |
>
>
Return Parameters:
>
>
| Field Name | Type   | Description |
| ---------- | ------ | ----------- |
| -          | string | Signature   |
>
>
>
## 5. WalletLib External Functions


1. **Constructor**
>
>
```
new WalletLib(singletonFactory?)
```
>
>
Input:
>
>
| Field Name       | Type   | Description                     | Required |
| ---------------- | ------ | ------------------------------- | -------- |
| singletonFactory | string | Wallet factory contract address | No       |
>
>
Output:
>
>
WalletLib
>
>
>
2. **singletonFactory** Get the wallet's factory contract address
>
>
```
singletonFactory(): string
```
>
>
Input:
>
None
>
>
Output:
>
>
| Field Name | Type   | Description                     |
| ---------- | ------ | ------------------------------- |
| -          | string | Wallet factory contract address |
>
>
>
3. **getInitCode** Get the wallet's initCode
>
>
```
getInitCode(walletFactory, walletLogic, initializer, salt): string
```
>
>
Input:
>
>
| Field Name    | Type   | Description                                              | Required |
| ------------- | ------ | -------------------------------------------------------- | -------- |
| walletFactory | string | Wallet factory contract address                          | Yes      |
| walletLogic   | string | Wallet logic contract address                            | Yes      |
| initializer   | string | Wallet initialization encoding (setUp function encoding) | Yes      |
| salt          | string | Salt (controls create2-generated wallet address)         | Yes      |
>
>
Output:
>
>
| Field Name | Type   | Description       |
| ---------- | ------ | ----------------- |
| -          | string | Wallet's initCode |
>
>
>
4. **getNonce** Get the wallet's nonce value
>
>
```
getNonce(walletAddress, etherProvider, defaultBlock?): Promise<number>
```
>
>
Input:
>
>
| Field Name    | Type                          | Description                                | Required |
| ------------- | ----------------------------- | ------------------------------------------ | -------- |
| walletAddress | string                        | Wallet contract address                    | Yes      |
| etherProvider | ethers.providers.BaseProvider | ethers.js provider (e.g., ethers.provider) | Yes      |
| defaultBlock  | string                        | earliest, latest, pending, default: latest | No       |
>
>
Output:
>
>
| Field Name | Type   | Description          |
| ---------- | ------ | -------------------- |
| -          | number | Wallet's nonce value |
>
>
>
5. **getPaymasterData** Get the paymaster call information for assembling userOp
>
>
```
getPaymasterData(payMasterAddress, token, maxCost): string
```
>
>
Input:
>
>
| Field Name       | Type      | Description                        | Required |
| ---------------- | --------- | ---------------------------------- | -------- |
| payMasterAddress | string    | Paymaster address                  | Yes      |
| token            | string    | Paymaster's accepted token address | Yes      |
| maxCost          | BigNumber | Maximum cost                       | Yes      |
>
>
Output:
>
>
| Field Name | Type   | Description                |
| ---------- | ------ | -------------------------- |
| -          | number | Paymaster call information |
>
>
>
6. **getSetupCode** Get the setup call encoding for the wallet instance
>
>
```
getSetupCode(entryPoint, owners, threshold, to, data, fallbackHandler, lockPeriod): string
```
>
>
Input:
>
>
| Field Name      | Type      | Description                                                               | Required |
| --------------- | --------- | ------------------------------------------------------------------------- | -------- |
| entryPoint      | string    | EntryPoint contract address                                               | Yes      |
| owners          | string[]  | Multiple owners of the wallet, at least one is required                   | Yes      |
| threshold       | BigNumber | Multisig threshold of the wallet owners                                   | Yes      |
| to              | string    | 'to' parameter for the module call in the wallet                          | Yes      |
| data            | string    | 'calldata' information for the module call in the wallet (in hexadecimal) | Yes      |
| fallbackHandler | string    | Wallet's fallback handler contract address                                | Yes      |
| lockPeriod      | BigNumber | Wallet's lock duration, [recommended to be 1 week] (unit: ms)             | Yes      |
>
>
Output:
>
>
| Field Name | Type   | Description         |
| ---------- | ------ | ------------------- |
| -          | string | Setup call encoding |
>
>
>
7. **getWalletCode** Get the wallet's deployment encoding
>
>
```
getWalletCode(walletLogicAddress, walletProxyConfig?): string
```
>
>
Input:
>
>
| Field Name         | Type   | Description                                                      | Required |
| ------------------ | ------ | ---------------------------------------------------------------- | -------- |
| walletLogicAddress | string | Wallet logic contract address                                    | Yes      |
| walletProxyConfig  | struct | Proxy configuration (including proxy's ABI and proxy's bytecode) | No       |
>
>
Output:
>
>
| Field Name | Type   | Description                                                                |
| ---------- | ------ | -------------------------------------------------------------------------- |
| -          | string | Actual walletproxy encoding (includes the bytecode from walletProxyConfig) |
>
>
>
8. **activateWalletOp** Assemble userOp for deploying the wallet
>
>
```
activateWalletOp(walletLogic, initializer, paymasterAndData, salt, walletFactory, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): UserOperation
```
>
>
Input:
>
>
| Field Name           | Type   | Description                                                                                                                                   | Required |
| -------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletLogic          | string | Wallet logic contract address                                                                                                                 | Yes      |
| initializer          | string | Initialization function call encoding for the wallet                                                                                          | Yes      |
| paymasterAndData     | string | Paymaster call information                                                                                                                    | Yes      |
| salt                 | string | Salt (controls create2-generated wallet address)                                                                                              | Yes      |
| walletFactory        | string | Wallet factory contract address                                                                                                               | Yes      |
| maxFeePerGas         | number | Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)                                                                                     | Yes      |
| maxPriorityFeePerGas | number | Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)                                                                   | Yes      |
| callGasLimit         | number | Gas allocated for the main execution call (calculated locally, executing callData's gas)                                                      | Yes      |
| verificationGasLimit | number | Gas allocated for the verification step (used in functions validateUserOp()/validatePaymasterUserOp())                                        | Yes      |
| preVerificationGas   | number | Gas paid for compensating pre-verification execution and call data bundling (extra gas prepared to handle some routine logic gas consumption) | Yes      |
>
>
Output:
>
>
| Field Name | Type          | Description      |
| ---------- | ------------- | ---------------- |
| -          | UserOperation | Assembled userOp |
>
>
>
9. **calculateWalletAddress** Calculate the wallet address (create2-generated address)
>
>
```
calculateWalletAddress(walletLogic, initializer, salt, walletFactory): string
```
>
>
Input:
>
>
| Field Name    | Type   | Description                                          | Required |
| ------------- | ------ | ---------------------------------------------------- | -------- |
| walletLogic   | string | Wallet logic contract address                        | Yes      |
| initializer   | string | Initialization function call encoding for the wallet | Yes      |
| salt          | string | Salt (controls create2-generated wallet address)     | Yes      |
| walletFactory | string | Wallet factory contract address                      | Yes      |
>
>
Output:
>
>
| Field Name | Type   | Description    |
| ---------- | ------ | -------------- |
| -          | string | Wallet address |
>
>
>
10. **addOwnerWithThresholdOp** Add a wallet owner and update the multisig threshold
>
>
```
addOwnerWithThresholdOp(walletAddress, etherProvider, owner, threshold, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
Input:
>
>
| Field Name           | Type                          | Description                                                                                                                                                                           | Required |
| -------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string                        | Wallet proxy contract address                                                                                                                                                         | Yes      |
| etherProvider        | ethers.providers.BaseProvider | ethers.js provider (e.g., ethers.provider)                                                                                                                                            | Yes      |
| owner                | string                        | New wallet owner                                                                                                                                                                      | Yes      |
| threshold            | number                        | Wallet multisig threshold                                                                                                                                                             | Yes      |
| paymasterAndData     | string                        | Paymaster contract address and data sent to paymaster, currently, the implementation of paymaster is not clear, if we use our own paymaster, this value is not required, fixed to 0x0 | No       |
| maxFeePerGas         | number                        | Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)                                                                                                                             | No       |
| maxPriorityFeePerGas | number                        | Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)                                                                                                           | No       |
| callGasLimit         | number                        | Gas allocated for the main execution call (calculated locally, executing callData's gas)                                                                                              | No       |
| verificationGasLimit | number                        | Gas allocated for the verification step (used in functions validateUserOp()/validatePaymasterUserOp())                                                                                | No       |
| preVerificationGas   | number                        | Gas paid for compensating pre-verification execution and call data bundling (extra gas prepared to handle some routine logic gas consumption)                                         | No       |
>
>
Output:
>
>
| Field Name | Type          | Description      |
| ---------- | ------------- | ---------------- |
| -          | UserOperation | Assembled userOp |
>
>
>
11. **changeThresholdOp** Update the multisig threshold
>
>
```
changeThresholdOp(walletAddress, etherProvider, threshold, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
Input:
>
>
| Field Name           | Type                          | Description                                                                                                                                                                           | Required |
| -------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string                        | Wallet proxy contract address                                                                                                                                                         | Yes      |
| etherProvider        | ethers.providers.BaseProvider | ethers.js provider (e.g., ethers.provider)                                                                                                                                            | Yes      |
| threshold            | number                        | Wallet multisig threshold                                                                                                                                                             | Yes      |
| paymasterAndData     | string                        | Paymaster contract address and data sent to paymaster, currently, the implementation of paymaster is not clear, if we use our own paymaster, this value is not required, fixed to 0x0 | No       |
| maxFeePerGas         | number                        | Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)                                                                                                                             | No       |
| maxPriorityFeePerGas | number                        | Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)                                                                                                           | No       |
| callGasLimit         | number                        | Gas allocated for the main execution call (calculated locally, executing callData's gas)                                                                                              | No       |
| verificationGasLimit | number                        | Gas allocated for the verification step (used in functions validateUserOp()/validatePaymasterUserOp())                                                                                | No       |
| preVerificationGas   | number                        | Gas paid for compensating pre-verification execution and call data bundling (extra gas prepared to handle some routine logic gas consumption)                                         | No       |
>
>
Output:
>
>
| Field Name | Type          | Description      |
| ---------- | ------------- | ---------------- |
| -          | UserOperation | Assembled userOp |
>
>
>
12. **getThreshold** - Get the threshold of the wallet's multisig.

getThreshold(walletAddress, etherProvider): Promise<number />

markdown
Copy code
>
>
Input Parameters:
>
>
| Field         | Type                          | Description                               | Required |
| ------------- | ----------------------------- | ----------------------------------------- | -------- |
| walletAddress | string                        | Wallet proxy contract address             | Y        |
| etherProvider | ethers.providers.BaseProvider | ethers.js provider, e.g., ethers.provider | Y        |
>
>
Return Parameters:
>
>
| Field | Type   | Description        |
| ----- | ------ | ------------------ |
| -     | number | Multisig threshold |


13. **swapOwnerOp** - Replace an owner of a wallet.
>
>
```
swapOwnerOp(walletAddress, etherProvider, prevOwner, oldOwner, newOwner, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
Input Parameters:
>
>
| Field                | Type                          | Description                                                                                                                              | Required |
| -------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string                        | Wallet proxy contract address                                                                                                            | Y        |
| etherProvider        | ethers.providers.BaseProvider | ethers.js provider, e.g., ethers.provider                                                                                                | Y        |
| prevOwner            | string                        | Previous owner of the owner to be replaced                                                                                               | Y        |
| oldOwner             | string                        | Owner to be replaced                                                                                                                     | Y        |
| newOwner             | string                        | New owner                                                                                                                                | Y        |
| paymasterAndData     | string                        | Paymaster contract address and data to send to it (currently unclear implementation of paymaster, set to 0x0 if using our own paymaster) | N        |
| maxFeePerGas         | number                        | Maximum fee per gas for each type of gas (similar to EIP-1559 max_fee_per_gas)                                                           | N        |
| maxPriorityFeePerGas | number                        | Maximum priority fee per gas for each type of gas (similar to EIP-1559 max_priority_fee_per_gas)                                         | N        |
| callGasLimit         | number                        | Gas allocated for main execution call (simulated locally, gas for executing callData)                                                    | N        |
| verificationGasLimit | number                        | Gas allocated for verification steps (used in functions validateUserOp()/validatePaymasterUserOp())                                      | N        |
| preVerificationGas   | number                        | Gas paid for compensating pre-verification execution and call data bundler (extra gas to handle regular gas consumption, e.g., in loops) | N        |
>
>
Return Parameters:
>
>
| Field | Type          | Description      |
| ----- | ------------- | ---------------- |
| -     | UserOperation | Assembled userOp |
>
>
>
14. **removeOwnerOp** - Remove an owner from the wallet.
>
>
```
removeOwnerOp(walletAddress, etherProvider, prevOwner, owner, threshold, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
Input Parameters:
>
>
| Field                | Type                          | Description                                                                                                                              | Required |
| -------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string                        | Wallet proxy contract address                                                                                                            | Y        |
| etherProvider        | ethers.providers.BaseProvider | ethers.js provider, e.g., ethers.provider                                                                                                | Y        |
| prevOwner            | string                        | Previous owner of the owner to be removed                                                                                                | Y        |
| owner                | string                        | Owner to be removed                                                                                                                      | Y        |
| threshold            | number                        | New multisig threshold (if no update needed, provide the old value)                                                                      | Y        |
| paymasterAndData     | string                        | Paymaster contract address and data to send to it (currently unclear implementation of paymaster, set to 0x0 if using our own paymaster) | N        |
| maxFeePerGas         | number                        | Maximum fee per gas for each type of gas (similar to EIP-1559 max_fee_per_gas)                                                           | N        |
| maxPriorityFeePerGas | number                        | Maximum priority fee per gas for each type of gas (similar to EIP-1559 max_priority_fee_per_gas)                                         | N        |
| callGasLimit         | number                        | Gas allocated for main execution call (simulated locally, gas for executing callData)                                                    | N        |
| verificationGasLimit | number                        | Gas allocated for verification steps (used in functions validateUserOp()/validatePaymasterUserOp())                                      | N        |
| preVerificationGas   | number                        | Gas paid for compensating pre-verification execution and call data bundler (extra gas to handle regular gas consumption, e.g., in loops) | N        |
>
>
Return Parameters:
>
>
| Field | Type          | Description      |
| ----- | ------------- | ---------------- |
| -     | UserOperation | Assembled userOp |
>
>
>
15. **getOwners** - Get the list of owners of the wallet.
>
>
```
getOwners(walletAddress, etherProvider): Promise<Array<string>>
```
>
>
Input Parameters:
>
>
| Field         | Type                          | Description                               | Required |
| ------------- | ----------------------------- | ----------------------------------------- | -------- |
| walletAddress | string                        | Wallet proxy contract address             | Y        |
| etherProvider | ethers.providers.BaseProvider | ethers.js provider, e.g., ethers.provider | Y        |
>
>
Return Parameters:
>
>
| Field | Type            | Description           |
| ----- | --------------- | --------------------- |
| -     | Array\<string\> | List of wallet owners |
>
>
>
16. **isOwner** - Check if an account is an owner of the wallet.
>
>
```
isOwner(owner, walletAddress, etherProvider): Promise<boolean>
```
>
>
Input Parameters:
>
>
| Field         | Type                          | Description                               | Required |
| ------------- | ----------------------------- | ----------------------------------------- | -------- |
| owner         | string                        | Account address to be checked             | Y        |
| walletAddress | string                        | Wallet proxy contract address             | Y        |
| etherProvider | ethers.providers.BaseProvider | ethers.js provider, e.g., ethers.provider | Y        |
>
>
Return Parameters:
>
>
| Field | Type    | Description                  |
| ----- | ------- | ---------------------------- |
| -     | boolean | Whether it is a wallet owner |
>
>
>
17. **startSessionOp** - Start a multisig-free session.
>
>
```
startSessionOp(walletAddress, etherProvider, sessionUser, duration, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
Input Parameters:
>
>
| Field                | Type                          | Description                                                                                                                              | Required |
| -------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string                        | Wallet proxy contract address                                                                                                            | Y        |
| etherProvider        | ethers.providers.BaseProvider | ethers.js provider, e.g., ethers.provider                                                                                                | Y        |
| sessionUser          | string                        | Owner of the wallet session                                                                                                              | Y        |
| duration             | number                        | Valid duration of the wallet session (in ms)                                                                                             | Y        |
| paymasterAndData     | string                        | Paymaster contract address and data to send to it (currently unclear implementation of paymaster, set to 0x0 if using our own paymaster) | N        |
| maxFeePerGas         | number                        | Maximum fee per gas for each type of gas (similar to EIP-1559 max_fee_per_gas)                                                           | N        |
| maxPriorityFeePerGas | number                        | Maximum priority fee per gas for each type of gas (similar to EIP-1559 max_priority_fee_per_gas)                                         | N        |
| callGasLimit         | number                        | Gas allocated for main execution call (simulated locally, gas for executing callData)                                                    | N        |
| verificationGasLimit | number                        | Gas allocated for verification steps (used in functions validateUserOp()/validatePaymasterUserOp())                                      | N        |
| preVerificationGas   | number                        | Gas paid for compensating pre-verification execution and call data bundler (extra gas to handle regular gas consumption, e.g., in loops) | N        |
>
>
Return Parameters:
>
>
| Field | Type          | Description      |
| ----- | ------------- | ---------------- |
| -     | UserOperation | Assembled userOp |
>
>
>
18. **clearSessionOp** - End a multisig-free session.
>
>
```
clearSessionOp(walletAddress, etherProvider, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
Input Parameters:
>
>
| Field                | Type                          | Description                                                                                                                              | Required |
| -------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string                        | Wallet proxy contract address                                                                                                            | Y        |
| etherProvider        | ethers.providers.BaseProvider | ethers.js provider, e.g., ethers.provider                                                                                                | Y        |
| paymasterAndData     | string                        | Paymaster contract address and data to send to it (currently unclear implementation of paymaster, set to 0x0 if using our own paymaster) | N        |
| maxFeePerGas         | number                        | Maximum fee per gas for each type of gas (similar to EIP-1559 max_fee_per_gas)                                                           | N        |
| maxPriorityFeePerGas | number                        | Maximum priority fee per gas for each type of gas (similar to EIP-1559 max_priority_fee_per_gas)                                         | N        |
| callGasLimit         | number                        | Gas allocated for main execution call (simulated locally, gas for executing callData)                                                    | N        |
| verificationGasLimit | number                        | Gas allocated for verification steps (used in functions validateUserOp()/validatePaymasterUserOp())                                      | N        |
| preVerificationGas   | number                        | Gas paid for compensating pre-verification execution and call data bundler (extra gas to handle regular gas consumption, e.g., in loops) | N        |
>
>
Return Parameters:
>
>
| Field | Type          | Description      |
| ----- | ------------- | ---------------- |
| -     | UserOperation | Assembled userOp |
>
>
>
19. **enableModuleOp** - Enable a module.
>
>
```
enableModuleOp(walletAddress, etherProvider, module, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
Input Parameters:
>
>
| Field                | Type                          | Description                                                                                                                              | Required |
| -------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string                        | Wallet proxy contract address                                                                                                            | Y        |
| etherProvider        | ethers.providers.BaseProvider | ethers.js provider, e.g., ethers.provider                                                                                                | Y        |
| module               | string                        | Module address                                                                                                                           | Y        |
| paymasterAndData     | string                        | Paymaster contract address and data to send to it (currently unclear implementation of paymaster, set to 0x0 if using our own paymaster) | N        |
| maxFeePerGas         | number                        | Maximum fee per gas for each type of gas (similar to EIP-1559 max_fee_per_gas)                                                           | N        |
| maxPriorityFeePerGas | number                        | Maximum priority fee per gas for each type of gas (similar to EIP-1559 max_priority_fee_per_gas)                                         | N        |
| callGasLimit         | number                        | Gas allocated for main execution call (simulated locally, gas for executing callData)                                                    | N        |
| verificationGasLimit | number                        | Gas allocated for verification steps (used in functions validateUserOp()/validatePaymasterUserOp())                                      | N        |
| preVerificationGas   | number                        | Gas paid for compensating pre-verification execution and call data bundler (extra gas to handle regular gas consumption, e.g., in loops) | N        |
>
>
Return Parameters:
>
>
| Field | Type          | Description      |
| ----- | ------------- | ---------------- |
| -     | UserOperation | Assembled userOp |
>
>
>
20. **disableModuleOp** - Disable a module.
>
>
```
disableModuleOp(walletAddress, etherProvider, prevModule, module, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas): Promise<UserOperation>
```
>
>
Input Parameters:
>
>
| Field                | Type                          | Description                                                                                                                              | Required |
| -------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string                        | Wallet proxy contract address                                                                                                            | Y        |
| etherProvider        | ethers.providers.BaseProvider | ethers.js provider, e.g., ethers.provider                                                                                                | Y        |
| prevModule           | string                        | Previous module address to be disabled                                                                                                   | Y        |
| module               | string                        | Module address to be disabled                                                                                                            | Y        |
| paymasterAndData     | string                        | Paymaster contract address and data to send to it (currently unclear implementation of paymaster, set to 0x0 if using our own paymaster) | N        |
| maxFeePerGas         | number                        | Maximum fee per gas for each type of gas (similar to EIP-1559 max_fee_per_gas)                                                           | N        |
| maxPriorityFeePerGas | number                        | Maximum priority fee per gas for each type of gas (similar to EIP-1559 max_priority_fee_per_gas)                                         | N        |
| callGasLimit         | number                        | Gas allocated for main execution call (simulated locally, gas for executing callData)                                                    | N        |
| verificationGasLimit | number                        | Gas allocated for verification steps (used in functions validateUserOp()/validatePaymasterUserOp())                                      | N        |
| preVerificationGas   | number                        | Gas paid for compensating pre-verification execution and call data bundler (extra gas to handle regular gas consumption, e.g., in loops) | N        |
>
>
Return Parameters:
>
>
| Field | Type          | Description      |
| ----- | ------------- | ---------------- |
| -     | UserOperation | Assembled userOp |
>
>
>
21. **isEnabledModule** - Check if an address is a valid module.
>
>
```
isEnabledModule(module, walletAddress, etherProvider): Promise<boolean>
```
>
Input Parameters:
>
>
| Field         | Type                          | Description                               | Required |
| ------------- | ----------------------------- | ----------------------------------------- | -------- |
| module        | string                        | Module address                            | Y        |
| walletAddress | string                        | Wallet proxy contract address             | Y        |
| etherProvider | ethers.providers.BaseProvider | ethers.js provider, e.g., ethers.provider | Y        |
>
>
Return Parameters:
>
>
| Field | Type    | Description                  |
| ----- | ------- | ---------------------------- |
| -     | boolean | Whether it is a valid module |
>
>
>
22. **isEnabledModules** - Check a group of addresses for valid modules.
>
>
```
isEnabledModules(modules, walletAddress, etherProvider): Promise<boolean>
```
>
>
Input Parameters:
>
>
| Field         | Type                          | Description                               | Required |
| ------------- | ----------------------------- | ----------------------------------------- | -------- |
| modules       | string[]                      | A group of module addresses               | Y        |
| walletAddress | string                        | Wallet proxy contract address             | Y        |
| etherProvider | ethers.providers.BaseProvider | ethers.js provider, e.g., ethers.provider | Y        |
>
>
Return Parameters:
>
>
| Field | Type    | Description                   |
| ----- | ------- | ----------------------------- |
| -     | boolean | Whether all are valid modules |
>
>
>
23. **getModulesPaginated** Paginated retrieval of an array of modules
>
>
```
getModulesPaginated(start: string, pageSize: number, walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<any[]>
```
>
>
Input Parameter:
>
>
| Field Name    | Type                          | Description                               | Required |
| ------------- | ----------------------------- | ----------------------------------------- | -------- |
| start         | string                        | Starting address of the pagination        | Y        |
| pageSize      | number                        | Page size                                 | Y        |
| walletAddress | string                        | Wallet proxy contract address             | Y        |
| etherProvider | ethers.providers.BaseProvider | Ethers.js provider, e.g., ethers.provider | Y        |
>
>
Return Parameter:
>
>
| Field Name | Type  | Description                                                                                                                                                               |
| ---------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -          | any[] | Array of modules returned, and the address of the next page of modules (The first element is the list of modules, and the second element is the address of the next page) |
>
>
>
24. **lockWalletOp** Lock the wallet
>
>
```
lockWalletOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, paymasterAndData: string, maxFeePerGas: number, maxPriorityFeePerGas: number, callGasLimit: number, verificationGasLimit: number, preVerificationGas: number): Promise<UserOperation>
```
>
>
Input Parameter:
>
>
| Field Name           | Type                          | Description                                                                                                                                                                                        | Required |
| -------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string                        | Wallet proxy contract address                                                                                                                                                                      | Y        |
| etherProvider        | ethers.providers.BaseProvider | Ethers.js provider, e.g., ethers.provider                                                                                                                                                          | Y        |
| paymasterAndData     | string                        | Paymaster contract address and data sent to paymaster (The current implementation of paymaster is not yet clear. If we use our own paymaster, this value is not required and can be fixed to 0x0.) | N        |
| maxFeePerGas         | number                        | Maximum fee per unit of gas, similar to EIP-1559 max_fee_per_gas                                                                                                                                   | N        |
| maxPriorityFeePerGas | number                        | Maximum priority fee per unit of gas, similar to EIP1559 max_priority_fee_per_gas                                                                                                                  | N        |
| callGasLimit         | number                        | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                                                     | N        |
| verificationGasLimit | number                        | Gas allocated for the verification step (used in functions validateUserOp() and validatePaymasterUserOp())                                                                                         | N        |
| preVerificationGas   | number                        | Gas paid for compensating the pre-verification execution and call data bundler (additional gas reserved to deal with some regular gas consumption, such as loops)                                  | N        |
>
>
Return Parameter:
>
>
| Field Name | Type          | Description             |
| ---------- | ------------- | ----------------------- |
| -          | UserOperation | Assembled UserOperation |
>
>
>
25. **unlockWalletOp** Unlock the wallet
>
>
```
unlockWalletOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, paymasterAndData: string, maxFeePerGas: number, maxPriorityFeePerGas: number, callGasLimit: number, verificationGasLimit: number, preVerificationGas: number): Promise<UserOperation>
```
>
>
Input Parameter:
>
>
| Field Name           | Type                          | Description                                                                                                                                                                                        | Required |
| -------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string                        | Wallet proxy contract address                                                                                                                                                                      | Y        |
| etherProvider        | ethers.providers.BaseProvider | Ethers.js provider, e.g., ethers.provider                                                                                                                                                          | Y        |
| paymasterAndData     | string                        | Paymaster contract address and data sent to paymaster (The current implementation of paymaster is not yet clear. If we use our own paymaster, this value is not required and can be fixed to 0x0.) | N        |
| maxFeePerGas         | number                        | Maximum fee per unit of gas, similar to EIP-1559 max_fee_per_gas                                                                                                                                   | N        |
| maxPriorityFeePerGas | number                        | Maximum priority fee per unit of gas, similar to EIP1559 max_priority_fee_per_gas                                                                                                                  | N        |
| callGasLimit         | number                        | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                                                     | N        |
| verificationGasLimit | number                        | Gas allocated for the verification step (used in functions validateUserOp() and validatePaymasterUserOp())                                                                                         | N        |
| preVerificationGas   | number                        | Gas paid for compensating the pre-verification execution and call data bundler (additional gas reserved to deal with some regular gas consumption, such as loops)                                  | N        |
>
>
Return Parameter:
>
>
| Field Name | Type          | Description             |
| ---------- | ------------- | ----------------------- |
| -          | UserOperation | Assembled UserOperation |
>
>
>
26. **isLocked** Verify if the wallet is locked
>
>
```
isLocked(walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<boolean>
```
>
>
Input Parameter:
>
>
| Field Name    | Type                          | Description                               | Required |
| ------------- | ----------------------------- | ----------------------------------------- | -------- |
| walletAddress | string                        | Wallet proxy contract address             | Y        |
| etherProvider | ethers.providers.BaseProvider | Ethers.js provider, e.g., ethers.provider | Y        |
>
>
Return Parameter:
>
>
| Field Name | Type    | Description                                                           |
| ---------- | ------- | --------------------------------------------------------------------- |
| -          | boolean | Whether the wallet is locked or not (true: locked; false: not locked) |
>
>
>
27. **getLock** Retrieve the lock duration of the wallet
>
>
getLock(walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<number />
Input Parameter:
>
>
| Field Name    | Type                          | Description                               | Required |
| ------------- | ----------------------------- | ----------------------------------------- | -------- |
| walletAddress | string                        | Wallet proxy contract address             | Y        |
| etherProvider | ethers.providers.BaseProvider | Ethers.js provider, e.g., ethers.provider | Y        |
>
>
Return Parameter:
>
>
| Field Name | Type   | Description                         |
| ---------- | ------ | ----------------------------------- |
| -          | number | Lock duration of the wallet (in ms) |
>
>
>
28. **setFallbackHandlerOp** Set the wallet's fallback handler for additional functionalities
>
>
```
setFallbackHandlerOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, handler: string, paymasterAndData: string, maxFeePerGas: number, maxPriorityFeePerGas: number, callGasLimit: number, verificationGasLimit: number, preVerificationGas: number): Promise<UserOperation>
```
>
>
Input Parameter:
>
>
| Field Name           | Type                          | Description                                                                                                                                                                                        | Required |
| -------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string                        | Wallet proxy contract address                                                                                                                                                                      | Y        |
| etherProvider        | ethers.providers.BaseProvider | Ethers.js provider, e.g., ethers.provider                                                                                                                                                          | Y        |
| handler              | string                        | Wallet extension contract address                                                                                                                                                                  | Y        |
| paymasterAndData     | string                        | Paymaster contract address and data sent to paymaster (The current implementation of paymaster is not yet clear. If we use our own paymaster, this value is not required and can be fixed to 0x0.) | N        |
| maxFeePerGas         | number                        | Maximum fee per unit of gas, similar to EIP-1559 max_fee_per_gas                                                                                                                                   | N        |
| maxPriorityFeePerGas | number                        | Maximum priority fee per unit of gas, similar to EIP1559 max_priority_fee_per_gas                                                                                                                  | N        |
| callGasLimit         | number                        | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                                                     | N        |
| verificationGasLimit | number                        | Gas allocated for the verification step (used in functions validateUserOp() and validatePaymasterUserOp())                                                                                         | N        |
| preVerificationGas   | number                        | Gas paid for compensating the pre-verification execution and call data bundler (additional gas reserved to deal with some regular gas consumption, such as loops)                                  | N        |
>
>
Return Parameter:
>
>
| Field Name | Type          | Description             |
| ---------- | ------------- | ----------------------- |
| -          | UserOperation | Assembled UserOperation |
>
>
>
29. **getEntryPoint** Retrieve the EntryPoint address of the wallet
>
>
```
getEntryPoint(walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<string>
```
>
>
Input Parameter:
>
>
| Field Name    | Type                          | Description                               | Required |
| ------------- | ----------------------------- | ----------------------------------------- | -------- |
| walletAddress | string                        | Wallet proxy contract address             | Y        |
| etherProvider | ethers.providers.BaseProvider | Ethers.js provider, e.g., ethers.provider | Y        |
>
>
Return Parameter:
>
>
| Field Name | Type   | Description        |
| ---------- | ------ | ------------------ |
| -          | string | EntryPoint address |
>
>
>
30. **withdrawDepositOp** Withdraw the wallet's own pledge to the amount advanced to the EntryPoint
>
>
```
withdrawDepositOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, withdrawAddress: string, amount: number, paymasterAndData: string, maxFeePerGas: number, maxPriorityFeePerGas: number, callGasLimit: number, verificationGasLimit: number, preVerificationGas: number): Promise<UserOperation>
```
>
>
Input Parameter:
>
>
| Field Name           | Type                          | Description                                                                                                                                                                                        | Required |
| -------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string                        | Wallet proxy contract address                                                                                                                                                                      | Y        |
| etherProvider        | ethers.providers.BaseProvider | Ethers.js provider, e.g., ethers.provider                                                                                                                                                          | Y        |
| withdrawAddress      | string                        | Withdraw address                                                                                                                                                                                   | Y        |
| amount               | number                        | Amount of the pledge to be withdrawn                                                                                                                                                               | Y        |
| paymasterAndData     | string                        | Paymaster contract address and data sent to paymaster (The current implementation of paymaster is not yet clear. If we use our own paymaster, this value is not required and can be fixed to 0x0.) | N        |
| maxFeePerGas         | number                        | Maximum fee per unit of gas, similar to EIP-1559 max_fee_per_gas                                                                                                                                   | N        |
| maxPriorityFeePerGas | number                        | Maximum priority fee per unit of gas, similar to EIP1559 max_priority_fee_per_gas                                                                                                                  | N        |
| callGasLimit         | number                        | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                                                     | N        |
| verificationGasLimit | number                        | Gas allocated for the verification step (used in functions validateUserOp() and validatePaymasterUserOp())                                                                                         | N        |
| preVerificationGas   | number                        | Gas paid for compensating the pre-verification execution and call data bundler (additional gas reserved to deal with some regular gas consumption, such as loops)                                  | N        |
>
>
Return Parameter:
>
>
| Field Name | Type          | Description             |
| ---------- | ------------- | ----------------------- |
| -          | UserOperation | Assembled UserOperation |
>
>
>
31. **addDeposit** Pledge the wallet's own deposit to the EntryPoint
>
>
```
addDeposit(walletAddress: string, signer: ethers.Wallet, value: string): Promise<any>
```
>
>
Input Parameter:
>
>
| Field Name    | Type          | Description                   | Required |
| ------------- | ------------- | ----------------------------- | -------- |
| walletAddress | string        | Wallet proxy contract address | Y        |
| signer        | ethers.Wallet | Ethers.js Wallet              | Y        |
| value         | string        | The amount of the pledge      | Y        |
>
>
Return Parameter:
>
>
None
>
>
>
32. **getDeposit** Query the balance of the wallet's own deposit
>
>
```
getDeposit(walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<number>
```
>
>
Input Parameter:
>
>
| Field Name    | Type                          | Description                               | Required |
| ------------- | ----------------------------- | ----------------------------------------- | -------- |
| walletAddress | string                        | Wallet proxy contract address             | Y        |
| etherProvider | ethers.providers.BaseProvider | Ethers.js provider, e.g., ethers.provider | Y        |
>
>
Return Parameter:
>
>
| Field Name | Type   | Description                         |
| ---------- | ------ | ----------------------------------- |
| -          | number | Balance of the wallet's own deposit |
>
>
>
## 6. Bundler External Functions
>
>
1. **Constructor**
>
>
```
new Bundler(entryPoint: string, etherProvider: ethers.providers.BaseProvider, bundlerApiURL: string, timeout?: ApiTimeOut)
```
>
>
Input Parameters:
>
>
| Name          | Type                          | Description                                                                                                         | Required |
| ------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- |
| entryPoint    | string                        | Address of the entryPoint contract                                                                                  | Y        |
| etherProvider | ethers.providers.BaseProvider | ethers.js provider, e.g., ethers.provider                                                                           | Y        |
| bundlerApiURL | string                        | URL of the bundler                                                                                                  | Y        |
| timeout       | ApiTimeOut                    | Timeout options: web3ApiRequestTimeout, web3ApiResponseTimeout, bundlerApiRequestTimeout, bundlerApiResponseTimeout | N        |
>
>
Return Parameters:
>
>
| Name | Type    | Description    |
| ---- | ------- | -------------- |
| -    | Bundler | Bundler object |
>
>
>
2. **platon_chainId** (EIP-4337 specification) - Returns the EIP-155 chain ID
>
>
```
platon_chainId(timeout?: number): Promise<string>
```
>
>
Input Parameters:
>
>
| Name    | Type   | Description | Required |
| ------- | ------ | ----------- | -------- |
| timeout | number | Timeout     | N        |
>
>
Return Parameters:
>
>
| Name | Type   | Description |
| ---- | ------ | ----------- |
| -    | string | Chain ID    |
>
>
>
3. **platon_estimateUserOperationGas** (EIP-4337 specification) - Estimates gas for UserOperation
>
>
```
platon_estimateUserOperationGas(userOp: UserOperation, timeout?: number): Promise<EstimateUserOpGas>
```
>
>
Input Parameters:
>
>
| Name    | Type          | Description          | Required |
| ------- | ------------- | -------------------- | -------- |
| userOp  | UserOperation | UserOperation object | Y        |
| timeout | number        | Timeout              | N        |
>
>
Return Parameters:
>
>
| Name | Type              | Description           |
| ---- | ----------------- | --------------------- |
| -    | EstimateUserOpGas | Gas estimation result |
>
>
>
4. **platon_getUserOperationByHash** (EIP-4337 specification) - Returns a UserOperation based on the hash returned by eth_sendUserOperation
>
>
```
platon_getUserOperationByHash(userOpHash: string, timeout?: number): Promise<null | UserOperationReceipt>
```
>
>
Input Parameters:
>
>
| Name       | Type   | Description   | Required |
| ---------- | ------ | ------------- | -------- |
| userOpHash | string | UserOp's hash | Y        |
| timeout    | number | Timeout       | N        |
>
>
Return Parameters:
>
>
| Name | Type                 | Description                             |
| ---- | -------------------- | --------------------------------------- |
| -    | UserOperationReceipt | EIP-4337 specification-defined response |
>
>
>
5. **platon_getUserOperationReceipt** (EIP-4337 specification) - Returns a UserOperation receipt based on the hash returned by eth_sendUserOperation
>
>
```
platon_getUserOperationReceipt(userOpHash: string, timeout?: number): Promise<null | UserOperationReceipt>
```
>
>
Input Parameters:
>
>
| Name       | Type   | Description   | Required |
| ---------- | ------ | ------------- | -------- |
| userOpHash | string | UserOp's hash | Y        |
| timeout    | number | Timeout       | N        |
>
>
Return Parameters:
>
>
| Name | Type                 | Description                             |
| ---- | -------------------- | --------------------------------------- |
| -    | UserOperationReceipt | EIP-4337 specification-defined response |
>
>
>
6. **platon_sendUserOperation** (EIP-4337 specification) - Submits a UserOperation object to the bundler's User Operation pool
>
>
```
platon_sendUserOperation(userOp: UserOperation, timeout?: number): Promise<string>
```
>
>
Input Parameters:
>
>
| Name    | Type          | Description               | Required |
| ------- | ------------- | ------------------------- | -------- |
| userOp  | UserOperation | UserOperation information | Y        |
| timeout | number        | Timeout                   | N        |
>
>
Return Parameters:
>
>
| Name | Type   | Description         |
| ---- | ------ | ------------------- |
| -    | string | EIP-4337 userOpHash |
>
>
>
7. **platon_supportedEntryPoints** (EIP-4337 specification) - Returns an array of entryPoint contract addresses supported by the bundler
>
>
```
platon_supportedEntryPoints(timeout?: number): Promise<string[]>
```
>
>
Input Parameters:
>
>
| Name    | Type   | Description | Required |
| ------- | ------ | ----------- | -------- |
| timeout | number | Timeout     | N        |
>
>
Return Parameters:
>
>
| Name | Type     | Description                            |
| ---- | -------- | -------------------------------------- |
| -    | string[] | Array of entryPoint contract addresses |
>
>
>
8. **sendUserOperation** Submits a UserOperation object to the bundler's User Operation pool and appends a listener
>
>
```
sendUserOperation(userOp: UserOperation, timeout?: number, receiptTimeout?: number, receiptInterval?: number): EventEmitter
```
>
>
Input Parameters:
>
>
| Name            | Type          | Description                 | Required |
| --------------- | ------------- | --------------------------- | -------- |
| userOp          | UserOperation | UserOperation information   | Y        |
| timeout         | number        | Timeout for bundler request | N        |
| receiptTimeout  | number        | Timeout for listener        | N        |
| receiptInterval | number        | Listener interval           | N        |
>
>
Return Parameters:
>
>
| Name | Type         | Description       |
| ---- | ------------ | ----------------- |
| -    | EventEmitter | JS event listener |
>
>
>
9. **simulateHandleOp** Simulates the execution of a userOp
>
>
```
simulateHandleOp(op: UserOperation, target?: string, targetCallData?: string): Promise<Result>
```
>
>
Input Parameters:
>
>
| Name           | Type          | Description                                                                                                                                                             | Required |
| -------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| op             | UserOperation | UserOperation information                                                                                                                                               | Y        |
| target         | string        | Target address if non-zero, indicating a call to be made after the userOp simulation. If called, targetSuccess and TargetResult are set to the return value of the call | N        |
| targetCallData | string        | CallData to be passed to the target address                                                                                                                             | N        |
>
>
Return Parameters:
>
>
| Name | Type   | Description      |
| ---- | ------ | ---------------- |
| -    | Result | Execution result |
>
>
>
10. **simulateValidation** Simulates the validation of a userOp
>
>
```
simulateValidation(op: UserOperation): Promise<Result>
```
>
>
Input Parameters:
>
>
| Name | Type          | Description               | Required |
| ---- | ------------- | ------------------------- | -------- |
| op   | UserOperation | UserOperation information | Y        |
>
>
Return Parameters:
>
>
| Name | Type   | Description      |
| ---- | ------ | ---------------- |
| -    | Result | Execution result |
>
>
>
## 7. Paymaster External Functions
>
>
1. **Constructor**
>
>
```
new Paymaster(payMasterAddress: string, wallet: ethers.Wallet)
```
>
>
Input Parameters:
>
>
| Name             | Type          | Description                                        | Required |
| ---------------- | ------------- | -------------------------------------------------- | -------- |
| payMasterAddress | string        | Paymaster address                                  | Y        |
| wallet           | ethers.Wallet | ethers.js wallet instance (owner of the paymaster) | Y        |
>
>
Return Parameters:
>
>
| Name | Type      | Description      |
| ---- | --------- | ---------------- |
| -    | Paymaster | Paymaster object |
>
>
>
2. **addSupportedToken** Add supported token category
>
>
```
addSupportedToken(token: string, priceOracle: string): Promise<any>
```
>
>
Input Parameters:
>
>
| Name        | Type   | Description                  | Required |
| ----------- | ------ | ---------------------------- | -------- |
| token       | string | Token address                | Y        |
| priceOracle | string | Token's price oracle address | Y        |
>
>
Return Parameters:
>
>
| Name | Type                | Description         |
| ---- | ------------------- | ------------------- |
| -    | transaction receipt | Transaction receipt |
>
>
>
3. **removeSupportedToken** Remove supported token category
>
>
```
removeSupportedToken(token: string): Promise<any>
```
>
>
Input Parameters:
>
>
| Name  | Type   | Description   | Required |
| ----- | ------ | ------------- | -------- |
| token | string | Token address | Y        |
>
>
Return Parameters:
>
>
| Name | Type                | Description         |
| ---- | ------------------- | ------------------- |
| -    | transaction receipt | Transaction receipt |
>
>
>
4. **paymasterSupportedToken** Check supported token category
>
>
```
paymasterSupportedToken(tokens: string[]): Promise<string[]>
```
>
>
Input Parameters:
>
>
| Name   | Type     | Description     | Required |
| ------ | -------- | --------------- | -------- |
| tokens | string[] | Token addresses | Y        |
>
>
Return Parameters:
>
>
| Name | Type     | Description     |
| ---- | -------- | --------------- |
| -    | string[] | Token addresses |
>
>
>
5. **entryPoint** Get the entrypoint contract address of the paymaster
>
>
```
entryPoint(): Promise<any>
```
>
>
Input Parameters:
>
>
| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| -    | -    | None        | -        |
>
>
Return Parameters:
>
>
| Name | Type    | Description        |
| ---- | ------- | ------------------ |
| -    | address | Entrypoint address |
>
>
>
6. **addStake** Add stake
>
>
```
addStake(extraUnstakeDelaySec: number, value: string): Promise<any>
```
>
>
Input Parameters:
>
>
| Name                 | Type   | Description                              | Required |
| -------------------- | ------ | ---------------------------------------- | -------- |
| extraUnstakeDelaySec | number | Delay in seconds for unstaking           | Y        |
| value                | string | Hex value of the staking amount (in lat) | Y        |
>
>
Return Parameters:
>
>
| Name | Type                | Description         |
| ---- | ------------------- | ------------------- |
| -    | transaction receipt | Transaction receipt |
>
>
>
7. **deposit** Add deposit amount
>
>
```
deposit(value: string): Promise<any>
```
>
>
Input Parameters:
>
>
| Name  | Type   | Description                              | Required |
| ----- | ------ | ---------------------------------------- | -------- |
| value | string | Hex value of the deposit amount (in lat) | Y        |
>
>
Return Parameters:
>
>
| Name | Type                | Description         |
| ---- | ------------------- | ------------------- |
| -    | transaction receipt | Transaction receipt |
>
>
>
8. **unlockStake** Unlock stake
>
>
```
unlockStake(): Promise<any>
```
>
>
Input Parameters:
>
>
| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| -    | -    | None        | -        |
>
>
Return Parameters:
>
>
| Name | Type                | Description         |
| ---- | ------------------- | ------------------- |
| -    | transaction receipt | Transaction receipt |
>
>
>
9. **withdrawStake** Withdraw stake amount
>
>
```
withdrawStake(withdrawAddress: string): Promise<any>
```
>
>
Input Parameters:
>
>
| Name            | Type   | Description                                    | Required |
| --------------- | ------ | ---------------------------------------------- | -------- |
| withdrawAddress | string | Account address to receive the withdrawn stake | Y        |
>
>
Return Parameters:
>
>
| Name | Type                | Description         |
| ---- | ------------------- | ------------------- |
| -    | transaction receipt | Transaction receipt |
>
>
>
10. **withdrawTo** Withdraw deposit amount
>
>
```
withdrawTo(withdrawAddress: string, amount: string): Promise<any>
```
>
>
Input Parameters:
>
>
| Name            | Type   | Description                                        | Required |
| --------------- | ------ | -------------------------------------------------- | -------- |
| withdrawAddress | string | Account address to receive the withdrawn deposit   | Y        |
| amount          | string | Hex value of the withdrawn deposit amount (in lat) | Y        |
>
>
Return Parameters:
>
>
| Name | Type                | Description         |
| ---- | ------------------- | ------------------- |
| -    | transaction receipt | Transaction receipt |
>
>
>
11. **withdrawToken** Withdraw compensated tokens
>
>
```
withdrawToken(token: string, to: string, amount: string): Promise<any>
```
>
>
Input Parameters:
>
>
| Name   | Type   | Description                                     | Required |
| ------ | ------ | ----------------------------------------------- | -------- |
| token  | string | Token address to be withdrawn                   | Y        |
| to     | string | Account address to receive the withdrawn tokens | Y        |
| amount | string | Amount of tokens to be withdrawn (in lat)       | Y        |
>
>
Return Parameters:
>
>
| Name | Type                | Description         |
| ---- | ------------------- | ------------------- |
| -    | transaction receipt | Transaction receipt |
>
>
>
12. **getDeposit** Get remaining deposit balance
>
>
```
getDeposit(): Promise<any>
```
>
>
Input Parameters:
>
>
| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| -    | -    | None        | -        |
>
>
Return Parameters:
>
>
| Name | Type   | Description     |
| ---- | ------ | --------------- |
| -    | number | Deposit balance |
>
>
>
13. **getExchangePrice** Get token price information
>
>
```
getExchangePrice(token: string, fetchTokenDecimals?: boolean): Promise<{ decimals: number; price: BigNumber; tokenDecimals: undefined | number }>
```
>
>
Input Parameters:
>
>
| Name               | Type    | Description                     | Required |
| ------------------ | ------- | ------------------------------- | -------- |
| token              | string  | Token address                   | Y        |
| fetchTokenDecimals | boolean | Whether to fetch token decimals | N        |
>
>
Return Parameters:
>
>
| Name          | Type      | Description          |
| ------------- | --------- | -------------------- |
| price         | BigNumber | Token price          |
| decimals      | number    | Token price decimals |
| tokenDecimals | number    | Token decimals       |
>
>
>
## 8. UserOperation External Functions
>
>
1. **Constructor**
>
>
```
new UserOperation(sender?, nonce?, initCode?, callData?, callGasLimit?, maxFeePerGas?, maxPriorityFeePerGas?, paymasterAndData?, verificationGasLimit?, preVerificationGas?, signature?)
```
>
>
Return Parameters:
>
>
| Field Name           | Type   | Description                                                                                                                                                                            | Required |
| -------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| sender               | string | Wallet address that performs the operation (the address of the wallet contract, but the sender's EOA address during the first deployment)                                              | N        |
| nonce                | number | Anti-replay parameter set in the wallet, also used as salt for the initial creation of the wallet                                                                                      | N        |
| initCode             | string | All wallet creation in this design is deployed by the predefined wallet template contract (EIP-1167), so this field is empty                                                           | N        |
| callData             | string | Data passed by the sender to the main execution call (opcode converted by the wallet from the user's request)                                                                          | N        |
| callGasLimit         | number | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                                         | N        |
| maxFeePerGas         | number | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                                     | N        |
| maxPriorityFeePerGas | number | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                                     | N        |
| paymasterAndData     | string | Paymaster contract address and data sent to the paymaster, the implementation of the paymaster is not clear yet, and if we use our own paymaster, this value is not needed, set to 0x0 | N        |
| verificationGasLimit | number | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                             | N        |
| preVerificationGas   | number | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.)              | N        |
| signature            | string | Signatures of multiple Owners, multiple Owners sign the UserOperation                                                                                                                  | N        |
>
>
Return Parameter:
>
>
UserOperation
>
>
>
2. **addSupportedToken** Serialize UserOperation
>
>
```
Serialized(): void
```
>
>
Input Parameter:
>
>
None
>
>
Return Parameter:
>
>
None
>
>
>
3. **callDataCost** Calculate the call cost
>
>
```
callDataCost(): number
```
>
>
Input Parameter:
>
>
None
>
>
Return Parameter:
>
>
| Field Name | Type      | Description |
| ---------- | --------- | ----------- |
| -          | BigNumber | Call cost   |
>
>
>
4. **getStruct** Get the serialized UserOperation
>
>
```
getStruct(): SerializedUserOperation
```
>
>
Input Parameter:
>
>
None
>
>
Return Parameter:
>
>
| Field Name           | Type   | Description                                                                                                                                                                            |
| -------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sender               | string | Wallet address that performs the operation (the address of the wallet contract, but the sender's EOA address during the first deployment)                                              |
| nonce                | number | Anti-replay parameter set in the wallet, also used as salt for the initial creation of the wallet                                                                                      |
| initCode             | string | All wallet creation in this design is deployed by the predefined wallet template contract (EIP-1167), so this field is empty                                                           |
| callData             | string | Data passed by the sender to the main execution call (opcode converted by the wallet from the user's request)                                                                          |
| callGasLimit         | number | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                                         |
| maxFeePerGas         | number | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                                     |
| maxPriorityFeePerGas | number | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                                     |
| paymasterAndData     | string | Paymaster contract address and data sent to the paymaster, the implementation of the paymaster is not clear yet, and if we use our own paymaster, this value is not needed, set to 0x0 |
| verificationGasLimit | number | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                             |
| preVerificationGas   | number | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.)              |
| signature            | string | Signatures of multiple Owners, multiple Owners sign the UserOperation                                                                                                                  |
>
>
>
5. **getUserOpHash** Get UserOperation Hash
>
>
```
getUserOpHash(entryPointAddress, chainId): string
```
>
>
Input Parameter:
>
>
| Field Name        | Type   | Description                 | Required |
| ----------------- | ------ | --------------------------- | -------- |
| entryPointAddress | string | Entrypoint contract address | Y        |
| chainId           | number | Chain ID                    | Y        |
>
>
Return Parameter:
>
>
| Field Name | Type   | Description              |
| ---------- | ------ | ------------------------ |
| -          | string | UserOperation hash value |
>
>
>
6. **getUserOpHashFromContract** Get UserOperation Hash
>
>
```
getUserOpHashFromContract(entryPointAddress, etherProvider, defaultBlock?): Promise<string>
```
>
>
Input Parameter:
>
>
| Field Name        | Type                          | Description                                        | Required |
| ----------------- | ----------------------------- | -------------------------------------------------- | -------- |
| entryPointAddress | string                        | Entrypoint contract address                        | Y        |
| etherProvider     | ethers.providers.BaseProvider | ethers.js provider, e.g., ethers.provider          | Y        |
| defaultBlock      | string                        | 'earliest', 'latest', 'pending', default: 'latest' | N        |
>
>
Return Parameter:
>
>
| Field Name | Type   | Description              |
| ---------- | ------ | ------------------------ |
| -          | string | UserOperation hash value |
>
>
>
7. **packUserOp** Assemble EIP-712 information of UserOperation
>
>
```
packUserOp(forSignature?): string
```
>
>
Input Parameter:
>
>
| Field Name   | Type    | Description                                                                                                                                              | Required |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| forSignature | boolean | Whether it is for computing the EIP-712 information for signature value, true: does not include the signature value; false: includes the signature value | N        |
>
>
Return Parameter:
>
>
| Field Name | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| -          | string | EIP-712 information of UserOperation |
>
>
>
8. **signWithSignature** Fill in the value of the 'signature' field of UserOperation based on the signature, signature mode, validity period start time, and validity period end time
>
>
```
signWithSignature(signature, signatureMode?, validAfter?, validUntil?): void
```
>
>
Input Parameter:
>
>
| Field Name    | Type          | Description                                        | Required |
| ------------- | ------------- | -------------------------------------------------- | -------- |
| signature     | string        | Signature message                                  | Y        |
| signatureMode | SignatureMode | Signature mode, 0: owner; 1: guardians; 2: session | N        |
| validAfter    | number        | Validity period start time                         | N        |
| validUntil    | number        | Validity period end time                           | N        |
>
>
Return Parameter:
>
>
None
>
>
9. **toJSON** Convert UserOperation to JSON format information
>
>
```
toJSON(): string
```
>
>
Input Parameter:
>
>
None
>
>
Return Parameter:
>
>
| Field Name | Type   | Description                              |
| ---------- | ------ | ---------------------------------------- |
| -          | string | JSON format information of UserOperation |
>
>
>
10. **toTuple** Convert UserOperation to tuple format information
>
>
```
toTuple(): string
```
>
>
Input Parameter:
>
>
None
>
>
Return Parameter:
>
>
| Field Name | Type   | Description                               |
| ---------- | ------ | ----------------------------------------- |
| -          | string | Tuple format information of UserOperation |
>
>
>
11. **fromJSON** Convert JSON format information to UserOperation
>
>
```
fromJSON(json): UserOperation
```
>
>
Input Parameter:
>
>
| Field Name | Type   | Description                              | Required |
| ---------- | ------ | ---------------------------------------- | -------- |
| json       | string | JSON format information of UserOperation | Y        |
>
>
Return Parameter:
>
>
| Field Name | Type          | Description               |
| ---------- | ------------- | ------------------------- |
| -          | UserOperation | UserOperation information |
>
>
>
12. **fromObject** Convert object format information to UserOperation
>
>
```
fromObject(obj): UserOperation
```
>
>
Input Parameter:
>
>
| Field Name | Type   | Description                                | Required |
| ---------- | ------ | ------------------------------------------ | -------- |
| obj        | object | Object format information of UserOperation | Y        |
>
>
Return Parameter:
>
>
| Field Name | Type          | Description               |
| ---------- | ------------- | ------------------------- |
| -          | UserOperation | UserOperation information |
>
>
>
## 9. Callbase External Functions
>
>
1. **createOp** Create UserOperation for calling the wallet (executeFromModule)
>
>
```
createOp(
        walletAddress: string,
        nonce: NumberLike,
        paymasterAndData: string,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
        data: string,
    ) : UserOperation
```
>
>
Input Parameter:
>
>
| Field Name           | Type   | Description                                                                                                                                                                            | Required |
| -------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string | Wallet address that performs the operation (the address of the wallet contract, but the sender's EOA address during the first deployment)                                              | Y        |
| nonce                | number | Anti-replay parameter set in the wallet, also used as salt for the initial creation of the wallet                                                                                      | Y        |
| paymasterAndData     | string | Paymaster contract address and data sent to the paymaster, the implementation of the paymaster is not clear yet, and if we use our own paymaster, this value is not needed, set to 0x0 | Y        |
| maxFeePerGas         | number | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                                     | Y        |
| maxPriorityFeePerGas | number | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                                     | Y        |
| callGasLimit         | number | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                                         | Y        |
| verificationGasLimit | number | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                             | Y        |
| preVerificationGas   | number | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.)              | Y        |
| data                 | string | Parameter for calling the wallet contract's executeFromModule (i.e., the encoded call for other wallet functions)                                                                      | Y        |
>
>
Return Parameter:
>
>
UserOperation
>
>
>
2. **createOpByBatch** Create UserOperation for calling the wallet (executeBatchFromModule)
>
>
```
createOpByBatch(
        walletAddress: string,
        nonce: NumberLike,
        paymasterAndData: string,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
        datas: string[],
    ) : UserOperation
```
>
>
Input Parameter:
>
>
| Field Name           | Type     | Description                                                                                                                                                                            | Required |
| -------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string   | Wallet address that performs the operation (the address of the wallet contract, but the sender's EOA address during the first deployment)                                              | Y        |
| nonce                | number   | Anti-replay parameter set in the wallet, also used as salt for the initial creation of the wallet                                                                                      | Y        |
| paymasterAndData     | string   | Paymaster contract address and data sent to the paymaster, the implementation of the paymaster is not clear yet, and if we use our own paymaster, this value is not needed, set to 0x0 | Y        |
| maxFeePerGas         | number   | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                                     | Y        |
| maxPriorityFeePerGas | number   | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                                     | Y        |
| callGasLimit         | number   | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                                         | Y        |
| verificationGasLimit | number   | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                             | Y        |
| preVerificationGas   | number   | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.)              | Y        |
| datas                | string[] | Parameters for calling the wallet contract's executeBatchFromModule (i.e., the encoded calls for other wallet functions)                                                               | Y        |
>
>
Return Parameter:
>
>
UserOperation
>
>
>
## 10. ERC20 External Functions
>
>
1. **Constructor**
>
>
```
new ERC20()
```
>
>
Input Parameter:
>
>
None
>
>
Return Parameter:
>
>
ERC20
>
>
>
2. **approve** Create UserOperation for calling the 'approve' function of ERC20
>
>
```
approve(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
            maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
            verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _spender: string, _value: string) : UserOperation
```
>
>
Input Parameter:
>
>
| Field Name           | Type   | Description                                                                                                                                                               | Required |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string | Wallet address                                                                                                                                                            | Y        |
| nonce                | number | Wallet nonce                                                                                                                                                              | Y        |
| paymasterAddress     | string | Paymaster address                                                                                                                                                         | Y        |
| maxFeePerGas         | number | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                        | Y        |
| maxPriorityFeePerGas | number | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                        | Y        |
| callGasLimit         | number | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                            | Y        |
| verificationGasLimit | number | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                | Y        |
| preVerificationGas   | number | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.) | Y        |
| `_token`             | string | ERC20 token address to operate on                                                                                                                                         | Y        |
| `_spender`           | string | The `_spender` parameter for 'approve'                                                                                                                                    | Y        |
| `_value`             | string | The `_value` parameter for 'approve'                                                                                                                                      | Y        |
>
>
Return Parameter:
>
>
UserOperation
>
>
>
3. **transferFrom** Create UserOperation for calling the 'transferFrom' function of ERC20
>
>
```
transferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                 maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                 verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _value: string) : UserOperation
```
>
>
Input Parameter:
>
>
| Field Name           | Type   | Description                                                                                                                                                               | Required |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string | Wallet address                                                                                                                                                            | Y        |
| nonce                | number | Wallet nonce                                                                                                                                                              | Y        |
| paymasterAddress     | string | Paymaster address                                                                                                                                                         | Y        |
| maxFeePerGas         | number | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                        | Y        |
| maxPriorityFeePerGas | number | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                        | Y        |
| callGasLimit         | number | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                            | Y        |
| verificationGasLimit | number | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                | Y        |
| preVerificationGas   | number | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.) | Y        |
| `_token`             | string | ERC20 token address to operate on                                                                                                                                         | Y        |
| `_from`              | string | The `_from` parameter for 'transferFrom'                                                                                                                                  | Y        |
| `_to`                | string | The `_to` parameter for 'transferFrom'                                                                                                                                    | Y        |
| `_value`             | string | The `_value` parameter for 'transferFrom'                                                                                                                                 | Y        |
>
>
Return Parameter:
>
>
UserOperation
>
>
>
4. **transfer** Create UserOperation for calling the 'transfer' function of ERC20
>
>
```
transfer(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
             maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
             verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _to: string, _value: string) : UserOperation
```
>
>
Input Parameter:
>
>
| Field Name           | Type   | Description                                                                                                                                                               | Required |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string | Wallet address                                                                                                                                                            | Y        |
| nonce                | number | Wallet nonce                                                                                                                                                              | Y        |
| paymasterAddress     | string | Paymaster address                                                                                                                                                         | Y        |
| maxFeePerGas         | number | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                        | Y        |
| maxPriorityFeePerGas | number | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                        | Y        |
| callGasLimit         | number | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                            | Y        |
| verificationGasLimit | number | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                | Y        |
| preVerificationGas   | number | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.) | Y        |
| `_token`             | string | ERC20 token address to operate on                                                                                                                                         | Y        |
| `_to`                | string | The `_to` parameter for 'transfer'                                                                                                                                        | Y        |
| `_value`             | string | The `_value` parameter for 'transfer'                                                                                                                                     | Y        |
>
>
Return Parameter:
>
>
UserOperation
>
>
>
## 11. ERC721 External Functions
>
>
1. **Constructor**
>
>
```
new ERC721();
```
>
>
Input Parameter:
>
>
None
>
>
Return Parameter:
>
>
ERC721
>
>
>
2. **approve** Create UserOperation for calling the 'approve' function of ERC721
>
>
```
approve(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
        maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
        verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _spender: string, _tokenId: string) : UserOperation
```
>
>
Input Parameter:
>
>
| Field Name           | Type   | Description                                                                                                                                                               | Required |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string | Wallet address                                                                                                                                                            | Y        |
| nonce                | number | Wallet nonce                                                                                                                                                              | Y        |
| paymasterAddress     | string | Paymaster address                                                                                                                                                         | Y        |
| maxFeePerGas         | number | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                        | Y        |
| maxPriorityFeePerGas | number | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                        | Y        |
| callGasLimit         | number | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                            | Y        |
| verificationGasLimit | number | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                | Y        |
| preVerificationGas   | number | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.) | Y        |
| `_token`             | string | ERC20 token address to operate on                                                                                                                                         | Y        |
| `_spender`           | string | The `_spender` parameter for 'approve'                                                                                                                                    | Y        |
| `_tokenId`           | string | The `_tokenId` parameter for 'approve'                                                                                                                                    | Y        |
>
>
Return Parameter:
>
>
UserOperation
>
>
>
3. **transferFrom** Create UserOperation for calling the 'transferFrom' function of ERC721
>
>
```
transferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
             maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
             verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _tokenId: string) : UserOperation
```
>
>
Input Parameter:
>
>
| Field Name           | Type   | Description                                                                                                                                                               | Required |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string | Wallet address                                                                                                                                                            | Y        |
| nonce                | number | Wallet nonce                                                                                                                                                              | Y        |
| paymasterAddress     | string | Paymaster address                                                                                                                                                         | Y        |
| maxFeePerGas         | number | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                        | Y        |
| maxPriorityFeePerGas | number | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                        | Y        |
| callGasLimit         | number | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                            | Y        |
| verificationGasLimit | number | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                | Y        |
| preVerificationGas   | number | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.) | Y        |
| `_token`             | string | ERC20 token address to operate on                                                                                                                                         | Y        |
| `_from`              | string | The `_from` parameter for 'transferFrom'                                                                                                                                  | Y        |
| `_to`                | string | The `_to` parameter for 'transferFrom'                                                                                                                                    | Y        |
| `_tokenId`           | string | The `_tokenId` parameter for 'transferFrom'                                                                                                                               | Y        |
>
>
Return Parameter:
>
>
UserOperation
>
>
>
4. **transfer** Create UserOperation for calling the 'transfer' function of ERC721
>
>
```
transfer(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
         maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
         verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _to: string, _tokenId: string) : UserOperation
```
>
>
Input Parameter:
>
>
| Field Name           | Type   | Description                                                                                                                                                               | Required |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string | Wallet address                                                                                                                                                            | Y        |
| nonce                | number | Wallet nonce                                                                                                                                                              | Y        |
| paymasterAddress     | string | Paymaster address                                                                                                                                                         | Y        |
| maxFeePerGas         | number | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                        | Y        |
| maxPriorityFeePerGas | number | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                        | Y        |
| callGasLimit         | number | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                            | Y        |
| verificationGasLimit | number | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                | Y        |
| preVerificationGas   | number | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.) | Y        |
| `_token`             | string | ERC20 token address to operate on                                                                                                                                         | Y        |
| `_to`                | string | The `_to` parameter for 'transfer'                                                                                                                                        | Y        |
| `_tokenId`           | string | The `_tokenId` parameter for 'transfer'                                                                                                                                   | Y        |
>
>
Return Parameter:
>
>
UserOperation
>
>
>
5. **safeTransferFrom** Create UserOperation for calling the 'safeTransferFrom' function of ERC721
>
>
```
safeTransferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                 maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                 verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _tokenId: string) : UserOperation
```
>
>
Input Parameter:
>
>
| Field Name           | Type   | Description                                                                                                                                                               | Required |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string | Wallet address                                                                                                                                                            | Y        |
| nonce                | number | Wallet nonce                                                                                                                                                              | Y        |
| paymasterAddress     | string | Paymaster address                                                                                                                                                         | Y        |
| maxFeePerGas         | number | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                        | Y        |
| maxPriorityFeePerGas | number | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                        | Y        |
| callGasLimit         | number | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                            | Y        |
| verificationGasLimit | number | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                | Y        |
| preVerificationGas   | number | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.) | Y        |
| `_token`             | string | ERC20 token address to operate on                                                                                                                                         | Y        |
| `_from`              | string | The `_from` parameter for 'safeTransferFrom'                                                                                                                              | Y        |
| `_to`                | string | The `_to` parameter for 'safeTransferFrom'                                                                                                                                | Y        |
| `_tokenId`           | string | The `_tokenId` parameter for 'safeTransferFrom'                                                                                                                           | Y        |
>
>
Return Parameter:
>
>
UserOperation
>
>
>
6. **setApprovalForAll** Create UserOperation for calling the 'setApprovalForAll' function of ERC721
>
>
```
setApprovalForAll(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                  maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                  verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _operator: string, _approved: boolean) : UserOperation
```
>
>
Input Parameter:
>
>
| Field Name           | Type    | Description                                                                                                                                                               | Required |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string  | Wallet address                                                                                                                                                            | Y        |
| nonce                | number  | Wallet nonce                                                                                                                                                              | Y        |
| paymasterAddress     | string  | Paymaster address                                                                                                                                                         | Y        |
| maxFeePerGas         | number  | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                        | Y        |
| maxPriorityFeePerGas | number  | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                        | Y        |
| callGasLimit         | number  | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                            | Y        |
| verificationGasLimit | number  | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                | Y        |
| preVerificationGas   | number  | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.) | Y        |
| `_token`             | string  | ERC20 token address to operate on                                                                                                                                         | Y        |
| `_operator`          | string  | The `_operator` parameter for 'setApprovalForAll'                                                                                                                         | Y        |
| `_approved`          | boolean | The `_approved` parameter for 'setApprovalForAll'                                                                                                                         | Y        |
>
>
Return Parameter:
>
>
UserOperation
>
>
>
## 12. ERC1155 External Functions
>
>
1. **Constructor**
>
>
```
new ERC1155();
```
>
>
Input Parameter:
>
>
None
>
>
Return Parameter:
>
>
ERC1155
>
>
>
2. **safeTransferFrom** Create UserOperation for calling the 'safeTransferFrom' function of ERC1155
>
>
```
safeTransferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                 maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                 verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _id: string, _value: string, _data: string)  : UserOperation
```
>
>
Input Parameter:
>
>
| Field Name           | Type   | Description                                                                                                                                                               | Required |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string | Wallet address                                                                                                                                                            | Y        |
| nonce                | number | Wallet nonce                                                                                                                                                              | Y        |
| paymasterAddress     | string | Paymaster address                                                                                                                                                         | Y        |
| maxFeePerGas         | number | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                        | Y        |
| maxPriorityFeePerGas | number | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                        | Y        |
| callGasLimit         | number | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                            | Y        |
| verificationGasLimit | number | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                | Y        |
| preVerificationGas   | number | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.) | Y        |
| `_token`             | string | ERC20 token address to operate on                                                                                                                                         | Y        |
| `_from`              | string | The _from parameter for 'safeTransferFrom'                                                                                                                                | Y        |
| `_to`                | string | The _to parameter for 'safeTransferFrom'                                                                                                                                  | Y        |
| `_id`                | string | The _id parameter for 'safeTransferFrom'                                                                                                                                  | Y        |
| `_value`             | string | The _value parameter for 'safeTransferFrom'                                                                                                                               | Y        |
| `_data`              | string | The _data parameter for 'safeTransferFrom'                                                                                                                                | Y        |
>
>
Return Parameter:
>
>
UserOperation
>
>
>
3. **safeBatchTransferFrom** Create UserOperation for calling the 'safeBatchTransferFrom' function of ERC1155
>
>
```
safeBatchTransferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                      maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                      verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _ids: string, _values: string, _data: string) : UserOperation
```
>
>
Input Parameter:
>
>
| Field Name           | Type   | Description                                                                                                                                                               | Required |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string | Wallet address                                                                                                                                                            | Y        |
| nonce                | number | Wallet nonce                                                                                                                                                              | Y        |
| paymasterAddress     | string | Paymaster address                                                                                                                                                         | Y        |
| maxFeePerGas         | number | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                        | Y        |
| maxPriorityFeePerGas | number | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                        | Y        |
| callGasLimit         | number | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                            | Y        |
| verificationGasLimit | number | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                | Y        |
| preVerificationGas   | number | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.) | Y        |
| `_token`             | string | ERC20 token address to operate on                                                                                                                                         | Y        |
| `_from`              | string | The _from parameter for 'safeBatchTransferFrom'                                                                                                                           | Y        |
| `_to`                | string | The _to parameter for 'safeBatchTransferFrom'                                                                                                                             | Y        |
| `_ids`               | string | The _ids parameter for 'safeBatchTransferFrom'                                                                                                                            | Y        |
| `_values`            | string | The _values parameter for 'safeBatchTransferFrom'                                                                                                                         | Y        |
| `_data`              | string | The _data parameter for 'safeBatchTransferFrom'                                                                                                                           | Y        |
>
>
Return Parameter:
>
>
UserOperation
>
>
>
4. **setApprovalForAll** Create UserOperation for calling the 'setApprovalForAll' function of ERC1155
>
>
```
setApprovalForAll(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                  maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                  verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _operator: string, _approved: boolean) : UserOperation
```
>
>
Input Parameter:
>
>
| Field Name           | Type   | Description                                                                                                                                                               | Required |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string | Wallet address                                                                                                                                                            | Y        |
| nonce                | number | Wallet nonce                                                                                                                                                              | Y        |
| paymasterAddress     | string | Paymaster address                                                                                                                                                         | Y        |
| maxFeePerGas         | number | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                                                        | Y        |
| maxPriorityFeePerGas | number | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas)                                        | Y        |
| callGasLimit         | number | Gas allocated for the main execution call (calculated locally, the gas for executing callData)                                                                            | Y        |
| verificationGasLimit | number | Gas allocated for the verification step (gas used in functions validateUserOp()/validatePaymasterUserOp())                                                                | Y        |
| preVerificationGas   | number | Gas paid to the bundler for compensation pre-verification execution and call data (additional gas prepared to deal with some common gas consumption, such as loops, etc.) | Y        |
| `_token`             | string | ERC20 token address to operate on                                                                                                                                         | Y        |
| `_operator`          | string | The _operator parameter for 'setApprovalForAll'                                                                                                                           | Y        |
| `_approved`          | string | The _approved parameter for 'setApprovalForAll'                                                                                                                           | Y        |
>
>
Return Parameter:
>
>
UserOperation
>
>
>
## 13. LAT External Functions
>
>
1. **Constructor**
>
>
```
new LAT();
```
>
>
Input Parameter:
>
>
None
>
>
Return Parameter:
>
>
LAT
>
>
>
2. **transfer** Create UserOperation for calling the 'transfer' function of LAT
>
>
```
transfer(walletAddress: string,
        nonce: NumberLike, paymasterAddress: string,
        maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, to: string, value: string) : UserOperation
```
>
>
Input Parameter:
>
>
| Field Name           | Type   | Description                                                                                                                        | Required |
| -------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- | -------- |
| walletAddress        | string | Wallet address                                                                                                                     | Y        |
| nonce                | number | Wallet nonce                                                                                                                       | Y        |
| paymasterAddress     | string | Paymaster address                                                                                                                  | Y        |
| maxFeePerGas         | number | Maximum fee per unit of gas, i.e., gas price (similar to EIP-1559 max_fee_per_gas)                                                 | Y        |
| maxPriorityFeePerGas | number | Maximum priority fee per unit of gas, i.e., the fee allocated to miners in EIP-1559 (similar to EIP-1559 max_priority_fee_per_gas) | Y        |
| to                   | string | Recipient's LAT account address                                                                                                    | Y        |
| value                | string | Amount of LAT to transfer                                                                                                          | Y        |
>
>
Return Parameter:
>
>
UserOperation