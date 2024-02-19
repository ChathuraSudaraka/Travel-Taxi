<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once __DIR__ . '/../vendor/autoload.php';

// load .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// decode json request
$data = json_decode(file_get_contents("php://input"));

// load data
$message = urlencode($data->message);
$mobile = $data->mobile;

// load credentials
$mask = urlencode($_ENV['RICHMO_MASK']);
$key = $_ENV['RICHMO_SMS_API_KEY'];

// setup message
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://portal.richmo.lk/api/sms/send/?dst=94783757726&from=$mask&msg=$message",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => array(
        "Authorization: Bearer $key"
    ),
));

// send message & handle response
try {
    $response = json_decode(curl_exec($curl), true);
    if (isset($response["message"])) {
        echo json_encode([
            "status" => "success",
            "message" => "Message Sent Successfully",

        ]);
        return;
    }
    echo json_encode([
        "status" => "error",
        "message" => "Error While Sending Message. ",
        "response" => $response
    ]);
} catch (Exception $th) {
    echo json_encode([
        "status" => "error",
        "message" => $th->getMessage(),
    ]);
}

curl_close($curl);
