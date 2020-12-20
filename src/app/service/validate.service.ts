import { Injectable } from '@angular/core';
import { Book, errorModel, validationConstrains } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  // validation
  error = new errorModel();
  constructor() { }
  validate(book: Book): boolean {
    const constrainsName = new validationConstrains({ prop: 'bookName', content: book.bookName, isReqire: true, errorMsg: 'book Name is missing' });
    const constrainsAuthor = new validationConstrains({ prop: 'author', content: book.author, isReqire: true, errorMsg: 'Author Name is missing' });
    const constrainsCoverPhoto = new validationConstrains({ prop: 'coverPhoto', content: book.coverPhoto, isReqire: true, errorMsg: 'cover Photo  is missing' });
    return this.error.validate(constrainsName) && this.error.validate(constrainsAuthor) && this.error.validate(constrainsCoverPhoto);
  }
}
