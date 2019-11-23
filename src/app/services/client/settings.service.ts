import { Injectable } from '@angular/core';

import { Setting, Instruction } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings: Setting;
  private instructions: Instruction;

  constructor() { }

  setSettings(settings: Setting) {
    this.settings = settings;
  }

  getSettings() {
    return this.settings;
  }

  setInstructions(instructions: Instruction) {
    this.instructions = instructions;
  }

  getInstructions() {
    return this.instructions;
  }
}
