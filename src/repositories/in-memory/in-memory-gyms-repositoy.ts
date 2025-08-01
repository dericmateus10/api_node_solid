import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];
  
  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);
    
    if (!gym) {
      return null;
    }
    return gym;
  }

    async create(data: Prisma.GymCreateInput) {
      const gym = {
        id: data.id ?? crypto.randomUUID(),
        title: data.title,
        description: data.description ?? null,
        phone: data.phone ?? null,
        latitude: new Prisma.Decimal(data.latitude.toString()),
        longitude: new Prisma.Decimal(data.longitude.toString()),
        createdAt: new Date(),
      };
  
      this.items.push(gym);
      return gym;
    }

}




