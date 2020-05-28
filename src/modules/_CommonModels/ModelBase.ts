class ModelBase {
  protected _data: any;

  constructor(params = {}) {
    this._data = params;
  }

  public getData() {
    return this._data;
  }
}

export default ModelBase;
