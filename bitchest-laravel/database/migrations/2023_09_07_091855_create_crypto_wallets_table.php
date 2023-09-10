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
            $table->unsignedBigInteger('user_id'); // Assurez-vous d'avoir cette ligne
            $table->unsignedBigInteger('cryptocurrency_id');
            $table->decimal('quantity', 20, 8);
            $table->timestamps();

            // Ajoutez également ces lignes pour créer les contraintes de clé étrangère:
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('cryptocurrency_id')->references('id')->on('cryptocurrencies')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('crypto_wallets');
    }
}
