<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksProcedure extends Migration
{

    public function up()
    {
        \Illuminate\Support\Facades\DB::unprepared('CREATE PROCEDURE getTasks3(IN task_id INT )
        BEGIN
        DECLARE x integer;
        DECLARE end_id integer;
        DECLARE  start_id integer;
        SET x = 1;
        SET start_id = 1;
        IF EXISTS(SELECT id FROM tasks WHERE parent = task_id) 
        THEN
        CREATE  TABLE followingTasks (
            ID int NOT NULL AUTO_INCREMENT,
            t_id int,
            PRIMARY KEY (ID)
        );
        INSERT INTO followingTasks (t_id) SELECT id FROM tasks WHERE parent = task_id;
        SELECT MAX(id) FROM followingTasks INTO end_id;
        while(x=1)
        DO
        if NOT EXISTS (SELECT id from tasks WHERE parent in (SELECT t_id from followingTasks WHERE id BETWEEN start_id AND end_id) )
        THEN
        set x = 0;
        ELSE
        INSERT INTO followingTasks (t_id) SELECT id FROM tasks WHERE parent in (SELECT t_id from followingTasks WHERE id BETWEEN start_id AND end_id);
        set start_id = end_id + 1 ;
        SELECT MAX(id) FROM followingTasks INTO end_id;
        END IF;
        END WHILE;
    
        SELECT tasks.* , \'a\' as task_order  from tasks where id = task_id
        UNION
        SELECT tasks.* , \'b\'  from tasks where id in (SELECT t_id from followingTasks) 
        order by task_order asc;
        DROP TABLE followingTasks;
        ELSE
        SELECT tasks.* , \'a\' as task_order  from tasks where id = task_id;
        END IF;
        END
        ');
    }

    public function down()
    {
        $command = "DROP PROCEDURE getTasks3";
        DB::connection()->getPdo()->exec($command);
    }
}
