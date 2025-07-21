import { User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];
  
  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);
    
    if (!user) {
      return null;
    }
    return user;
  }

  async create({ name, email, password_hash }: { name: string; email: string; password_hash: string }) {
    const user = {
        id: randomUUID(),
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




