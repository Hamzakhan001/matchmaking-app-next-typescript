import { ZodIssue } from "zod/v3"

export type ActionResult<T> =
	| { status: 'success'; data: T }
	| { status: 'error'; error: string | ZodIssue[] };