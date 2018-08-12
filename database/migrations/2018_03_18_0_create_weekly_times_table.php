<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWeeklyTimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('weekly_times', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('availability_id')->nullable();
            $table->datetime('from_hour')->nullable();
            $table->datetime('to_hour')->nullable();
            $table->integer('admin_show')->default(0);

       $table->integer('stuff_order')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('weekly_times');
    }
}
