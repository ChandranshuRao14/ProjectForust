import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'navlink',
  templateUrl: './navlink.component.html',
  styleUrls: ['./navlink.component.css']
})
export class NavlinkComponent implements OnInit {

  @Input() name: string;
  @Input() out: string;
  isActive: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
