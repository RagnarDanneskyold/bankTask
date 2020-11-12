<?
include_once 'db.php';

$response = [
    'done' => "Ваша заявка успешно принята" ,
    'error' => 'Ваша заявка не доставлена'
];

$text = "";

$headers = "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: test.loc <test@test.loc>\r\n";
$headers .= "Reply-To: test.loc test@test.loc\r\n";

if($_POST) {
    $userName = $_POST["fullName"];
    $userTel = $_POST["tel"];
    $userSum = $_POST["amountCredit"];
    $userTime = $_POST["timeCredit"];
    $userPerc = $_POST["percentRate"];
    $tablePaysArrJSON = $_POST['table'];
    $tablePaysArr = json_decode($_POST['table'], true);
    $totalPaysArr = json_decode($_POST['total'], true);
    $totalPays = $totalPaysArr['totalPays'];
    $totalPercent = $totalPaysArr['totalPerc'];

    $text .= "<p> Заявка от <b>$userName</b></p> \r\n";
    $text .= "<p> Телефон : <b>$userTel </b></p>\r\n";
    $text .= "<p>Сумма кредита: <b>$userSum </b></p>\r\n";
    $text .= "<p>Срок кредита: <b>$userTime </b></p>\r\n";
    $text .= "<p>Ставка кредита: <b>$userPerc </b></p>\r\n";

    for ($i = 0; $i <= count($tablePaysArr) - 1; $i++) {
        foreach ($tablePaysArr[$i] as $key => $value) {
            $text .= "<p><b>$key</b>: $value</p>";
        }
        $text .= "\r\n";
    }

    foreach ($totalPaysArr as $key => $value) {
        $text .= "<p><b>$key</b>: $value</p>";
    }
    $text .=  "\r\n";

    mail('norvic@bank.ru', 'Менеджеру', $text, $headers);

    echo $response['done'];

    $dbQuery = mysqli_query($connection, "INSERT INTO `norvic-apps` (`id`, `fullName`, `phone`, `creditSum`, `creditTime`, `percent`, `paysTable`, `total`, `totalPercent`) VALUES (NULL, '$userName', '$userTel', '$userSum', '$userTime', '$userPerc', '$tablePaysArrJSON', '$totalPays', '$totalPercent')");
} 
else {
    echo $response['error'];
}

?>