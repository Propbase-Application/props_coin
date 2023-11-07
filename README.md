# propbase-coin

This repo is for developing the propbase coin $PROPS

## Initializing commands:

Initialize package with folder structure - To be done only else if the folder structure is not in place.

```
aptos move init --name propbase

```

Initialize admin address and add the admin address in Move.toml under addresses

```
aptos init --profile admin9
```

## Compile

```
aptos move compile --named-addresses propbase_coin=0xadminaddress
```

## Publish

```
aptos move publish --named-addresses propbase_coin=0xadminaddress --profile admin8 --included-artifacts none

```

## CoinType

```
0xadminaddress::propbase_coin::PROPS
```

## Register the coin to the multi-sign wallet - connect the multisign wallet in explorer

```
https://explorer.aptoslabs.com/account/0x1/modules/run/managed_coin/register?network=testnet

```

## Initialize

Provide the token name, token symbol and supply in octas

1.2 billion = 1200000000 PROPS = 120000000000000000 Octas

```
aptos move run --function-id 0xadminaddress::propbase_coin::initialize --args string:Propbase string:PROPS u8:8 u64:120000000000000000 --profile admin8

```

## Transfer Coin Link

```
https://explorer.aptoslabs.com/account/0x1/modules/run/aptos_account/transfer_coins?network=devnet

```

## Test for minting to fail

```
https://explorer.aptoslabs.com/account/0x1/modules/run/managed_coin/mint?network=devnet

```
