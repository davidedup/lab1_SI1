import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  botaoClicado(){
    alert('Botaõ clicado!!!')
  }

  onKeyUp(evento: KeyboardEvent){
    console.log(evento);
  
  }

}
