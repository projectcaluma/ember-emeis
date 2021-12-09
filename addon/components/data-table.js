import { assert } from "@ember/debug";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { task } from "ember-concurrency";
import { useFunction } from "ember-resources";

export default class DataTableComponent extends Component {
  @service store;
  @service router;
  @service emeisOptions;

  @tracked numPages;
  @tracked internalSearch;
  @tracked internalPage = 1;

  // While using 'useTask' we ended up in an infinite loop.
  // data = useTask(this, this.fetchData, () => [this.args.filter]);
  data = useFunction(this, this.fetchData.perform, () => [
    this.args.filter,
    this.page,
    this.search,
  ]);

  get page() {
    return this.args.page || this.internalPage;
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

    let options = {
      filter: { search: this.search, ...(this.args.filter || {}) },
      sort: this.args.sort,
      include: this.args.include || "",
    };

    if (!this.search) {
      options = {
        ...options,
        page: {
          number: this.page,
          size: this.emeisOptions.pageSize,
        },
      };
    }

    const data = yield this.store.query(this.args.modelName, options);

    this.numPages = data.meta.pagination?.pages;

    return data;
  }

  @action
  updateSearch(submitEvent) {
    // Prevent reload because of form submit
    submitEvent.preventDefault();
    this.search = submitEvent.target.elements.search.value;
    this.fetchData.perform();
  }

  @action
  updatePage(page) {
    if (this.args.updatePage) {
      this.args.updatePage(page);
    } else {
      this.internalPage = page;
    }
    this.fetchData.perform();
  }
}
