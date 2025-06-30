import { User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create({ name, email, password_hash }: { name: string; email: string; password_hash: string }) {
    const user = {
        id: 'user-id',
                name,
                email,
                password_hash,
                created_at: new Date(),
    };

    this.items.push(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);
    
    if (!user) {
      return null;
    }
    return user;
  }
}




