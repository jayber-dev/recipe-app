import { Component,Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-prices-table',
  templateUrl: './prices-table.component.html',
  styleUrls: ['./prices-table.component.scss']
})
export class PricesTableComponent implements OnInit {

  @Input() ingredients:any

  ngOnInit(): void {
    console.log(this.ingredients);
    
  }
}
