import {BadRequestException} from '@nestjs/common'
import Ajv, { JSONSchemaType } from 'ajv'
import { Request, Response, NextFunction } from 'express'
import { Game } from 'common/models/entity'

export const createJSONValidator = (schema: any) => {
	const ajv = new Ajv()
	const validate = ajv.compile(schema as JSONSchemaType<Game>)
	return (req: Request, res: Response, next: NextFunction) => {
		validate(req.body)
		if (!validate.errors)
			return next()

		throw new BadRequestException(validate.errors, 'Payload error')
	} 
}
