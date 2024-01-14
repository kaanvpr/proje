<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Gelen metni al
    $metin = $_POST["metin"];

    // Bilgi.txt dosyasına ekle
    file_put_contents("bilgi.txt", $metin . PHP_EOL, FILE_APPEND);

    // Başarı mesajını gönder
    echo "Başarıyla kaydedildi!";
} else {
    // Geçersiz istek durumu
    http_response_code(400);
    echo "Geçersiz istek!";
}
?>
