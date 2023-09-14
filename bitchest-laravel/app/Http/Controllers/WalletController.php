<?php

namespace App\Http\Controllers;

use App\Models\Transaction;

use App\Models\CryptoCurrency;
use App\Models\CryptoCurrencyPrice;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WalletController extends Controller
{
    private const TRANSACTION_BUY = 'buy';
    private const TRANSACTION_SELL = 'sell';

    private $user;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = Auth::user();
            return $next($request);
        });
    }



    public function sellCryptoCurrency($crypto, Request $request)
    {
        $quantityToSell = $this->getCryptoBalance($crypto);
        $totalCrypto = $this->getCryptoBalance($crypto);

        $cryptocurrency = CryptoCurrency::find($crypto);
        if (!$cryptocurrency) {
            return response()->json(['message' => 'Cryptocurrency not found'], 404);
        }

        // Récupérer le dernier prix pour cette crypto-monnaie
        $price_per_unit = CryptoCurrencyPrice::where('crypto_currency_id', $cryptocurrency->id)
            ->orderBy('timestamp', 'desc')
            ->first();

        if (!$price_per_unit) {
            return response()->json(['message' => 'Price not found for the cryptocurrency'], 404);
        }

        if ($quantityToSell <= 0) {
            return response()->json([
                'message' => "Vous n'avez pas de cette crypto-monnaie à vendre."
            ], 400);
        }

        if ($totalCrypto >= $quantityToSell) {
            $amountToCredit = $price_per_unit->price * $quantityToSell;

            $wallet = $this->user->wallet;
            $wallet->balance += $amountToCredit;
            $wallet->save();

            Transaction::create([
                'user_id' => $this->user->id,
                'crypto_currency_id' => $cryptocurrency->id,
                'quantity' => -$quantityToSell,
                'transaction_type' => 'sell',
                'price_at_transaction' => $price_per_unit->price,
                'price_per_unit' => $price_per_unit->price  
            ]);

            return response()->json([
                'message' => "Cryptocurrency sold successfully!",
                'credited_amount' => $amountToCredit
            ]);
        } else {
            return response()->json([
                'message' => "You don't have enough of this cryptocurrency to sell."
            ], 400);
        }
    }


    public function buyCryptoCurrency($crypto, Request $request)
    {
        $quantity = $request->input('quantity');

        $cryptocurrency = CryptoCurrency::find($crypto);
        if (!$cryptocurrency) {
            return response()->json(['message' => 'Cryptocurrency not found'], 404);
        }

        // Obtenez le dernier prix pour cette crypto-monnaie
        $latestCotation = CryptoCurrencyPrice::where('crypto_currency_id', $cryptocurrency->id)
            ->orderBy('timestamp', 'desc')
            ->first()->price;

        $amountToDebit = $quantity * $latestCotation;
        $wallet = $this->user->wallet;

        if ($wallet->balance >= $amountToDebit) {
            $wallet->balance -= $amountToDebit; 
            $wallet->save(); 

            Transaction::create([
                'user_id' => $this->user->id,
                'crypto_currency_id' => $crypto,
                'quantity' => $quantity,
                'transaction_type' => 'buy',
                'price_per_unit' => $latestCotation,
                'price_at_transaction' => $latestCotation 
            ]);

            return response()->json([
                'message' => "Cryptocurrency bought successfully!"
            ]);
        } else {
            if ($wallet->balance < $amountToDebit) {
                return response()->json([
                    'message' => "Insufficient funds to buy the cryptocurrency."
                ], 400);
            }
        }
    }

    private function getTotalQuantityByType($transactionSet, $type)
    {
        return $transactionSet->where('transaction_type', $type)->sum('quantity');
    }

    public function getBuyTransactions()
    {
        $buyTransactions = Transaction::where('user_id', $this->user->id)
            ->where('transaction_type', self::TRANSACTION_BUY)
            ->get(['crypto_currency_id', 'quantity', 'price_per_unit']);
        return response()->json($buyTransactions);
    }


    private function getCryptoBalance($cryptoId)
    {
        $totalBought = $this->getTotalQuantityByType(Transaction::where('user_id', $this->user->id)->where('crypto_currency_id', $cryptoId), self::TRANSACTION_BUY);
        $totalSold = $this->getTotalQuantityByType(Transaction::where('user_id', $this->user->id)->where('crypto_currency_id', $cryptoId), self::TRANSACTION_SELL);

        return $totalBought - $totalSold;
    }

    public function balance()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $solde = $user->wallet->balance;  // Accéder à la balance via la relation wallet
        return response()->json(['balance' => $solde]);
    }
}
