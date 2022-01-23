
import rotateX from 'react-p5';
import rotateY from 'react-p5';

function sketch(p){
    
    
    p.setup=function(){

       let cnv= p.createCanvas(50,50,p.WEBGL);
       cnv.position(0,0);

    };

    p.draw = function(){
      p.background(0,0,0,1);
      p.stroke(255,0,0);
      p.fill(240, 150, 150,1);
      p.rotateX(p.frameCount * 0.04);
      p.rotateY(p.frameCount * 0.04);
      p.box(20,20,20);
  
      
      

    };
    
};

export default sketch;