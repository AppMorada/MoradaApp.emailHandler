import { randomUUID } from 'node:crypto';
import { trace } from './configs/telemetry';

import { cloudEvent } from '@google-cloud/functions-framework';
import { Adapters } from './app/adapters';
import { Storages } from './infra/storages';
import { Services } from './app/services';
import { MainController } from './infra/controller/main';
import { ErrorReporting } from '@google-cloud/error-reporting';
import { ErrorListener } from './errorListener';

const reporter = process.env.NODE_ENV === 'production' && process.env.OBSERVER_AGENT 
	? new ErrorReporting({
		projectId: process.env.LOGGING_PROJECT,
		logLevel: 2,
		reportMode: 'production',
		credentials: JSON.parse(process.env.OBSERVER_AGENT as string),
		serviceContext: {
			service: process.env.SERVICE_NAME,
			version: process.env.SERVICE_VERSION,
		},
	})
	: undefined;

export const emailHandlerFnc = cloudEvent('emailHandlerFnc', async (cloudevent) => {
	const tracer = trace.getTracer('emailHandlerFnc:main-process');
	const span = tracer.startSpan('main-process');
	const id = randomUUID();

	const adapters = new Adapters();
	const fatalErrorListenter = new ErrorListener(adapters);
	fatalErrorListenter.listen(reporter);

	try {
		if(cloudevent.datacontenttype !== 'application/json')
			throw new Error('Unsupported content type');

		adapters.logger.info(`Sending email with the template id "${(cloudevent.data as any)?.id}" and ${id} as main id`);

		const storages = new Storages();
		const services = new Services(storages, adapters);
		const main = new MainController(services);
		await main.exec(cloudevent.data);

		adapters.logger.info(`Email process with template id ${(cloudevent.data as any)?.id} and ${id} as main id was sended successfully!`);
	} catch(err) {
		reporter?.report(err);
		span.recordException(err);
		adapters.logger.error(`Could not finish email process with template id ${(cloudevent.data as any)?.id} and ${id} as main id`);
		adapters.logger.error({ err });
		throw err;
	} finally {
		span.end();
	}
});
