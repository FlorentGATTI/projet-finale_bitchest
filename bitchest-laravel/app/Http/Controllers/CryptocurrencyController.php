<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CryptoCurrency;
use App\Models\CryptoCurrencyPrice;
use App\Helpers\CotationGenerator;

class CryptocurrencyController extends Controller
{
    public function index()
    {
        return response()->json(CryptoCurrency::all());
    }

    public function show(CryptoCurrency $cryptocurrency)
    {
        if ($cryptocurrency) {
            return response()->json($cryptocurrency);
        }
        return response()->json(['message' => 'Cryptocurrency not found'], 404);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'symbol' => 'required|string|max:5',
            // Autres règles de validation...
        ]);

        return response()->json(CryptoCurrency::create($data), 201);
    }

    public function update(Request $request, CryptoCurrency $cryptocurrency)
    {
        if (!$cryptocurrency) {
            return response()->json(['message' => 'Cryptocurrency not found'], 404);
        }

        $data = $request->validate([
            'name' => 'string',
            'symbol' => 'string|max:5',
            // Autres règles de validation...
        ]);

        $cryptocurrency->update($data);
        return response()->json($cryptocurrency);
    }

    public function destroy(CryptoCurrency $cryptocurrency)
    {
        if (!$cryptocurrency) {
            return response()->json(['message' => 'Cryptocurrency not found'], 404);
        }

        $cryptocurrency->delete();
        return response()->json(['message' => 'Cryptocurrency deleted']);
    }

    public function getCryptoProgression()
    {
        $cryptos = CryptoCurrency::with(['prices' => function($query) {
            $query->orderBy('created_at', 'asc');
        }])->get();

        $result = $cryptos->map(function($crypto) {
            return [
                'name' => $crypto->name,
                'symbol' => $crypto->symbol,
                'progression' => $crypto->prices->map(function($price) {
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
