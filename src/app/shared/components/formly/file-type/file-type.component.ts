import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseTypeComponent } from '../base-type/base-type.component';

interface FileType {

}

@Component({
  selector: 'app-file-type',
  templateUrl: './file-type.component.html',
  styleUrls: ['./file-type.component.scss'],
})
export class FileTypeComponent
  extends BaseTypeComponent<FileType>
  implements OnInit, AfterViewInit
{
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
  }
}
