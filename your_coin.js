// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const {
  AptosAccount,
  AptosClient,
  TxnBuilderTypes,
  MaybeHexString,
  HexString,
  FaucetClient,
} = require('aptos');

const NODE_URL =
  process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';
const FAUCET_URL =
  process.env.APTOS_FAUCET_URL || 'https://faucet.devnet.aptoslabs.com';
//<:!:section_1

const aptosCoinStore = '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>';
const fungibleStore = '0x1::fungible_asset::FungibleStore';

// import assert from "assert";
// import fs from "fs";
// import path from "path";
// import { NODE_URL, FAUCET_URL } from "./common";
// import { AptosAccount, AptosClient, TxnBuilderTypes, MaybeHexString, HexString, FaucetClient } from "aptos";
/**
  This example depends on the MoonCoin.move module having already been published to the destination blockchain.

  One method to do so is to use the CLI:
      * Acquire the Aptos CLI, see https://aptos.dev/cli-tools/aptos-cli/use-cli/install-aptos-cli
      * `pnpm your_coin ~/aptos-core/aptos-move/move-examples/moon_coin`.
      * Open another terminal and `aptos move compile --package-dir ~/aptos-core/aptos-move/move-examples/moon_coin --save-metadata --named-addresses MoonCoin=<Alice address from above step>`.
      * Return to the first terminal and press enter.
 */

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

class CoinClient extends AptosClient {
  constructor() {
    super(NODE_URL);
  }

  /** Register the receiver account to receive transfers for the new coin. */
  async registerCoin(coinTypeAddress, coinReceiver) {
    const rawTxn = await this.generateTransaction(coinReceiver.address(), {
      function: '0x1::managed_coin::register',
      type_arguments: [`${coinTypeAddress.hex()}::moon_coin::MoonCoin`],
      arguments: [],
    });

    const bcsTxn = await this.signTransaction(coinReceiver, rawTxn);
    const pendingTxn = await this.submitTransaction(bcsTxn);

    return pendingTxn.hash;
  }

  /** Transfer the newly created coin to a specified receiver address */
  async transferCoin(sender, receiverAddress, amount) {
    const rawTxn = await this.generateTransaction(sender.address(), {
      function: '0x1::aptos_account::transfer_coins',
      type_arguments: [`${sender.address()}::moon_coin::MoonCoin`],
      arguments: [receiverAddress.hex(), amount],
    });

    const bcsTxn = await this.signTransaction(sender, rawTxn);
    const pendingTxn = await this.submitTransaction(bcsTxn);

    return pendingTxn.hash;
  }

  /** Mints the newly created coin to a specified receiver address */
  async mintCoin(minter, receiverAddress, amount) {
    const rawTxn = await this.generateTransaction(minter.address(), {
      function: '0x1::managed_coin::mint',
      type_arguments: [`${minter.address()}::moon_coin::MoonCoin`],
      arguments: [receiverAddress.hex(), amount],
    });

    const bcsTxn = await this.signTransaction(minter, rawTxn);
    const pendingTxn = await this.submitTransaction(bcsTxn);

    return pendingTxn.hash;
  }

  /** Return the balance of the newly created coin */
  async getBalance(accountAddress, coinTypeAddress) {
    try {
      const resource = await this.getAccountResource(
        accountAddress,
        `0x1::coin::CoinStore<${coinTypeAddress.hex()}::moon_coin::MoonCoin>`
      );

      return parseInt(resource.data['coin']['value']);
    } catch (_) {
      return 0;
    }
  }
}

/** run our demo! */
async function main() {
  console.log('process.argv');
  console.log(process.argv);
  assert(
    process.argv.length == 3,
    'Expecting an argument that points to the moon_coin directory.'
  );

  const client = new CoinClient();
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

  // Create two accounts, Alice and Bob, and fund Alice but not Bob

  const privateKeyHex =
    '0x27044607f9e083730487a5ecd2b9a63f125b002ef2c6b85a221ac4f454017dc7';
  const privateKeyBytes = HexString.ensure(privateKeyHex).toUint8Array();
  const alice = new AptosAccount(privateKeyBytes);
  console.log('alice');
  console.log(alice);

  // const alice = new AptosAccount();
  const bob = new AptosAccount();

  console.log('\n=== Addresses ===');
  console.log(`Alice: ${alice.address()}`);
  console.log(`Bob: ${bob.address()}`);

  await faucetClient.fundAccount(alice.address(), 100_000_000);
  await faucetClient.fundAccount(bob.address(), 100_000_000);

  // await new Promise((resolve) => {
  //   readline.question("Update the module with Alice's address, compile, and press enter.", () => {
  //     resolve();
  //     readline.close();
  //   });
  // });

  // :!:>publish
  const modulePath = process.argv[2];
  const packageMetadata = fs.readFileSync(
    path.join(modulePath, 'build', 'EXample', 'package-metadata.bcs')
  );
  console.log('packageMetadata');
  console.log(packageMetadata);
  const moduleData = fs.readFileSync(
    path.join(
      modulePath,
      'build',
      'EXample',
      'bytecode_modules',
      'moon_coin.mv'
    )
  );

  console.log('moduleData');
  console.log(moduleData);
  console.log('Publishing Moon Coin package.');
  let txnHash = await client.publishPackage(
    alice,
    new HexString(packageMetadata.toString('hex')).toUint8Array(),
    [
      new TxnBuilderTypes.Module(
        new HexString(moduleData.toString('hex')).toUint8Array()
      ),
    ]
  );

  await client.waitForTransaction(txnHash, { checkSuccess: true }); // <:!:publish

  console.log(
    `Bob's initial MoonCoin balance: ${await client.getBalance(
      bob.address(),
      alice.address()
    )}.`
  );
  // console.log('Alice mints herself some of the new coin.');
  // txnHash = await client.registerCoin(alice.address(), alice);
  // await client.waitForTransaction(txnHash, { checkSuccess: true });
  // txnHash = await client.mintCoin(alice, alice.address(), 100);
  // await client.waitForTransaction(txnHash, { checkSuccess: true });

  console.log('Alice transfers the newly minted coins to Bob.');
  txnHash = await client.transferCoin(alice, bob.address(), 100);
  await client.waitForTransaction(txnHash, { checkSuccess: true });
  console.log(
    `Bob's updated MoonCoin balance: ${await client.getBalance(
      bob.address(),
      alice.address()
    )}.`
  );
}

if (require.main === module) {
  main().then((resp) => console.log(resp));
}
