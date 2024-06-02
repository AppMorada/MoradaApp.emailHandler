import { z } from 'zod';

export class FirestoreEmailDTO {
	static async parse(input: any) {
		const schema = z.object({
			id: z.string(),
			code: z.string(),
			fields: z.array(z.string())
		});

		const result = await schema.parseAsync(input);
		return result;
	}
}
