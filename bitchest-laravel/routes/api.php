<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CryptocurrencyController;
use App\Http\Controllers\WalletController;

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

Route::middleware(['auth:sanctum'])->group(function () {
    // Route pour les administrateurs
    Route::prefix('admin')->group(function () {
        Route::get('/data', [AdminController::class, 'getData']); // Gérer les données personnelles
        Route::get('/clients', [AdminController::class, 'getClients']); // Gérer les clients
        Route::post('/clients/create', [AdminController::class, 'createClient']); // Créer un client
        Route::put('/clients/{id}', [AdminController::class, 'updateClient']); // Modifier un client
        Route::delete('/clients/{id}', [AdminController::class, 'deleteClient']); // Supprimer un client
    });

    // Routes pour les clients
    Route::prefix('client')->group(function () {
        Route::get('/data', [ClientController::class, 'getData']); // Gérer les données personnelles
        Route::get('/wallet', [WalletController::class, 'index']); // Gérer le portefeuille
        Route::get('/wallet/purchases', [WalletController::class, 'purchases']); // Historique des achats
        Route::get('/wallet/profits', [WalletController::class, 'profits']); // Plus-values
        Route::post('/wallet/sell/{cryptoId}', [WalletController::class, 'sellCrypto']); // Vendre une crypto
    });

    // Routes pour tous (clients et admins)
    Route::get('/cryptos', [CryptocurrencyController::class, 'index']); // Consultation des cours
});
