'use strict';
const Gdax = require('gdax');
var timebucket = require('timebucket');
const publicClient = new Gdax.PublicClient('BTC-USD');

(async () => {
	try {
		let d = new Date();

		let params = {
			'start': (new Date(d.getTime() - 1000 * 60 * 50)).toISOString(),
			'end': d.toISOString(),
			'granularity': 300
		};
        console.log(params);
		const hr = await publicClient.getProductHistoricRates(params);
        console.log(hr.length);

        hr.map((m)=>{
            console.log(new Date(timebucket("s",m[0]).resize("ms").value));
        });
        //console.log(hr);

	} catch(error) {
		console.log("error: ", error);
	}
}) ();