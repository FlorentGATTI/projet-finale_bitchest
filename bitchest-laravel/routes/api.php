<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CryptoCurrencyController;
use App\Http\Controllers\CryptoCurrencypriceController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\TransactionController;

Route::middleware(['auth:api'])->group(function () {
    
    // Route pour afficher la liste des cryptomonnaies aux clients et aux admins
    Route::get('/dashboard', [UserController::class, 'index'])->name('dashboard');
    
    // Cryptocurrencies routes
    Route::get('/cryptocurrencies', [CryptoCurrencyController::class, 'index']);
    Route::get('/cryptocurrenciesprice', [CryptoCurrencypriceController::class, 'index']); 
    Route::get('/cryptocurrencies/progression', [CryptoCurrencyController::class, 'getCryptoProgression']);
    
    // Data Personnel
    Route::get('/data-personel', [UserController::class, 'showPersonalData'])->name('data.personel');
    
    Route::get('/current-user', [UserController::class, 'currentUserData'])->name('current.user.data');

    // Routes pour les utilisateurs (Utilisez resource si vous avez toutes les méthodes CRUD)
    Route::resource('manage-clients', UserController::class)->names([
        'index' => 'manage.clients',
        'show' => 'manage.clients.show',
        'store' => 'manage.clients.store',
        'update' => 'manage.clients.update',
        'destroy' => 'manage.clients.destroy'
    ]);

    // Wallet routes
    Route::prefix('wallet')->group(function() {
        Route::get('/', [WalletController::class, 'index'])->name('wallet.index');
        Route::post('/buy/{crypto_id}', [WalletController::class, 'buyCryptocurrency'])->name('wallet.buy');
        Route::post('/sell/{crypto_id}', [WalletController::class, 'sellCryptocurrency'])->name('wallet.sell');
        Route::get('/balance', [WalletController::class, 'balance']);
        Route::get('/transactions/buy', [WalletController::class, 'getBuyTransactions']);
    });

    // Transactions routes (Utilisez resource si vous avez toutes les méthodes CRUD)
    Route::resource('transactions', TransactionController::class)->names([
        'index' => 'transactions.index',
        'show' => 'transactions.show',
        'store' => 'transactions.store',
        'update' => 'transactions.update',
        'destroy' => 'transactions.destroy'
    ]);
    Route::get('/transactions/current-profit', [TransactionController::class, 'currentProfit'])->name('transactions.currentProfit');
});

