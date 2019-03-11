
/**
 *  tools 工具类
 */

    var utility = {}
    // 获取URL 参数
    utility.getParameterByName = function (name, url) {
      if (!url) { url = window.location.href }
      name = name.replace(/[\[\]]/g, '\\$&')
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }
    utility.computations = {
      // 加
      accAdd: function (num1, num2) {
        var r1, r2, m
        try {
          r1 = num1.toString().split('.')[1].length
        } catch (e) {
          r1 = 0
        }
        try {
          r2 = num2.toString().split('.')[1].length
        } catch (e) {
          r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
            // return (num1*m+num2*m)/m;
        return Math.round(num1 * m + num2 * m) / m
      },
      // 减
      accSub: function (num1, num2) {
        var r1, r2, m
        try {
          r1 = num1.toString().split('.')[1].length
        } catch (e) {
          r1 = 0
        }
        try {
          r2 = num2.toString().split('.')[1].length
        } catch (e) {
          r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
        let n = (r1 >= r2) ? r1 : r2
        return (Math.round(num1 * m - num2 * m) / m).toFixed(n)
      },
      // 除
      accDiv: function (num1, num2) {
        var t1, t2, r1, r2
        try {
          t1 = num1.toString().split('.')[1].length
        } catch (e) {
          t1 = 0
        }
        try {
          t2 = num2.toString().split('.')[1].length
        } catch (e) {
          t2 = 0
        }
        r1 = Number(num1.toString().replace('.', ''))
        r2 = Number(num2.toString().replace('.', ''))
        return (r1 / r2) * Math.pow(10, t2 - t1)
      },
      // 乘
      accMul: function (num1, num2) {
        var m = 0,
          s1 = num1.toString(),
          s2 = num2.toString()
        try {
          m += s1.split('.')[1].length
        } catch (e) {}
        try {
          m += s2.split('.')[1].length
        } catch (e) {}
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
      },
      // 小数格式化
      returnFloat: function (val) {
        var value = Math.round(parseFloat(val) * 100) / 100
        var xsd = value.toString().split('.')
        if (xsd.length == 1) {
          value = value.toString() + '.00'
          return value
        }
        if (xsd.length > 1) {
          if (xsd[1].length < 2) {
            value = value.toString() + '0'
          }
          return value
        }
      }
    }

    export default utility
