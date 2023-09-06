<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'cryptocurrency_id',
        'quantity',
        'price_per_unit',
        'transaction_type',
    ];
    

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cryptocurrency()
    {
        return $this->belongsTo(Cryptocurrency::class);
    }

    public function currentProfit()
    {
        $currentPrice = $this->cryptocurrency->currentPrice(); // Je suppose que vous avez une méthode qui obtient le prix actuel
        return ($currentPrice - $this->price_per_unit) * $this->quantity;
    }
}
