<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Cryptocurrency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WalletController extends Controller
{
    private const TRANSACTION_BUY = 'achat';
    private const TRANSACTION_SELL = 'vente';

    private $user;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = Auth::user();
            return $next($request);
        });
    }

    public function index()
    {
        $transactions = Transaction::where('user_id', $this->user->id)
            ->with('cryptoCurrency')
            ->get()
            ->groupBy('cryptocurrency_id');

        $data = [];

        foreach ($transactions as $crypto_id => $transactionSet) {
            $crypto = Cryptocurrency::find($crypto_id);

            $totalBought = $this->getTotalQuantityByType($transactionSet, self::TRANSACTION_BUY);
            $totalSold = $this->getTotalQuantityByType($transactionSet, self::TRANSACTION_SELL);

            $balance = $totalBought - $totalSold;

            $totalSpentOnBuying = $transactionSet->where('transaction_type', self::TRANSACTION_BUY)->sum(function ($transaction) {
                return $transaction->quantity * $transaction->price_at_transaction;
            });

            $currentValue = $crypto->current_price * $balance;
            $profit = $currentValue - $totalSpentOnBuying;

            $data[] = [
                'cryptocurrency' => $crypto->name,
                'balance' => $balance,
                'profit' => $profit
            ];
        }

        return response()->json($data);
    }

    public function sellCryptocurrency(Cryptocurrency $crypto, Request $request)
    {
        $quantityToSell = $request->input('quantity');
        $totalCrypto = $this->getCryptoBalance($crypto->id);

        if ($totalCrypto >= $quantityToSell) {
            $amountToCredit = $crypto->current_price * $quantityToSell;

            $wallet = $this->user->wallet;
            $wallet->balance += $amountToCredit;
            $wallet->save();

            Transaction::create([
                'user_id' => $this->user->id,
                'cryptocurrency_id' => $crypto->id,
                'quantity' => -$quantityToSell,
                'transaction_type' => self::TRANSACTION_SELL,
                'price_at_transaction' => $crypto->current_price
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


    public function buyCryptocurrency(Cryptocurrency $crypto, Request $request)
    {
        $quantityToBuy = $request->input('quantity');
        $amountToDebit = $crypto->current_price * $quantityToBuy;

        $wallet = $this->user->wallet;
        if ($wallet->balance >= $amountToDebit) {
            $wallet->balance -= $amountToDebit;
            $wallet->save();

            Transaction::create([
                'user_id' => $this->user->id,
                'cryptocurrency_id' => $crypto->id,
                'quantity' => $quantityToBuy,
                'transaction_type' => 'achat',
                'price_at_transaction' => $crypto->current_price
            ]);

            return response()->json([
                'message' => "Cryptocurrency bought successfully!",
                'debited_amount' => $amountToDebit
            ]);
        } else {
            return response()->json([
                'message' => "You don't have enough balance to buy this cryptocurrency."
            ], 400);
        }
    }



    private function getTotalQuantityByType($transactionSet, $type)
    {
        return $transactionSet->where('transaction_type', $type)->sum('quantity');
    }

    private function getCryptoBalance($cryptoId)
    {
        $totalBought = $this->getTotalQuantityByType(Transaction::where('user_id', $this->user->id)->where('cryptocurrency_id', $cryptoId), self::TRANSACTION_BUY);
        $totalSold = $this->getTotalQuantityByType(Transaction::where('user_id', $this->user->id)->where('cryptocurrency_id', $cryptoId), self::TRANSACTION_SELL);

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
