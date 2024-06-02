import { emailFactory } from '@functions/test/factories/email';
import { EmailEntity } from '.';

describe('EmailEntity test', () => {
	it('should be able to create a EmailEntity', () => {
		const sut = emailFactory();
		expect(sut).toBeInstanceOf(EmailEntity);
	});
});
