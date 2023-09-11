<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CryptoCurrency;

class CryptoCurrenciesTableSeeder extends Seeder
{
    public function run()
    {
        $cryptocurrencies = [
            'Bitcoin' => 'BTC',
            'Ethereum' => 'ETH',
            'Ripple' => 'XRP',
            'Bitcoin Cash' => 'BCH',
            'Cardano' => 'ADA',
            'Litecoin' => 'LTC',
            'NEM' => 'XEM',
            'Stellar' => 'XLM',
            'IOTA' => 'IOTA',
            'Dash' => 'DASH',
        ];

        foreach ($cryptocurrencies as $name => $symbol) {
            CryptoCurrency::create([
                'name' => $name,
                'symbol' => $symbol,
            ]);
        }
    }
}

