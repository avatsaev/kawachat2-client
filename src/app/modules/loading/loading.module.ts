
import { Component, NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-loading',
  template: `

    <div class='tile is-vertical is-parent  is-12 is-fullheight is-fullwidth is-mobile' >
      <button  class='column button is-large is-outlined is-loading is-dark' >
      </button>
    </div>

  `,
  styles: [`
    .tile{
      height: calc(100vh - 52px)
    }
    .button{
      border: none
    }
  `],
  moduleId: module.id
})

export class LoadingComponent {

  constructor() { }

}


@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: 'loading', component: LoadingComponent}
    ])
  ]

})

export class LoadingModule {}
