import { Injectable } from '@angular/core';
import { ClientsService } from '@shared/services/clients.service';
import { DaysService } from '@shared/services/days.service';
import { combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoPageService {
  constructor(
    private clientService: ClientsService,
    private daysService: DaysService
  ) {}

  getData() {
    const days = this.daysService.getActiveDaysOptions();
    const clients = this.clientService.getActiveClientsOptions();
    return combineLatest([days, clients]);
  }
}
