import { Services } from '@functions/emailHandlerFnc/app/services';

export class MainController {
	constructor(
    private readonly services: Services
	) {}

	async exec(data: any) {
		await this.services.sendEmail.exec(data);
	}
}
