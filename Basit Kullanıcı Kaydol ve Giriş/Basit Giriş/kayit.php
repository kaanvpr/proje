<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Kullanıcı adı ve şifre formdan alınıyor
    $username = htmlspecialchars($_POST["username"]);
    $password = htmlspecialchars($_POST["password"]);

    // Verileri dosyaya ekleme
    $dosya = fopen("kullanicilar.txt", "a");
    fwrite($dosya, "$username|$password\n");
    fclose($dosya);

    // Kayıt başarılı ise giris.php sayfasına yönlendir
    header("Location: giris.php");
    exit();
}
?>
