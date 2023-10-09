# propbase-blockchain

propbase blockchain integrations

## Initializing commands:

Initialize package with folder structure - To be done only else if the folder structure is not in place.

```
aptos move init --name propbase

```

Initialize admin address

```
aptos init --profile default
```

## Compile

```
aptos move compile --named-addresses propbase_coin_5=0x1cac17ac868932548f4a85fe3e853a1023a57b7f275d4247e1cded85d40b3c3d
```

## Publish

```
aptos move create-resource-account-and-publish-package --seed 1164 --address-name propbase --named-addresses source_addr=87ab7d47a9b0ac84b856168b68fff06408cc5f1c691a6c5366c3ab116d76d93c
```

resource account address 324f53595eccdc99d4765a9d5087de07c2dc94cf87c3de7ddba342f1e46794a5

## Initialize

Provide the token name, token symbol and supply in octas

1.2 billion = 1200000000 PROPS = 120000000000000000 Octas

```
aptos move run --function-id 324f53595eccdc99d4765a9d5087de07c2dc94cf87c3de7ddba342f1e46794a5::propbase_coin::initialize --args string:Propbase string:PROPS u8:8 u64:120000000000000000
```

```
aptos move run --function-id 324f53595eccdc99d4765a9d5087de07c2dc94cf87c3de7ddba342f1e46794a5::propbase_coin::set_admin --args address:0x0
```

Transfer Coin Link

```
https://explorer.aptoslabs.com/account/0x1/modules/run/aptos_account/transfer_coins?network=devnet

```

Transfer CoinType

```
0x324f53595eccdc99d4765a9d5087de07c2dc94cf87c3de7ddba342f1e46794a5::propbase_coin::PropCoin


```

Test for minting to fail

```

https://explorer.aptoslabs.com/account/0x1/modules/run/managed_coin/mint?network=devnet

```
