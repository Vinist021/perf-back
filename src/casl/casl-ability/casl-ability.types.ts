import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { Card } from '../../database/entities/card.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof Card> | 'all';
export type AppAbility = MongoAbility<[Action, Subjects]>;

export const createAbilityBuilder = () =>
  new AbilityBuilder<AppAbility>(createMongoAbility);

export const detectSubjectType = (item: object) =>
  item.constructor as ExtractSubjectType<Subjects>;
