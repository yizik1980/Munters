import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book.service';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  @Input()
  title: string;

  constructor(private bookService: BookService) { }


  ngOnInit(): void {
    this.bookService.getBooks();
  }
  showCrrentBook() {
    this.bookService.showCoveTrigger.next(new Book());
  }

}
