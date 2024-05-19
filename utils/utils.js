import fs from 'fs/promises';
import path from 'path';

export const readFile = async (filepath, filename) => {
	try {
		const fullpath = filepath + filename;
		const data = await fs.readFile(fullpath, 'utf8');
		return data;
	} catch (err) {
		if (err.code === 'ENOENT') {
			// Handle file not found error
			console.error(`File not found: ${filename}`);
			return `File not found: ${filename}`;
		} else {
			// Handle other types of errors
			console.error(`Error reading file: ${filename}`, err);
			throw err;
		}
	}
};
export const csvToJson = (csv) => {
	const rows = csv.trim().split('\n');

	const headers = rows[0].split(',');

	const jsonArray = [];

	for (let i = 1; i < rows.length; i++) {
		const columns = rows[i].split(',');

		const jsonObject = {};

		headers.forEach((header, index) => {
			jsonObject[header] = columns[index];
		});

		jsonArray.push(jsonObject);
	}

	return jsonArray;
};

export const checkCriteria = (data, criteria) => {
	const criteriaSet = new Set(criteria);
	// returned true if meet criterias
	return criteriaSet.has(data.Position);
};
