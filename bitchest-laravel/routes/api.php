<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CryptocurrencyController;
use App\Http\Controllers\CryptocurrencypriceController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Route::middleware(['auth:sanctum'])->group(function () {
//     // Route pour afficher la liste des cryptomonnaies aux clients et aux admins
//     Route::get('/dashboard', [UserController::class, 'index'])->name('dashboard');
//     Route::get('/cryptocurrencies', [CryptocurrencyController::class, 'index']);
//     Route::get('/cryptocurrenciesprice', [CryptocurrencypriceController::class, 'index']); 
//     Route::get('/cryptocurrencies/progression', [CryptocurrencyController::class, 'getCryptoProgression']);
//     Route::get('/data-personel', [UserController::class, 'showPersonalData'])->name('data.personel');

//     // Routes pour les utilisateurs
//     Route::get('/manage-clients', [UserController::class, 'index'])->name('manage.clients');
//     Route::get('/manage-clients/{id}', [UserController::class, 'show'])->name('manage.clients.show');
//     Route::post('/manage-clients', [UserController::class, 'store'])->name('manage.clients.store');
//     Route::put('/manage-clients/{id}', [UserController::class, 'update'])->name('manage.clients.update');
//     Route::delete('/manage-clients/{id}', [UserController::class, 'destroy'])->name('manage.clients.destroy');
//     Route::get('/current-user-data', [UserController::class, 'currentUserData'])->name('current.user.data');

//     // Route::get('/wallet', [WalletController::class, 'index'])->name('wallet.index');
//     // Route::get('/wallet/purchases', [WalletController::class, 'purchases'])->name('wallet.purchases');
// });

Route::middleware(['auth:sanctum'])->group(function () {
    // Route pour afficher la liste des cryptomonnaies aux clients et aux admins
    Route::get('/dashboard', [UserController::class, 'index'])->name('dashboard');
    Route::get('/cryptocurrencies', [CryptocurrencyController::class, 'index']);
    Route::get('/cryptocurrenciesprice', [CryptocurrencypriceController::class, 'index']); 
    Route::get('/cryptocurrencies/progression', [CryptocurrencyController::class, 'getCryptoProgression']);
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

    // Pour Wallet, si vous décidez de l'utiliser plus tard
    // Route::prefix('wallet')->group(function() {
    //     Route::get('/', [WalletController::class, 'index'])->name('wallet.index');
    //     Route::get('/purchases', [WalletController::class, 'purchases'])->name('wallet.purchases');
    // });
});



// Route::middleware(['auth:sanctum'])->group(function () {
//     // Route pour les administrateurs
//     Route::prefix('admin')->group(function () {
//         Route::get('/data', [AdminController::class, 'getData']); // Gérer les données personnelles
//         Route::get('/clients', [AdminController::class, 'getClients']); // Gérer les clients
//         Route::post('/clients/create', [AdminController::class, 'createClient']); // Créer un client
//         Route::put('/clients/{id}', [AdminController::class, 'updateClient']); // Modifier un client
//         Route::delete('/clients/{id}', [AdminController::class, 'deleteClient']); // Supprimer un client
//     });

//     // Routes pour les clients
//     Route::prefix('client')->group(function () {
//         Route::get('/data', [ClientController::class, 'getData']); // Gérer les données personnelles
//         Route::get('/wallet', [WalletController::class, 'index']); // Gérer le portefeuille
//         Route::get('/wallet/purchases', [WalletController::class, 'purchases']); // Historique des achats
//         Route::get('/wallet/profits', [WalletController::class, 'profits']); // Plus-values
//         Route::post('/wallet/sell/{cryptoId}', [WalletController::class, 'sellCrypto']); // Vendre une crypto
//     });

//     // Routes pour tous (clients et admins)
//     Route::get('/cryptos', [CryptocurrencyController::class, 'index']); // Consultation des cours
// });
