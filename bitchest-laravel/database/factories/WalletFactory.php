<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Wallet;

class WalletFactory extends Factory
{
    protected $model = Wallet::class;

    public function definition()
    {
        return [
            'user_id' => random_int(1, 100), // Remplacez 10 par le nombre maximum d'utilisateurs
            'cryptocurrency_id' => random_int(1, 10), // Remplacez 10 par le nombre maximum de crypto-monnaies
            'quantity' => $this->faker->randomFloat(8, 0.001, 1000), // Remplacez les bornes pour la quantité
        ];
    }
}

