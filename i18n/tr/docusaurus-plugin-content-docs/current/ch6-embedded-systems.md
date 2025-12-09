---
id: ch6-embedded-systems
title: Bölüm 6 - Gömülü Sistemler ve Elektronik
---

# Bölüm 6: Gömülü Sistemler ve Elektronik

## Öğrenme Çıktıları
Bu bölümü tamamladığınızda şunları yapabileceksiniz:
* Gömülü sistemlerin robotik ve Fiziksel Yapay Zekadaki rolünü anlamak.
* Robotikte kullanılan yaygın mikrodenetleyicileri ve tek kart bilgisayarları tanımlamak.
* Temel elektronik bileşenleri ve devre tasarım prensiplerini açıklamak.
* Robotik sistemler için farklı iletişim protokollerini analiz etmek.
* Güç yönetimi ve motor sürücüsü hususlarını kavramak.

## Giriş
Gömülü sistemler ve elektronik, herhangi bir Fiziksel Yapay Zeka robotunun sinir sistemidir ve mekanik ve kontrol tasarımlarını hayata geçirmek için hesaplama gücü ve bağlantı sağlar. Sensör verilerini işlemek ve kontrol algoritmalarını yürütmekten gücü yönetmeye ve aktüatörlerle iletişim kurmaya kadar, bir robotun zekası ve işlevselliği temelindeki elektronik aksamıyla yakından ilişkilidir. Bu bölüm, sağlam ve verimli robotik sistemler oluşturmak için kritik olan gömülü donanım, mikrodenetleyiciler, iletişim arayüzleri ve güç yönetiminin temel yönlerini keşfedecektir.

## Temel Kavramlar

### Robotikte Gömülü Sistemler
Gömülü sistem, genellikle gerçek zamanlı hesaplama kısıtlamaları olan, daha büyük bir mekanik veya elektriksel sistem içinde özel bir fonksiyona sahip bir bilgisayar sistemidir. Robotikte, gömülü sistemler şunlardan sorumludur:
* Sensör veri toplama ve işleme.
* Aktüatör kontrolü ve motor sürme.
* Kontrol algoritmalarını uygulama.
* Diğer robot bileşenleri veya harici sistemlerle iletişim.
* Güç yönetimi ve güvenlik izleme.

### Mikrodenetleyiciler (MCU'lar) ve Tek Kart Bilgisayarlar (SBC'ler)
*   **Mikrodenetleyiciler (örneğin, Arduino, ESP32):** Belirli kontrol fonksiyonlarını yerine getirmek için tasarlanmış düşük maliyetli, düşük güç tüketimli entegre devrelerdir. Gerçek zamanlı, daha az hesaplama yoğunluğu gerektiren görevler için idealdir.
*   **Tek Kart Bilgisayarlar (örneğin, Raspberry Pi, NVIDIA Jetson):** Tek bir devre kartı üzerinde daha güçlü bilgisayarlar olup, tam işletim sistemlerini çalıştırabilir ve bilgisayar görüşü, yapay zeka çıkarımı ve üst düzey karar verme gibi karmaşık görevleri yerine getirebilirler.
*   **FPGA'lar/ASIC'ler:** Yüksek ölçüde uzmanlaşmış, yüksek performanslı veya düşük güç tüketimli özel donanım hızlandırması için Alan Programlanabilir Kapı Dizileri ve Uygulamaya Özel Entegre Devreler.

### Temel Elektronik ve Devre Tasarımı
*   **Bileşenler:** Dirençler, kapasitörler, indüktörler, diyotlar, transistörler (motor kontrolü için MOSFET'ler).
*   **Devre Temelleri:** Ohm Kanunu, Kirchhoff Kanunları, seri ve paralel devreler.
*   **PCB Tasarımı:** Bileşenleri entegre etmek için Baskılı Devre Kartı tasarımına giriş.

### İletişim Protokolleri
Robotlar, dahili ve harici iletişim için çeşitli protokollere güvenir.
*   **Seri İletişim:** UART, SPI, I2C (sensörler ve çevre birimleri için).
*   **Veri Yolu Protokolleri:** Otomotiv ve endüstriyel uygulamalar için CAN veri yolu (Denetleyici Alan Ağı), özellikle ECU'lar arasında.
*   **Ağ Protokolleri:** Ethernet, Wi-Fi (üst düzey iletişim, veri akışı ve harici kontrol için).
*   **ROS (Robot İşletim Sistemi) İletişimi:** Dağıtılmış robotik sistemler için mesajlaşma altyapısı.

### Güç Yönetimi ve Motor Sürücüleri
*   **Piller:** Türleri (LiPo, Li-Ion), kapasite, deşarj oranları, güvenlik.
*   **Voltaj Regülatörleri:** Farklı bileşenlere güç sağlamak için voltajları düşürme veya yükseltme.
*   **Motor Sürücüleri (H-köprüleri):** Bir mikrodenetleyicinin DC motorların yönünü ve hızını kontrol etmesine izin veren elektronik devreler, genellikle PWM (Darbe Genişlik Modülasyonu) ile.
*   **Güç Dağıtımı:** Robot boyunca verimli ve güvenli güç yönlendirmesi.

## Gerçek Dünya Örnekleri
*   **Dört Pervaneli Dronlar:** Gerçek zamanlı uçuş kontrolü, IMU verilerini işleme ve ESC'ler (Elektronik Hız Kontrolörleri) aracılığıyla fırçasız motorları sürmek için yüksek performanslı mikrodenetleyiciler (örneğin, STM32) kullanır.
*   **Otonom Mobil Robotlar (AMR'ler):** Genellikle navigasyon, haritalama ve üst düzey karar verme için SBC'ler (örneğin, Raspberry Pi veya Jetson) kullanırken, MCU'lar motor kontrolünü ve daha düşük seviyeli sensör arayüzlerini yönetir.
*   **Robotik Protezler:** Özel PCB'ler ve MCU'lar içeren gömülü sistemler, sinir sinyallerini yorumlar, küçük motorları sürer ve dokunsal geri bildirim sağlar.
*   **İnsansı Robotlar:** Daha güçlü SBC'ler veya mini-ITX kartlar (görüş, planlama ve üst düzey Yapay Zeka için) ile iletişim kuran dağıtılmış bir MCU ağı (bireysel eklemler/sensörler için).

## Diyagramlar

![diagram-placeholder](../../static/img/placeholder.png)
*Şekil 6.1: Bir robottaki gömülü sistemin kavramsal blok diyagramı.*

![diagram-placeholder](../../static/img/placeholder.png)
*Şekil 6.2: DC motor kontrolü için temel H-köprü devresi.*

## Özet
Gömülü sistemler ve elektronik, robotların akıllıca çalışmasını ve fiziksel olarak etkileşim kurmasını sağlayan görünmez kahramanlardır. Bu bölüm, mikrodenetleyicilerin ve tek kart bilgisayarların kritik rolünü, temel devre tasarım prensiplerini ve temel iletişim protokollerini ele aldı. Ayrıca, verimli ve güvenilir robotik sistemler oluşturmak için önemini vurgulayarak güç yönetimi tekniklerini ve motor sürücüsü hususlarını keşfettik. Bu elektronik temellerin derinlemesine anlaşılması, gelişmiş Fiziksel Yapay Zeka uygulamaları geliştirmek isteyen herkes için çok önemlidir.
