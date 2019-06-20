# RoleCreate
此示例利用json文件创建角色，可以是其他

## PC端显示
![pc端](https://github.com/zyTheGit/RoleCreate/blob/master/src/img/pc.jpg)
## 移动端显示
![移动端](https://github.com/zyTheGit/RoleCreate/blob/master/src/img/moble.jpg)

# 适用范围和优势
* 移动端和pc端自适应
* 可以使用import或者window.RoleCreate获取
* 使用方便,文件体积小
* 不需要调用css，只需要引用`dest/role.bundle.js`
* 有内置的全选和单选事件
* 有获取所有角色状态
* 有获取单个角色状态


# 使用文档
1、引用`dest/role.bundle.js`
* html设置
```
<div class="roleBox"></div>
```

2、页面`new RoleDomCreate()`对象中有两个必填参数
 * `RoleJsonData` 你的所有角色配置json数据[RoleJsonData数据格式参考role.json](https://github.com/zyTheGit/RoleCreate/blob/master/src/role.json)
 * `RoleDomBox` 你的装角色容器
 ```
 let roleObj = new RoleDomCreate({
    RoleJsonData: JSON.stringify(data),
    RoleDomBox: '.roleBox'
  })
 ```
3、在执行`Init()` **即可创建成功**
```
roleObj.Init();
```

# 具体使用示例
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>角色</title>
</head>

<body>
    <div class="roleBox"></div>
    <button id='btn'>获取状态</button>
    <script src="../dest/role.bundle.js"></script>
    <script>
        var roleObj = null;
        fetch('./role.json').then((response) => response.json()).then(function (data) {
            roleObj = new RoleDomCreate({
                RoleJsonData: JSON.stringify(data),
                RoleDomBox: '.roleBox',
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
                whatRole: 'edit'
            }));
            //获取所有角色状态
            console.log(roleObj.getRoleAllStatus());
        }
    </script>
</body>

</html>
```

# 文档参数
* `RoleJsonData` -`Array`，**JSON.stringify**必须是这个格式 **必填参数** 
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
* `RoleDomBox`            -储存角色渲染的盒子 - String , **必填参数**
* `RoleComplateFn`        -角色创建完成的回调函数 -`Function` 非必填
* `defaultPageRoleArray`  -固定一些默认角色-`Array` 非必填参数
    ```
    [{
        page: 'exitRecords-see',    //exitRecords-see
        status: true                //角色状态true/false
    }]
    ```

# 返回的事件函数
* `getRoleAllStatus` 获取所有的配置角色，返回`数组对象` -`Function` 非必填

* `getOnlyPower`     获取当前角色状态，返回`true/false` -`Function` 非必填
 >> eg:**setMeal-see**
 + `requestPageName` 页面的名称 eg:'setMeal'              **必填项**
 + `whatRole`        要获取的权限名称eg:'see'              **必填项**
 + `roleDataStr`     要判断的所有的角色 就是role所有的数据  **非必填项**
 
 1、有两种使用方式在创建角色页面获取的方式
 ```
 let roleObj = new RoleDomCreate({
        RoleJsonData: JSON.stringify(data),
        RoleDomBox: '.roleBox'
    })
    roleObj.init();
    //返回true/false,角色的状态
    let roleStatus=roleObj.getOnlyPower({
         requestPageName: 'setMeal',
         whatRole: 'edit'
    })
 ```
 2、第二种获取在其他页面调用，
 >> 其实是不建议使用，为了一个获取角色状态还要引用`dest/role.bundle.js`
 ```
 let roleObj = new RoleDomCreate();
 
  //返回true/false,角色的状态
  let roleStatus=roleObj.getOnlyPower({
     requestPageName: 'setMeal',
     whatRole: 'edit',
     roleDataStr:JSON.stringify(roleArray)
  })
 ```
 **附上此方法**
 ```
  getOnlyPower({
        requestPageName,
        whatRole,
        roleDataStr
    }) {
        let valueParse = !!roleDataStr && JSON.parse(roleDataStr) || this.getRoleAllStatus();
        for (let i = 0; i < valueParse.length; i++) {
            let pageName = valueParse[i].pageName;
            if (pageName == requestPageName) {
                let currentAllRole = valueParse[i].currentAllRole;
                for (let j = 0; j < currentAllRole.length; j++) {
                    let roleName = currentAllRole[j].roleName;
                    let getRoleName = requestPageName + "-" + whatRole;
                    if (roleName == getRoleName) {
                        let status = currentAllRole[j].status;
                        return status;
                    }
                }
            }
        }
    }
 ```
 
 
 
