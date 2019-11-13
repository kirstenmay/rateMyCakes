import { Component, OnInit } from '@angular/core';
import {HttpService} from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  allCakes: any;
  newCake: any;
  newReview: any;
  oneCake: any;

  constructor(private _httpService: HttpService) {}
  ngOnInit(){
    this.getAllCakesFromService();
    this.allCakes = [];
    this.newCake = {baker: "", imgUrl: ""};
    this.newReview = {rating: "", comment: ""};
    this.oneCake = {baker: "", imgUrl: ""};
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
      if (data.message === "success") {
        console.log("We made a new cake!", data.result);
      }
      this.newCake = {baker: "", imgUrl: ""};
      this.getAllCakesFromService();
    })
  }
  addCakeReview(id){
    let observable = this._httpService.addReview(id, this.newReview);
    observable.subscribe((data: any) => {
      if(data.message === "success"){
        console.log("A new review!", data.result)
      }
      this.newReview = {rating: "", comment: ""}
    })
  }
  showDetails(id){
    let observable = this._httpService.getOneCake(id);
    observable.subscribe((data: any) => {
      if(data.message === "success"){
        console.log("Got one cake", data.result)
        this.oneCake = data.result;
      }
    })
  }
}


