$(function () {
    //调用getUserInfo获取用户基本信息
    getUserInfo()
    var layer = layui.layer

    $("#btnLogout").on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {

            //清空本地存储的token
            localStorage.removeItem('token')
            //跳转到登录页面 
            location.href = '/login.html'
            //关闭confirm询问框
            layer.close(index);
        });

    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')

            }
            //调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },
        //不论成功失败，都会调用complete函数
        // complete: function (res) {
        //     //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
//渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;' + name)
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
