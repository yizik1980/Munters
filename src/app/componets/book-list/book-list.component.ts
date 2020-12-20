import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './../../model/book';
import { BookService } from './../../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];
  fullBookList: Book[];
  editBook: boolean = false;
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getAllBooks.subscribe(allBooks => {
      this.books = allBooks;
      this.fullBookList = allBooks;
    })
  }

  updateBook(book) {
    this.bookService.isEditClicked(true, book);
  }
  filterItem($event) {
    const reg = new RegExp($event.target.value);
    this.books = this.fullBookList.filter(book => reg.test(book.bookName) || reg.test(book.author))
  }
  showBook(book: Book) {
    this.bookService.showCoveTrigger.next(book);
  }
  deleteBook(book: Book) {
    this.bookService.DeleteBook(book.id).subscribe(res => {
      this.bookService.getBooks();
    });
  }

}
