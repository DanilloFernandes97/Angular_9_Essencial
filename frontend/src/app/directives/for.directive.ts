// Exemplo do uso de uma diretiva estrutural
// <ul>
//   <li *myFor="let n em [1, 2 ,3] usando'teste'">{{ n }}  </li>        
// </ul>

import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myFor]'
})

export class ForDirective implements OnInit {
  
  // Colocando o myForEm, dessa forma tudo que for depois da palavra "em", o input vai conseguir pegar, exemplo: let n em [1, 2 ,3]
  @Input('myForEm') numbers: number[];
  // Colocando o myForUsando, dessa forma tudo que for depois da palavra "usando", o input vai conseguir pegar, exemplo: let n em [1, 2 ,3] usando'teste'
  @Input('myForUsando') texts: string[];
  
  /// Lembrando que o a palavra "em" pode ser qualquer coisa.

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {
    
    console.log("myFor")
    
  }
  
  ngOnInit(): void {

    for (let number of this.numbers) {
      // cria o <li>, o segundo parâmetro pega o valor implícito do laço como no HTML eu chamei a variável de N ({{ n }}), essa variável vai ter acesso esse valor, o 1, 2 e 3.
      // Portanto, a diretiva meio que signifiaria isso = *myFor="let n = $implicit(1, 2 ,3), ela pega o valor implícito gerado pela diretiva.
      this.container.createEmbeddedView(this.template, { $implicit: number } );
    }

    console.log(this.numbers);
    console.log(this.texts);
  }
  
}
