require('./role.css');
; (function (global, factory, plugins) {
    typeof module !== 'object' && typeof module.exports !== 'object' && (module.exports = factory.call(global)) || (global[plugins] = factory.call(global));
})(typeof window === 'undefiend' && this || window, function () {
    'use strict';
    /*
    let RoleJsonData=[{
            elementChieseName:"角色",
	        jurisdictionName:[
			{
				"englishNa":"role-add",
				"chineseNa":"角色新增"
			},
			{
				"englishNa":"role-modify",
				"chineseNa":"角色修改"
		    },
			{
				"englishNa":"role-delete",
				"chineseNa":"角色删除"
			}]
        },
		{
            elementChieseName:"客户",
	        jurisdictionName:[
			{
				"englishNa":"customer-add",
				"chineseNa":"客户新增"
			},
			{
				"englishNa":"customer-modify",
				"chineseNa":"客户修改"
		    },
			{
				"englishNa":"customer-delete",
				"chineseNa":"客户删除"
			}]
        }];
        //valueArry和jurisdictionName的列子end
*/
    //json必须用是用JSON.Stringify传过来
    //elementChieseName是每个页面的中文名
    //nameArry是页面对应的权限名字，是一组数组（格式：页面名- + 对应的权限功能，eg:role-add    代表角色添加权限）;
    //englishNa对应权限英文名
    //chineseNa对应权限中文名

    class RoleDomCreate {
        constructor({
            RoleJsonData,
            RoleDomBox,
            RoleComplateFn,
            defaultPageRoleArray
        }) {
            //json数据
            this.RoleJsonData = RoleJsonData;
            //装角色dom盒子
            this.RoleDomBox = RoleDomBox;
            //角色创建完成的回调函数
            this.RoleComplateFn = RoleComplateFn;
            //配置默认页面的角色默认权限
            // [{ page: '', status: true }]
            this.defaultPageRoleArray = defaultPageRoleArray || [];
        }
        //添加权限布局
        init() {
            let jsonParent = JSON.parse(this.RoleJsonData),
                parentDivDom = document.querySelector(this.RoleDomBox);
            if (!parentDivDom) throw new error("渲染角色需要指定一个盒子，配置参数RoleDomBox");
            this._renderDom(jsonParent, parentDivDom);
            //全选和取消全选
            this._electionsAndSingle(parentDivDom);
            //选择权限
            this._choiceRole(parentDivDom);
        }

        //dom创建
        _renderDom(valueData, parentDivDom) {
            let _this = this,
                doc = document,
                divBox=doc.createElement('div'),
                table = doc.createElement("table"),
                dataLen = valueData.length,
                tbody = doc.createElement("tbody");
                divBox.className='permissionsOfDetails';
            table.setAttribute("onselectstart", "return false");
            for (let i = 0; i < dataLen; i++) {
                let elementNa = valueData[i].elementChieseName; //每个页面对应的名称
                let jurisdictionNa = valueData[i].jurisdictionName; //每个页面对应的权限（数组）
                if (!elementNa || !jurisdictionNa) throw new error('elementNa或者jurisdictionNa为空');
                let lastName = "",
                    tr = doc.createElement("tr"),
                    th = doc.createElement("th"),
                    td = doc.createElement("td"),
                    divFirst = doc.createElement("div"),
                    divTwo = doc.createElement("div"),
                    htmlRegion = "", //为了储存regionDiv的html
                    inxRegion = 0; //为了确认regionDiv自定义属性data-region的值
                divTwo.className = "clearFloatDiv";
                td.setAttribute("data-floor", i + 1);

                for (let j = 0, jurisdictionNaLen = jurisdictionNa.length; j < jurisdictionNaLen; j++) {
                    let p = doc.createElement("p");
                    th.style.width = "110px";
                    p.className = "marginBottom";
                    let englishName = jurisdictionNa[j].englishNa,
                        chineseName = jurisdictionNa[j].chineseNa;
                    if (!!englishName && !!chineseName) {
                        let htmlName = '<div class ="floatDiv"><span><label class ="ant-checkbox-wrapper"><span class ="ant-checkbox ant-checkbox-checked ant-checkbox-checked-1"><span class ="ant-checkbox-inner ant-choice-checkbox" id=' + englishName + '></span><input type="checkbox" class="ant-checkbox-input"></span></label></span><span>' + chineseName + '</span></div>';
                        let name = englishName.split("-")[0];
                        if (lastName == "") {
                            lastName = name;
                        }
                        if (lastName != name) {
                            inxRegion++;
                            let regionDiv = doc.createElement("div");
                            regionDiv.className = "regionDiv";
                            regionDiv.setAttribute("data-region", inxRegion);
                            regionDiv.innerHTML = htmlRegion;
                            _this.appendFrag(divTwo, regionDiv);
                            lastName = name;
                            divTwo.appendChild(p);
                            divFirst.appendChild(divTwo);
                            th.innerHTML = elementNa + '<div class="selectDiv"><span><label class="ant-checkbox-wrapper"><span class="ant-selectDiv"><span class="ant-selectDivSpan" style="border: 1px solid rgb(19, 193, 159); cursor: pointer;"></span><input type="checkbox" class="ant-checkbox-input" spellcheck="false" style="cursor: pointer;"></span></label></span></div>';
                            tr.appendChild(th);
                            td.appendChild(divFirst);
                            tr.appendChild(td);
                            htmlRegion = htmlName;
                        } else {
                            htmlRegion += htmlName;
                        }
                        if (j + 1 == jurisdictionNaLen) {
                            inxRegion++;
                            let regionDiv = doc.createElement("div");
                            regionDiv.className = "regionDiv";
                            regionDiv.setAttribute("data-region", inxRegion);
                            regionDiv.innerHTML = htmlRegion;
                            _this.appendFrag(divTwo, regionDiv);
                            lastName = name;
                            divFirst.appendChild(divTwo);
                            th.innerHTML = elementNa + '<div class="selectDiv"><span><label class="ant-checkbox-wrapper"><span class="ant-selectDiv"><span class="ant-selectDivSpan" style="border: 1px solid rgb(19, 193, 159); cursor: pointer;"></span><input type="checkbox" class="ant-checkbox-input" spellcheck="false" style="cursor: pointer;"></span></label></span></div>';
                            tr.appendChild(th);
                            td.appendChild(divFirst);
                            tr.appendChild(td);
                        }
                    }
                }
                tbody.appendChild(tr);
            }
            table.appendChild(tbody);
            divBox.appendChild(table);
            parentDivDom.appendChild(divBox);
            this.RoleComplateFn && this.RoleComplateFn();
        }

        //全选和单选
        _electionsAndSingle(parentDiv) {
            let _this = this,
                thParent = parentDiv.querySelectorAll('th');
            for (let i = 0, thParentLen = thParent.length; i < thParentLen; i++) {
                (function (i) {
                    let floatDiv = thParent[i].children;
                    floatDiv[0].addEventListener("click", function (e) {
                        let th = this.offsetParent;
                        let td = th.nextSibling,
                            innerInput = td.querySelectorAll(".ant-checkbox-inner"),
                            seleSpan = th.querySelector(".ant-selectDivSpan"),
                            innerInLen = innerInput.length;
                        if (_this.hasClass(seleSpan, "selectDivSpanBack")) {
                            _this.removeClass(seleSpan, "selectDivSpanBack");
                            for (let k = 0; k < innerInLen; k++) {
                                if (k == innerInLen) return false;
                                _this.removeClass(innerInput[k], "choice");
                            }
                        } else {
                            _this.addClass(seleSpan, "selectDivSpanBack");
                            for (let k = 0; k < innerInLen; k++) {
                                if (k == innerInLen) return false;
                                _this.addClass(innerInput[k], "choice");
                            }
                        }
                    })
                })(i)
            }
        }

        //选择权限
        _choiceRole(parentDiv) {
            let _this = this,
                floatDiv = parentDiv.querySelectorAll(".floatDiv");
            for (let i = 0, floatDivLen = floatDiv.length; i < floatDivLen; i++) {
                floatDiv[i].addEventListener("click", function () {
                    let floatThis = this;
                    if (!_this.hasClass(floatThis, "floatDiv1")) {
                        let choice = floatThis.querySelectorAll(".choice");
                        let tr = floatThis.offsetParent.parentNode;
                        let th = tr.firstChild;
                        let seleSpan = th.querySelector(".ant-selectDivSpan");
                        if (choice.length > 0) {
                            _this.removeClass(choice[0], "choice");
                            _this.removeClass(seleSpan, "selectDivSpanBack");
                            return;
                        } else {
                            let olbCheckboxLen = tr.querySelectorAll(".ant-checkbox-inner").length;
                            let checkboxInner = floatThis.querySelector(".ant-checkbox-inner");
                            _this.addClass(checkboxInner, "choice");
                            let newChoiceLen = tr.querySelectorAll(".choice").length;
                            if (olbCheckboxLen == newChoiceLen) {
                                _this.addClass(seleSpan, "selectDivSpanBack");
                            }
                            return;
                        }
                    }
                });
            }
        }

        appendFrag(parent, text) {
            if (typeof text === 'string') {
                let temp = document.createElement('div');
                temp.innerHTML = text;
                // 防止元素太多 进行提速
                let frag = document.createDocumentFragment();
                while (temp.firstChild) {
                    frag.appendChild(temp.firstChild);
                }
                parent.appendChild(frag);
            }
            else {
                parent.appendChild(text);
            }
        }

        hasClass(ele, cls) {
            return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }

        addClass(elements, cName) {
            if (elements.className == "") {
                elements.className += cName;
            } else {
                elements.className += " " + cName;
            }
        }
        removeClass(elements, cName) {
            elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), "")
        }

        //获取角色状态
        getRoleAllStatus() {
            let arrayData = [];
            let spanAll = document.querySelectorAll(".ant-checkbox-inner");
            let obj = {};
            let objArray = [];
            let currentName = spanAll[0].getAttribute("id").split("-")[0];
            for (let i = 0; i < spanAll.length; i++) {
                let spanElement = spanAll[i];
                let status = this.hasClass(spanElement, "choice") ? true : false;
                let spanId = spanElement.getAttribute("id");
                let spanIdName = spanId.split("-")[0];
                if (currentName == spanIdName) {
                    obj.pageName = spanIdName;
                    objArray.push({
                        roleName: spanId,
                        status: status
                    })
                } else {
                    obj.currentAllRole = objArray;
                    currentName = spanIdName;
                    arrayData.push(obj);
                    obj = {};
                    objArray = [];
                    obj.pageName = spanIdName;
                    objArray.push({
                        roleName: spanId,
                        status: status
                    })
                }
                if (i == spanAll.length - 1) {
                    obj.currentAllRole = objArray;
                    arrayData.push(obj);
                }
            }
            return arrayData;
        }

        /**
         * 后续添加的角色权限，需要默认
         * @param {pageName,forPageName} param
         * 1.判断默认数据是否在defaultArray函数中
         * 2.判断值是否已存在数据库中
         */
        SubsequentDefault(param) {
            let status = false;
            let arrayPageName = this.defaultPageRoleArray;
            for (let i = 0; i < arrayPageName.length; i++) {
                if (arrayPageName[i] == param.pageName) {
                    status = true;
                    break;
                }
            }
            if (param.pageName == param.forPageName && status) {
                //值在列表中显示为true
                return true;
            }
            return status;
        }

        //显示对应状态
        defaultArrayObj() {
            let array = this.defaultPageRoleArray;
            let arrayObj = [];
            for (let i = 0; i < array.length; i++) {
                arrayObj.push({
                    page: array[i].page,
                    status: array[i].status || true
                });
            }
            return arrayObj;
        }

        //根据页面获取单个角色状态
        //requestPageName改页面的名称，whatRole是页面对应权限
        getOnlyPower({
            requestPageName,
            whatRole,
            roleData
        }) {
            let valueParse = roleData || this.getRoleAllStatus();
            let valueExists = false;//值不在角色json中需要默认值
            for (let i = 0; i < valueParse.length; i++) {
                let pageName = valueParse[i].pageName;
                if (pageName == requestPageName) {
                    let currentAllRole = valueParse[i].currentAllRole;
                    for (let j = 0; j < currentAllRole.length; j++) {
                        let roleName = currentAllRole[j].roleName;
                        let getRoleName = requestPageName + "-" + whatRole;
                        let param = { pageName: getRoleName, forPageName: roleName };
                        valueExists = this.SubsequentDefault(param);
                        if (roleName == getRoleName) {
                            let status = currentAllRole[j].status;
                            return status;
                        }
                        if (j == currentAllRole.length - 1 && i == valueParse.length - 1 && !valueExists) {
                            //数据查询完字段不存在在列表中
                            return true;
                        }
                    }
                }
            }
        }
    }

    return RoleDomCreate;
}, 'RoleDomCreate');