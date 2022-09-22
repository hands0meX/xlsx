const express = require("express");
const cors = require("cors");
const fs = require("fs");
const xlsx = require('node-xlsx')
const app = express();
app.use(cors())
app.use(express.json())

app.post("/count", (req, res) => {
    let xlsxData = xlsx.parse(fs.readFileSync('./foo.xlsx'))
    const existData = xlsxData[0].data || []
    existData.push(req.body.row)
    const buffer = xlsx.build([{name: 'Sheet1', data: existData}])
    fs.writeFileSync('./foo.xlsx',buffer)
	res.send({
		code: 0,
		test: "done",
	});
});

app.listen(9999, () => {
	console.log(`listen 2 http://localhost:9999`);
});
