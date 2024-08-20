export function isValidCommentFormData (
  rating: string,
  review: string,
  minLength: number,
  maxLength: number)
  : boolean {
  return rating !== '' && review.length >= minLength && review.length <= maxLength;
}
