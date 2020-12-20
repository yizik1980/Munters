export class Book {
	constructor() {
		this.isNew = true;
	}
	id: number;
	catalogNumber: number;
	bookName: string;
	author: string;
	PublicationDate: Date;
	coverPhoto: string | ArrayBuffer;
	fileName: string;
	isNew: boolean;
}

export class errorModel extends Book {
	constructor() {
		super();
	}
	clear() {

	}
	validate(constrain: validationConstrains) {
		if (!constrain.content && constrain.isRequire) {
			this[constrain.prop] = constrain.errorMsg;
			return false;
		}
		if (constrain.pattarn) {
			if (!constrain.pattarn.test(constrain.content)) {
				this[constrain.prop] = constrain.pattarnErrorMsg;
				return false;
			}
		}
		this[constrain.prop] = '';
		return true;
	}
}

export class validationConstrains {
	constructor(args: any) {
		this.isRequire = args.isReqire || false;
		this.prop = args.prop;
		this.content = args.content;
		this.errorMsg = args.errorMsg;
		this.pattarn = args.pattarn || null;
		this.pattarnErrorMsg = args.pattarnErrorMsg;
	}
	isRequire: boolean;
	prop: string;
	content: string;
	pattarn: RegExp;
	errorMsg: string;
	pattarnErrorMsg: string;
}



