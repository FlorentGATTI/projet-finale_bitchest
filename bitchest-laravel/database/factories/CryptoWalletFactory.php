<?php

namespace Database\Factories;

use App\Models\CryptoWallet;
use App\Models\User;
use App\Models\Cryptocurrency;
use Illuminate\Database\Eloquent\Factories\Factory;

class CryptoWalletFactory extends Factory
{
    protected $model = CryptoWallet::class;

    public function definition()
    {
        return [
            'user_id' => User::all()->random()->id,
            'cryptocurrency_id' => Cryptocurrency::all()->random()->id,
            'quantity' => $this->faker->randomFloat(8, 0.001, 1000),
        ];
    }
}

