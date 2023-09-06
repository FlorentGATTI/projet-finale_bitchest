<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CryptocurrencyController;
use App\Http\Controllers\CryptocurrencypriceController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\TransactionController;

Route::middleware(['auth:sanctum'])->group(function () {
    
    // Route pour afficher la liste des cryptomonnaies aux clients et aux admins
    Route::get('/dashboard', [UserController::class, 'index'])->name('dashboard');
    
    // Cryptocurrencies routes
    Route::get('/cryptocurrencies', [CryptocurrencyController::class, 'index']);
    Route::get('/cryptocurrenciesprice', [CryptocurrencypriceController::class, 'index']); 
    Route::get('/cryptocurrencies/progression', [CryptocurrencyController::class, 'getCryptoProgression']);
    
    // Data Personnel
    Route::get('/data-personel', [UserController::class, 'showPersonalData'])->name('data.personel');

    // Routes pour les utilisateurs
    Route::prefix('manage-clients')->group(function() {
        Route::get('/', [UserController::class, 'index'])->name('manage.clients');
        Route::get('/{id}', [UserController::class, 'show'])->name('manage.clients.show');
        Route::post('/', [UserController::class, 'store'])->name('manage.clients.store');
        Route::put('/{id}', [UserController::class, 'update'])->name('manage.clients.update');
        Route::delete('/{id}', [UserController::class, 'destroy'])->name('manage.clients.destroy');
    });
    
    Route::get('/current-user-data', [UserController::class, 'currentUserData'])->name('current.user.data');

    // Wallet routes
    Route::prefix('wallet')->group(function() {
        Route::get('/', [WalletController::class, 'index'])->name('wallet.index');
        Route::get('/purchases', [WalletController::class, 'purchases'])->name('wallet.purchases');
    });

    // Transactions routes
    Route::prefix('transactions')->group(function() {
        Route::get('/', [TransactionController::class, 'index'])->name('transactions.index');
        Route::get('/{id}', [TransactionController::class, 'show'])->name('transactions.show');
        Route::post('/', [TransactionController::class, 'store'])->name('transactions.store');
        Route::put('/{id}', [TransactionController::class, 'update'])->name('transactions.update');
        Route::delete('/{id}', [TransactionController::class, 'destroy'])->name('transactions.destroy');
        Route::get('/current-profit', [TransactionController::class, 'currentProfit'])->name('transactions.currentProfit');
    });
});
