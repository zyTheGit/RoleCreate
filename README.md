# RoleCreate
利用json创建角色

![pc端](https://github.com/zyTheGit/RoleCreate/blob/master/src/img/pc.jpg)

![移动端](https://github.com/zyTheGit/RoleCreate/blob/master/src/img/moble.jpg)

# 适用范围
* 移动端
* pc端

# 使用文档
1、引用`dest/role.bundle.js`
2、页面`new RoleDomCreate()`对象，再执行`Init()`初始化即可
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>角色</title>
    <script src="../dest/role.bundle.js"></script>
</head>

<body>
    <div class="permissionsOfDetails"></div>
    <button id='btn'>获取状态</button>
    <script>
        var roleObj = null;
        fetch('./role.json').then((response) => response.json()).then(function (data) {
            roleObj = new RoleDomCreate({
                RoleJsonData: JSON.stringify(data),
                RoleDomBox: '.permissionsOfDetails',
                RoleComplateFn: function () {
                    //role创建完成的成功回调
                    // console.log(roleObj.getRoleAllStatus());
                }
            })
            roleObj.init();
        });
        btn.onclick = function () {
            //获取对应页面的角色状态
            console.log(roleObj.getOnlyPower({
                requestPageName: 'setMeal',
                whatRole: 'edit',
            }));
            //获取所有角色状态
            console.log(roleObj.getRoleAllStatus());
        }
    </script>
</body>

</html>
```

# 文档参数
* `RoleJsonData` -`JSON.stringify`**必填参数** ，必须是这个格式
```
[
  {
    "elementChieseName": "记录",
    "jurisdictionName": [
      {
        "englishNa": "exitRecords-see",
        "chineseNa": "进出记录查看"
      },
      {
        "englishNa": "exitRecords-export",
        "chineseNa": "进出记录导出"
      },
      {
        "englishNa": "monthlyRechargeRecord-see",
        "chineseNa": "月租车充值记录查看"
      }
    ]
  },
  {
    "elementChieseName": "设置",
    "jurisdictionName": [
      {
        "englishNa": "departmentUsers-edit",
        "chineseNa": "部门用户编辑"
      },
      {
        "englishNa": "departmentUsers-del",
        "chineseNa": "部门用户删除"
      }
    ]
  }

]

```

* `RoleDomBox` - String ,是储存角色渲染的盒子**必填参数**

# 返回的事件和参数
`RoleComplateFn` -`Function` 非必填
