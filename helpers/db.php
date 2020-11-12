<?
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$connection = mysqli_connect('127.0.0.1', 'root', '', 'norvic-banc');
if ($connection == false) {
    echo 'Не удалось подключиться к базе данных!<br>';
    echo mysqli_connect_error();
    exit();
} 

$makeDbTable = mysqli_query($connection, "CREATE TABLE IF NOT EXISTS`norvic-banc`.`norvic-apps`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(32) NOT NULL,
    `creditSum` INT NOT NULL,
    `creditTime` INT NOT NULL,
    `percent` INT NOT NULL,
    `paysTable` JSON NOT NULL,
    `total` INT UNSIGNED NOT NULL,
    `totalPercent` INT UNSIGNED NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB;");

?>