<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CryptoWallet extends Model
{
    use HasFactory;

    protected $fillable = ['wallet_id', 'cryptocurrency_id', 'quantity']; // Exemple de colonnes remplies

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }

    // Vous pouvez également ajouter d'autres relations si nécessaire, comme une relation vers le modèle CryptoCurrency.
}
