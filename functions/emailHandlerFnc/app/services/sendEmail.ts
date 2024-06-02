import { EmailAdapter } from '../adapters/email';
import { ServiceError } from '../errors/services';
import { EmailRepo } from '../repositories/emailRepo';
import { compile } from 'handlebars';

interface IProps {
  recipient: string;
  id: string;
  fields: Record<string, string>;
  subject: string;
}

export class SendEmailService {
	constructor(
    private readonly emailRepo: EmailRepo,
    private readonly emailAdapter: EmailAdapter,
	) {}

	async exec(input: IProps) {
		const email = await this.emailRepo.get(input.id);
		if(!email) throw new ServiceError('Template de email não encontrado');

		this.parseFields(input.fields, email.fields);
		const template = compile(email.code);
		const filledEmail = template(input.fields);

		await this.emailAdapter.send({
			to: input.recipient,
			body: filledEmail,
			from: process.env.EMAIL_SENDER as string,
			subject: input.subject
		});
	}

	private parseFields(userFields: Record<string, string>, fields: string[]) {
		fields.forEach((field) => {
			for(const userField in userFields)
				if(userField !== field) continue;
				else return;
      
			throw new ServiceError(`O campo ${field} não bate com o campo definido no template`);
		});
	}
}
