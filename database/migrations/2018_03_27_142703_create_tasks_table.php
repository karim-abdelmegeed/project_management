<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{

    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
                $table->increments('id');
                $table->string('text')->nullable();
                $table->string('type')->nullable();
                $table->integer('duration')->nullable();
                $table->double('progress')->nullable();
                $table->dateTime('start_date')->nullable();
                $table->integer('owner_id')->nullable();
                $table->integer('allocator_id')->nullable();
                $table->integer('priority')->nullable();
                $table->integer('parent')->nullable();
                $table->double('quality_rating')->nullable();
                $table->double('time_rating')->nullable();
                $table->integer('sortorder')->nullable();
                $table->integer('target')->nullable();
                $table->text('admin_comment')->nullable();
                $table->dateTime('q_rating_time')->nullable();
                $table->dateTime('t_rating_time')->nullable();
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
        Schema::dropIfExists('tasks');
    }
}
