import { Firestore } from 'firebase-admin/firestore';

export interface IConstantsProps {
  FIRESTORE_INSTANCE?: Firestore;
}

export const constants: IConstantsProps = {
	FIRESTORE_INSTANCE: undefined
};
