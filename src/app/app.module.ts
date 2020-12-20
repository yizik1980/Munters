import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { BookService } from "./service/book.service";
import { BookHandlerComponent } from './componets/book-handler/book-handler.component';
import { BookListComponent } from './componets/book-list/book-list.component'
import { LibraryComponent } from './componets/library/library.component';
import { BookCoverComponent } from './componets/book-cover/book-cover.component';

@NgModule({
  declarations: [
    AppComponent,
    BookHandlerComponent,
    BookListComponent,
    LibraryComponent,
    BookCoverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
