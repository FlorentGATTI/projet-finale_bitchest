<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CryptoCurrency;

class CryptoCurrencyController extends Controller
{
    public function index()
    {
        $cryptocurrencies = CryptoCurrency::all();
        return response()->json($cryptocurrencies);
    }

    public function show($id)
    {
        $cryptocurrency = CryptoCurrency::find($id);
        if ($cryptocurrency) {
            return response()->json($cryptocurrency);
        } else {
            return response()->json(['message' => 'Cryptocurrency not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'symbol' => 'required|string|max:5',
            // Ajoutez ici d'autres règles de validation
        ]);

        $cryptocurrency = CryptoCurrency::create($data);
        return response()->json($cryptocurrency, 201);
    }

    public function update(Request $request, $id)
    {
        $cryptocurrency = CryptoCurrency::find($id);
        if (!$cryptocurrency) {
            return response()->json(['message' => 'Cryptocurrency not found'], 404);
        }

        $data = $request->validate([
            'name' => 'string',
            'symbol' => 'string|max:5',
            // Ajoutez ici d'autres règles de validation
        ]);

        $cryptocurrency->update($data);
        return response()->json($cryptocurrency);
    }

    public function destroy($id)
    {
        $cryptocurrency = CryptoCurrency::find($id);
        if (!$cryptocurrency) {
            return response()->json(['message' => 'Cryptocurrency not found'], 404);
        }

        $cryptocurrency->delete();
        return response()->json(['message' => 'Cryptocurrency deleted']);
    }

    public function getCryptoProgression()
    {
        $cryptos = CryptoCurrency::with(['prices' => function ($query) {
            $query->orderBy('created_at', 'asc');
        }])->get();

        $result = $cryptos->map(function ($crypto) {
            return [
                'name' => $crypto->name,
                'symbol' => $crypto->symbol,
                'progression' => $crypto->prices->map(function ($price) {
                    return [
                        'date' => $price->created_at->toDateString(),
                        'value' => $price->price
                    ];
                })
            ];
        });

        return response()->json($result);
    }
}
