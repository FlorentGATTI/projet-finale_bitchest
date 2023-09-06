<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wallet;
use App\Models\Transaction;


class WalletController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user(); // Récupérez l'utilisateur authentifié

        // Récupérez le portefeuille de l'utilisateur avec les crypto-monnaies associées
        $wallet = Wallet::with('cryptoCurrency')->where('user_id', $user->id)->first();

        return response()->json($wallet);
    }

    public function purchases(Request $request)
    {
        $user = $request->user(); // Récupérez l'utilisateur authentifié

        // Récupérez les achats effectués par l'utilisateur
        $purchases = $user->wallet->transactions->where('transaction_type', 'buy');

        return response()->json($purchases);
    }


    public function profits(Request $request)
    {
        $user = $request->user(); // Récupérez l'utilisateur authentifié

        // Récupérez la plus-value actuelle pour chaque crypto-monnaie dans le portefeuille de l'utilisateur
        $profits = [];
        foreach ($user->wallet->cryptoCurrency as $crypto) {
            $profits[$crypto->id] = $crypto->currentProfit(); // Supposons que vous ayez une méthode currentProfit() dans le modèle Cryptocurrency
        }

        return response()->json($profits);
    }

    public function show($id)
    {
        $transaction = Transaction::find($id);
        if ($transaction) {
            $profit = $transaction->currentProfit(); // Utilisez la méthode ici
            return response()->json([
                'transaction' => $transaction,
                'currentProfit' => $profit
            ]);
        } else {
            return response()->json(['message' => 'Transaction not found'], 404);
        }
    }
}
