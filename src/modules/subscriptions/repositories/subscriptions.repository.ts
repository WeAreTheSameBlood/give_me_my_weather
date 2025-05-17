import { InjectRepository } from "@nestjs/typeorm";
import { Subscription } from "../entities/storage/subscription";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class SubscriptionsRepository {
  // Init
  constructor(
    @InjectRepository(Subscription)
    private readonly repo: Repository<Subscription>,
  ) {}

  // Crete
  create(sub: Partial<Subscription>): Subscription {
    return this.repo.create(sub);
  }

  // Save
  save(sub: Subscription): Promise<Subscription> {
    return this.repo.save(sub);
  }

  // Set Confirm
  async setConfirm(
    subId: string,
    isConfirm: boolean
  ): Promise<boolean> { 
    const sub = await this.repo.findOne({ where: { id: subId } })
    if (sub) {
      sub.confirmed = isConfirm
      this.save(sub);
      return true
    }

    return false
  }

  // Delete by ID
  async delete(subId: string): Promise<boolean> {
    const result = await this.repo.delete({ id: subId });
    if (result.affected) {
      return result.affected > 0;
    }
    return false;
  }
}