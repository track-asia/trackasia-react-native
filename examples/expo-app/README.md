# Hướng Dẫn Tích Hợp TrackAsia vào Dự Án Flutter

## Giới Thiệu

TrackAsia là một thư viện bản đồ mạnh mẽ cho ứng dụng Flutter, cung cấp bản đồ chất lượng cao, theo dõi vị trí và nhiều tính năng bản đồ khác. Hướng dẫn này sẽ giúp bạn tích hợp TrackAsia vào dự án Flutter của mình.

## Mục Lục

1. [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
2. [Cài Đặt](#cài-đặt)
3. [Triển Khai Cơ Bản](#triển-khai-cơ-bản)
4. [Tính Năng Nâng Cao](#tính-năng-nâng-cao)
5. [Cấu Hình Theo Nền Tảng](#cấu-hình-theo-nền-tảng)
6. [Xử Lý Sự Cố](#xử-lý-sự-cố)
7. [Tài Nguyên](#tài-nguyên)

## Yêu Cầu Hệ Thống

Trước khi tích hợp TrackAsia vào dự án Flutter, hãy đảm bảo bạn có:

- Flutter SDK đã cài đặt (phiên bản 2.18.6 trở lên)
- Một dự án Flutter đang hoạt động
- Hiểu biết cơ bản về phát triển Flutter

## Cài Đặt

### Bước 1: Thêm Dependencies

Thêm các dependencies sau vào file `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # TrackAsia dependencies
  trackasia_gl: ^2.0.1
  trackasia_gl_platform_interface: ^1.0.5
  trackasia_gl_web: ^1.0.1
```

### Bước 2: Cài Đặt Dependencies

Chạy lệnh sau để cài đặt các dependencies:

```bash
flutter pub get
```

## Triển Khai Cơ Bản

### Bước 1: Import Package TrackAsia

Thêm dòng import sau vào file Dart của bạn:

```dart
import 'package:trackasia_gl/trackasia_gl.dart';
```

### Bước 2: Tạo Map Controller

Định nghĩa biến controller để quản lý bản đồ:

```dart
TrackasiaMapController? mapController;
```

### Bước 3: Triển Khai Widget Bản Đồ

Thêm widget TrackasiaMap vào phương thức build:

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    body: TrackasiaMap(
      onMapCreated: _onMapCreated,
      styleString: "https://tiles.track-asia.com/tiles/v3/style-streets.json?key=public",
      initialCameraPosition: const CameraPosition(target: LatLng(16.25658, 106.31679), zoom: 4.8),
      onStyleLoadedCallback: _onStyleLoadedCallback,
    ),
  );
}
```

### Bước 4: Triển Khai Các Callback

Thêm các phương thức callback cần thiết:

```dart
void _onMapCreated(TrackasiaMapController controller) {
  mapController = controller;
}

void _onStyleLoadedCallback() {
  // Code thực thi sau khi style bản đồ được tải
  // Ví dụ: thêm markers, polylines, v.v.
}
```

## Tính Năng Nâng Cao

### Thêm Markers

Để thêm marker vào bản đồ:

```dart
Symbol addMarker(LatLng position) {
  final SymbolOptions symbolOptions = SymbolOptions(
    geometry: position,
    iconImage: 'marker-icon', // Đảm bảo asset này có sẵn
    iconSize: 1.5,
  );
  
  return mapController!.addSymbol(symbolOptions);
}
```

### Theo Dõi Vị Trí Người Dùng

Bật tính năng theo dõi vị trí người dùng:

```dart
TrackasiaMap(
  // Các thuộc tính khác...
  myLocationEnabled: true,
  myLocationTrackingMode: MyLocationTrackingMode.Tracking,
  myLocationRenderMode: MyLocationRenderMode.COMPASS,
)
```

### Điều Khiển Tương Tác Bản Đồ

Bật các điều khiển tương tác bản đồ:

```dart
TrackasiaMap(
  // Các thuộc tính khác...
  compassEnabled: true,
  zoomGesturesEnabled: true,
  tiltGesturesEnabled: true,
  rotateGesturesEnabled: true,
)
```

### Xử Lý Sự Kiện Click Bản Đồ

Xử lý sự kiện click trên bản đồ:

```dart
TrackasiaMap(
  // Các thuộc tính khác...
  onMapClick: (Point<double> point, LatLng coordinates) {
    // Xử lý sự kiện click
    print("Đã click tại: ${coordinates.latitude}, ${coordinates.longitude}");
  },
)
```

### Di Chuyển Camera

Điều khiển camera theo chương trình:

```dart
// Di chuyển camera đến vị trí cụ thể
mapController?.animateCamera(
  CameraUpdate.newLatLngZoom(LatLng(latitude, longitude), zoomLevel),
);

// Di chuyển camera để vừa với vùng giới hạn
mapController?.animateCamera(
  CameraUpdate.newLatLngBounds(
    LatLngBounds(
      southwest: LatLng(southwestLat, southwestLng),
      northeast: LatLng(northeastLat, northeastLng),
    ),
    left: 50,
    top: 50,
    right: 50,
    bottom: 50,
  ),
);
```

## Cấu Hình Theo Nền Tảng

### Cấu Hình Android

1. Cập nhật file `android/app/build.gradle`:

```gradle
android {
    // ...
    defaultConfig {
        // ...
        minSdkVersion 20
        // ...
    }
    // ...
}
```

2. Thêm các quyền sau vào `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### Cấu Hình iOS

1. Cập nhật file `ios/Runner/Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Ứng dụng cần quyền truy cập vị trí khi đang mở.</string>
<key>io.flutter.embedded_views_preview</key>
<true/>
<key>MGLMapboxMetricsEnabledSettingShownInApp</key>
<true/>
```

2. Nếu bạn sử dụng Cocoapods, hãy đảm bảo có repository TrackAsia Cocoapods:
   [TrackAsia Cocoapods Repository](https://github.com/track-asia/trackasia-cocoapods)

### Cấu Hình Web

Đối với hỗ trợ web, đảm bảo bạn đã cài đặt và cấu hình đúng package `trackasia_gl_web`.

## Xử Lý Sự Cố

### Vấn Đề Thường Gặp

1. **Bản đồ không hiển thị**: Kiểm tra URL style và kết nối internet.
2. **Vị trí không hoạt động**: Kiểm tra cấu hình quyền truy cập.
3. **Markers không hiển thị**: Xác minh assets marker đã được thêm đúng cách.

### Mẹo Debug

- Sử dụng lệnh `print` hoặc logger để theo dõi các sự kiện vòng đời bản đồ.
- Kiểm tra console để xem thông báo lỗi liên quan đến TrackAsia.
- Xác minh tất cả dependencies đã được cài đặt và cập nhật đúng cách.

## Hình Ảnh Demo

<p align="center">
  <img src="https://git.advn.vn/sangnguyen/trackasia-document/-/raw/master/images/flutter_1.png" alt="FLUTTER" width="18%">   
  <img src="https://git.advn.vn/sangnguyen/trackasia-document/-/raw/master/images/flutter_2.png" alt="FLUTTER" width="18%">
  <img src="https://git.advn.vn/sangnguyen/trackasia-document/-/raw/master/images/flutter_3.png" alt="FLUTTER" width="18%">
  <img src="https://git.advn.vn/sangnguyen/trackasia-document/-/raw/master/images/flutter_4.png" alt="FLUTTER" width="18%">
</p>

## Tài Nguyên

### Repository Chính Thức

- [TrackAsia Flutter GL (Thư viện chính)](https://github.com/track-asia/trackasia-flutter-gl)
- [TrackAsia Cocoapods (Cài đặt iOS)](https://github.com/track-asia/trackasia-cocoapods)
- [TrackAsia Flutter Podspecs (Cấu hình Podspec)](https://github.com/track-asia/trackasia-flutter-podspecs)

### Dự Án Mẫu

Repository TrackAsia Flutter GL chứa các dự án mẫu minh họa các tính năng và trường hợp sử dụng khác nhau. Clone repository và khám phá các ví dụ để hiểu rõ hơn cách triển khai các tính năng cụ thể.

### Hỗ Trợ Cộng Đồng

Nếu bạn gặp vấn đề hoặc có câu hỏi, bạn có thể:
- Tạo issue trên GitHub repository
- Kiểm tra các issue hiện có để tìm giải pháp
- Đóng góp cho dự án bằng cách gửi pull requests

## Kết Luận

TrackAsia cung cấp giải pháp bản đồ mạnh mẽ cho ứng dụng Flutter với nhiều tính năng và tùy chọn tùy chỉnh. Bằng cách làm theo hướng dẫn này, bạn có thể tích hợp thành công TrackAsia vào dự án Flutter của mình và tận dụng các khả năng của nó để tạo trải nghiệm bản đồ hấp dẫn cho người dùng.