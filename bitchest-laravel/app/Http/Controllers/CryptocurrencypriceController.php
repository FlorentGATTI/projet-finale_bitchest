<?php

namespace App\Http\Controllers;

use App\Models\CryptoCurrency; 
use App\Models\CryptoCurrencyPrice;

class CryptoCurrencyPriceController extends Controller
{

    public function index()
    {
        $prices = CryptoCurrencyPrice::all();
        return response()->json($prices);
    }

    public function show(CryptoCurrency $cryptocurrency)
    {
        $prices = CryptoCurrencyPrice::where('crypto_currency_id', $cryptocurrency->id)
            ->orderBy('timestamp', 'DESC')
            ->get();

        return response()->json([
            'crypto' => $cryptocurrency,
            'prices' => $prices
        ]);
    }

    public function store(CryptoCurrency $cryptocurrency) 
    {
        $data = request()->validate([
            'price' => 'required|numeric',
            'timestamp' => 'required|date'
        ]);

        $price = new CryptoCurrencyPrice($data);
        $price->cryptocurrency()->associate($cryptocurrency);
        $price->save();
        
        return response()->json($price, 201); 
    }

}
