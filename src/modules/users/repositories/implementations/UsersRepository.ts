import e from "express";
import { ShowUserProfileUseCase } from "modules/users/useCases/showUserProfile/ShowUserProfileUseCase";
import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();
    Object.assign(newUser, { name, email });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const index = this.users.indexOf(receivedUser);

    this.users[index].admin = true;
    this.users[index].updated_at = new Date();
    return this.users[index];
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
