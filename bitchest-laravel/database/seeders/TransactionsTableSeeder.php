<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;

class TransactionsTableSeeder extends Seeder
{
    public function run()
    {
        // Exemple d'insertion de transactions pour tester
        Transaction::create([
            'user_id' => 1,  // Remplacez par l'ID d'utilisateur approprié
            'crypto_currency_id' => 1,  // Remplacez par l'ID de crypto-monnaie approprié
            'quantity' => 5,  // La quantité de crypto-monnaie
            'price_per_unit' => 3500,  // Le prix par unité de crypto-monnaie
            'transaction_type' => 'buy',  // Type de transaction (achat ou vente)
            'transaction_date' => now()->subDays(10),  // Date de la transaction
        ]);

        // Vous pouvez ajouter plus d'exemples de transactions ici

        Transaction::create([
            'user_id' => 1,
            'crypto_currency_id' => 2,
            'quantity' => -3,
            'price_per_unit' => 250,
            'transaction_type' => 'sell',
            'transaction_date' => now()->subDays(5),
        ]);

        // Ajoutez d'autres transactions au besoin
    }
}
