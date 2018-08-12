<?php

use Illuminate\Database\Seeder;

class UserTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert(['name'=>'admin']);
        DB::table('roles')->insert(['name'=>'user']);
        DB::table('user_role')->insert(['user_id'=>'1' , 'role_id'=>'1']);
        DB::table('user_role')->insert(['user_id'=>'2' , 'role_id'=>'2']);
        DB::table('user_role')->insert(['user_id'=>'3' , 'role_id'=>'2']);
        DB::table('user_role')->insert(['user_id'=>'4' , 'role_id'=>'2']);

    }
}
