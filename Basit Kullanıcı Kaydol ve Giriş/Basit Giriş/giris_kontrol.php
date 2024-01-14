<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Kullanıcı adı ve şifre formdan alınıyor
    $username = htmlspecialchars($_POST["username"]);
    $password = htmlspecialchars($_POST["password"]);

    // Kullanıcı bilgilerini kontrol etme (örnek olarak dosya üzerinden kontrol)
    $dosya = fopen("kullanicilar.txt", "r");
    $dogrulandi = false;

    while (!feof($dosya)) {
        $satir = fgets($dosya);
        $kullanici = explode("|", $satir);

        if ($kullanici[0] == $username && rtrim($kullanici[1]) == $password) {
            $dogrulandi = true;
            break;
        }
    }

    fclose($dosya);

    if ($dogrulandi) {
        // Giriş başarılı ise index2.html sayfasına yönlendir
        header("Location: index2.html");
        exit();
    } else {
        echo "<p style='color: #dc3545; text-align: center; font-size: 18px; font-weight: bold;'>Hata! Kullanıcı adı veya şifre yanlış.</p>";
    }
}
?>
