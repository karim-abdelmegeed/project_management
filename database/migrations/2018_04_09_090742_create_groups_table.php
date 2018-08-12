<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroupsTable extends Migration
{

    public function up()
    {
        Schema::create('groups',function(Blueprint $table){
            $table->increments('id');
            $table->string('name')->nullable();
            $table->integer('admin_show')->default(0);
            $table->timestamps();
        });

        Schema::create('user_group',function(Blueprint $table){
            $table->increments('id');
            $table->integer('user_id')->nullable();
            $table->integer('group_id')->nullable();
            $table->timestamps();
        });

    }

    public function down()
    {
        Schema::dropIfExists('groups');
        Schema::dropIfExists('user_group');
    }
}
