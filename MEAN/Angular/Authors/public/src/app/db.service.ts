import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //<--


@Injectable()
export class DbService {

  constructor( private _http: HttpClient ) {}

  getAuthors(){
    return this._http.get('/author');
  }
  createAuthor(newAuthor){
    return this._http.post('/author', newAuthor);
  }
  getAuthorByID(the_id){
    return this._http.get('/author/'+the_id);
  }
  updateAuthor(theAuthor){
    return this._http.put('/author/'+theAuthor.id, {name: theAuthor.name});
  }
  deleteAuthorByID(the_id){
    return this._http.delete('/author/'+the_id);
  }
  pushQuote(data){
    return this._http.post('/author/'+data.id+'/quote', {quote: data.quote});
  }
  voteUp(quote_id, num){
    return this._http.put('/quote/'+quote_id, {num: num});
  }
  voteDown(quote_id){
    return quote_id;
  }
  deleteQuoteByID(quote_id){
    return this._http.delete('/quote/'+quote_id);
  }
}
