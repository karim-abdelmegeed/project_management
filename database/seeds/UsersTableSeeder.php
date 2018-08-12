<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name'=>'Super',
            'email'=>'super@nour.com',
            'password'=>bcrypt('123456'),
            'color'=>'#808000',
            'admin_show'=>1
            ]);
        DB::table('users')->insert([
            'name'=>'karim',
            'email'=>'karim@nour.com',
            'password'=>bcrypt('123456'),
            'color'=>'#FF0000',
            'admin_show'=>1
            ]);
        DB::table('users')->insert([
            'name'=>'Ali',
            'email'=>'ali@nour.com',
            'password'=>bcrypt('123456'),
            'color'=>'#FFFF00',
            'admin_show'=>1
            ]);
    }
}
