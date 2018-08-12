<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssignmentFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assignment_file', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('file_id')->nullable();
            $table->integer('assignment_id')->nullable();
            $table->integer('sender_id')->nullable();
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
        Schema::dropIfExists('assignment_file');
    }
}
