import { EmailEntity } from '@functions/emailHandlerFnc/app/entities/email';

import { IEmailEntityProps } from '@functions/emailHandlerFnc/app/entities/email';

type TOverride = Partial<IEmailEntityProps>

export function emailFactory(input: TOverride = {}) {
	return new EmailEntity({
		id: 'SIMPLE_ID',
		fields: ['simple_field'],
		code: '<h1>HELLO WORLD</h1>',
		...input
	});
}
