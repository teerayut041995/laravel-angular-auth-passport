<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;


class HomeController extends Controller
{
    public function __construct()
    {
    	$this->middleware('client.credentials');
    	$this->middleware('auth:api');
    }

    public function me(Request $request)
    {
    	 return response()->json($request->user());
    }
}
