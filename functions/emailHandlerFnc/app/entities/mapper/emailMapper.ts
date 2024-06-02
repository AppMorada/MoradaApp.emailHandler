import { EmailEntity, IEmailEntityProps } from '../email';

export class EmailMapper {
	static toObject(input: EmailEntity): IEmailEntityProps {
		return {
			id: input.id,
			code: input.code,
			fields: [...input.fields]
		};
	}

	static toClass(input: IEmailEntityProps) {
		return new EmailEntity({
			id: input.id,
			code: input.code,
			fields: [...input.fields]
		});
	}
}
