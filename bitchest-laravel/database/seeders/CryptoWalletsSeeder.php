<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\CryptoWallet;
use App\Models\Wallet;
use Illuminate\Database\Seeder;

class CryptoWalletsSeeder extends Seeder
{
    public function run()
    {
        // Assurez-vous que les deux premiers utilisateurs existent
        $firstUser = User::find(1);
        $secondUser = User::find(2);

        // Si le premier utilisateur existe et n'a pas de portefeuille crypto, créez-en un
        if ($firstUser && $firstUser->cryptoWallets->isEmpty()) {
            CryptoWallet::factory(rand(3, 4))->create(['user_id' => $firstUser->id]);
        }

        // Si le second utilisateur existe et n'a pas de portefeuille crypto, créez-en un
        if ($secondUser && $secondUser->cryptoWallets->isEmpty()) {
            CryptoWallet::factory(rand(3, 4))->create(['user_id' => $secondUser->id]);
        }

        User::factory(50)->create()->each(function ($user) {
            // Crée un nouveau portefeuille pour cet utilisateur et l'associe
            $wallet = Wallet::factory()->make();
            $user->wallet()->save($wallet);

            CryptoWallet::factory(rand(3, 4))->create(['user_id' => $user->id]);
        });
    }
}
