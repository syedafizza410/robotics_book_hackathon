---
id: ch7-software-and-ros
title: Bölüm 7 - Yazılım Mimarisi ve ROS
---

# Bölüm 7: Yazılım Mimarisi ve ROS

## Öğrenme Çıktıları
Bu bölümü tamamladığınızda şunları yapabileceksiniz:
* Robotik sistemler için yaygın yazılım mimarilerini anlamak.
* Robot İşletim Sistemi'nin (ROS) temel kavramlarını ve faydalarını açıklamak.
* ROS paketleri, düğümleri, konuları ve hizmetlerini oluşturmak ve yönetmek.
* Bir ROS ortamında süreçler arası iletişimi uygulamak.
* Hata ayıklama, görselleştirme ve simülasyon için ROS araçlarını kullanmak.

## Giriş
Mekanik tasarım vücudu ve elektronik sinir sistemini sağladığı gibi, yazılım mimarisi de bir Fiziksel Yapay Zeka robotunun beynini ve iletişim ağını tanımlar. İyi yapılandırılmış bir yazılım çerçevesi, karmaşıklığı yönetmek, modülerliği sağlamak ve farklı robotik işlevler arasında işbirliğini kolaylaştırmak için çok önemlidir. Bu bölüm, robotikte yaygın yazılım mimari modellerini tanıtacak ve sofistike robotik uygulamalar oluşturmak için araçlar, kütüphaneler ve kurallar sağlayan yaygın olarak benimsenen açık kaynak bir çerçeve olan Robot İşletim Sistemi'ne (ROS) özel bir odaklanma ile derinlemesine inceleyecektir.

## Temel Kavramlar

### Robotik Yazılım Mimarileri
*   **Katmanlı Mimari:** Algılama, kontrol ve planlama katmanlarına sahip hiyerarşik yapı, otonom sistemlerde yaygındır.
*   **Davranış Tabanlı Mimari:** Karmaşık davranışları daha basit, eşzamanlı modüllere ayrıştırır, reaktif sistemler için uygundur.
*   **Hibrit Mimari:** Katmanlı ve davranış tabanlı yaklaşımların unsurlarını birleştirir, hem reaktif hem de düşünsel yetenekler sunar.
*   **Bileşen Tabanlı Mimari:** Bağımsız, değiştirilebilir yazılım bileşenlerinden sistemler oluşturarak modülerliği ve yeniden kullanılabilirliği teşvik eder.

### ROS'a Giriş (Robot İşletim Sistemi)
ROS, robot yazılımı yazmak için esnek bir çerçevedir. Çok çeşitli robotik platformlarda karmaşık ve sağlam robot davranışları oluşturma görevini basitleştirmeyi amaçlayan bir araç, kütüphane ve kural koleksiyonudur.

#### ROS Kavramları
*   **Düğümler (Nodes):** Hesaplama yapan yürütülebilir süreçler (örneğin, bir sensör sürücüsü düğümü, bir motor kontrol düğümü).
*   **Konular (Topics):** Düğümlerin mesaj alışverişinde bulunduğu adlandırılmış veri yolları (örneğin, robot hız komutları için /cmd_vel, odometri verileri için /odom).
*   **Mesajlar (Messages):** Konular üzerinden bilgi göndermek için kullanılan veri yapıları.
*   **Hizmetler (Services):** Düğümler arasında senkronize çağrılar için istek/yanıt iletişim mekanizması (örneğin, bir robotun belirli bir eylemi gerçekleştirmesini istemek).
*   **Parametreler (Parameters):** ROS Parametre Sunucusunda depolanan ve tüm düğümler tarafından erişilebilen dinamik yapılandırma değerleri.
*   **ROS Ana:** Düğümler arasındaki iletişimi kolaylaştıran merkezi bileşen.

### ROS Geliştirme
*   **Çalışma Alanı ve Paketler:** Robot yazılımını bir ROS çalışma alanı içinde bağımsız birimler (paketler) halinde düzenlemek.
*   **C++ ve Python API'leri:** `roscpp` veya `rospy` kütüphanelerini kullanarak ROS düğümleri geliştirmek.
*   **Catkin Derleme Sistemi:** ROS paketleri için standart derleme sistemi.

### ROS Araçları
*   **Rviz:** Sensör verilerini, robot modellerini ve planlama sonuçlarını görüntülemek için bir 3D görselleştirme aracı.
*   **Gazebo:** Sanal ortamlarda test ve geliştirmeye izin veren güçlü bir 3D robot simülatörü.
*   **rosbag:** ROS mesaj verilerini kaydetmek ve oynatmak için bir araç, hata ayıklama ve veri analizi için çok değerlidir.
*   **rqt_graph:** ROS hesaplama grafiğini (düğümler ve konular) görselleştirir.

## Gerçek Dünya Örnekleri
*   **Otonom Mobil Robotlar:** ROS, SLAM (Eşzamanlı Konumlandırma ve Haritalama), yol planlama ve engelden kaçınma dahil olmak üzere navigasyon yığınları için yoğun olarak kullanılır.
*   **Robotik Manipülatörler:** Çeşitli robot kollarını kontrol etmek için ROS paketleri mevcuttur, MoveIt! gibi hareket planlama kütüphaneleriyle entegre olur.
*   **İnsansı Robot Kontrolü:** ROS, karmaşık sensör verilerini (örneğin, kameralardan, IMU'lardan) yönetmek, eklem hareketlerini koordine etmek ve yüksek seviyeli davranışları uygulamak için sağlam bir çerçeve sağlar.
*   **Araştırma ve Geliştirme:** ROS, araştırmacılar ve geliştiricilerin robotik projelerde kod paylaşımı ve işbirliği yapması için ortak bir platform olarak hizmet eder.

## Diyagramlar

![diagram-placeholder](../../static/img/placeholder.png)
*Şekil 7.1: Düğümleri ve konuları gösteren basitleştirilmiş bir ROS hesaplama grafiği.*

![diagram-placeholder](../../static/img/placeholder.png)
*Şekil 7.2: Katmanlı bir robot yazılım mimarisinin üst düzey genel görünümü.*

## Özet
Yazılım mimarisi akıllı robotik sistemlerin omurgasıdır ve ROS, bunun uygulanması için güçlü, standartlaştırılmış bir çerçeve sağlar. Bu bölüm, ortak mimari modelleri tanıttı ve düğümler, konular, mesajlar ve hizmetler dahil olmak üzere ROS'un temel kavramlarını derinlemesine inceledi. Paketler ve API'leri kullanarak ROS ekosisteminde nasıl geliştirme yapılacağını araştırdık ve görselleştirme, simülasyon ve hata ayıklama için temel araçları vurguladık. ROS'a güçlü bir şekilde hakim olmak, karmaşık Fiziksel Yapay Zeka uygulamaları geliştiren herkes için paha biçilmez bir varlıktır, modüler, ölçeklenebilir ve işbirlikçi robot yazılım geliştirmeyi mümkün kılar.
