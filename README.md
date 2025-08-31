# TestApp – DongTay

## 1. Giới thiệu

Ứng dụng React Native (TypeScript) được phát triển theo yêu cầu đánh giá năng lực.  
Chức năng chính:

- Đăng nhập / Đăng ký (giả lập, lưu user cục bộ).
- Danh sách dự án (Projects) từ Firestore.
- Danh sách đợt thanh toán (Payments) theo từng dự án.
- Phê duyệt / Trả hồ sơ: cập nhật trạng thái và lưu lịch sử thay đổi (history).
- Hiển thị timeline phê duyệt.
- Push Notification qua Firebase Cloud Messaging (FCM).

## 2. Công nghệ sử dụng

- **React Native CLI** + TypeScript
- **React Navigation** (stack, drawer)
- **Redux Toolkit** + AsyncStorage (lưu login)
- **@react-native-firebase/app, firestore, messaging**
- Các thư viện UI: react-native-vector-icons, react-native-svg, react-native-reanimated, react-native-gesture-handler, …

## 3. Cấu trúc thư mục chính

```
src/
  components/   # Button, Input, Card, Divider, Timeline...
  navigations/  # AuthStack, AppStack
  screens/      # Login, Register, Projects, Payments
  services/     # firestore + notification
  store/        # redux store, auth reducer
  styles/        # tokens, global styles
```

## 4. Cài đặt & chạy

### Yêu cầu môi trường

- Node.js + Yarn
- Android Studio SDK 34
- JDK 17
- Gradle wrapper 8.x

### Cài đặt

```bash
# clone repo
git clone https://github.com/bsdaoquang/TestApp-dongtay
cd TestApp-dongtay

# cài dependencies
yarn install

# (iOS có thể bỏ qua theo yêu cầu)
# android
cd android && ./gradlew clean && cd ..
yarn android
```

## 5. Firebase

Ứng dụng đã tích hợp với Firebase của tôi (đã cấu hình sẵn Firestore & FCM).  
Khách hàng chỉ cần build APK, không cần cấu hình thêm.

> Nếu muốn thay đổi sang Firebase khác: thay file `google-services.json` trong `android/app/`.

## 6. Test chức năng

1. **Đăng nhập / Đăng ký** → nhập thông tin bất kỳ, vào Home.
2. **Projects** → hiển thị danh sách dự án từ Firestore.
3. **Payments** → hiển thị danh sách thanh toán theo dự án.
4. **Phê duyệt / Trả hồ sơ**:
   - `Init → Pending → Approved`
   - `Returned → Init`
   - Mỗi lần đổi trạng thái sẽ lưu thêm một entry trong `history`.
5. **Timeline**: hiển thị toàn bộ lịch sử phê duyệt.
6. **Notification**:
   - In-app toast khi đổi trạng thái.
   - Test nhận push notification qua Firebase Console (sử dụng FCM token in logcat).

## 7. Build file APK (Release)

```bash
cd android
./gradlew assembleRelease
```

File nằm ở:

```
android/app/build/outputs/apk/release/app-release.apk
```

## 8. Bàn giao

- File `app-release.apk` (đã ký)
- Link repo GitHub: [TestApp-dongtay](https://github.com/bsdaoquang/TestApp-dongtay)
- README.md (tài liệu này)
- (Tuỳ chọn) video ngắn demo flow từ login → dự án → thanh toán → duyệt/trả hồ sơ → thông báo.
