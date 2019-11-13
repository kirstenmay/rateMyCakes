import { Component, OnInit } from '@angular/core';
import {HttpService} from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  avgRating: any;
  title = 'public';
  allCakes: any;
  newCake: any;
  newReview: any;
  oneCake: any;
  display: boolean;
  error: any;
  newError: boolean;
  revError: boolean;
  rate: boolean;
  baker: any;

  constructor(private _httpService: HttpService) {}
  ngOnInit(){
    this.getAllCakesFromService();
    this.avgRating = 0;
    this.allCakes = [];
    this.newCake = {baker: "", imgUrl: ""};
    this.newReview = {rating: "", comment: ""};
    this.oneCake = {baker: "", imgUrl: ""};
    this.display = false;
    this.error = "";
    this.newError = false;
    this.revError = false;
    this.rate = false;
    this.baker = "";
  }

  find(){
    console.log(this.baker)
    let observable = this._httpService.findByName(this.baker);
    observable.subscribe((data: any) => {
      console.log("did we find anything", data.result)
      if(data.message === "success"){
        console.log("Trying to find baker by name", data.result);
        this.allCakes = data.result;
      }
    })
  }

  hide(){
    this.display = false;
  }

  getAllCakesFromService(){
    let observable = this._httpService.getAllCakes();
    observable.subscribe((data: any) => {
      if (data.message === "success") {
        console.log(data.result);
        this.allCakes = data.result;
      }
    })
  }
  makeNewCake(){
    let observable = this._httpService.newCake(this.newCake);
    observable.subscribe((data: any) => {
      if(data.message === "We have an error"){
        this.revError = false;
        this.error = "Invalid form submission. Baker and Url fields are required";
        this.newError = true;
      }
      else if (data.message === "success") {
        console.log("We made a new cake!", data.result);
        this.newError = false;
      }
      this.newCake = {baker: "", imgUrl: ""};
      this.getAllCakesFromService();
    })
  }
  addCakeReview(id){
    let observable = this._httpService.addReview(id, this.newReview);
    observable.subscribe((data: any) => {
      if(data.message === "We have an error"){
        this.newError = false;
        this.error = "Invalid review submission. Rating and comment are required"
        this.revError = true;
      }
      else if(data.message === "success"){
        console.log("A new review!", data.result)
        this.revError = false;
      }
      this.newReview = {rating: "", comment: ""}
    })
  }
  showDetails(id){
    let observable = this._httpService.getOneCake(id);
    observable.subscribe((data: any) => {
      if(data.message === "success"){
        this.newError = false;
        this.revError = false;
        console.log("Got one cake", data.result)
        this.oneCake = data.result;
        this.getAvgRating(this.oneCake.reviews);
        if(this.oneCake.reviews.length > 0){
          this.rate = true;
        }
        else{
          this.rate = false;
        }
      }
    })
  }
  getAvgRating(reviews){
    var sum = 0;
    var count = 0;
    for(var rate of reviews){
      sum += rate.rating;
      count ++;
    }
    this.avgRating = sum/count;
    this.display = true;
  }
}


