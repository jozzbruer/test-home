import express, { Request, Response } from 'express';

const port = 3000;

const app = express();

app.get('', (request: Request, response: Response) => {
	response.send('Hello typescript');
});

app.listen(port, () => {
	console.log(`now listening on port ${port}`);
});
