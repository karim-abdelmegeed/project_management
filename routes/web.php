<?php
Route::Auth();
Route::get('/logout', 'Auth\LoginController@logout');

Route::get('/handle_youtube', 'youtubeController@index');
Route::post('/unprocessed', 'youtubeController@unProcessed');
Route::post('/file/setProcessed', 'youtubeController@setProcessed');

Route::group(['middleware' => ['auth'], 'prefix' => "files", 'as' => "files."], function () {
    Route::post('/endpoint', 'fileController@handle')->name('endpoint');
    Route::post('/save_file', 'fileController@saveFile')->name('save_file');
    Route::delete('/endpoint/{file}', 'fileController@handle')->name('delete_endpoint');
    Route::post('/get_file_info', 'fileController@getFileInfo')->name('get_file_info');
    Route::get('{model}/{field}/{id}/sign_now', 'fileController@signNow')->name('sign_now');
    Route::post('/addSignature', 'fileController@addSignature')->name('addSignature');
    Route::delete('{id}/{model}/{file_column}/delete_file', 'fileController@deleteFile')->name('delete_file');
    Route::get('/getFiles', ['uses' => 'fileController@getUserFiles', 'middleware' => 'authorize', 'roles' => []])->name('getFiles');
    Route::post('{multiple}/{model_name}/{model_field}/{id}/getFiles', ['uses' => 'fileController@postFiles', 'middleware' => 'authorize', 'roles' => []])->name('getFiles');
    Route::get('/', ['uses' => 'AdminController@index', 'middleware' => 'authorize', 'roles' => []])->name('index');

    /*--routes@@files*/
});

Route::group(['middleware' => ['auth', /*'chooseRole'*/] ], function () {
    Route::get('create_token/{token}', 'NotificationController@createToken');
    Route::get('trial', 'NotificationController@trial');
    Route::get('send', 'NotificationController@send');
    Route::get('get_notifications', 'NotificationController@getNotifications');
    Route::post('read_notification/{id}', 'NotificationController@read_notification');
    Route::post('read_notifications', 'NotificationController@read_notifications');
    /*--routes@@notifications*/
});

Route::get('/choose_role_view', ['uses' => 'AdminController@choose_role_view', 'middleware' => 'auth', 'roles' => []])->name('choose_role_view');
Route::get('{role_id}/choose_role', ['uses' => 'AdminController@choose_role', 'middleware' => 'auth', 'roles' => []])->name('choose_role');

Route::group(['middleware' => ['auth'], 'prefix' => "log", 'as' => "log."], function () {
    Route::get('/', ['uses' => 'logController@index'])->name('index');
    /*--routes@@log*/
});
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['middleware'=>['auth'], 'prefix' => "assignment_controller", 'as' => "assignment_controller."], function () {
    Route::get('/', ['uses' => 'assignment_controllerController@index', 'middleware' => 'authorize', 'roles' => ["admin"]])->name('index');
    Route::post('/reorder', 'Assignment_controllerController@reorder')->name('reorder');/*--routes@@assignment_controller*/
});
Route::group(['middleware'=>['auth'], 'prefix' => "assignment", 'as' => "assignment."], function () {
    Route::get('/', ['uses' => 'assignmentController@index', 'middleware' => 'authorize', 'roles' => ["admin"]])->name('index');
    Route::post('/reorder', 'AssignmentController@reorder')->name('reorder');
    Route::get('/assignment_data', 'assignmentController@assignment_data');
/*--routes@@assignment*/
});
Route::group(['middleware'=>['auth'], 'prefix' => "assignment2", 'as' => "assignment2."], function () {
    Route::get('/', ['uses' => 'assignment2Controller@index', 'middleware' => 'authorize', 'roles' => ["admin"]])->name('index');
    Route::post('/reorder', 'Assignment2Controller@reorder')->name('reorder');
    Route::get('/assignment2_data', 'assignment2Controller@assignment2_data');
/*--routes@@assignment2*/
});
Route::group(['middleware'=>['auth'], 'prefix' => "assignment3", 'as' => "assignment3."], function () {
    Route::get('/', ['uses' => 'assignment3Controller@index', 'middleware' => 'authorize', 'roles' => ["admin"]])->name('index');
    Route::post('/reorder', 'Assignment3Controller@reorder')->name('reorder');
    Route::get('/assignment3_data', 'assignment3Controller@assignment3_data');
/*--routes@@assignment3*/
});

