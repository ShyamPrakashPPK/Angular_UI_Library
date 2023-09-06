import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

interface Star {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
}

@Component({
  selector: 'app-connecting-dots',
  templateUrl: './connecting-dots.component.html',
  styleUrls: ['./connecting-dots.component.css']
})
export class ConnectingDotsComponent implements OnInit{
 private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private x = 100;

  // use this to adjust the speed of movements
  private FPS = 50;
  private mouse = { x: 0, y: 0 };

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // Get the canvas element from the template using Renderer2
    this.canvas = this.renderer.selectRootElement('#Canvas1');

    if (!this.canvas) {
      console.error('Canvas element not found.');
      return;
    }
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    for (let i = 0; i < this.x; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25
      });
    }
    this.tick();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalCompositeOperation = 'lighter';

    for (let i = 0, x = this.stars.length; i < x; i++) {
      const s = this.stars[i];

      this.ctx.fillStyle = '#fff';
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.fillStyle = 'black';
      this.ctx.stroke();
    }

    this.ctx.beginPath();
    for (let i = 0, x = this.stars.length; i < x; i++) {
      const starI = this.stars[i];
      this.ctx.moveTo(starI.x, starI.y);
      if (this.distance(this.mouse, starI) < 150) this.ctx.lineTo(this.mouse.x, this.mouse.y);
      for (let j = 0, x = this.stars.length; j < x; j++) {
        const starII = this.stars[j];
        if (this.distance(starI, starII) < 150) {
          this.ctx.lineTo(starII.x, starII.y);
        }
      }
    }
    this.ctx.lineWidth = 0.05;
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
  }

  private update() {
    for (let i = 0, x = this.stars.length; i < x; i++) {
      const s = this.stars[i];

      s.x += s.vx / this.FPS;
      s.y += s.vy / this.FPS;

      if (s.x < 0 || s.x > this.canvas.width) s.vx = -s.vx;
      if (s.y < 0 || s.y > this.canvas.height) s.vy = -s.vy;
    }
  }

  private tick() {
    this.draw();
    this.update();
    requestAnimationFrame(() => this.tick());
  }

  private distance(point1:any, point2:any) {
    let xs = 0;
    let ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
  }
}
