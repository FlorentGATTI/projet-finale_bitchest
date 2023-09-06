<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    protected $fillable = ['user_id', 'cryptocurrency_id', 'quantity'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cryptoCurrency()
    {
        return $this->belongsTo(CryptoCurrency::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
