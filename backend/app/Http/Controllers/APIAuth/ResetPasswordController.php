<?php

namespace App\Http\Controllers\APIAuth;

use Illuminate\Http\Request;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Controllers\ApiController;
use App\Http\Requests\ResetPasswordRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use App\User;
use DB;

class ResetPasswordController extends ApiController
{
    public function process(ResetPasswordRequest $request) {
        
        return $this->getPasswordResetTableRow($request)->count() > 0 ? $this->changePassword($request) : 
        $this->tokenNotFoundResponse();
    }

    private function getPasswordResetTableRow($request){
        return DB::table('password_resets')
            ->where(['email' => $request->email , 'token' => $request->token]);
    }

    private function tokenNotFoundResponse(){
    	return $this->errorResponse('Token or Email is incorrect' , Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function changePassword($request){
        $user = User::whereEmail($request->email)->first();
        $user->update([
            'password' => Hash::make($request->password)
            ]);
        $this->getPasswordResetTableRow($request)->delete();
        return $this->showMessage('Password Successfully change.' , Response::HTTP_CREATED);
    }
}

