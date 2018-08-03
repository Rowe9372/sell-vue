export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		// RegExp.$1 第一个子匹配   
		// + '' 转换成字符串
		// substr(4 - RegExp.$1.length) 保留年份格式位数  例： yyyy 相当于substr(0)
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}

	let o = {
		'M+': date.getMonth() + 1, // 月份是从 0 开始计算
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}

	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
			// 格式超过1位数，前面要加 0
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
		}
	}

	return fmt
}

// 日期前加 0 处理函数
function padLeftZero(str) {
	// 当 str 本身是 1 位数，会截取到前面一个 0 当str 本身2位数 ，则截取str本身，不会截取到 0  
	return ('00' + str).substr(str.length)
}
