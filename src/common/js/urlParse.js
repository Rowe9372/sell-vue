/**
 * 解析url参数
 * @example ?id=123456&name=粥品香坊
 * @return Object {id: 123456, name: '粥品香坊'}
 */
 export function urlParse() {
 	// window.location.search 查询/获取url参数
 	let url = window.location.search
 	let obj = {}
 	let reg = /[?&][^?&]+=[^?&]+/g
 	// string.match 找到正则任何匹配的文本
 	let arr = url.match(reg)
 	// ['?id=123456', '&name=粥品香坊']
 	if (arr) {
 		arr.forEach((item) => {
 			let tempArr = item.substring(1).split('=') // ['id', '123456']
 			// decodeURIComponent() 对encodeURIComponent() 函数编码的 URI 进行解码
 			let key = decodeURIComponent(tempArr[0]) 
 			let val = decodeURIComponent(tempArr[1])
 			obj[key] = val
 		})
 	}
 	return obj
 }
