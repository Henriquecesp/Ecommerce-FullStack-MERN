import { getRepository } from 'typeorm'
import User from '../Models/User'
import AppError from '../Errors/AppError'

class CreateUserService {
  public async execute(name: string): Promise<User> {
    const repository = getRepository(User)

    try {
      const user = repository.create({
        name: name
      })

      await repository.save(user)

      return user

    } catch (error) {
      throw new AppError('Cannot create a user, try again later', 404)
    }
  }
}

export default CreateUserService
