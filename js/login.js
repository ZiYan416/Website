var accounts = [
  {
    username: "808",
    password: "123456"
  }
];
document.getElementById("submit").addEventListener("click", function(event) {
	event.preventDefault(); // 阻止表单的默认提交行为
	var usernameInput = document.getElementById("username");
	var passwordInput = document.getElementById("password");
	var username = usernameInput.value;
	var password = passwordInput.value;
	// 在账号数组中查找匹配的用户名和密码
	// 检查用户名是否已存在
	if (username == "" || password == "") {
		alert("请输入用户名和密码！");
	}else{
		var existingAccount = accounts.find(function(acc) {
			return acc.username === username;
		});
		if (existingAccount) {
			var account = accounts.find(function(acc) {
				return acc.username === username && acc.password === password;
			});
			if (account) {
				alert("登录成功");
				window.location.href = "home.html";
			} else {
				alert("用户名或密码错误");
			}
		} else {
			// 将新账号添加到账号数组
			accounts.push({
				username: username,
				password: password
			});
			alert("用户名不存在，已自动注册！");
			// 清空输入字段
			usernameInput.value = "";
			passwordInput.value = "";
		}
	}
});