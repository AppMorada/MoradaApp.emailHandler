import { emailFactory } from '@functions/test/factories/email';
import { EmailMapper } from './emailMapper';

describe('EmailMapper test', () => {
	it('should be able to test EmailMapper class', () => {
		const sut = emailFactory();
		const sutAsObject = EmailMapper.toObject(sut);
		const sutAsClass = EmailMapper.toClass(sutAsObject);

		expect(sutAsObject.id).toEqual(sut.id);
		expect(sutAsObject.code).toEqual(sut.code);
		expect(sutAsObject.fields !== sut.fields).toEqual(true);
		expect(sutAsObject.fields.length).toEqual(sut.fields.length);
		expect(sutAsObject.fields[0]).toEqual(sut.fields[0]);

		expect(sutAsClass.id).toEqual(sut.id);
		expect(sutAsClass.code).toEqual(sut.code);
		expect(sutAsClass.fields !== sut.fields).toEqual(true);
		expect(sutAsClass.fields.length).toEqual(sut.fields.length);
		expect(sutAsClass.fields[0]).toEqual(sut.fields[0]);
	});
});
