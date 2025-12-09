---
id: ch9-ai-motion-planning
title: Bölüm 9 - Hareket Planlama ve Karar Verme için Yapay Zeka
---

# Bölüm 9: Hareket Planlama ve Karar Verme için Yapay Zeka

## Öğrenme Çıktıları
Bu bölümü tamamladığınızda şunları yapabileceksiniz:
* Robotikte hareket planlamanın temel zorluklarını anlamak.
* Çeşitli yol planlama ve yörünge oluşturma algoritmalarını açıklamak.
* Yapay Zeka tekniklerinin robot karar verme ve adaptasyonunu nasıl geliştirdiğini kavramak.
* Bilinçli ve reaktif planlama yaklaşımları arasında ayrım yapmak.
* Planlamada çarpışma önleme ve optimalliğin önemini tanımak.

## Giriş
Bir robotun karmaşık, dinamik ortamlarda akıllıca hareket etmesi ve hedeflerine ulaşması için sağlam hareket planlama ve karar verme yeteneklerine ihtiyacı vardır. Bu, yalnızca başlangıç noktasından varış noktasına çarpışmasız bir yol bulmayı değil, aynı zamanda pürüzsüz, verimli yörüngeler oluşturmayı ve belirsiz durumlarda akıllı seçimler yapmayı da içerir. Bu bölüm, klasik yöntemlerden gelişmiş yapay zeka odaklı yaklaşımlara kadar hareket planlama için temel algoritmaları araştıracak ve robotların fiziksel dünyadaki hedeflerine ulaşmak için nasıl kararlar aldığını inceleyecektir.

## Temel Kavramlar

### Hareket Planlama Temelleri
*   **Konfigürasyon Uzayı (C-Uzayı):** Robotun durumunu (konum ve yönelim) daha yüksek boyutlu bir uzayda tek bir nokta olarak temsil etmek.
*   **C-Uzayında Engeller:** Çarpışma kontrolünü basitleştirmek için fiziksel engelleri C-uzayı engellerine dönüştürmek.
*   **Yol vs. Yörünge:** Bir yol durumların bir dizisiyken, bir yörünge zamanlama bilgisini içerir.

### Yol Planlama Algoritmaları
#### Örneklemeye Dayalı Planlayıcılar
*   **Hızla Keşfeden Rastgele Ağaçlar (RRT ve RRT\*):** Mümkün yolların bir ağacını artımlı olarak oluşturarak C-uzayını verimli bir şekilde keşfeden algoritmalar. RRT\*, optimal yolları hedefler.
*   **Olasılıksal Yol Haritaları (PRM):** Rastgele örneklenmiş geçerli konfigürasyonları birbirine bağlayarak uygulanabilir yolların bir yol haritasını oluşturur.

#### Arama Tabanlı Planlayıcılar
*   **A\* (A-yıldız) Algoritması:** Aramayı yönlendirmek için bir sezgisel fonksiyon kullanarak bir grafikteki en kısa yolu bulur.
*   **Dijkstra Algoritması:** Bir grafikte tek bir kaynak düğümden diğer tüm düğümlere en kısa yolları bulur.

### Yörünge Oluşturma
Bir yol bulunduktan sonra, bir yörünge oluşturma algoritması pürüzsüz ve dinamik olarak uygulanabilir bir hareket profili oluşturur.
*   **Polinom Yörüngeler:** Eklem konumlarını, hızlarını ve ivmelerini zaman içinde tanımlamak için polinom fonksiyonlarını kullanmak.
*   **Eğri İnterpolasyonu:** Bir dizi ara noktadan geçen veya yakın geçen pürüzsüz eğriler oluşturmak.
*   **Optimal Yörünge Oluşturma:** Kinematik ve dinamik kısıtlamalara uyarken zaman, enerji veya jerk gibi kriterleri en aza indirmek.

### Karar Verme için Yapay Zeka
Yapay Zeka, özellikle dinamik ve belirsiz ortamlarda robotların akıllı kararlar almasını sağlamada önemli bir rol oynar.
*   **Bilinçli Planlama:** Yürütmeden önce ayrıntılı bir plan oluşturan geleneksel Yapay Zeka planlaması (örneğin, STRIPS, PDDL).
*   **Reaktif Planlama:** Kapsamlı planlama olmadan duyusal girdiye anında yanıt verir, hızlı değişen ortamlar için uygundur.
*   **Pekiştirmeli Öğrenme (RL):** Robotlar, bir ödül sinyalini maksimize ederek, deneme yanılma yoluyla optimal politikaları öğrenirler, bu da karmaşık senaryolarda adaptif karar verme sağlar.
    *   **Değer Tabanlı Yöntemler:** Q-öğrenme, SARSA.
    *   **Politika Tabanlı Yöntemler:** REINFORCE, Actor-Critic.
*   **Davranış Ağaçları ve Durum Makineleri:** Karmaşık robot davranışlarını ve karar mantığını düzenlemek için hiyerarşik yapılar.

## Gerçek Dünya Örnekleri
*   **Otonom Sürüş:** Şerit değiştirmeler, kavşaklarda gezinme ve dinamik engellerden kaçınma için yol planlaması. Optimal rotalar için karar verme ve öngörülemeyen insan davranışına tepki verme.
*   **Robot Manipülasyonu:** Kalabalık ortamlarda nesneleri almak ve yerleştirmek için bir robot kolu için çarpışmasız hareketler planlamak.
*   **İnsansı Robot Navigasyonu:** Kalabalık alanlarda iki ayaklı hareket için küresel yol planlamasını yerel reaktif planlama ile birleştirmek.
*   **Hizmet Robotları:** Görev sıralaması, kaynak tahsisi ve insanlarla etkileşim için karar verme (örneğin, ne zaman yardım sunulacağını seçmek).
*   **Endüstriyel Otomasyon:** Montaj hatlarında robot hareket dizilerini optimize ederek döngü süresini ve enerji tüketimini en aza indirmek.

## Diyagramlar

![diagram-placeholder](../../static/img/placeholder.png)
*Şekil 9.1: Hızla Keşfeden Rastgele Ağaç (RRT) yol planlama algoritmasının bir çizimi.*

![diagram-placeholder](../../static/img/placeholder.png)
*Şekil 9.2: Bir mobil robot için basit bir davranış ağacının örneği.*

## Özet
Hareket planlama ve karar verme, Fiziksel Yapay Zeka robotlarının karmaşık görevleri otonom ve akıllıca yerine getirmesini sağlamak için çok önemlidir. Bu bölüm, RRT ve A\* gibi algoritmaları ve pürüzsüz yörüngeler oluşturma yöntemlerini keşfederek yol planlamanın temellerini ele aldı. Ayrıca, özellikle pekiştirmeli öğrenmenin, robotun dinamik ve belirsiz ortamlarda adaptif kararlar alma yeteneğini nasıl geliştirdiğini inceledik. Bu planlama ve karar verme paradigmalarına hakim olmak, gerçek dünyada etkili bir şekilde gezinebilen ve çalışabilen gerçekten akıllı ve yetenekli fiziksel ajanlar oluşturmak için esastır.
