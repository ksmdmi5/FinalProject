export class ReviewOfCustomer {

  id: number;
  workerReview: string;
  workerRating: number;
  title: string;
  recommend: boolean;
  finishedOnTime: boolean;
  skillRental: object;

  constructor(
    id?: number,
    workerReview?: string,
    workerRating?: number,
    title?: string,
    recommend?: boolean,
    finishedOnTime?: boolean,
    skillRental?: object
  ) {
    this.id = id;
    this.workerReview = workerReview;
    this.workerRating = workerRating;
    this.title = title;
    this.recommend = recommend;
    this.finishedOnTime = finishedOnTime;
    this.skillRental = skillRental;
  }
}
