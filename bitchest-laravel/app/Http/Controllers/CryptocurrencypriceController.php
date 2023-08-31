<?php

namespace App\Http\Controllers;

use App\Models\Cryptocurrency; 
use App\Models\CryptocurrencyPrice;

class CryptocurrencyPriceController extends Controller
{

    public function index()
    {
        $prices = CryptocurrencyPrice::all();
        return response()->json($prices);
    }

    public function show(Cryptocurrency $cryptocurrency)
    {
        $prices = CryptocurrencyPrice::where('cryptocurrency_id', $cryptocurrency->id)
            ->orderBy('timestamp', 'DESC')
            ->get();

        return response()->json([
            'crypto' => $cryptocurrency,
            'prices' => $prices
        ]);
    }

    public function store(Cryptocurrency $cryptocurrency) 
    {
        $data = request()->validate([
            'price' => 'required|numeric',
            'timestamp' => 'required|date'
        ]);

        $price = new CryptocurrencyPrice($data);
        $price->cryptocurrency()->associate($cryptocurrency);
        $price->save();
        
        return response()->json($price, 201); 
    }

}
