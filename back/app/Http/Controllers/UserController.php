<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //------------------REGISTER-------------------
    public function register(Request $request){
        $validate = $request->validate([
            'name' => 'string|min:3|required',
            'email' => 'required|email|unique,users:email',
            'password' => 'min:6|required'
        ]) ;

        $validate["password"] = Hash::make($validate["password"]);

        User::create($validate);
        return response()->json(["message" => "you are successfully registred"]);
    }

    // -----------------------LOGIN------------------------
    public function login(Request $request){
        $validate = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]) ;

        if(!Auth::attempt($validate)){
            return response()->json(["message" => "your credentials is incorrect"]);
        }

        $request->session()->regenerate();

        return response()->json(["message" => "you are successfully connected"]);
    }


}
