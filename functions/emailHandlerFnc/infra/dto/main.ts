import { z } from 'zod';

export class MainDTO {
	static async parse(input: any) {
		const schema = z.object({
			id: z.string(),
			recipient: z.string(),
			fields: z.array(z.string()),
			subject: z.string()
		});

		return await schema.parseAsync(input);
	}
}
