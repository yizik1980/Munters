
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book, errorModel } from './../../model/book';
import { BookService } from './../../service/book.service';
import { ValidateService } from './../../service/validate.service';

@Component({
  selector: 'app-book-handler',
  templateUrl: './book-handler.component.html',
  styleUrls: ['./book-handler.component.css']
})
export class BookHandlerComponent implements OnInit, OnDestroy {
  book: Book;
  updateBookObj: any;
  error = new errorModel();
  isNew: boolean;
  bookSubscribe: Subscription;
  constructor(private bookService: BookService, private validationService: ValidateService) {
    this.book = new Book();
    this.isNew = true;
  }
  ngOnDestroy(): void {
    this.bookSubscribe.unsubscribe();
  }

  ngOnInit() {
    this.bookSubscribe = this.bookService.showCoveTrigger.subscribe(book => {
      this.book = book;
      this.isNew = false
    });
  }
  saveBook() {
    if (this.validationService.validate(this.book)) {
      this.book.catalogNumber = Math.floor(Math.random() * 10666600);
      this.bookService.addBook(this.book).subscribe(result => {
        this.bookService.getBooks();
      });
    }
    this.error = this.validationService.error;
  }
  updateBook() {
    if (this.validationService.validate(this.book)) {
      this.book.catalogNumber = Math.floor(Math.random() * 10666600);
      this.bookService.updateBook(this.book).subscribe(result => {
        this.bookService.getBooks();
      });
    }
    this.error = this.validationService.error;
  }



  uploadFile($event) {
    const inputValue = $event.target;
    const file: File = inputValue.files[0];
    if (file.size < 20000) {
      const Reader: FileReader = new FileReader();
      this.book.fileName = file.name;
      Reader.onloadend = (e) => {
        this.book.coverPhoto = e.target.result.toString();
      }
      Reader.readAsDataURL(file);
    } else {
      this.error.coverPhoto = 'The file is too large'
    }

  }
}
