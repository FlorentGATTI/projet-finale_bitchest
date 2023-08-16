<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CryptoCurrencyPrice;
use App\Models\CryptoCurrency;


require_once base_path('cotation_generator.php');

class CryptoCurrencyPricesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Génération des prix des crypto-monnaies sur 30 jours
        $cryptoCurrencies = [
            'Bitcoin', 'Ethereum', 'Ripple', 'Bitcoin Cash', 'Cardano',
            'Litecoin', 'NEM', 'Stellar', 'IOTA', 'Dash'
        ];

        $startDate = now()->subDays(30);

        foreach ($cryptoCurrencies as $crypto) {
            $currentDate = $startDate;
            $currentPrice = getFirstCotation($crypto);

            // Obtenir l'ID de la crypto-monnaie
            $cryptoId = CryptoCurrency::where('name', $crypto)->value('id');

            // Utiliser l'ID pour créer les enregistrements
            for ($day = 1; $day <= 30; $day++) {
                CryptoCurrencyPrice::create([
                    'cryptocurrency_id' => $cryptoId,
                    'price' => $currentPrice,
                    'created_at' => $currentDate,
                    'updated_at' => $currentDate,
                ]);

                $currentPrice += getCotationFor($crypto);
                $currentDate = $currentDate->addDay();
            }
        }
    }
}
