<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVolunteerAvailabilitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('volunteer_availability', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('volunteer_id')->nullable();
            $table->string('day')->nullable();
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
        Schema::dropIfExists('volunteer_availability');
    }
}
