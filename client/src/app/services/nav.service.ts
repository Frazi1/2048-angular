import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class NavService {

  actions = []

  constructor() { }

  public addActionButton(buttonText: string, action: () => void): number {
    const actionMapping = {id: this.actions.length, buttonText, action}
    this.actions.push(actionMapping)
    return actionMapping.id
  }

  public removeActionButton(id: number): void {
    this.actions = this.actions.filter(m => m.id !== id)
  }
}
