export interface IEmailEntityProps {
	id: string;
	fields: string[];
	code: string;
}

export class EmailEntity {
	private readonly props: IEmailEntityProps;

	constructor(input: IEmailEntityProps) {
		this.props = {
			id: input.id,
			code: input.code,
			fields: input.fields
		};
	}

	get id() { return this.props.id; }
	get fields() { return this.props.fields; }
	get code() { return this.props.code; }
}
