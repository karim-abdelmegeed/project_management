<?php

use Illuminate\Database\Seeder;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('priorities')->insert(['id'=>1,'name'=>'Medium']);
        DB::table('priorities')->insert(['id'=>2,'name'=>'High']);
        DB::table('priorities')->insert(['id'=>3,'name'=>'Low']);

        DB::table('tasks')->insert([
                'id'=>1,
                'text'=>'Project #1',
                'type'=>'project',
                'start_date'=>'2017-04-06 00:00:00',
                'duration'=>5,
                'owner_id'=>1,
                'allocator_id'=>1,
                'progress'=>0.8,
                 'parent'=>0

        ]);

        for($i=2;$i<10;$i++){
            if($i<5)
            {
                DB::table('tasks')->insert([
                    ['id'=>$i, 'text'=>'Task #'.$i,
                        'start_date'=>'2017-04-06 00:00:00',
                        'duration'=>4,
                        'progress'=>0.5,
                        'owner_id'=>1,
                        'allocator_id'=>1,
                        'priority'=>'1',
                        'parent'=>$i-1]
                ]);
            }
            else
                {

                DB::table('tasks')->insert([
                    ['id'=>$i, 'text'=>'Task #'.$i,
                        'start_date'=>'2017-04-06 00:00:00',
                        'duration'=>4,
                        'progress'=>0.5,
                        'owner_id'=>2,
                        'allocator_id'=>1,
                        'priority'=>'1',
                        'parent'=>$i-1]
                ]);
            }


        }






    }
}
