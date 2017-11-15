import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-sio',
  templateUrl: './detail-sio.component.html',
  styleUrls: ['./detail-sio.component.css']
})
export class DetailSIOComponent implements OnInit {

  SIO: number;

  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.SIO = Number.parseInt(params['id']);
    });
  }

}