Route::group(['middleware'=>['auth'], 'prefix' => "multi_view", 'as' => "multi_view."], function () {
    Route::get('/', ['uses' => 'multi_viewController@index', 'middleware' => 'authorize', 'roles' => ["admin"]])->name('index');
/*--routes@@multi_view*/
});
Route::group(['middleware'=>['auth'], 'prefix' => "happy_multi_views", 'as' => "happy_multi_views."], function () {
    Route::get('/', ['uses' => 'happy_multi_viewsController@index', 'middleware' => 'authorize', 'roles' => []])->name('index');
/*--routes@@happy_multi_views*/
});


       /* our routes */

Route::get('/', function () {
    $data['partialView']='gantt.index';
//    return view('gantt.index');
    return redirect('/workflowyee');
});

Route::group(['middleware'=>['auth'], 'prefix' => "user", 'as' => "user."], function () {
    Route::get('/', ['uses' => 'userController@index', 'middleware' => 'authorize', 'roles' => ["admin"]])->name('index');
    Route::get('/company_name_data', 'UserController@Company_name_data');
    Route::post('/deleteCells', 'UserController@deleteCells')->name('deleteCells');
    Route::get('{id}/edit', ['uses' => 'userController@edit', 'middleware' => 'authorize', 'roles' => ["admin","user"]])->name('edit');
    Route::post('{id}/edit', ['uses' => 'userController@update', 'middleware' => 'authorize', 'roles' => ["admin","user"]])->name('update');
    Route::get('init', ['uses' => 'userController@init', 'middleware' => 'authorize', 'roles' => ["admin","user"]])->name('init');
    Route::delete('{id}/delete', ['uses' =>'userController@delete', 'middleware' => 'authorize', 'roles' => ["admin","user"]])->name('delete');
    Route::get('/get_user_color/{user_id}',['uses' =>'userController@getColor', 'middleware' => 'authorize', 'roles' => ["admin","user"]]);

    /*--routes@@user*/
});

Route::group(['middleware'=>['auth'], 'prefix' => "workflowyee", 'as' => "workflowyee."], function () {
    Route::get('/', ['uses' => 'assignment5Controller@index', 'middleware' => 'authorize', 'roles' => ["admin","user"]])->name('index');
});

Route::get('/get_tasks_js','GanttController@getTasksJs');
Route::get('get_last_task','GanttController@getLastTask');
Route::get('get_last_updated_task','GanttController@getLastUpdatedTask');
Route::get('get_task_parents/{task_id}','GanttController@getTaskParents');

Route::group(['middleware'=>['auth'], 'prefix' => "groups", 'as' => "groups."], function () {
    Route::get('/', ['uses' => 'GroupsController@index', 'middleware' => 'authorize', 'roles' => ["admin"]])->name('index');
    Route::get('/init', ['uses' => 'GroupsController@init', 'middleware' => 'authorize', 'roles' => ["admin"]])->name('init');
    Route::get('/edit/{group_id}', ['uses' => 'GroupsController@edit', 'middleware' => 'authorize', 'roles' => ["admin"]])->name('edit');
    Route::post('/edit/{group_id}', ['uses' => 'GroupsController@update', 'middleware' => 'authorize', 'roles' => ["admin"]])->name('update');
    Route::post('/delete/{group_id}', ['uses' => 'GroupsController@delete', 'middleware' => 'authorize', 'roles' => ["admin"]])->name('delete');
    /*--routes@@assignment4*/
});
Route::group(['middleware'=>['auth'], 'prefix' => "privilege", 'as' => "privilege."], function () {
    Route::get('/', ['uses' => 'privilegeController@index', 'middleware' => 'authorize', 'roles' => ["Admin"]])->name('index');
    Route::get('{id}/edit', ['uses' => 'privilegeController@edit', 'middleware' => 'authorize', 'roles' => ["Admin"]])->name('edit');
    Route::post('{id}/edit', ['uses' => 'privilegeController@update', 'middleware' => 'authorize', 'roles' => ["Admin"]])->name('update');
    Route::get('init', ['uses' => 'privilegeController@init', 'middleware' => 'authorize', 'roles' => ["Admin"]])->name('init');
    Route::delete('{id}/delete', ['uses' =>'privilegeController@delete', 'middleware' => 'authorize', 'roles' => ["Admin"]])->name('delete');
    /*--routes@@privilege*/
});

