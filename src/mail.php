<?php

$recepient = "sergey.martynuk@gmail.com";
$sitename = "alecto";

$name = trim($_POST["name"]);
$tel = trim($_POST["tel"]);
$email = trim($_POST["email"]);
$message = trim($_POST["message"]);
$message = "Имя: $name \nTel: $tel \nEmail: $email \nСообщение: $message";

$pagetitle = "Новое сообщение с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
