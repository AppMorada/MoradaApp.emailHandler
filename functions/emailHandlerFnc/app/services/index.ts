import { Storages } from '@functions/emailHandlerFnc/infra/storages';
import { Adapters } from '../adapters';
import { SendEmailService } from './sendEmail';

export class Services {
	private readonly _sendEmail: SendEmailService;

	constructor(
    private readonly storages: Storages, 
    private readonly adapters: Adapters
	) {
		this._sendEmail = new SendEmailService(
			this.storages.emailRepo, 
			this.adapters.email
		);
	}

	get sendEmail() { return this._sendEmail; }
}
