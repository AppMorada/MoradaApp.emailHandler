import { EmailRepo } from '@functions/emailHandlerFnc/app/repositories/emailRepo';
import { FirestoreService } from '..';
import { EmailEntity } from '@functions/emailHandlerFnc/app/entities/email';
import { FirestoreEmailDTO } from '../dto/email.dto';
import { EmailMapper } from '@functions/emailHandlerFnc/app/entities/mapper/emailMapper';

export class FirestoreEmailRepo implements EmailRepo {
	constructor(private readonly firestore: FirestoreService) {}

	async get(id: string): Promise<EmailEntity | undefined> {
		const collection = this.firestore.instance.collection('email-templates');
		const doc = await collection.doc(id).get();
		const data = doc.data();
		if(!data) return undefined;

		const parsedData = await FirestoreEmailDTO.parse({
			...data, id: doc.id
		});
		return EmailMapper.toClass(parsedData);
	}
}
