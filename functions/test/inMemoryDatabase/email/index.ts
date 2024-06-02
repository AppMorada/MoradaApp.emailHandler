import { EmailEntity } from '@functions/emailHandlerFnc/app/entities/email';
import { EmailRepo } from '@functions/emailHandlerFnc/app/repositories/emailRepo';
import { emailFactory } from '@functions/test/factories/email';

export class InMemoryDatabaseEmail implements EmailRepo {
	calls = {
		get: 0
	};

	async get(): Promise<EmailEntity | undefined> {
		++this.calls.get;
		return emailFactory();
	}
}
