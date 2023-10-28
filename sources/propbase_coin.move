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
      let account_to_hold_tokens: address = @0x5704c7090f0ba95ea1599fa9c156099d4fc57e432b0f8086ca42c255bc97974a;

      assert!(account_addr == @admin, E_NOT_ADMIN);

      let (burn_cap, freeze_cap, mint_cap) = coin::initialize<PROPS>(account, name, symbol, decimals, false);

      // Mint the supply
      let coins_minted = coin::mint<PROPS>(supply, &mint_cap);
      coin::deposit(account_to_hold_tokens, coins_minted);

      // Destroy all capabilities
      coin::destroy_mint_cap<PROPS>(mint_cap);
      coin::destroy_burn_cap<PROPS>(burn_cap);
      coin::destroy_freeze_cap<PROPS>(freeze_cap);
    }

    public entry fun register(account_to_hold_tokens: &signer) {
      // Register account for the coin
      coin::register<PROPS>(account_to_hold_tokens);
    }
  }
}