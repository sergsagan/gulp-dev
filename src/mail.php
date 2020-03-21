<?php

$recepient = "sergey.martynuk@gmail.com";
$sitename = "pitch";


$email = trim($_POST["email"]);
$tel = trim($_POST["tel"]);
$message = trim($_POST["message"]);
$message = "Email: $email \nTel: $tel \nСообщение: $message";

$pagetitle = "Новое сообщение с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

