export class ReviewOfLender {
  id: number;
  renterReview: string;
  renterRating: number;
  toolRental: object;

  constructor(
    id?: number,
    renterReview?: string,
    renterRating?: number,
    toolRental?: object
  ) {
    this.id = id;
    this.renterReview = renterReview;
    this.renterRating = renterRating;
    this.toolRental = toolRental;
  }
}
