<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Uploader\UploadHandler;

use Illuminate\Http\Request;
use App\File;
use App\Event;
use App\EventUser;
use App\User;
use App\Http\Helpers\Helpers;
use Auth;
use Illuminate\Filesystem\Filesystem;
use Ramsey\Uuid\Uuid;

class fileController extends Controller
{
    public function __construct()
    {
        $this->dirPath = public_path('uploads');
    }
    public function handle(Request $request)
    {
        $data = $request->input();
        $uploader = new UploadHandler();
        

        // Specify the list of valid extensions, ex. array("jpeg", "xml", "bmp")
        $uploader->allowedExtensions = array(); // all files types allowed by default

        // Specify max file size in bytes.
        $uploader->sizeLimit = null;

        // Specify the input name set in the javascript.
        $uploader->inputName = "qqfile"; // matches Fine Uploader's default inputName value by default

        // If you want to use the chunking/resume feature, specify the folder to temporarily save parts.
        $uploader->chunksFolder = "chunks";

        //$method = $_SERVER["REQUEST_METHOD"];
        $method = $this->get_request_method();
        // Determine whether we are dealing with a regular ol' XMLHttpRequest, or
        // an XDomainRequest
        $_HEADERS = $this->parseRequestHeaders();
        $iframeRequest = false;
        if (!isset($_HEADERS['X-Requested-With']) || $_HEADERS['X-Requested-With'] != "XMLHttpRequest") {
            $iframeRequest = true;
        }

        /*
         * handle the preflighted OPTIONS request. Needed for CORS operation.
         */
        if ($method == "OPTIONS") {
            $this->handlePreflight();
        }

        /*
         * handle a DELETE request or a POST with a _method of DELETE.
         */
        elseif ($method == "DELETE") {
            $this->handleCorsRequest();
            $result = $uploader->handleDelete($this->dirPath);

            // iframe uploads require the content-type to be 'text/html' and
            // return some JSON along with self-executing javascript (iframe.ss.response)
            // that will parse the JSON and pass it along to Fine Uploader via
            // window.postMessage
            if ($iframeRequest == true) {
                header("Content-Type: text/html");
                echo json_encode($result)."<script src='http://10.0.2.2/jquery.fineuploader-4.1.1/iframe.xss.response-4.1.1.js'></script>";
            } else {
                echo json_encode($result);
            }
        } elseif ($method == "POST") {
            $this->handleCorsRequest();
            header("Content-Type: text/plain");
            
            // Assumes you have a chunking.success.endpoint set to point here with a query parameter of "done".
            // For example: /myserver/handlers/endpoint.php?done
            if (isset($_GET["done"])) {
                $result = $uploader->combineChunks($this->dirPath);
            }
            // Handles upload requests
            else {
                // Call handleUpload() with the name of the folder, relative to PHP's getcwd()
                
                
                $result = $uploader->handleUpload($this->dirPath);

                // To return a name used for uploaded file you can use the following line.
                $result["uploadName"] = $uploader->getUploadName();
                
                


                
                // iframe uploads require the content-type to be 'text/html' and
                // return some JSON along with self-executing javascript (iframe.ss.response)
                // that will parse the JSON and pass it along to Fine Uploader via
                // window.postMessage
                if ($iframeRequest == true) {
                    header("Content-Type: text/html");
                    echo json_encode($result)."<script src='http://{{SERVER_URL}}/{{FINE_UPLOADER_FOLDER}}/iframe.xss.response.js'></script>";
                } else {
                    echo json_encode($result);
                }
            }
        } else {
            header("HTTP/1.0 405 Method Not Allowed");
        }
    }




    public function get_request_method()
    {
        global $HTTP_RAW_POST_DATA;

            // This should only evaluate to true if the Content-Type is undefined
            // or unrecognized, such as when XDomainRequest has been used to
            // send the request.
            if (isset($HTTP_RAW_POST_DATA)) {
                parse_str($HTTP_RAW_POST_DATA, $_POST);
            }

        if (isset($_POST["_method"]) && $_POST["_method"] != null) {
            return $_POST["_method"];
        }

        return $_SERVER["REQUEST_METHOD"];
    }


