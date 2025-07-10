import { Request } from "express";
import { User } from '@prisma/client'

/**
 * Extende o tipo Request do Express para incluir o user autenticado.
 */
export interface RequestWithUser extends Request{
    user: Omit<User, 'password'> // Remove o campo password
}

