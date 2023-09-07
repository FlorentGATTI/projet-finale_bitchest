<?php

namespace Database\Seeders;

use App\Models\CryptoWallet;
use Illuminate\Database\Seeder;

class CryptoWalletsSeeder extends Seeder
{
    public function run()
    {
        // Supposons que vous vouliez créer un CryptoWallet pour chaque utilisateur
        CryptoWallet::factory()->count(50)->create(); // crée 50 entrées de crypto_wallets
    }
}
