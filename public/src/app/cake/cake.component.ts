import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent implements OnInit {
  @Input() cake: any;
  @Input() avg: any;
  @Input() rating: boolean;
  constructor() { }

  ngOnInit() {
  }
}