    public function parseRequestHeaders()
    {
        $headers = array();
        foreach ($_SERVER as $key => $value) {
            if (substr($key, 0, 5) <> 'HTTP_') {
                continue;
            }
            $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
            $headers[$header] = $value;
        }
        return $headers;
    }

    public function handleCorsRequest()
    {
        header("Access-Control-Allow-Origin: *");
    }

            /*
             * handle pre-flighted requests. Needed for CORS operation
             */
            public function handlePreflight()
            {
                handleCorsRequest();
                header("Access-Control-Allow-Methods: POST, DELETE");
                header("Access-Control-Allow-Credentials: true");
                header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Cache-Control");
            }

    public function saveFile(Request $request)
    {
        $data = $request->input();
                
                //Handle database
                $file = new File();
        $file->file = $data['name'];
        $file->user_id = Auth::user()->id;
        $file->hash = $data["uuid"];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $this->dirPath."/".$data["uuid"]."/".$data['name']);

        $file->file_type = $mime;
                
        $file->save();
        $data['field'] = str_replace('"', "", $data['field']);
        
                // If single file uploaded
                if ($data['multiple'] == "false") {
                    $model_name = 'App\\' . $data['model'];
                    $model = new $model_name();
                    $record = $model::find($data['entity_id']);
                    
                    $record->{$data['field']} = $file->id;
                    $record->save();
                }
                // if many to many needed
                else {
                    $model_name = 'App\\' . $data['model'];
                    $model = new $model_name();
                    $model->file_id = $file->id;
                    $model->{$data['field']} = $data['entity_id'];
                    $model->save();
                }



                // handle youtube videos
                if (strpos($file->file_type, 'video') !== false) {
                    if ($data['youtube_videos']) {
                        $file->processed = 2;
                        $file->save();
                    }
                }


                // Handle file encryption
                if ($data['encrypt_files']) {
                    //encrypt files here
                    $file->encrypted = 1;
                    $file->save();
                }
    }
    public function getFileInfo(Request $request)
    {
        $data = $request->input();
        $file = File::find($data['id']);
        return response()->json([
                    'processed'=>$file->processed,
                    'href'=>'https://www.youtube.com/watch?v='.$file->youtube_id,
                    'img' => 'https://img.youtube.com/vi/'.$file->youtube_id.'/0.jpg'

                    ]);
    }


    public function signNow($model, $field, $id)
    {
        $data = [];
        $data['partialView'] = 'signature.signature_pad';
        $data['model'] = $model;
        $data['field'] = $field;
        $data['id'] = $id;
        return view('signature.base', $data);
    }

    public function addSignature(Request $request)
    {
        list($type, $data) = explode(';', $request->image);
        list(, $data)      = explode(',', $data);
        $decocedData = base64_decode($data);
        $uuid =trim(Uuid::uuid4());
        $dir = new Filesystem();
        $dir->makeDirectory('./uploads/'.$uuid);
        $dir->put('./uploads/'.$uuid.'/signature.png', $decocedData);
//        file_put_contents('/uploads/'.$uuid.'/karim.png' , $decocedData );
        return $uuid;
    }

    //Saving
    public function postFiles(Request $request, $multiple, $model_name, $model_field, $id)
    {
        $app='App\\'.$model_name;
        if ($multiple =='false') {
            $element = $app::where('id', $id)->update([$model_field =>$request->uploaded_file]);
        } else {//Upload Multiple Files
            $files = $request->uploaded_files;
            foreach ($files as $file_id) {
                $created = $app::where([$model_field=>$id , 'file_id'=>$file_id])->first();
                if ($created == null) {
                    $element = new $app();
                    $element->$model_field = $id;
                    $element->file_id = $file_id;
                    $element->save();
                }
            }
        }
        return response()->json(['status' => 'success', 'msg' => 'Files updated successfully']);
    }

    //get user files to be used in cute-file-browser
    public function getUserFiles()
    {
        $user_files = Helper::getUserFiles();
        return $user_files;
    }

    public function deleteFile($id, $model, $file_column)
    {
        Helper::deleteFile($id, $model, $file_column);
    }
}
