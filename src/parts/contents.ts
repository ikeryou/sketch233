import { MyDisplay } from "../core/myDisplay";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  constructor(opt:any) {
    super(opt)

    const table:Array<Array<number>> = [];

    // 画像解析
    const img:HTMLImageElement = new Image();
    img.onload = () => {
      const cvs:any = document.createElement('canvas');
      cvs.width = img.width;
      cvs.height = img.height;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(img, 0, 0);
      img.style.display = 'none';

      const imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const key = ~~(i / 4)
        let ix = ~~(key % cvs.width)
        let iy = ~~(key / cvs.width)

        if(iy % 2 == 0) {
          // let r = data[i + 0] // 0 ~ 255
          // let g = data[i + 1] // 0 ~ 255
          // let b = data[i + 2] // 0 ~ 255
          const a = data[i + 3] // 0 ~ 255

          if(table[iy] == undefined) table[iy] = [];
          table[iy][ix] = a > 0 ? 1 : 0;
        }
      }



      const newTable:Array<Array<number>> = [];
      table.forEach((val) => {
        if(val != undefined) {
          newTable.push(val);
        }
      });

      const len = ~~(table.length * 0.5);
      for(let i = 0; i < len; i++) {
        new Item({
          el:this.getEl(),
          id:i,
          data:newTable,
        })
      }
    }

    img.src = './assets/img/sample_0.png';

    this._resize();
  }
}