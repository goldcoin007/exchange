<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TTS</title>
    <style>
        *{
            font-size: 30px;
            font-family: 微软雅黑;
        }
        .container{
            width: 500px;
            margin: 0 auto;
        }

    </style>
</head>
<body>
<div class="container">Dear user, your SMS verification code is <span style="color: orangered">{{ $code }}</span>，valid within 3 minutes, please ignore if it is not operated by yourself.</div>
</body>
</html>
