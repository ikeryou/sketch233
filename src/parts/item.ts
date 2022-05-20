
import { MyDisplay } from "../core/myDisplay";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _id:number;
  private _data:Array<Array<number>> = [];
  private _tag:Array<HTMLElement> = [];
  private _nowTag:HTMLElement | undefined;

  constructor(opt:any) {
    super(opt)

    this._id = opt.id;
    this._data = opt.data;

    this._c = this._id * 5;

    this._data.forEach((val) => {
      let tag = '';
      for(let i = 0; i < val.length; i++) {
        tag += val[i] == 0 ? '_' : Util.instance.randomArr(['A','B','C']);
      }
      const el = document.createElement(tag);
      this._tag.push(el);
    })
  }


  protected _update(): void {
    super._update();

    if(this._nowTag != undefined) {
      this._nowTag.remove();
    }

    const c = ~~(this._c / 5);
    this._nowTag = this._tag[c % this._tag.length];
    this.getEl().append(this._nowTag);
  }
}