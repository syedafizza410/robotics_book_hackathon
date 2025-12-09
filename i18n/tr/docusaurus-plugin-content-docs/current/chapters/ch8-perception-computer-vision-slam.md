---
id: ch8-perception-computer-vision-slam
title: Bölüm 8 - Robot Algılaması (Bilgisayar Görüşü, SLAM, Sensör Füzyonu)
---

# Bölüm 8: Robot Algılaması (Bilgisayar Görüşü, SLAM, Sensör Füzyonu)

## Öğrenme Çıktıları
Bu bölümü tamamladığınızda şunları yapabileceksiniz:
* Robot algılamasının prensiplerini ve Fiziksel Yapay Zekadaki önemini anlamak.
* Robotik için bilgisayar görüşündeki temel kavramları açıklamak.
* Eşzamanlı Konumlandırma ve Haritalama (SLAM) temellerini kavramak.
* Sensör füzyonu için farklı teknikleri analiz etmek.
* Sağlam robot algılamasındaki zorlukları ve çözümleri belirlemek.

## Giriş
Bir robotun çevresiyle akıllıca etkileşim kurabilmesi için öncelikle onu algılayabilmesi gerekir. Robot algılaması, dünya hakkında anlamlı bir temsil ve robotun içindeki durumunu oluşturmak için sensör verilerini toplama, işleme ve yorumlama sürecidir. Bu bölüm, robotların çevrelerini 'görmesini', 'hissetmesini' ve 'anlamasını' sağlayan temel teknolojilere derinlemesine iniyor; bilgisayar görüşü, Eşzamanlı Konumlandırma ve Haritalama (SLAM) ve Fiziksel Yapay Zeka için sağlam ve güvenilir algısal sistemler oluşturmada sensör füzyonunun kritik rolüne odaklanıyor.

## Temel Kavramlar

### Robotik için Bilgisayar Görüşü
Bilgisayar görüşü, robotların kameralardan gelen görsel bilgileri işlemesine ve yorumlamasına olanak tanır.
*   **Görüntü İşleme Temelleri:** Filtreleme, kenar algılama, özellik çıkarımı (örneğin, SIFT, SURF, ORB).
*   **Nesne Algılama ve Tanıma:** Görüntülerdeki veya video akışlarındaki nesneleri klasik yöntemler veya derin öğrenme (örneğin, CNN'ler, YOLO, Faster R-CNN) kullanarak tanımlama ve kategorize etme.
*   **Görüntü Segmentasyonu:** Bir görüntüyü bölgelere veya nesnelere ayırma.
*   **3D Görüş:** Derinlik bilgisi elde etmek için stereo görüş (iki kamera kullanarak) ve derinlik kameraları (örneğin, Uçuş Süresi, Yapılandırılmış Işık).

### Eşzamanlı Konumlandırma ve Haritalama (SLAM)
SLAM, bilinmeyen bir ortamın haritasını oluşturma veya güncelleme ve aynı anda bir ajanın içindeki konumunu takip etme hesaplama problemidir. Bu bir tavuk-yumurta problemidir: konumlandırma için iyi bir harita gerekir ve iyi bir harita oluşturmak için doğru konumlandırma gerekir.
*   **Temel Bileşenler:** Özellik çıkarımı, veri ilişkilendirme, durum tahmini (örneğin, Genişletilmiş Kalman Filtresi (EKF) SLAM, Parçacık Filtresi SLAM, Grafik tabanlı SLAM).
*   **Görsel SLAM (V-SLAM):** Birincil sensör girişi olarak kamera görüntülerini kullanır.
*   **Lidar SLAM (L-SLAM):** Haritalama ve konumlandırma için 2D veya 3D lidar taramalarını kullanır.
*   **Doğrudan vs. Dolaylı Yöntemler:** Ham piksel yoğunluklarını doğrudan işleme vs. çıkarılan özellikleri kullanma.

### Sensör Füzyonu
Sensör füzyonu, birden fazla sensörden gelen verileri birleştirerek, tek tek sensörlerle mümkün olandan daha doğru, güvenilir veya eksiksiz bir ortam anlayışı elde etme sürecidir.
*   **Füzyon Nedenleri:** Fazlalık (sağlamlık için), Tamamlayıcılık (daha zengin bir resim için), Zamanlılık, Maliyet azaltma.
*   **Yaygın Teknikler:**
    *   **Kalman Filtreleri (KF) ve Genişletilmiş Kalman Filtreleri (EKF):** Sırasıyla doğrusal ve doğrusal olmayan sistemler için optimal tahminciler.
    *   **Unscented Kalman Filtreleri (UKF):** Doğrusal olmayan durumları EKF'den daha sağlam bir şekilde ele alır.
    *   **Parçacık Filtreleri (Monte Carlo Konumlandırma - MCL):** Yüksek derecede doğrusal olmayan veya çok modlu problemler için parametrik olmayan filtreler.
    *   **Tamamlayıcı Filtreler:** Yüksek frekanslı gürültülü verileri düşük frekanslı doğru verilerle birleştirmek için basit füzyon.

## Gerçek Dünya Örnekleri
*   **Otonom Araçlar:** Güvenli navigasyon ve engellerden kaçınma için kapsamlı bir çevresel model oluşturmak için kameralar, lidar, radar ve GPS sensör füzyonu.
*   **Hizmet Robotları:** Elektrikli süpürgeler veya teslimat robotları, evleri/ofisleri haritalamak ve verimli çalışma için kendilerini konumlandırmak için SLAM (genellikle lidar veya derinlik kameraları ile) kullanır.
*   **AR/VR Uygulamaları:** Görsel SLAM, kullanıcının konumunu ve yönünü gerçek zamanlı olarak izlemek için kullanılır ve artırılmış gerçeklik deneyimlerini etkinleştirir.
*   **İnsansı Robotlar:** Çoklu kameralar, derinlik sensörleri, IMU'lar ve kuvvet sensörlerinden gelen verileri, tüm vücut algısı, nesne manipülasyonu ve sağlam hareket için birleştirmek.

## Diyagramlar

![diagram-placeholder](../../../../../static/img/placeholder.png)
*Şekil 8.1: Görsel bir SLAM sisteminin temel boru hattı.*

![diagram-placeholder](../../../../../static/img/placeholder.png)
*Şekil 8.2: Lidar ve Kamera verilerini birleştiren sensör füzyonunun örneği.*

## Özet
Robot algılaması, Fiziksel Yapay Zeka için makinelerin karmaşık ortamlarını anlamasını ve bu ortamlarda gezinmesini sağlayan duyusal bir geçittir. Bu bölüm, nesne algılamadan 3D yeniden yapılandırmaya kadar bilgisayar görüşünün temel unsurlarını araştırdı ve görsel ve lidar verilerini kullanarak Eşzamanlı Konumlandırma ve Haritalama (SLAM) sorununu tanıttı. Daha da önemlisi, dünyayı daha sağlam ve eksiksiz algılamak için heterojen sensör girdilerini birleştiren Kalman ve Parçacık filtreleri gibi sensör füzyon tekniklerini inceledik. Bu algısal teknolojilere hakim olmak, gerçekten otonom ve akıllı fiziksel sistemler geliştirmek için anahtardır.
