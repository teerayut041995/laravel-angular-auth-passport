@component('mail::message')
# ถึงคุณ {{$data['name']}}

คลิกปุ่มด้านล่างเพื่อทำการ reset password
<?php
$url = config('app.frontent_url').'/auth/password/reset/'.$data['token'];
?>
@component('mail::button', ['url' => $url])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
