import faker from 'faker'
import { getRepository } from 'typeorm'

import IFactory from '../@types/IFactory'
import IUser, { IUserObject } from '../@types/ISummoner'
import User from '../App/Models/User'

export default class Factory implements IFactory {
  public async User(data: IUser = {}): Promise<IUserObject> {
    const repository = getRepository(User)

    const user = repository.create({
      name: data.name || 'Henrique',
      ...data,
    })

    await repository.save(user)

    return user
  }

  public async ManyUsers(
    value: number,
    data: IUser = {},
  ): Promise<void> {
    const repository = getRepository(User)

    for (let i = 1; i <= value; i++) {
      const user = repository.create({
        // injentando value para ficar valores diferentes no banco
        name: `${data.name}:${value}` || `'Henrique:${value}'`,
        ...data,
      })

      await repository.save(user)
    }
  }
}
