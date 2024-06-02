export class ServiceError extends Error {
	constructor(input: string) {
		super();

		this.name = 'Service Error';
		this.message = input;
	}
}
