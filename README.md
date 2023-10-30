# propbase-blockchain

propbase blockchain integrations

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
aptos move compile --named-addresses propbase_coin=0xaada000490412ecbd319f494b9dbfe7a745605aba8a4c8d09b21e4ab1c772862
```

## Publish

```
aptos move publish --named-addresses propbase_coin=0xaada000490412ecbd319f494b9dbfe7a745605aba8a4c8d09b21e4ab1c772862 --profile admin8 --included-artifacts none
```

CoinType

```
0xaada000490412ecbd319f494b9dbfe7a745605aba8a4c8d09b21e4ab1c772862::propbase_coin::PROPS

```

## Register the coin to the multi-sign wallet - connect the multisign wallet in explorer

```
https://explorer.aptoslabs.com/account/0x1/modules/run/managed_coin/register?network=testnet
```

## Initialize

Provide the token name, token symbol and supply in octas

1.2 billion = 1200000000 PROPS = 120000000000000000 Octas

```
aptos move run --function-id 0xaada000490412ecbd319f494b9dbfe7a745605aba8a4c8d09b21e4ab1c772862::propbase_coin::initialize --args string:Propbase string:PROPS u8:8 u64:120000000000000000 --profile admin8
```

Transfer Coin Link

```
https://explorer.aptoslabs.com/account/0x1/modules/run/aptos_account/transfer_coins?network=devnet

```

Test for minting to fail

```

https://explorer.aptoslabs.com/account/0x1/modules/run/managed_coin/mint?network=devnet

```

800000000000000 = 8000000 PROPS -> 8 million

200000000 Octas = 2 PROPS
