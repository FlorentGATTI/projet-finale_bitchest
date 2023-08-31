<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Database\Factories\WalletFactory; // Importez la factory WalletFactory

class WalletSeeder extends Seeder
{
    public function run()
    {
        User::all()->each(function ($user) {
            WalletFactory::new()->create(['user_id' => $user->id]); // Utilisez la factory WalletFactory
        });
    }
}
