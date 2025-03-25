import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [NgStyle],
  templateUrl: './avatar.component.html',
  styles: ``
})
export class AvatarComponent {
  @Input({ required: true }) imageSource!: string;
  @Input({ required: false }) width = '2rem';
  @Input({ required: false }) height = '2rem';
}
