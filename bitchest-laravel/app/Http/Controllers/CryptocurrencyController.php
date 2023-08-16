<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cryptocurrency;

class CryptocurrencyController extends Controller
{
    public function index()
    {
        $cryptocurrencies = Cryptocurrency::all();
        return response()->json($cryptocurrencies);
    }

    public function show($id)
    {
        $cryptocurrency = Cryptocurrency::find($id);
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

        $cryptocurrency = Cryptocurrency::create($data);
        return response()->json($cryptocurrency, 201);
    }

    public function update(Request $request, $id)
    {
        $cryptocurrency = Cryptocurrency::find($id);
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
        $cryptocurrency = Cryptocurrency::find($id);
        if (!$cryptocurrency) {
            return response()->json(['message' => 'Cryptocurrency not found'], 404);
        }

        $cryptocurrency->delete();
        return response()->json(['message' => 'Cryptocurrency deleted']);
    }
}
