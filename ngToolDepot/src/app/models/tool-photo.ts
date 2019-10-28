export class ToolPhoto {
  id: number;
  photoUrl: string;
  tool: object;

  constructor(
    id?: number,
    photoUrl?: string,
    tool?: object
  ) {
    this.id = id;
    this.photoUrl = photoUrl;
    this.tool = tool;
  }
}
