import { assert } from "@ember/debug";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { task, lastValue } from "ember-concurrency";

export default class DataTableComponent extends Component {
  @service store;
  @service router;
  @service emeisOptions;

  @tracked numPages;
  @tracked internalSearch;
  @tracked internalPage = 1;
  @lastValue("fetchData") models;

  get page() {
    return this.args.page || this.internalPage;
  }
  set page(page) {
    if (this.args.updatePage) {
      this.args.updatePage(page);
    } else {
      this.internalPage = page;
    }
  }

  get search() {
    return this.args.search || this.internalSearch;
  }
  set search(search) {
    if (this.args.updateSearch) {
      this.args.updateSearch(search);
    } else {
      this.internalSearch = search;
    }
  }

  get isLoading() {
    return this.fetchData.isRunning;
  }

  get nextPage() {
    if (this.page < this.numPages) {
      return this.page + 1;
    }
    return null;
  }

  get previousPage() {
    if (this.page > 1) {
      return this.page - 1;
    }
    return null;
  }

  @task
  *fetchData() {
    assert(
      "Must pass a model name as string",
      typeof this.args.modelName === "string"
    );

    const options = {
      page: {
        number: this.page,
        size: this.emeisOptions.pageSize,
      },
      filter: { search: this.search, ...(this.args.filter || {}) },
      sort: this.args.sort,
      include: this.args.include || "",
    };

    const data = yield this.store.query(this.args.modelName, options);

    this.numPages = data.meta.pagination.pages;

    return data;
  }

  @action
  updateSearch(submitEvent) {
    // Prevent reaload because of form submit
    submitEvent.preventDefault();
    this.search = submitEvent.target.elements.search.value;
  }
}
