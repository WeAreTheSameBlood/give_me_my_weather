import { InjectRepository } from "@nestjs/typeorm";
import { Subscription } from "../entities/storage/subscription";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Frequency } from "@common/entities/domain/frequency.enum";

@Injectable()
export class SubscriptionsRepository {
  // Init
  constructor(
    @InjectRepository(Subscription)
    private readonly repo: Repository<Subscription>,
  ) {}

  // Crete
  async create(
    sub: Partial<Subscription>
  ): Promise<Subscription | null> {
    const existing = await this.repo.findOne({ where: { email: sub.email } });
    if (existing) return null;
    const entity = this.repo.create(sub);
    return await this.repo.save(entity);
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
    const sub = await this.repo.findOne({ where: { id: subId } });
    if (sub) {
      sub.confirmed = isConfirm;
      this.save(sub);
      return true;
    }

    return false;
  }

  // Delete by ID
  async delete(subId: string): Promise<boolean> {
    const result = await this.repo.delete({ id: subId });
    if (result.affected) {
      return result.affected > 0;
    }
    return false;
  }

  // Find by Frequency
  async findByFrequency(type: Frequency): Promise<Subscription[]> {
    return this.repo.find({ where: { frequency: type, confirmed: true } });
  }
}