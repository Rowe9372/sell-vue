/*
 * 存储localStorage 函数方法
 * [params] id  商家id
 * [params] key  键值名
 * [params] val  值
 */
export function saveToLocal(id, key, val) {
	let seller = window.localStorage.__seller__
	// 判断缓存里面是否有 __seller__
	if (!seller) {
		seller = {}
		seller[id] = {}
	} else {
		//  转换成json字符串
		seller = JSON.parse(seller)
		//  判断是否存在该商家的id
		if (!seller.id) {
			seller[id] = {}
		}
	}
	seller[id][key] = val
	// 存储到localStorage
	window.localStorage.__seller__ = JSON.stringify(seller)
}

/*
 * 读取localStorage
 * [params] id 
 * [params] key
 * [params] def 默认值
 */
export function loadFromLocal(id, key, def) {
	let seller = window.localStorage.__seller__
	// 判断是否有存储
	if (!seller) {
		return def
	}
	// 装换成json对象，取到商家id
	seller = JSON.parse(seller)[id]
	// 没有返回默认值
	if (!seller) {
		return def
	}
	let result = seller[key]
	return result | def
}
