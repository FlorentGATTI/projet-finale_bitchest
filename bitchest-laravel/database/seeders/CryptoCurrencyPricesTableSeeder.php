<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CryptoCurrencyPrice;
use App\Models\CryptoCurrency;
use App\Helpers\CotationGenerator; 

class CryptoCurrencyPricesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cryptoCurrencies = [
            'Bitcoin', 'Ethereum', 'Ripple', 'Bitcoin Cash', 'Cardano',
            'Litecoin', 'NEM', 'Stellar', 'IOTA', 'Dash'
        ];

        $startDate = now()->subDays(30);

        foreach ($cryptoCurrencies as $crypto) {
            $currentDate = $startDate;
            
            // Utilisez les méthodes depuis la classe CotationGenerator
            $currentPrice = CotationGenerator::getFirstCotation($crypto);

            $cryptoId = CryptoCurrency::where('name', $crypto)->value('id');

            for ($day = 1; $day <= 30; $day++) {
                CryptoCurrencyPrice::create([
                    'cryptocurrency_id' => $cryptoId,
                    'price' => $currentPrice,
                    'created_at' => $currentDate,
                    'updated_at' => $currentDate,
                ]);

                $currentPrice += CotationGenerator::getCotationFor($crypto); // Utilisez la méthode depuis la classe CotationGenerator
                $currentDate = $currentDate->addDay();
            }
        }
    }
}
