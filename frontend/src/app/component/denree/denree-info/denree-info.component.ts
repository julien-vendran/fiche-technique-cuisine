import {Component, Input, OnInit} from '@angular/core';
import {Denree} from "../../../model/denree";

@Component({
  selector: 'app-denree-info',
  templateUrl: './denree-info.component.html',
  styleUrls: ['./denree-info.component.css']
})
export class DenreeInfoComponent implements OnInit {
  @Input() public denrees:Denree[] =[];
  constructor() { }

  ngOnInit(): void {
  }

}
