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
  @tracked internalSort;

  // While using 'useTask' we ended up in an infinite loop.
  // data = useTask(this, this.fetchData, () => [this.args.filter]);
  data = useFunction(this, this.fetchData.perform, () => [
    this.args.filter,
    this.search,
    this.sort,
    this.page,
  ]);

  get sort() {
    return (
      this.internalSort ||
      this.router?.currentRoute?.queryParams?.sort ||
      this.args.defaultSort
    );
  }

  get page() {
    return this.args.page || this.internalPage;
  }

  get search() {
    return this.args.search || this.internalSearch;
  }

  set sort(sort) {
    if (this.args.updateSort) {
      this.args.updateSort(sort);
    }
    this.internalSort = sort;
  }

  set search(search) {
    if (this.args.updateSearch) {
      this.args.updateSearch(search);
    } else {
      this.internalSearch = search;
    }
  }

  set page(page) {
    if (this.args.updatePage) {
      this.args.updatePage(page);
    } else {
      this.internalPage = page;
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

    try {
      let includes = this.args.include;
      if (this.args.include && Array.isArray(this.args.include)) {
        includes = this.args.include.join(",");
      }

      let options = {
        filter: { search: this.search, ...(this.args.filter || {}) },
        sort: this.sort,
        include: includes,
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
    } catch (error) {
      console.error(
        "Non-standard JSON:API response while fetching table data.",
        error
      );
    }
  }

  @action
  updateSort(sortLabel) {
    if (this.args.updateSort) {
      this.args.updateSort(sortLabel);
    }

    const invers = this.sort[0] === "-";

    if (
      this.sort === sortLabel ||
      (invers && this.sort.slice(1) === sortLabel)
    ) {
      if (invers) {
        this.internalSort = undefined;
      } else {
        this.internalSort = `-${sortLabel}`;
      }
    } else {
      this.internalSort = sortLabel;
    }
  }

  @action
  updateSearch(submitEvent) {
    // Prevent reload because of form submit
    submitEvent.preventDefault();
    this.search = submitEvent.target.elements.search.value;
  }

  @action
  resetSearch(event) {
    event.preventDefault();
    this.search = "";
  }

  @action
  updatePage(page) {
    this.page = page;
  }
}
