module propbase::propbase_coin {
  use std::signer;
  use std::string::{Self, String};
  use aptos_framework::resource_account;
  use aptos_framework::account::{Self, SignerCapability, create_signer_with_capability};
  use aptos_framework::coin;

  struct PropCoin {}

  struct Config has key {
    admin: address,
    signer_cap: SignerCapability
  }

  const E_NOT_ADMIN: u64 = 0;

  fun init_module(resource_account: &signer) {
    let resource_signer_cap = resource_account::retrieve_resource_account_cap(resource_account, @source_addr);
      move_to(resource_account, Config {
        admin: @source_addr,
        signer_cap: resource_signer_cap
    });
  }

  public entry fun initialize(
    account: &signer,
    name: String,
    symbol: String,
    decimals: u8,
    supply: u64
  ) acquires Config {
    let contract_config = borrow_global<Config>(@propbase);
    let account_addr = signer::address_of(account);
    assert!(account_addr == contract_config.admin, E_NOT_ADMIN);

    let resource_signer = create_signer_with_capability(&contract_config.signer_cap);
    let (burn_cap, freeze_cap, mint_cap) = coin::initialize<PropCoin>(&resource_signer, name, symbol, decimals, false);

    coin::register<PropCoin>(account);
    let coins_minted = coin::mint<PropCoin>(supply, &mint_cap);
    coin::deposit(account_addr, coins_minted);
    // remove all capabilites
    coin::destroy_mint_cap<PropCoin>(mint_cap);
    coin::destroy_burn_cap<PropCoin>(burn_cap);
    coin::destroy_freeze_cap<PropCoin>(freeze_cap);
  }

  public entry fun set_admin(
    account: &signer,
    new_admin: address
  ) acquires Config {
    let contract_config = borrow_global_mut<Config>(@propbase);
    let account_addr = signer::address_of(account);
    assert!(account_addr == contract_config.admin, E_NOT_ADMIN);
    contract_config.admin = new_admin;
  }
}