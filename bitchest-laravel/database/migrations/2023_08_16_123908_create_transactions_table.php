<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('crypto_currency_id');
            $table->decimal('quantity', 10, 2);
            $table->decimal('price_per_unit', 12, 2);
            $table->enum('transaction_type', ['buy', 'sell']);
            $table->timestamp('transaction_date');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('crypto_currency_id')->references('id')->on('crypto_currencies')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
