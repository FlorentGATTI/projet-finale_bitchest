<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::all();
        return response()->json($transactions);
    }

    public function show($id)
    {
        $transaction = Transaction::find($id);
        if ($transaction) {
            return response()->json($transaction);
        } else {
            return response()->json(['message' => 'Transaction not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'amount' => 'required|numeric',
            'crypto_currency_id' => 'required|exists:cryptocurrencies,id',
            // Ajoutez ici d'autres règles de validation
        ]);

        $transaction = Transaction::create($data);
        return response()->json($transaction, 201);
    }

    public function update(Request $request, $id)
    {
        $transaction = Transaction::find($id);
        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $data = $request->validate([
            'amount' => 'numeric',
            'crypto_currency_id' => 'exists:cryptocurrencies,id',
            // Ajoutez ici d'autres règles de validation
        ]);

        $transaction->update($data);
        return response()->json($transaction);
    }

    public function destroy($id)
    {
        $transaction = Transaction::find($id);
        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $transaction->delete();
        return response()->json(['message' => 'Transaction deleted']);
    }
}
