import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-cover',
  templateUrl: './book-cover.component.html',
  styleUrls: ['./book-cover.component.css']
})
export class BookCoverComponent implements OnInit, OnDestroy {
  @Input()
  ImgSrc: string | ArrayBuffer;
  show: boolean;
  showCoverSubscriber$: Subscription;
  constructor(private bookservice: BookService) { }
  ngOnDestroy(): void {
    this.showCoverSubscriber$.unsubscribe();
  }

  ngOnInit(): void {
    this.showCoverSubscriber$ = this.bookservice.showCoveTrigger.subscribe(book => {
      this.show = !!book.coverPhoto;
      this.ImgSrc = book.coverPhoto;
    })
  }

}
