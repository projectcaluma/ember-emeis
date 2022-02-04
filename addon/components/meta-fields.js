import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";

export default class EditFormComponent extends Component {
  @service intl;

  @action
  updateMetaField(field, model, optionOrEvent) {
    const value = optionOrEvent?.target?.value ?? optionOrEvent?.value;
    model.metainfo = { ...model.metainfo, [field.slug]: value };
    model.notifyPropertyChange("metainfo");
  }
}
