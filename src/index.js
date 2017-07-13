

/**
 * ========测试打包各类文件================
 */




//==========js es6=====================
//es6 test
var map =new Map();
//let
let t=1;
//class 
class person{
	constructor(){
		this.name='zzz'
	}
}
//alias  别名测试

$(function(){
//debugger;
var util =require ('Utilities/util');
console.log(util.square(11)); // 121
console.log(util.diag(4, 3));
})

//============ css 文件=================

import style from "./test.css"

// less 文件


import less from "./test.less"


//html 文件

import html from "./test.html"

//全局jquery调用

var imgs=$("img");


//全局变量测试


console.log(""+PROJECT_NAME);

