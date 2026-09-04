<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class TaskController extends Controller
{
    //

    public function index(Request $request ,$id){

    if($request->input('id')){
        $tasks = Task::Where("id", $id)->get();
    }else{

        
        $tasks = Task::all();
        if($tasks == isEmpty()){
            return response()->json(["message" => "you don't have any tasks yet"]);
            }
    }
        return response()->json(["tasks" => $tasks, "message" => "your tasks is here"]);
    }

    public function create(Request $request){
        $validate = $request->validate([
            "text" => "nullable|string"
        ]);

        if($validate['text'] == null ){
            return response()->json(["message" => "the task ins't added"]);
        }

        Task::create($validate);
        return response()->json(["message" => "the task is successfully added"]);
    }
}
