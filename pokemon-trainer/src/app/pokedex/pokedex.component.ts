import { Component } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {
  pageNum:number = 0;


  public applyFlipForward(page:any){

    console.log(page.parentNode.nextElementSibling.class);
    page.parentNode.nextElementSibling.classList.add("page-flip");
    page.parentNode.nextElementSibling.classList.add("left-side");
    page.parentNode.classList.add("page-flip");

    this.pageNum++;
  }

}
