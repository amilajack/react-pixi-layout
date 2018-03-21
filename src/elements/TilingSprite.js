import * as PIXI from 'pixi.js';
import Container from './Container';

export default class TilingSprite extends Container {

  createDisplayObject () {
    return new PIXI.extras.TilingSprite(PIXI.Texture.EMPTY);
  }

  applyProps (oldProps, newProps) {
    super.applyProps(oldProps, newProps);
    const texture = newProps.texture ? PIXI.Texture.fromImage(newProps.texture) : null;
    this.displayObject.texture = texture;
  }

  onLayout (x, y, width, height) {
    super.onLayout(x, y, width, height);
    if (this.displayObject.texture) {
      this.displayObject.width = width * this.scaleX;
      this.displayObject.height = height * this.scaleY;
    }
  }


};
