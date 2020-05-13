import { EntityRepository, Repository, getRepository } from 'typeorm'

import User from '../Models/User'
import AppError from '../Errors/AppError'

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async getByName(name: string): Promise<User> {
    const repository = getRepository(User)

    const user = await repository.findOne({
      where: { name: name }
    })

    if (!user) {
      throw new AppError('User not found in database')
    }

    return user
  }
}

export default UserRepository
