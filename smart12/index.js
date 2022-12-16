function Login() {
    let login = {
        USER_ID: $('input[name=id]').val(),
        PASSWORD: $('input[name=pw]').val()
    };
    console.log(login)

    $.ajax({
        type: 'post',
        url: 'http://192.168.219.101:5000/user/login',
        // data: JSON.stringify(retrieve),
        data: {
            USER_ID: $('input[name=id]').val(),
            PASSWORD: $('input[name=pw]').val()
        },
        dataType: 'json',
        success: function (data) {
            if(data.data != null) {
                console.log("로그인 성공!")
                localStorage.setItem("userInfo", data.toString());
                $(location).attr("href", "./test.html");
            } else {
                console.log("로그인 실패")
            }

        },
        error: function (error) {
            console.log(error)
        }
    });
}