Route::group(['middleware'=>['auth'], 'prefix' => "task", 'as' => "task."], function () {
    Route::get('/', ['uses' => 'TaskController@index', 'middleware' => 'authorize', 'roles' => ["Admin","User"]])->name('index');
    Route::get('/project_project_name_data', 'TaskController@Project_project_name_data');
    Route::get('/user_name_data', 'TaskController@User_name_data');
    Route::post('/deleteCells', 'TaskController@deleteCells')->name('deleteCells');
    Route::post('/reorder', 'TaskController@reorder')->name('reorder');
    Route::get('{id}/edit', ['uses' => 'TaskController@edit', 'middleware' => 'authorize', 'roles' => ["Admin","User"]])->name('edit');
    Route::post('{id}/edit', ['uses' => 'TaskController@update', 'middleware' => 'authorize', 'roles' => ["Admin","User"]])->name('update');
    Route::get('init', ['uses' => 'TaskController@init', 'middleware' => 'authorize', 'roles' => ["Admin","User"]])->name('init');
    Route::delete('{id}/delete', ['uses' =>'TaskController@delete', 'middleware' => 'authorize', 'roles' => ["Admin","User"]])->name('delete');
    Route::get('/task_data', 'TaskController@task_data');
    Route::get('/tasks_i_created', ['uses' =>'GanttController@tasksICreated', 'middleware' => 'authorize', 'roles' => ["Admin","User"]]);
    Route::get('/tasks_i_should_do', ['uses' =>'GanttController@tasksIShouldDo', 'middleware' => 'authorize', 'roles' => ["Admin","User"]]);
    Route::get('/finished', ['uses' =>'GanttController@finished', 'middleware' => 'authorize', 'roles' => ["Admin","User"]]);
    Route::get('/tasks_i_follow', ['uses' =>'GanttController@tasksIFollow', 'middleware' => 'authorize', 'roles' => ["Admin","User"]]);
    Route::get('/add_task_allocator/{task_id}', ['uses' =>'GanttController@addTaskAllocator', 'middleware' => 'authorize', 'roles' => ["Admin","User"]]);
    Route::get('/task_rating/{task_id}', ['uses' =>'TaskController@setTaskRating', 'middleware' => 'authorize', 'roles' => ["Admin"]]);
    Route::get('/set_task_quality_rate/{task_id}/{rate}', ['uses' =>'TaskController@setQualityRate', 'middleware' => 'authorize', 'roles' => ["Admin"]]);
    Route::get('/set_task_time_rate/{task_id}/{rate}', ['uses' =>'TaskController@setTimeRate', 'middleware' => 'authorize', 'roles' => ["Admin"]]);
    Route::post('/save_task_comment/', ['uses' =>'TaskController@saveTaskComment', 'middleware' => 'authorize', 'roles' => ["Admin"]]);
    Route::get('/view_rated_tasks/', ['uses' =>'TaskController@viewRatedTasks', 'middleware' => 'authorize', 'roles' => ["Admin","user"]]);
    Route::post('/rate_in_range', ['uses' =>'TaskController@rateInRange', 'middleware' => 'authorize', 'roles' => ["Admin","user"]]);

    /*--routes@@task*/
});

Route::group(['middleware'=>['auth'], 'prefix' => "api", 'as' => "api."], function () {
    Route::get('/data', 'GanttController@get');
    Route::resource('task', 'TaskController');
    Route::resource('link', 'LinksController');
    Route::get('/selectedChildren/{task_id}','GanttController@selectedChildren');

});

//--routes--

