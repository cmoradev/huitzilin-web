import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-concept-option',
  imports: [MatCheckboxModule, MatRippleModule],
  templateUrl: './concept-option.component.html',
  styleUrls: ['./concept-option.component.scss'],
})
export class ConceptOptionComponent {
  public select(event: MouseEvent): void {
    event.stopPropagation();

  }
}
