import { type NextRequest } from 'next/server';
import * as functions from '../../lib/functions';

export async function GET(req: NextRequest, {params}) {
	return functions.notImplementedJSON()
}