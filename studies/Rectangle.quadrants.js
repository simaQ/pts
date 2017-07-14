Pts.namespace( window );

var space = new CanvasSpace("#pt").setup({retina: true});
var form = space.getForm();

let gp = new Group();
let line1, line2;
let rect1, rect2, rect3;
let poly1;
let circle1, circle2;


space.add( {

  start: (bound, space) => {
    let ux = space.width/20;
    let uy = space.height/20;

    // vertical and horizontal line
    line1 = Group.fromArray( [[-ux, -space.height/3], [ux, space.height/3]] ); 
    line2 = Group.fromArray( [[0, -space.height/2], [0, space.height/2]] ); 
    line3 = Group.fromArray( [[-space.width/3, -uy], [space.width/3, uy]] ); 
    line4 = Group.fromArray( [[-space.width/2, 0], [space.width/2, 0]] ); 
    gp.push( line1, line2, line3, line4 );

    // bounds
    rect1 = Group.fromArray( [[-ux*3, -uy*3], [ux, uy]] ); 
    rect2 = Group.fromArray( [[-ux, -ux], [ux*4, ux*4]] ); 
    gp.push( rect1, rect2 );

    // shapes
    poly1 = Group.fromArray( [[-ux*2, -uy*2], [ux, uy*3], [ux*4, 0], [ux*6, uy*5]] ); 
    gp.push( poly1 );

    for (let i=0, len=gp.length; i<len; i++) {
      gp[i].anchorFrom( space.center );
    }

    circle1 = Circle.fromRect( rect1 );
    circle2 = Circle.fromRect( rect1, true );
    circle3 = Circle.fromRect( rect2, true );
    rect3 = Rectangle.union( [rect1, rect2] );
  },

  animate: (time, fps) => {
    form.stroke("#c1c5ca", 1).fill(false);
    form.lines( [line1, line2, line3, line4, poly1] );
    form.rects( [rect1, rect2, rect3] );
    form.circles( [circle1, circle2, circle3] );
    
    // Begin Test Code --

    rect1[1] = space.pointer;
    
    form.stroke("#f00", 2);
    let rects = Rectangle.quadrants( rect1 );
    form.rects( rects );

    let subs = Rectangle.quadrants( rects[0] );
    form.rects( subs ); 

    let subsubs = Rectangle.quadrants( subs[3] );
    form.rects( subsubs ); 
    
    // End
  },

  action:( type, px, py) => {

  },
  
  resize:( bound, evt) => {
    
  }
  
});
  
space.bindMouse();
space.play();
// space.playOnce(5000);