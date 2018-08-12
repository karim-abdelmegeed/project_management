<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePrivilegesTable extends Migration
{

    public function up()
    {
        Schema::create('privileges', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->string('privilege_type')->nullable();//send tasks, follow tasks
            $table->integer('admin_show')->default(0);
            $table->integer('stuff_order')->default(0);
            $table->timestamps();
        });
        Schema::create('privileges_users', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('privilege_id')->nullable();
            $table->string('from_or_to')->nullable();
            $table->string('stuff_type')->nullable();
            $table->integer('stuff_id')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('privileges');
        Schema::dropIfExists('privileges_users');
    }
}
