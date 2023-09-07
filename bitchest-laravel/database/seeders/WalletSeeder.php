<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Wallet; // Assurez-vous d'importer le modèle Wallet également

class WalletSeeder extends Seeder
{
    public function run()
    {
        User::all()->each(function ($user) {
            // Au lieu d'importer la WalletFactory, utilisez directement le modèle Wallet
            Wallet::factory()->create(['user_id' => $user->id]);
        });
    }
}
