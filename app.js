import express from 'express';
import { checkCriteria, csvToJson, readFile } from './utils/utils.js';
import { createEnrichedProfile, createJobExperience } from './models/datamodels.js';

const app = express();

const filepath = './public/';

const ADMIN_CRITERIA = ['CEO', 'CTO', 'HEAD', 'VP', 'COO'];

// get user job experience

const userJobExp = () => {
	// Get user job experience based on user data profile
};

// ProfileEnrichmentModule
const enrichProfile = async (connection) => {
	// Fetch profile data from LinkedIn API using connection.profileUrl
	const profileData = await fetchProfileData(connection.URL);

	const identifyingInfo = {
		firstName: profileData.first_name,
		lastName: profileData.last_name,
		// ...
	};

	const contactInfo = {
		emails: profileData.emails,
		phoneNumbers: profileData.phone_numbers,
		// ...
	};

	const jobExperiences = profileData.experiences.map((job) => createJobExperience(job.company, job.start_at, job.end_at, job.title));

	return createEnrichedProfile(connection, identifyingInfo, contactInfo, jobExperiences);
};

// RelationshipScoringModule
const scoreRelationship = (enrichedProfile, userJobExperiences) => {
	let score = 0;

	for (const userJob of userJobExperiences) {
		for (const connectionJob of enrichedProfile.jobExperiences) {
			if (userJob.companyName === connectionJob.companyName) {
				const overlapDuration = calculateOverlapDuration(userJob.start_at, userJob.end_at, connectionJob.start_at, connectionJob.end_at);
				score += overlapDuration;
			}
		}
	}

	return score;
};

const calculateOverlapDuration = (start1, end1, start2, end2) => {
	// Implementation details...
};

const sharedJobExperience = (enr) => {};

// ConnectionProcessorModule
const processConnections = async (connections, userJobExperiences) => {
	const enrichedProfiles = [];
	const scoredProfiles = [];

	for (const connection of connections) {
		const meetAdmCriteria = checkCriteria(connection.title, ADMIN_CRITERIA);

		if (meetAdmCriteria) {
			const enrichedProfile = await enrichProfile(connection);
			enrichedProfiles.push(enrichedProfile);

			if (sharedJobExperience(enrichedProfile, userJobExperiences)) {
				const score = scoreRelationship(enrichedProfile, userJobExperiences);
				scoredProfiles.push({ enrichedProfile, score });
			}
		}
	}

	// Process enrichedProfiles and scoredProfiles as needed
	// (e.g., persist to a database, send notifications, etc.)
};

app.get('/', async (request, response) => {
	try {
		// read file
		const data = await readFile(filepath, 'connections.csv');
		//convert data to json
		const jsonData = await csvToJson(data);
		processConnections(jsonData, userJobExp);
		response.status(201).send({ success: true });
	} catch (error) {
		response.status(400).json({ error, success: false });
	}
});

app.listen(process.env.PORT || 8123);
