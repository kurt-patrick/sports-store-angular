import { OrderSubmissionProduct } from './order-submission-product';

export class OrderSubmission {

  constructor() { }

  orderId: string;
  userId: number;
  products: OrderSubmissionProduct[] = [];

}
