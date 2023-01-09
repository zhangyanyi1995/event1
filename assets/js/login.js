$(function () {
  // 切换登录页和注册页
  $('#link_reg').click(function () {
    $('.reg-box').show()
    $('.login-box').hide()
  })
  $('#link_login').click(function () {
    $('.login-box ').show()
    $('.reg-box').hide()
  })

  // 获取layui中包装好的form
  // const form = layui.form
  // const layer = layui.layer
  const { form, layer } = layui
  // 自定义校验规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      // value // 再次确认密码框的值
      // 获取密码框的值
      const pwdVal = $(".reg-box [name=password]").val()
      if (pwdVal !== value) {
        return '两次输入密码不一致'
      }
    }
  })

  // 提交注册信息
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    console.log(console.log($(this).serialize()), '注册')

    const username = $('#form_reg [name=username]').val()
    const password = $('#form_reg [name=password]').val()
    $.post('/api/reguser', { username, password }, function (res) {
      // console.log(res) // {"status": 0,"message": "注册成功！"}
      // 对象解构
      const { status, message } = res
      //  根据status状态判断接口是否请求成功
      if (status !== 0) return layer.msg('接口错误:' + message)
      // 请求成功后的逻辑
      layer.msg('注册成功, 请登录')
      // 模拟点击"去登录"按钮
      $('#link_login').click()
    })
  })

  // 提交登录信息
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    // 请求登录接口
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // jq对象.serialize() 快速获取表单
      data: $(this).serialize(),
      success: function (res) {
        const { status, message, token } = res
        //  根据status状态判断接口是否请求成功
        if (status !== 0) return layer.msg('接口错误:' + message)
        // 请求成功后的逻辑
        layer.msg('登录成功,即将跳转到首页')
        // 获取token
        console.log(token)
      }
    })
  })
})