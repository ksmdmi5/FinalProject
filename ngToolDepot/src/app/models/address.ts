export class Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zip: number;
  country: string;

  constructor(
    id?: number,
    street?: string,
    city?: string,
    state?: string,
    zip?: number,
    country?: string
  ) {
    this.id = id;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.country = country;
  }
}
