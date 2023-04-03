import { type NextRequest } from 'next/server';
import * as functions from '../../../../../lib/functions';

export function GET(req: NextRequest, {params}) {
	const response = {
		error: "Not Implemented"
	}
	
	return functions.notImplementedJSON()
};