<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CryptoCurrencyPrice;
use App\Models\CryptoCurrency;
use App\Helpers\CotationGenerator;
use Illuminate\Support\Facades\Log;

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

            if (!$cryptoId) {
                Log::error("No ID found for crypto: $crypto");
                continue; // Skip to the next crypto
            }

            Log::info("Seeding prices for $crypto with ID: $cryptoId");

            for ($day = 1; $day <= 30; $day++) {
                CryptoCurrencyPrice::create([
                    'crypto_currency_id' => $cryptoId,
                    'price' => $currentPrice,
                    'timestamp' => $currentDate,  // Use timestamp column here
                ]);

                $currentPrice += CotationGenerator::getCotationFor($crypto); // Utilisez la méthode depuis la classe CotationGenerator
                $currentDate = $currentDate->addDay();
            }
            Log::info("Crypto: $crypto, ID: $cryptoId");
        }
    }
}
