import { Firestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin';
import { constants } from '@functions/emailHandlerFnc/constants';

export class FirestoreService {
	private readonly _instance: Firestore;

	constructor() {
		if(!constants.FIRESTORE_INSTANCE) {
			const app = admin.initializeApp();
			this._instance = constants.FIRESTORE_INSTANCE = app.firestore();
			this._instance.settings({
				projectId: process.env.FIRESTORE_GCP_PROJECT
			});

			const terminate = async () =>
				this._instance.terminate();

			process.on('SIGTERM', terminate);
			process.on('SIGINT', terminate);
			process.on('SIGBREAK', terminate);
		}

		this._instance = constants.FIRESTORE_INSTANCE;
	}

	get instance() { return this._instance; }
}
