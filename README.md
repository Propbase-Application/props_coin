# propbase-blockchain

propbase blockchain integrations

## Initializing commands:

Initialize package with folder structure - To be done only else if the folder structure is not in place.

```
aptos move init --name propbase

```

Initialize admin address and add the admin address in Move.toml under addresses

```
aptos init --profile admin5
```

## Compile

```
aptos move compile --named-addresses propbase_coin=0xbc6b523aeef7fc890626574e3aa5b1b909dc4b879d5fbd9648a44c4ba77236ce
```

## Publish

```
aptos move publish --named-addresses propbase_coin=0xbc6b523aeef7fc890626574e3aa5b1b909dc4b879d5fbd9648a44c4ba77236ce --profile admin5 --included-artifacts none
```

## Initialize

Provide the token name, token symbol and supply in octas

1.2 billion = 120000000000000000

1.2 billion = 1200000000 PROPS = 120000000000000000 Octas

```
aptos move run --function-id 0xbc6b523aeef7fc890626574e3aa5b1b909dc4b879d5fbd9648a44c4ba77236ce::propbase_coin::initialize --args string:Propbase string:PROPS u8:8 u64:120000000000000000 --profile admin5
```

Transfer Coin Link

```
https://explorer.aptoslabs.com/account/0x1/modules/run/aptos_account/transfer_coins?network=devnet

```

Transfer CoinType

```
0xbc6b523aeef7fc890626574e3aa5b1b909dc4b879d5fbd9648a44c4ba77236ce::propbase_coin::PROPS

```

Test for minting to fail

```

https://explorer.aptoslabs.com/account/0x1/modules/run/managed_coin/mint?network=devnet

```

800000000000000 = 8000000 PROPS -> 8 million

200000000 Octas = 2 PROPS
