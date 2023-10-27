address admin {

  module propbase_coin {
    use std::signer;
    use std::string::{String};

    use aptos_framework::coin;

    struct PROPS {}

    const E_NOT_ADMIN: u64 = 0;

    /// Initialize the PROPS
    public entry fun initialize(
        account: &signer,
        name: String,
        symbol: String,
        decimals: u8,
        supply: u64
    ) {
      let account_addr = signer::address_of(account);

      assert!(account_addr == @admin, E_NOT_ADMIN);

      let (burn_cap, freeze_cap, mint_cap) = coin::initialize<PROPS>(account, name, symbol, decimals, false);

      // Register account for the coin
      coin::register<PROPS>(account);

      // Mint the supply
      let coins_minted = coin::mint<PROPS>(supply, &mint_cap);
      coin::deposit(account_addr, coins_minted);

      // Destroy the all capabilities
      coin::destroy_mint_cap<PROPS>(mint_cap);
      coin::destroy_burn_cap<PROPS>(burn_cap);
      coin::destroy_freeze_cap<PROPS>(freeze_cap);
    }
  }
}