import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseTypeComponent } from '../base-type/base-type.component';
import { FormlyFieldProps } from '@ngx-formly/core';

interface FileType extends FormlyFieldProps {
  acceptedTypes?: string[];
  multiple?: boolean
}

@Component({
  selector: 'app-file-type',
  templateUrl: './file-type.component.html',
  styleUrls: ['./file-type.component.scss'],
})
export class FileTypeComponent extends BaseTypeComponent<FileType> {
  @ViewChild('fileinput', { static: true }) inputElement!: ElementRef<HTMLInputElement>;

  constructor() {
    super();
  }

  get accept() {
    return this.props.acceptedTypes?.join(',') ?? '.*';
  }

  dropped(fileList?: FileList) {
    if (!fileList) return;
    const currentFiles = Array.from<File>(this.formControl.value ?? []);

    const list = new DataTransfer();
    currentFiles.forEach((file) => {
      list.items.add(file);
    });

    for (const file of Array.from(fileList)) {
      if (this.isValidType(file) && (currentFiles.length === 0 || this.props.multiple)) {
        list.items.add(file);
        currentFiles.push(file);
      }
    }
    this.formControl.patchValue(list.files);
  }

  deleteFile(index: number) {
    const list = new DataTransfer();
    const currentFiles = Array.from<File>(this.formControl.value ?? []);

    currentFiles.splice(index, 1);
    currentFiles.forEach((file: File) => {
      list.items.add(file);
    });

    this.formControl.patchValue(list.files.length ? list.files : null);
  }

  isValidType(file: File) {
    const accept = this.accept;
    if (accept.includes('*')) return true;
    const extension = file.name.split('.').at(-1);
    if (extension && accept.includes('.' + extension)) return true;
    return false;
  }

  getImage(file: any) {
    const images: any = {
      pdf: 'assets/img/file-types/pdf.svg',
      html: 'assets/img/file-types/html.svg',
      txt: 'assets/img/file-types/txt.svg',
      xlsx: 'assets/img/file-types/xlsx.svg',
      xls: 'assets/img/file-types/xls.svg',
      csv: 'assets/img/file-types/csv.svg',
      default: 'assets/img/file-types/default.svg',
    }
    const extension = file.name.split('.').at(-1);
    return images[extension] ?? images.default;
  }
}
