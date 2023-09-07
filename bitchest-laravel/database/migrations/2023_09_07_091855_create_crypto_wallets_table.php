<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCryptoWalletsTable extends Migration
{
    public function up()
    {
        Schema::create('crypto_wallets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wallet_id')->constrained()->onDelete('cascade');
            $table->foreignId('cryptocurrency_id')->constrained('cryptocurrencies')->onDelete('cascade');
            $table->decimal('amount', 10, 2); // la quantité de la cryptomonnaie
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('crypto_wallets');
    }
}
