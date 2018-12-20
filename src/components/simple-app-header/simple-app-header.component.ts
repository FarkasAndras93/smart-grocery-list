import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { HeaderModel } from '../../model/frontend/common/HeaderModel';

/**
 * Header button types.
 * 
 * @export
 * @enum {number}
 */
export enum HEADER_BUTTON_TYPE {
  BACK = <any>"back",
  MENU_TOGGLE = <any>"menuToggle",
  SAVE = <any>"save",
  SEARCH = <any>"search",
  CLOSE = <any>"close"
}

/**
 * Simple application header component
 *
 * @export
 * @class SimpleAppHeaderComponent
 */
@Component({
  selector: "simple-app-header",
  templateUrl: "simple-app-header.component.html"
})
export class SimpleAppHeaderComponent {

  /**
   * Header object model
   * 
   * @type {HeaderModel}
   * @memberof SimpleAppHeaderComponent
   */
  @Input('header') header: HeaderModel;

  /**
   * Output parameter to know in statistic which tab was clicked.
   * 
   * @type {EventEmitter<any>}
   * @memberof SimpleAppHeaderComponent
   */
  @Output() onBackBtnClick: EventEmitter<any> = new EventEmitter();

  /**
   * Output parameter to know in statistic which tab was clicked.
   * 
   * @type {EventEmitter<any>}
   * @memberof SimpleAppHeaderComponent
   */
  @Output() onSaveBtnClick: EventEmitter<any> = new EventEmitter();

  /**
   * Output parameter to emit search input value on change.
   *
   * @type {EventEmitter<any>}
   * @memberof SimpleAppHeaderComponent
   */
  @Output() searchChange: EventEmitter<any> = new EventEmitter();

  /**
   * Output parameter to emit close button click.
   *
   * @type {EventEmitter<any>}
   * @memberof SimpleAppHeaderComponent
   */
  @Output() onCloseBtnClick: EventEmitter<any> = new EventEmitter();

  /**
   * Reference to search input.
   *
   * @memberof SimpleAppHeaderComponent
   */
  @ViewChild("searchInput") searchInput;

  /**
   * Boolean condition to show search input.
   *
   * @type {boolean}
   * @memberof StatisticMenuPage
   */
  showSearch: boolean = false;

  /**
   * Search input
   * 
   * @type {string}
   * @memberof SimpleAppHeaderComponent
   */
  search: string = "";

  public headerButtonType = HEADER_BUTTON_TYPE;


  constructor(public viewCtrl: ViewController) {
  }

  /**
   * Method to handle back button click.
   * 
   * @private
   * @memberof SimpleAppHeaderComponent
   */
  private onBackButtonClick() {
    this.onBackBtnClick.emit();
  }

  /**
   * Method to handle save button click.
   * 
   * @private
   * @memberof SimpleAppHeaderComponent
   */
  private onSaveButtonClick() {
    this.onSaveBtnClick.emit();
  }

  /**
   * Method to handle close button click.
   *
   * @private
   * @memberof SimpleAppHeaderComponent
   */
  private onCloseButtonClick() {
    this.onCloseBtnClick.emit();
  }

  /**
   * Toggle search input to show or hide.
   *
   * @memberof StatisticMenuPage
   */
  public toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.clearSearch(false);
    }
  }

  /**
   * Method to emit typed value in search input.
   *
   * @memberof SimpleAppHeaderComponent
   */
  public searchType(): void {
    this.searchChange.emit(this.search);
  }

  /**
   * Method to clear search and if param is true then focus the input
   *
   * @param {boolean} focus - param to know if input needs to be focused
   * @memberof SimpleAppHeaderComponent
   */
  public clearSearch(focus: boolean) {
    this.search = "";
    this.searchType();
    if (focus) {
      this.searchInput.setFocus();
    }
  }
}
