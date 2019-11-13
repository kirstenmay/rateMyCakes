import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  getAllCakes(){
    return this._http.get('/api/cakes');
  }
  getOneCake(id){
    return this._http.get(`/api/cakes/${id}`);
  }
  newCake(newCake){
    return this._http.post('/api/cakes/new', newCake);
  }
  addReview(id, review){
    return this._http.put(`/api/cakes/${id}/review`, review);
  }
  removeCake(id){
    return this._http.delete(`/api/cakes/${id}/delete`);
  }
  findByName(baker){
    return this._http.get(`/api/cakes/${baker}`);
  }
}
