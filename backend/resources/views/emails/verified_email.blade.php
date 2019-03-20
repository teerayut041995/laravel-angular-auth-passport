@component('mail::message')
# ถึงคุณ {{$user->name}}

ขอบคุณสำหรับการสมัคสมาชิกกับเรา โปรยืนยันอีเมล์ขิงคุณโดยกดปุ่มด้านล่างนี้
Thank you for create an account. Please verify your enmail using this link:
<?php
$url = config('app.frontent_url').'/auth/confirm-email/'.$user->verification_token;
?>
@component('mail::button', ['url' => $url])
ยืนยันบัญชี
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
