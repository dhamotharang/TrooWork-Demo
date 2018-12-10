import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }
 
  submitReview(obj)
  {
    const uri = "http://localhost:3000/api/addReview";
    return this.http.post(uri, obj);
  }

}
