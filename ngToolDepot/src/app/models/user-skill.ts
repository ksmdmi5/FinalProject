export class UserSkill {
  id: number;
  certified: boolean;
  experience: number;
  user: object;
  skill: object;

  constructor(
    id?: number,
    certified?: boolean,
    experience?: number,
    user?: object,
    skill?: object
  ) {
    this.id = id;
    this.certified = certified;
    this.experience = experience;
    this.user = user;
    this.skill = skill;
  }
}
