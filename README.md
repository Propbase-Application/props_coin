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

Add the following line in Move.toml under [addresses]
propbase = "0x1"

aptos move compile --named-addresses propbase_coin_3=0x1cac17ac868932548f4a85fe3e853a1023a57b7f275d4247e1cded85d40b3c3d

aptos move publish --named-addresses propbase_coin_3=0x1cac17ac868932548f4a85fe3e853a1023a57b7f275d4247e1cded85d40b3c3d --profile admin3

aptos move run --function-id 0x1cac17ac868932548f4a85fe3e853a1023a57b7f275d4247e1cded85d40b3c3d::propbase_coin_13::initialize --args string:Propbase string:PROPS u8:8 u64:800000000000000 --profile admin3

https://explorer.aptoslabs.com/account/0x1/modules/run/aptos_account/transfer_coins?network=devnet

0x1cac17ac868932548f4a85fe3e853a1023a57b7f275d4247e1cded85d40b3c3d::propbase_coin_13::PropCoin

800000000000000 = 8000000 PROPS -> 8 million
200000000 = 2 PROPS

mint: https://explorer.aptoslabs.com/account/0x1/modules/run/managed_coin/mint?network=devnet
