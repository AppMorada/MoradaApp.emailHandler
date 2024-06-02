import { EmailRepo } from '@functions/emailHandlerFnc/app/repositories/emailRepo';
import { FirestoreService } from './firestore';
import { FirestoreEmailRepo } from './firestore/repositories/emailRepo';
import { InMemoryDatabaseEmail } from '@functions/test/inMemoryDatabase/email';

export class Storages {
	private readonly firestoreService?: FirestoreService;
	private readonly _emailRepo: EmailRepo;

	constructor() {
		if(process.env.NODE_ENV === 'test') {
			this._emailRepo = new InMemoryDatabaseEmail();
			return;
		}

		this.firestoreService = new FirestoreService();
		this._emailRepo = new FirestoreEmailRepo(this.firestoreService!);
	}

	get emailRepo() { return this._emailRepo; }
}
