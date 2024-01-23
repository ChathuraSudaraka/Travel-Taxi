<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

$company_id = "PEARLAQ403";
$password = "qOs3EapSiH";

$mobile = $data->mobile;
$message = $data->message;

$url = "http://smsm.lankabell.com:4040/Sms.svc/SendSms?phoneNumber=$mobile&smsMessage=$message&companyId=$company_id&pword=$password";

try {
    file_get_contents($url);
    echo json_encode([
        "status" => "success",
        "message" => "Message sent successfully"
    ]);
} catch (\Throwable $th) {
    echo json_encode([
        "status" => "error",
        "message" => "Error sending message"
    ]);
}
