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
aptos move compile --named-addresses propbase_coin_10=0x1cac17ac868932548f4a85fe3e853a1023a57b7f275d4247e1cded85d40b3c3d
```

## Publish

```
aptos move publish --named-addresses propbase_coin_10=0x1cac17ac868932548f4a85fe3e853a1023a57b7f275d4247e1cded85d40b3c3d --profile admin3
```

## Initialize

Provide the token name, token symbol and supply in octas

1.2 billion = 120000000000000000

1.2 billion = 1200000000 PROPS = 120000000000000000 Octas

```
aptos move run --function-id 0x1cac17ac868932548f4a85fe3e853a1023a57b7f275d4247e1cded85d40b3c3d::propbase_coin_10::initialize --args string:Propbase string:PROPS u8:8 u64:120000000000000000 --profile admin3
```

Transfer Coin Link

```
https://explorer.aptoslabs.com/account/0x1/modules/run/aptos_account/transfer_coins?network=devnet

```

Transfer CoinType

```
0x1cac17ac868932548f4a85fe3e853a1023a57b7f275d4247e1cded85d40b3c3d::propbase_coin_10::PROPS

```

Test for minting to fail

```

https://explorer.aptoslabs.com/account/0x1/modules/run/managed_coin/mint?network=devnet

```

800000000000000 = 8000000 PROPS -> 8 million

200000000 Octas = 2 PROPS
