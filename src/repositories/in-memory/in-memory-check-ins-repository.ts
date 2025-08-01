import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";
import { CheckInsRepository } from "../check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRepository {

  public items: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const starOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find(
      (checkIn) =>{
        const checkInDate = dayjs(checkIn.created_at)
        const isOnSameDate = checkInDate.isAfter(starOfTheDay) && checkInDate.isBefore(endOfTheDay)

        return checkIn.user_id === userId && isOnSameDate
      }
    )
    
    if (!checkInOnSameDate) {
      return null;
    }
    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
    .filter(item => item.user_id === userId)
    .slice((page - 1) * 20, page * 20);
    
  }

  async countByUserId(userId: string) {
    return this.items
    .filter(item => item.user_id === userId).length;
    
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
        id: randomUUID(),
        user_id: data.user_id,
        gym_id: data.gym_id,
        validated_at: data.validated_at ? new Date(data.validated_at) : null,
        created_at: new Date(),
    };

    this.items.push(checkIn);
    return checkIn;
  }


}



