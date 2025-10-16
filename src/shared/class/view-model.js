import { reactive } from "vue";

export class ViewModel {
  constructor() {
    return reactive(this);
  }
}
