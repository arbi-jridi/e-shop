import { Component , OnInit,ElementRef,AfterViewInit, ViewChild,Renderer2} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('scroller') scrollerElement!: ElementRef<HTMLDivElement>; 


  ngOnInit(){
    setInterval(() => {
      this.countdown();
    }, 1000);

    

this.addAnimation();
window.addEventListener('resize', () => {
  this.windowHeight = window.innerHeight;
});

  }

constructor(private elementRef: ElementRef,private renderer: Renderer2){}





ngAfterViewInit(): void {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setTimeout(() => this.addAnimation(), 0);
  }

}


   windowHeight=window.innerHeight;

   days=Math.floor(Math.random() * 6) + 1;
   hours=Math.floor(Math.random() * 22) + 1;
   minutes=Math.floor(Math.random() * 57) + 1;
   secondes = Math.floor(Math.random() * 58) + 1;

    countdown() {
     this.secondes--;
     if (this.secondes == 0) {
      this.secondes = 59;
       this.minutes--;}
       if (this.minutes == 0) {
        this.minutes = 59;
         this.hours--;}
      }

      
      
addAnimation() {
  const scroller = this.scrollerElement.nativeElement;
  const scrollerInner = scroller.querySelector('.scroller__inner');
  if (scrollerInner) {
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as Element;
      this.renderer.setAttribute(duplicatedItem, 'aria-hidden', 'true');
      this.renderer.appendChild(scrollerInner, duplicatedItem);
    });

    this.renderer.setAttribute(scroller, 'data-animated', 'true');
  }
}
}
