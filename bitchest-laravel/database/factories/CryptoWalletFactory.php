<?php

namespace Database\Factories;

use App\Models\CryptoWallet;
use App\Models\Wallet;
use App\Models\Cryptocurrency;
use Illuminate\Database\Eloquent\Factories\Factory;

class CryptoWalletFactory extends Factory
{
    protected $model = CryptoWallet::class;

    public function definition()
    {
        return [
            'wallet_id' => Wallet::all()->random()->id,
            'cryptocurrency_id' => Cryptocurrency::all()->random()->id,
            'amount' => $this->faker->randomFloat(8, 0.001, 1000),  // Change 'quantity' to 'amount'
        ];
    }
}
