import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-parent',
  templateUrl: './demo-parent.component.html',
  styleUrls: ['./demo-parent.component.css']
})
export class DemoParentComponent implements OnInit {
  msg = 'Aadhaar Input';

  constructor() { }

  ngOnInit(): void {
  }

}
