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

Initialize admin address and add the admin address in Move.toml under addresses

```
aptos init --profile admin
```

Initialize token receiver

```
aptos init --profile nft-receiver
```

## Compile

```
aptos move compile --named-addresses propbase_coin=0xfb70b30790539849987be2c13ee6fbc2b73cc9e4d34722309f56ece20a0a98fc
```

## Publish

```
aptos move publish --named-addresses propbase_coin=0xfb70b30790539849987be2c13ee6fbc2b73cc9e4d34722309f56ece20a0a98fc --profile admin4
```

## Initialize

Provide the token name, token symbol and supply in octas

1.2 billion = 120000000000000000

1.2 billion = 1200000000 PROPS = 120000000000000000 Octas

```
aptos move run --function-id 0xfb70b30790539849987be2c13ee6fbc2b73cc9e4d34722309f56ece20a0a98fc::propbase_coin::initialize --args string:Propbase string:PROPS u8:8 u64:120000000000000000 --profile admin4
```

Transfer Coin Link

```
https://explorer.aptoslabs.com/account/0x1/modules/run/aptos_account/transfer_coins?network=devnet

```

Transfer CoinType

```
0xfb70b30790539849987be2c13ee6fbc2b73cc9e4d34722309f56ece20a0a98fc::propbase_coin::PROPS

```

Test for minting to fail

```

https://explorer.aptoslabs.com/account/0x1/modules/run/managed_coin/mint?network=devnet

```

800000000000000 = 8000000 PROPS -> 8 million

200000000 Octas = 2 PROPS
