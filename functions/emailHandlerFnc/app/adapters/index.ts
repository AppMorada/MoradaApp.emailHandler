import { EmailAdapter } from './email';
import { LoggerAdapter } from './logger';
import { NodemailerAdapter } from './nodemailer/nodemailerAdapter';
import { WinstonLoggerAdapter } from './winston';

export class Adapters {
	private readonly _email: EmailAdapter;
	private readonly _logger: LoggerAdapter;

	constructor() {
		this._email = new NodemailerAdapter();
		this._logger = new WinstonLoggerAdapter();
	}

	get email() { return this._email; }
	get logger() { return this._logger; }
}
