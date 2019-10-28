import { ToolRental } from './tool-rental';
import { User } from './user';
import { ToolPhoto } from './tool-photo';

export class Tool {
  id: number;
  name: string;
  description: string;
  type: string;
  costPerDay: number;
  available: boolean;
  manufactureYear: string;
  condition: string;
  user: User;
  photos: ToolPhoto[];
  rentals: ToolRental[];

  constructor(
    id?: number,
    name?: string,
    description?: string,
    type?: string,
    costPerDay?: number,
    available?: boolean,
    manufactureYear?: string,
    condition?: string,
    user?: User,
    photos?: ToolPhoto[],
    rentals?: ToolRental[]

  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.costPerDay = costPerDay;
    this.available = available;
    this.manufactureYear = manufactureYear;
    this.condition = condition;
    this.user = user;
    this.photos = photos;
    this.rentals = rentals;
  }
}
