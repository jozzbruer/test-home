export const createConnection = (name, title, companyName, profileUrl) => ({
	name,
	title,
	companyName,
	profileUrl,
});

export const createEnrichedProfile = (connection, identifyingInfo, contactInfo, jobExperiences) => ({
	connection,
	identifyingInfo,
	contactInfo,
	jobExperiences,
});

export const createJobExperience = (companyName, startDate, endDate, title) => ({
	companyName,
	startDate,
	endDate,
	title,
});
