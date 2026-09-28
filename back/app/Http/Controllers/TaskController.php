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
    // -----------------------INDEX()-----------------------------
    public function index()
    {
        $tasks = Task::all();

        if (empty($tasks)) {
            return response()->json(["message" => "you don't have any tasks yet"]);
        }
        return response()->json(["tasks" => $tasks, "message" => "are tasks is here"]);
    }

    //------------------------SHOW()-------------------------- 
    public function show($id)
    {

        $task = Task::Where("id", $id)->get();

        if (empty($task)) {
            return response()->json(["message" => "you don't have any task with this id"]);
        }
        return response()->json(["task" => $task, "message" => "your task is here"]);
    }

    //------------------------STORE()----------------------------------------
    public function store(Request $request)
    {
        $validate = $request->validate([
            "text" => "nullable|string"
        ]);

        if (empty($validate["text"])) {
            return response()->json(["message" => "the task isn't added"]);
        }

        Task::create($validate);
        return response()->json(["message" => "the task is successfully added"]);
    }

    //-----------------------UPDATE--------------------
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        // $currentText = $task->text;

        $validate = $request->validate([
            "text" => "sometimes|string"
        ]);

        // if ($currentText == $validate['text']) {
        //     return response()->json(["message" => "the task isn't updated"]);
        // }
        
        
        //sometimes work here change only the fields provided by the user 
        $task->update($validate);
        
        if($task->wasChanged('text')){
            return response()->json(["task" => $task, "message" => "the task is successfully updated"]);
            }
            
        return response()->json(["message" => "the task isn't updated"]);
    }

    //-----------------------DESTROY--------------------
    public function destroy($id)
    {
        Task::destroy($id);
        return response()->json(["message" => "the task is successfully deleted"]);
    }

    
}
