import { style } from '@angular/animations';
import { Component,OnInit,Input } from '@angular/core';
import { Router} from '@angular/router'
// import { loadScript,API } from '@paypal/paypal-js';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-paypal-btn',
  templateUrl: './paypal-btn.component.html',
  styleUrls: ['./paypal-btn.component.scss']
})
export class PaypalBtnComponent implements OnInit{
  constructor(
    private router:Router
  ){}
  
  @Input() donationLink:string
  
  ngOnInit(): void {
    }
}
