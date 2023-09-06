<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cryptocurrency extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'symbol',
    ];
    
    public function prices()
    {
        return $this->hasMany(CryptoCurrencyPrice::class);
    }

    public function currentPrice()
    {
        // Obtenir le dernier prix enregistré pour cette cryptocurrency
        $latestPrice = $this->prices()->orderBy('created_at', 'desc')->first();

        // Retourner le prix si il est disponible sinon retourner null
        return $latestPrice ? $latestPrice->price : null;
    }
}
