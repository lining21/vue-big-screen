// 生成递增数组  装机量
let aa = [{"name": "山东","val": 434.99},{"name": "河南","val": 159.93},{"name": "河北","val": 194.93},{"name": "广西","val": 198.36},{"name": "山西","val": 89.96}]
let bb = []

for(let i=1;i<=30;i++) {
	let cc = []
	aa.map(e => {
		cc.push({
			name: e.name,
			val: Number((e.val + (Math.round(Math.random()*5) / 10)).toFixed(2))
		})
	})
	aa = cc
	bb.push(cc)
}

console.log(bb)

// 生成递增数组  装机量
let aa = [{"name": "平度市","val": 82.2},{"name": "济阳县","val": 41.4},{"name": "博白县","val": 39.8},{"name": "莱西市","val": 39.4},{"name": "清河县","val": 36.3}]
let bb = []

for(let i=1;i<=3;i++) {
	let cc = []
	aa.map(e => {
		cc.push({
			name: e.name,
			val: e.val + 0.1
		})
	})
	aa = cc
	bb.push(cc)
}

console.log(bb)


// 生成递增数组  建站量
let aa = [{"name": "山东","val": 15748},{"name": "河南","val": 7462},{"name": "河北","val": 7250},{"name": "广西","val": 6861},{"name": "山西","val": 3039}]
let bb = []

for(let i=1;i<=30;i++) {
	let cc = []
	aa.map(e => {
		cc.push({
			name: e.name,
			val: Number((e.val + (Math.round(Math.random()*(75 - 65) + 65))))
		})
	})
	aa = cc
	bb.push(cc)
}

console.log(bb)

// 生成递增数组  主数据
let aa = [
	{title: "电站数量",values: 45486,unit: '户'},
	{title: "装机容量",values: 1230,unit: 'MWp'},
	{title: "发电量",values: 595667,unit: 'MWh'},
	{title: "运营天数",values: 295,unit: '天'},
]
let bb = []

for(let i=1;i<=30;i++) {
	let cc = []
	aa.map(e => {
		let obj = {
			'电站数量': Number((e.values + (Math.round(Math.random()*(10 - 1) + 1)))),
			'装机容量': Number((e.values + (Math.round(Math.random()*3)/10)).toFixed(2)),
			'发电量': Number((e.values + (Math.round(Math.random()*(420 - 380) + 380)))),
			'运营天数': e.values
		}
		cc.push({
			title: e.title,
			values: obj[e.title],
			unit: e.unit
		})
	})
	aa = cc
	bb.push(cc)
}

console.log(bb)

