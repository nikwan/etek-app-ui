import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-component',
  templateUrl: './demo-component.component.html',
  styleUrls: ['./demo-component.component.css']
})
export class DemoComponentComponent implements OnInit {

  @Input() msg!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
