import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Book } from '../model/book';

import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  isEditClickedSubject = null;
  isEditClickedObservable = null;
  updateBookObj = { isEditClicked: false, book: null }

  // show cover on its component
  showCoveTrigger = new Subject<Book>();
  getAllBooks = new Subject<Book[]>();
  private baseUrl = environment.serviceUrl;
  constructor(private http: HttpClient) {
    this.isEditClickedSubject = new BehaviorSubject(this.updateBookObj);
    this.isEditClickedObservable = this.isEditClickedSubject.asObservable();
  }

  isEditClicked(editClicked: boolean, book: Book) {
    this.updateBookObj = { "isEditClicked": editClicked, "book": book };
    this.isEditClickedSubject.next(this.updateBookObj);
  }
  public getBooks() {
    return this.http.get<Book[]>(this.baseUrl + '/books').subscribe(result => {
      this.getAllBooks.next(result);
    },
      (err) => console.log(err));
  }
  public addBook(book: Book) {
    return this.http.post<Book>(this.baseUrl + '/books', book);
  }
  public updateBook(book: Book) {
    return this.http.put(`${this.baseUrl}/books/${book.id}`, book);
  }
  public DeleteBook(id: number) {
    return this.http.delete(`${this.baseUrl}/books/${id}`);
  }

}