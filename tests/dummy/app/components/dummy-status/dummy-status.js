import Component from "@glimmer/component";

export default class DummyStatusComponent extends Component {
  get badges() {
    return [
      {
        label: `${this.args.model.username}'s custom status`,
      },
    ];
  }
}
