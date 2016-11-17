<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShelves extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shelves', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('rack_id')->unsigned();
            $table->integer('width')->unsigned();
            $table->integer('height')->unsigned();
            $table->integer('depth')->unsigned();
            $table->timestamps();

            $table->foreign('rack_id')
                ->references('id')->on('racks')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('shelves');
    }
}
