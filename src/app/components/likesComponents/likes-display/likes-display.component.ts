import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-likes-display',
  templateUrl: './likes-display.component.html',
  styleUrls: ['./likes-display.component.scss']
})
export class LikesDisplayComponent implements OnInit {

  @Input() likesCount : number

  ngOnInit(): void {
      
  }

}
