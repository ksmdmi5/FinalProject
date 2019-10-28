export class Skill {
  id: number;
  name: string;
  costPerHour: number;
  available: boolean;
  description: string;
  expertise: string;

  constructor(
    id?: number,
    name?: string,
    costPerHour?: number,
    available?: boolean,
    description?: string,
    expertise?: string
  ) {
    this.id = id;
    this.name = name;
    this.costPerHour = costPerHour;
    this.available = available;
    this.description = description;
    this.expertise = expertise;
  }
}
