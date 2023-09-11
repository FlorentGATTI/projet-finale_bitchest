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
            $table->unsignedBigInteger('crypto_currency_id');
            $table->decimal('price', 12, 2);
            $table->timestamp('timestamp');
            $table->timestamps();

            $table->foreign('crypto_currency_id')->references('id')->on('crypto_currencies')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('crypto_currency_prices');
    }
}
