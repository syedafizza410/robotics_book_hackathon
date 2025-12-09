---
id: ch5-control-systems
title: Bölüm 5 - Kontrol Sistemleri (PID + Gelişmiş Kontrol)
---

# Bölüm 5: Kontrol Sistemleri (PID + Gelişmiş Kontrol)

## Öğrenme Çıktıları
Bu bölümü tamamladığınızda şunları yapabileceksiniz:
* Geri beslemeli kontrol sistemlerinin temel kavramlarını açıklamak.
* Oransal-İntegral-Türev (PID) kontrolörlerinin prensiplerini ve ayarını anlamak.
* Çeşitli gelişmiş kontrol stratejileri arasında ayrım yapmak.
* İstenen robot davranışlarını elde etmek için kontrol teorisini uygulamak.
* Robotik kontrol sistemlerinin kararlılığını ve performansını analiz etmek.

## Giriş
Kontrol sistemleri, bir robotun beynidir ve yüksek seviyeli komutları hassas fiziksel eylemlere dönüştürür ve rahatsızlıklara rağmen istenen durumları korur. Bir robotun görevleri doğru, güvenli ve verimli bir şekilde yerine getirmesi için vazgeçilmezdirler. Bu bölüm, geri beslemeli kontrolün temel kavramlarını tanıtacak, yaygın olarak kullanılan Oransal-İntegral-Türev (PID) kontrolörüne odaklanacak ve ardından insansı hareket ve ustaca manipülasyon gibi karmaşık Fiziksel Yapay Zeka uygulamaları için kritik olan daha gelişmiş kontrol stratejilerine genişleyecektir.

## Temel Kavramlar

### Kontrol Sistemlerinin Temelleri
*   **Açık Döngü vs. Kapalı Döngü (Geri Beslemeli) Kontrol:** Geri besleme olmadan çalışan sistemler ile çıktılarını ayarlamak için sensör verilerini kullanan sistemler arasındaki farkı anlamak.
*   **Geri Besleme Döngüsü Bileşenleri:** Kontrolör, tesis (robot), sensörler, hata hesaplaması.
*   **Sistem Kararlılığı:** Kontrol sisteminin kontrol dışı salınım yapmamasını veya sapmamasını sağlamak.
*   **Performans Metrikleri:** Yükselme süresi, aşma, yerleşme süresi, kararlı durum hatası.

### PID Kontrolü
Oransal-İntegral-Türev (PID) kontrolörü, basitliği ve etkinliği nedeniyle endüstriyel ve robotik uygulamalarda en yaygın geri beslemeli kontrolörüdür.
*   **Oransal (P) Terimi:** Mevcut hataya yanıt verir, anında düzeltici eylem sağlar. Daha büyük bir P-kazancı daha güçlü bir yanıt anlamına gelir.
*   **İntegral (I) Terimi:** Geçmiş hataları biriktirir, zamanla kararlı durum hatalarını ortadan kaldırmaya yardımcı olur.
*   **Türev (D) Terimi:** Mevcut hatanın değişim hızına göre gelecekteki hataları tahmin eder, aşmayı ve salınımları azaltmak için sönümleme ekler.
*   **PID Ayarı:** Optimal P, I ve D kazançlarını bulmak için Ziegler-Nichols, manuel ayar ve otomatik ayar algoritmaları gibi yöntemler.

### Gelişmiş Kontrol Stratejileri
Daha karmaşık robotik sistemler ve görevler için genellikle gelişmiş kontrol teknikleri gereklidir.
*   **Durum Uzayı Kontrolü:** Sistemleri durum değişkenleri kullanarak modelleyen, çok girişli, çok çıkışlı (MIMO) kontrol sağlayan modern bir kontrol yaklaşımıdır.
*   **Optimal Kontrol:** Sistem kısıtlamalarını karşılarken belirli bir performans indeksini (örneğin, minimum enerji, minimum zaman) optimize eden bir kontrol politikası bulmayı amaçlar.
*   **Adaptif Kontrol:** Robot veya ortamdaki değişikliklere yanıt olarak parametrelerini otomatik olarak ayarlayabilen kontrolörler.
*   **Sağlam Kontrol:** Robot modelindeki veya dış rahatsızlıklardaki önemli belirsizliklere rağmen performansı ve kararlılığı korumak için tasarlanmıştır.
*   **Model Tahminsel Kontrol (MPC):** Sistemdeki dinamik bir modeli kullanarak gelecekteki davranışı tahmin eder ve sonlu bir zaman ufkunda kontrol eylemlerini optimize eder.
*   **Kontrol İçin Pekiştirmeli Öğrenme:** Yapay Zeka ajanları, ortamla etkileşim kurarak ve ödüller alarak deneme yanılma yoluyla optimal kontrol politikalarını öğrenir.

## Gerçek Dünya Örnekleri
*   **Robot Kol Konum Kontrolü:** Robot eklemlerini ve uç-efektörlerini doğru bir şekilde konumlandırmak için PID kontrolörleri yaygın olarak kullanılır.
*   **Drone Uçuş Kontrolü:** Gelişmiş kontrol algoritmaları dronları stabilize eder ve hassas manevraları etkinleştirir, genellikle IMU verilerini entegre eder.
*   **İnsansı Robot Dengesi:** İki ayaklı robotlar için dinamik dengeyi korumak ve kararlı yürüme hareketleri üretmek için Model Tahminsel Kontrol (MPC) sıkça kullanılır.
*   **Ekzoskeletonlar:** İnsan hareketlerine uyum sağlayan ve rehabilitasyon veya güçlendirme için yardımcı kuvvet sağlayan kontrol sistemleri.
*   **Endüstriyel Proses Otomasyonu:** PID kontrolörleri üretim süreçlerinde sıcaklık, basınç, akış hızları ve diğer değişkenleri düzenler.

## Diyagramlar

![diagram-placeholder](../../static/img/placeholder.png)
*Şekil 5.1: Genel bir geri beslemeli kontrol sisteminin blok diyagramı.*

![diagram-placeholder](../../static/img/placeholder.png)
*Şekil 5.2: Bir PID kontrolöründe P, I ve D kazançlarının etkilerini gösteren yanıt eğrileri.*

## Özet
Kontrol sistemleri, robotların kontrollü ve hassas hareketler yapmasını sağlamak için vazgeçilmezdir. Bu bölüm, geri beslemeli kontrolün temelleriyle başladı, yaygın olarak kullanılan PID kontrolörünün yapısını ve işleyişini, ayar yöntemleriyle birlikte detaylandırdı. Daha sonra durum uzayı, optimal, adaptif, sağlam ve model tahminsel kontrol dahil olmak üzere gelişmiş kontrol stratejilerine değindik ve modern Fiziksel Yapay Zeka zorluklarının karmaşıklıklarını ele almak için bunların gerekliliğini vurguladık. Bu kontrol tekniklerini iyi anlamak, fiziksel dünyayla güvenilir ve akıllıca etkileşim kurabilen robotlar geliştirmek için çok önemlidir.
