import { Db } from "mongodb";

const scrapeLunch = async (db: Db) => {
	return await fetch('https://delta-lunch-scrape.vercel.app/api/fetchLunch').then(res => res.json()).then(data => {
		db.collection('lunch').deleteMany({});
		db.collection('lunch').insertMany(data);
		return data;
	}).catch(err => console.log(err));
};

export default scrapeLunch;
