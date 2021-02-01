$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6)
                return '昵称长度必须在1~6个字符之间'
        }
    })
    initUserInfo()
    //初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userInfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val("formUserInfo", res.data);
            }
        })
        //重置表单数据
        $('#btnReset').on('click', function (e) {
            //阻止表单默认重置行为
            e.preventDefault();
            initUserInfo();
        })
    }
    //监听表单的提交时间
    $('.layui-form').on('submit', function (e) {
        //阻止表单默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (status !== 0) {
                    return layer.msg('更新用户信息成功')
                }
            }
        })
    })

})

