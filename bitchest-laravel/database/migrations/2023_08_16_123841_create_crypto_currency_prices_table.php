<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCryptoCurrencyPricesTable extends Migration
{
    public function up()
    {
        Schema::create('crypto_currency_prices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cryptocurrency_id');
            $table->decimal('price', 12, 2);
            $table->timestamp('timestamp');
            $table->timestamps();

            $table->foreign('cryptocurrency_id')->references('id')->on('cryptocurrencies')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('crypto_currency_prices');
    }
}
