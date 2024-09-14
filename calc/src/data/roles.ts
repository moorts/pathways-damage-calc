import type * as I from './interface';
import {type DeepPartial, toID, extend, assignWithout} from '../util';

const ROLES: {[name: string]: string[]} = {
  'None': [],
  'Beast Tamer': ['Dragon', 'Flying', 'Bug'],
  'Scientist': ['Electric', 'Steel', 'Psychic'],
  'Druid': ['Grass', 'Fairy', 'Ground'],
  'Knight': ['Steel', 'Rock', 'Fighting'],
  'Ranger': ['Flying', 'Bug', 'Grass'],
  'Saint': ['Fairy', 'Flying', 'Water'],
  'Dark Knight': ['Steel', 'Ground', 'Dark'],
  'Geneticist': ['Electric', 'Dragon', 'Poison'],
  'Necromancer': ['Ghost', 'Dark', 'Psychic'],
  'Ninja': ['Bug', 'Dark', 'Poison'],
}

export class Roles implements I.Roles {
  get(id: I.ID) {
    return ROLES_BY_ID[id];
  }

  *[Symbol.iterator]() {
    for (const id in ROLES_BY_ID) {
      yield this.get(id as I.ID)!;
    }
  }
}

class Role implements I.Role {
  readonly kind: 'Role';
  readonly id: I.ID;
  readonly name: I.RoleName;
  readonly types: I.TypeName[];

  constructor(name: string, types: string[]) {
    this.kind = 'Role';
    this.id = toID(name);
    this.name = name as I.RoleName;
    this.types = types as I.TypeName[];
  }
}

export const ROLES_BY_ID: {[id: string]: Role} = {};

for (const role in ROLES) {
  const r = new Role(role, ROLES[role]);

  ROLES_BY_ID[r.id] = r;
}

export const NO_ROLE = ROLES_BY_ID['none'];
