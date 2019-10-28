export class ReviewOfRenter {
  id: number;
  toolReview: string;
  toolRating: number;
  lenderReview: string;
  lenderRating: number;
  toolRental: object;

  constructor(
    id?: number,
    toolReview?: string,
    toolRating?: number,
    lenderReview?: string,
    lenderRating?: number,
    toolRental?: object
  ) {
    this.id = id;
    this.toolReview = toolReview;
    this.toolRating = toolRating;
    this.lenderReview = lenderReview;
    this.lenderRating = lenderRating;
    this.toolRental = toolRental;
  }
}
