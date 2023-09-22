import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IActionCellEvents } from './ICoaAgGrid';
import {TooltipModule} from 'primeng/tooltip';

@Component({
  selector: 'action-cell',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, TooltipModule],
  templateUrl: './action-cell.component.html',
  styleUrls: ['./action-cell.component.scss'],
})
export class ActionCellComponent
  implements AfterViewInit, OnDestroy, ICellRendererAngularComp
{
  @ViewChild('span') span!: ElementRef;
  private _iconsWidth: number = 0;
  protected _fits: boolean = true;
  protected _actionCellEvents!: IActionCellEvents;
  protected _actions!: string[];
  private _observer!: ResizeObserver;
  params!: any;

  constructor() {}

  ngAfterViewInit(): void {
    // Calculate total width that icons needs to be shown
    const gap = 6;
    const length = this._actions.length;
    this._iconsWidth = length * 24 + (length - 1) * gap;

    // Check span size and determine whether icons fits in it or not
    this._observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      this._fits = this._iconsWidth <= width;
    });
    this._observer.observe(this.span.nativeElement);
  }

  ngOnDestroy(): void {
    this._observer.unobserve(this.span.nativeElement);
  }

  agInit(params: any): void {
    const defaultActions: string[] =
      params.colDef.cellRendererParams.defaultActions ?? [];
    this._actionCellEvents =
      params?.colDef?.cellRendererParams?.actionCellEvents;
    this._actions = params?.value ?? defaultActions;
    this.params = params;
  }

  refresh(params: any): boolean {
    const defaultActions: string[] =
      params.colDef.cellRendererParams.defaultActions ?? [];
    this._actionCellEvents =
      params?.colDef?.cellRendererParams?.actionCellEvents;
    this._actions = params?.value ?? defaultActions;
    return true;
  }

  /** Execute the action */
  click(action: string) {
    this.params?.colDef?.cellRendererParams?.actionCellEvents?.[
      action
    ]?.onAction?.(action, this.params.data);
  }
}
