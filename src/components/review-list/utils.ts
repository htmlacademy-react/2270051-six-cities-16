import {Review} from '../../lib/types/review';

export function sortReviews(reviews: Review[]): Review[] {
  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
