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
            'user_id' => null, // Nous allons le définir lors de la création
            'balance' => $this->faker->randomFloat(2, 0, 1000), // Génère un solde au hasard entre 0 et 1000 euros
        ];
    }
}
