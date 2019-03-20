<?php

namespace App\Traits;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

Trait ApiResponser {
	// private function successResponse($data , $code)
	// {
	// 	return response()->json($data , $code);
	// }
	private function successResponse($message , $data , $code)
	{
		return response()->json(["message" => $message , "data" => $data] , $code);
	}

	protected function errorResponse($message , $code)
	{
		//return response()->json(['error' => $message , 'code' => $code]);
		return response()->json(['error' => $message], $code);
	}

	// protected function showAll(Collection $collection , $code = 200)
	// {
	// 	return $this->successResponse($collection , $code);
	// }

	protected function showAll(Collection $collection , $code = 200)
	{
		return $this->successResponse($collection , $code);
	}

	protected function showOne($message , Model $instance , $code = 200)
	{
		return $this->successResponse($message , $instance , $code);
	}

	protected function showMessage($message , $code = 200)
	{
		return response()->json(["message" => $message] , $code);
	}
}