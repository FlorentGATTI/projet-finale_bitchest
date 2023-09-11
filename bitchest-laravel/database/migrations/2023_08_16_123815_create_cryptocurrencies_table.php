<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCryptoCurrenciesTable extends Migration
{
    public function up()
    {
        Schema::create('crypto_currencies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('symbol', 10)->unique();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('crypto_currencies');
    }
}
