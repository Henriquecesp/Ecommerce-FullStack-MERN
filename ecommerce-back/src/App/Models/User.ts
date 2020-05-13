import { IUserObject } from '../../@types/IUser'

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('users')
class User implements IUserObject {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default User
