import { ErrorReporting } from '@google-cloud/error-reporting';
import { Adapters } from './app/adapters';

export class ErrorListener {
	constructor(private readonly adapters: Adapters) {}

	listen(report?: ErrorReporting) {
		const errorTypes = ['uncaughtException', 'unhandledRejection'];

		errorTypes.forEach((item) => {
			process.on(item, (err) => {
				report?.report({ err });
				this.adapters.logger.fatal({
					name: err?.name,
					message: err?.message,
					stack: err?.stack,
				});
			});
		});
	}
}
