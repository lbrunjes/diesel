
diesel.proto.screen = {
	//used to store data for use in the click function {x:i,y:i,w:i,h:i,click:fn}
	"clickZones":[],
	
	//called when the screen is changed
	"reset":function(arg){
		this.clearAllContexts();
	},

	//called to draw teh screen
	"draw":function(ticks){
		var i =1;
		for(canvas in diesel.game.context){
			diesel.game.context[canvas].fillStyle= "#ffffff";
			diesel.game.context[canvas].fillText(canvas, 10, diesel.fontSize *2*i);
		}
	},
	//called the update the state of the things in the scene
	"update":function(ticks){
	},
	
	/*
	
	EVENTS START HERE
	
	*/
	
	//called when the object is clicked
	"click":function(evt){
		for(i in this.clickZones){
			if(this.clickZones[i].x < diesel.mouseX 
				&& this.clickZones[i].x + this.clickZones[i].w > diesel.mouseX 
				&& this.clickZones[i].y < diesel.mouseY
				&& this.clickZones[i].y + this.clickZones[i].h > diesel.mouseY){
					
					this.clickZones[i].click();
				}
			}
	},
	
	//called when a screen is created.
	"open":function(event){
	
	},
	//called when  screen is closed.
	"close":function(evt){
	
	},
	//called at reset
	"reset":function(){

	},
	
	
	
	
	//draws the selected text centred horizontally on a point.
	fillTextCentered:function(ctx, text, x,y){
		var len = ctx.measureText(text).width;
		ctx.fillText(text, x -len/2,y);
	},
	
	//remvoes data from all canvases
	"clearAllContexts":function(){
		for(canvas in diesel.game.context){
			diesel.game.context[canvas].clearRect(0,0,
				diesel.game.width, diesel.game.height);
		}
	},
	
	//highlights the zones in the screen
	"drawClickZones":function(ctx){
		var fill = ctx.fillStyle;
	
		for(i in this.clickZones){
			ctx.fillRect(this.clickZones[i].x,this.clickZones[i].y,this.clickZones[i].w,this.clickZones[i].h);
			ctx.fillStyle = "#000000";
			if(this.clickZones[i].h >=diesel.fontSize *2){
			ctx.fillText(i, this.clickZones[i].x +this.clickZones[i].w/2,this.clickZones[i].y +this.clickZones[i].h/2);
			
			}
			else{
				ctx.fillText(i, this.clickZones[i].x +this.clickZones[i].w/2,this.clickZones[i].y +this.clickZones[i].h);
			}
			ctx.fillStyle =fill;
		}
	},

	//draw left aligned text in the box
	//overflowing text is removed
	"drawParagraph":function(ctx, text, x, y, w, h){
		var lines = [], testingLine, last = 0;

		for(var i=0; i < text.length;i++){
			testingLine = text.substring(last, i);
			if(ctx.measureText(testingLine) >= w){
				lines.add(text.substring(last, i-1));
				last = i-1;
			}
		}

		var Y=0;


		for(var i = 0;i <lines.length && Y < h ;i++){
			ctx.fillText(lines[i],x,Y,w);
			Y+= diesel.fontSize;
		}


	}

};

