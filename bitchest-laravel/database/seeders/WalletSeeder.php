<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Wallet; 

class WalletSeeder extends Seeder
{
    public function run()
    {
        User::all()->each(function ($user) {
            Wallet::factory()->create(['user_id' => $user->id]);
        });
    }
}
