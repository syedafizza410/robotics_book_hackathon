---
id: ch2-robotics-fundamentals
title: Bölüm 2 - Robotik Temelleri (Kinematik ve Dinamik)
---

# Bölüm 2: Robotik Temelleri (Kinematik ve Dinamik)

## Öğrenme Çıktıları
Bu bölümü tamamladığınızda şunları yapabileceksiniz:
* İleri ve ters kinematiği ayırt etmek.
* Robot dinamikleri ve hareket prensiplerini anlamak.
* Çeşitli koordinat dönüşüm tekniklerini uygulamak.
* Robotik sistemler üzerinde etki eden kuvvetleri ve torkları analiz etmek.

## Giriş
Robotik, Fiziksel Yapay Zekanın kalbinde yer alan, robotların tasarımı, inşası, işletimi ve uygulamasını konu alan çok disiplinli bir alandır. Robotların nasıl hareket ettiğini ve çevreleriyle nasıl etkileşim kurduğunu anlamak için kinematik ve dinamik kavramlara sağlam bir şekilde hakim olmak esastır. Kinematik, harekete neden olan kuvvetleri dikkate almadan robotların hareketini tanımlarken, dinamik kuvvetler ve hareket arasındaki ilişkiyi inceler. Bu bölüm, robotik sistemleri analiz etmek ve kontrol etmek için gerekli matematiksel araçları sağlayarak bu temel kavramları tanıtacaktır.

## Temel Kavramlar

### Kinematik
Kinematik, cisimlerin kütlelerini veya harekete neden olabilecek kuvvetleri dikkate almadan noktaların, cisimlerin ve cisim sistemlerinin hareketini inceleyen bilim dalıdır. Robotikte, kinematik bir robotun eklemlerinin ve bağlantılarının uzayda nasıl hareket ettiğini anlamak için kritik öneme sahiptir.

#### İleri Kinematik
İleri kinematik, bir robotun eklemlerinin açıları veya yer değiştirmeleri verildiğinde, robotun uç-efektörünün konumunu ve yönünü hesaplamayı içerir. Bu genellikle robot manipülatörleri için dönüşüm matrisleri veya Denavit-Hartenberg (DH) parametreleri kullanılarak yapılır.

#### Ters Kinematik
Ters kinematik, uç-efektörün istenen bir konum ve yönünü elde etmek için gerekli eklem parametrelerini (açılar veya yer değiştirmeler) belirleme sorunudur. Bu genellikle doğrusal olmayan denklemlerin çözümünü içerir ve birden fazla çözüme veya hiç çözüme sahip olmayabilir.

### Dinamik
Robot dinamikleri, bir robot üzerinde etki eden kuvvetler ve torklar ile ortaya çıkan hareket arasındaki ilişkiyle ilgilenir. Kütle, eylemsizlik ve dış kuvvetleri dikkate alarak robotun çalışması için gereken enerji ve güç gereksinimleri hakkında bilgi sağlar.

#### Newton-Euler Formülasyonu
Newton-Euler formülasyonu, bir robotun hareket denklemlerini türetmek için yinelemeli bir yöntemdir. Her bir bağlantı üzerinde etki eden kuvvetleri ve momentleri, tabandan dışarıya doğru başlayarak hesaplamayı ve daha sonra bu değerleri içeriye doğru yaymayı içerir.

#### Lagrangian Formülasyonu
Lagrangian formülasyonu, enerji prensiplerine dayalı alternatif bir yaklaşım sunar. Hareket denklemlerini robotun kinetik ve potansiyel enerjisinden türetir, bu da genellikle daha kompakt bir temsil ile sonuçlanır.

### Koordinat Dönüşümleri
Robotik, çeşitli koordinat sistemlerine (dünya, taban, eklem, uç-efektör) büyük ölçüde dayanır. Dönüşüm matrisleri, öteleme vektörleri ve homojen dönüşüm matrisleri kullanarak bu sistemler arasında dönüşüm yapmayı anlamak temeldir.

## Gerçek Dünya Örnekleri
*   **Üretimde Robot Kolları:** İleri ve ters kinematik kullanarak kaynak meşalelerini veya kıskaçları hassas bir şekilde konumlandırmak.
*   **İnsansı Robot Yürüyüşü:** Düşmeleri önlemek için karmaşık dinamik modeller gerektiren dinamik denge ve yürüyüş üretimi.
*   **Cerrahi Robotlar:** Ameliyat bölgelerinin doğru bir şekilde hedeflenmesini sağlayan kinematik ile yüksek hassasiyetle aletleri manipüle etmek.
*   **Uzay Robotik:** Uzay istasyonlarında robot kolları veya gezegen yüzeylerinde geziciler işletmek, burada dinamikler mikrogravite veya değişen yerçekimi kuvvetlerini hesaba katar.

## Diyagramlar

![diagram-placeholder](../../static/img/chapter2diagram1.jpg)
*Şekil 2.1: İleri kinematiği gösteren 2-DOF robot kolunun bir illüstrasyonu.*

![diagram-placeholder](../../static/img/placeholder.png)
*Şekil 2.2: Dinamik analiz için bir robot bağlantısının serbest cisim diyagramı.*

## Özet
Bölüm 2, kinematik ve dinamik merceğiyle robotik hakkında temel bir anlayış sağladı. İleri ve ters kinematik arasındaki farkı, Newton-Euler ve Lagrangian formülasyonları gibi dinamik analiz yöntemlerini ve koordinat dönüşümlerinin önemini inceledik. Bu prensipler, herhangi bir robotik sistemin hareketini tasarlamak, kontrol etmek ve analiz etmek için vazgeçilmezdir ve daha gelişmiş Fiziksel Yapay Zeka kavramlarının temelini oluşturur.
