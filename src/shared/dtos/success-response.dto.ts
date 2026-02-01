export class SuccessResponseDTO {
  message: string;

  constructor(config: { message: string }) {
    this.message = config.message;
  }
}
