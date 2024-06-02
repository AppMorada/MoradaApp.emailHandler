import { EmailEntity } from '../entities/email';

export abstract class EmailRepo {
  abstract get(id: string): Promise<EmailEntity | undefined>;
}
