import IUser, { IUserObject } from './IUser'

export default interface IFactory {
  User(data: IUser): Promise<IUserObject>
  ManyUsers(value: number, data: IUser): Promise<void>
}
