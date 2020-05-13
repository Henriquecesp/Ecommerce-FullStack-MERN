import { Request, Response } from 'express'
import { SecResponse } from '@jlenon7/dedsec/build/Responses'
import CreateUserService from '../../Services/CreateUserService'
import UserRepository from '../../Repositories/UserRepository'

const dedSec = new SecResponse()
const create = new CreateUserService()
const repository = new UserRepository()

class UsersController {
  public async store(request: Request, response: Response): Promise<void> {
    // padronizar as respostas
    const res = dedSec.withOne()
  }
}

export default UsersController
