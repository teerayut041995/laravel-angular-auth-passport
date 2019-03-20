<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string||min:6|confirmed',
        ];
    }

    public function messages()
    {
        $messages = [
            'name.required' => 'กรุณากรอกชื่อ นามสุกล',
            'name.min' => 'ขื่อต้องมีความยาวมากกว่า 3 ตัวอักษร',
            'name.max' => 'ขื่อต้องมีความยาวน้อยกว่า 255 ตัวอักษร',
            'email.required' => 'กรุณากรอกอีเมล์',
            'email.email' => 'กรุณากรอกอีเมล์ให้ถูกต้อง',
            'email.unique' => 'มีอีเมล์นี้อยู่แล้ว',
            'email.max' => 'เมล์ต้องมีความยาวน้อยกว่า 255 ตัวอักษร',
            'password.required' => 'กรุณากรอกรหัสผ่าน',
            'password.min' => 'รหัสผ่านต้องมีความยาวอย่างน้อย :min ตัวอักษร',
            'password.confirmed' => 'รหัสผ่านไม่ตรงกัน',
        ];
        return $messages;
    }
}
