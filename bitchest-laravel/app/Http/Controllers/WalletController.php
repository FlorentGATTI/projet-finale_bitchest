<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\CryptoWallet;

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

    public function cryptoWallets()
    {
        $cryptoWallets = CryptoWallet::where('user_id', auth()->user()->id)
            ->get();

        // foreach ($cryptoWallets as $crypto_id => $transactionSet) {
        //     $crypto = Cryptocurrency::find($crypto_id);
        //     $balance = $transactionSet->sum('quantity');
        //     $data[] = [
        //         'cryptocurrency_id' => $crypto_id,
        //         'cryptocurrency_name' => $crypto->name,
        //         'balance' => $balance
        //     ];
        // }

        return response()->json($cryptoWallets);
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
                'transaction_type' => 'sell',
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


    public function buyCryptocurrency($crypto, Request $request)
    {
        // return response()->json([
        //     'cryptoCurrencie' => $crypto, 
        //     'request' => $request -> input('cryptocurrency_id')
        // ], 400);

        
        $quantity = $request->input('quantity');

        $latestCotation = $request->input('latestCotation');
        // return response()->json([
        //     'message' => "Cryptocurrency bought successfully!",
        //     'price_per_unit' => $quantity * $latestCotation,
        //     'latest' => $request->input('quantity'),

        //     // 'debited_amount' => $amountToDebit
        // ]);

        $quantityToBuy = $request->input('quantity');
        // $amountToDebit = $crypto->current_price * $quantityToBuy;
        
        Transaction::create([
            'user_id' => $this->user->id,
            'cryptocurrency_id' => $crypto,
            'quantity' => $quantity,
            'transaction_type' => 'buy',
            'price_per_unit' => $quantity * $latestCotation,
        ]);

        return response()->json([
            'message' => "Cryptocurrency bought successfully!",

            // 'debited_amount' => $amountToDebit
        ]);

        // $wallet = $this->user->wallet;
        // if ($wallet->balance >= $amountToDebit) {
        //     $wallet->balance -= $amountToDebit;
        //     $wallet->save();
        // } else {
        //     return response()->json([
        //         'message' => "You don't have enough balance to buy this cryptocurrency."
        //     ], 400);
        // }
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
