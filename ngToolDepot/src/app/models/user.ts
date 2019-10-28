import { Address } from './address';
import { Tool } from 'src/app/models/tool';
import { ToolRental } from './tool-rental';

export class User {
  id: number;
  username: string;
  password: string;
  enabled: boolean;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo: string;
  createDate: string;
  updateDate: string;
  address: Address;
  tools: Tool[];
  toolRentals: ToolRental[];
  constructor(
    id?: number,
    username?: string,
    password?: string,
    enabled?: boolean,
    role?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    photo?: string,
    createDate?: string,
    updateDate?: string,
    address?: Address,
    tools?: Tool[],
    toolRentals?: ToolRental[]

    ) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.enabled = enabled;
      this.role = role;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phone = phone;
      this.photo = photo;
      this.createDate = createDate;
      this.updateDate = updateDate;
      this.address = address;
      this.tools = tools;
      this.toolRentals = toolRentals;
    }
}
