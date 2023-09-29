address admin {

  module propbase_coin_14 {
    use std::signer;
    use std::string::{Self, String};

    use aptos_framework::coin;

    struct PropCoin {}

    const E_NOT_ADMIN: u64 = 0;

    /// Initialize the PropCoin
    public entry fun initialize(
        account: &signer,
        name: String,
        symbol: String,
        decimals: u8,
        supply: u64
    ) {
      let account_addr = signer::address_of(account);

      assert!(account_addr == @admin, E_NOT_ADMIN);

      let (burn_cap, freeze_cap, mint_cap) = coin::initialize<PropCoin>(account, name, symbol, decimals, false);

      // Register account for the coin
      coin::register<PropCoin>(account);

      // Mint the supply
      let coins_minted = coin::mint<PropCoin>(supply, &mint_cap);
      coin::deposit(account_addr, coins_minted);

      // Destroy the all capabilities
      coin::destroy_mint_cap<PropCoin>(mint_cap);
      coin::destroy_burn_cap<PropCoin>(burn_cap);
      coin::destroy_freeze_cap<PropCoin>(freeze_cap);
    }
  }
}