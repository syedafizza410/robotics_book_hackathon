---
id: ch3-actuators-and-sensors
title: Bölüm 3 - Aktüatörler ve Sensörler
---

# Bölüm 3: Aktüatörler ve Sensörler

## Öğrenme Çıktıları
Bu bölümü tamamladığınızda şunları yapabileceksiniz:
* Farklı aktüatör türlerini ve robotikteki uygulamalarını tanımlamak.
* Ortak robotik sensörlerin çalışma prensiplerini anlamak.
* Belirli robotik görevler için uygun aktüatörleri ve sensörleri seçmek.
* Çeşitli robotik dönüştürücülerin özelliklerini ve sınırlamalarını analiz etmek.

## Giriş
Aktüatörler ve sensörler, sırasıyla bir robotun kasları ve duyularıdır. Aktüatörler, enerjiyi mekanik kuvvete dönüştürerek robotların fiziksel dünyayla hareket etmesini ve etkileşim kurmasını sağlarken, sensörler fiziksel olayları ölçülebilir elektrik sinyallerine dönüştürerek robotların çevrelerini algılamasına olanak tanır. Bu bölüm, bu temel robotik bileşenlerin farklı dünyasına inecek, çalışma prensiplerini, özelliklerini ve Fiziksel Yapay Zeka sistemlerinde seçimi ve entegrasyonu için pratik hususları açıklayacaktır.

## Temel Kavramlar

### Aktüatörler
Aktüatörler, bir kontrol sinyalini (genellikle elektriksel) mekanik harekete dönüştüren cihazlardır. Bir robotun fiziksel görevleri yerine getirme yeteneğinden sorumludurlar.

#### Elektrik Motorları
*   **DC Motorlar:** Basit, sağlam ve sürekli dönüş için yaygın olarak kullanılır. Fırçalı ve fırçasız (BLDC) varyantları.
*   **Step Motorlar:** Geri bildirim olmaksızın hassas açısal konumlandırma sağlar, açık döngü kontrolü için idealdir.
*   **Servo Motorlar:** Hassas konum kontrolü için bir dişli kutusu ve geri bildirim kontrol döngüsü ile birleştirilmiş DC motorlar.

#### Hidrolik ve Pnömatik Aktüatörler
*   **Hidrolik:** Yüksek kuvvetler üretmek için sıkıştırılamayan sıvı kullanır, ağır hizmet uygulamalarında yaygındır.
*   **Pnömatik:** Sıkıştırılmış hava kullanır, tipik olarak basit AÇIK/KAPALI hareketler için, hidroliklerden daha hızlı ve temizdir ancak daha düşük kuvvet sağlar.

#### Diğer Aktüatörler
*   **Piezoelektrik Aktüatörler:** Yüksek kuvvetle küçük, hassas hareketler üretir, genellikle mikro-robotikte kullanılır.
*   **Şekil Hafızalı Alaşımlar (SMA'lar):** Isıtıldığında şekil değiştiren malzemeler, kompakt, hafif aktüasyon sunar.

### Sensörler
Sensörler, ortamlarındaki olayları veya değişiklikleri algılayan ve bilgiyi robotun kontrol sistemine gönderen cihazlardır.

#### Propriyoseptif Sensörler
Bu sensörler, robotun iç durumu hakkında bilgi sağlar.
*   **Kodlayıcılar:** Açısal konum veya hızı (döner) ve doğrusal konumu (doğrusal) ölçer.
*   **Potansiyometreler:** Doğrusal veya açısal yer değiştirmeyi ölçer.
*   **Kuvvet/Tork Sensörleri:** Eklemlere veya uç-efektörlere uygulanan kuvvetleri ve torkları ölçer.
*   **IMU'lar (Atalet Ölçüm Birimleri):** Yönlendirme ve ivmeyi ölçmek için ivmeölçerler, jiroskoplar ve manyetometreleri birleştirir.

#### Eksteroseptif Sensörler
Bu sensörler, robotun dış ortamı hakkında bilgi sağlar.
*   **Menzil Sensörleri:**
    *   **Lidar:** Mesafeleri ölçmek ve 3D haritalar oluşturmak için lazer darbeleri kullanır.
    *   **Sonar:** Nesneleri algılamak ve mesafeleri ölçmek için ses dalgaları kullanır.
    *   **Kızılötesi (IR) Sensörler:** Nesnelerin varlığını/yokluğunu algılar ve kısa mesafeleri ölçer.
*   **Görüş Sensörleri:**
    *   **Kameralar (2D/3D):** Nesne tanıma, navigasyon ve haritalama için görsel bilgi yakalar. Stereo kameralar ve derinlik kameraları (örneğin, yapılandırılmış ışık, uçuş süresi) 3D veri sağlar.
*   **Temas Sensörleri:**
    *   **Dokunsal Sensörler:** Fiziksel teması ve basıncı algılar.
    *   **Çarpma Sensörleri:** Çarpışmaları algılamak için basit anahtarlar.

## Gerçek Dünya Örnekleri
*   **İnsansı Robot Eklemleri:** Hassas ve güçlü hareketler için genellikle kodlayıcılarla birleştirilmiş yüksek torklu servo motorlar kullanır.
*   **Otonom Sürüş:** Yolu, engelleri ve diğer araçları algılamak için Lidar ve kameralar kritik öneme sahiptir.
*   **Robotik Tutucular:** Nesneleri onlara zarar vermeden uygun kuvvetle kavramak için kuvvet/tork sensörleri ve dokunsal sensörleri entegre eder.
*   **Endüstriyel Robotlar:** Güvenlik (örneğin, yakınlık sensörleri) ve hassasiyet (örneğin, parça denetimi için görüş sistemleri) için çeşitli sensörler kullanır.

## Diyagramlar

![diagram-placeholder](../../../../../static/img/placeholder.png)
*Şekil 3.1: Farklı aktüatör türlerine ve çalışma prensiplerine genel bakış.*

![diagram-placeholder](../../../../../static/img/placeholder.png)
*Şekil 3.2: Robotik sensörlerin işlevlerine göre sınıflandırılması.*

## Özet
Aktüatörler ve sensörler, robotun zekası ile fiziksel dünyayla etkileşimi arasında köprü görevi gören herhangi bir fiziksel Yapay Zeka sisteminin işleyişi için temeldir. Bu bölüm, elektrik motorları, hidrolik ve pnömatik dahil olmak üzere çeşitli aktüatör türlerini keşfetti ve bunların benzersiz güçlü yönlerini ve uygulamalarını vurguladı. Ayrıca, kodlayıcılar, IMU'lar, lidar, kameralar ve kuvvet sensörleri gibi propriyoseptif (iç durum) ve eksteroseptif (dış ortam) türlere ayırarak sensörler alanına daldık. Bu bileşenlerin akıllıca seçimi ve entegrasyonu, etkili ve yetenekli robotik sistemler oluşturmak için çok önemlidir.
