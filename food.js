class Foods{
    constructor(){
        this.foodstock = 0;
        this.lastfed;

        this.image = loadImage("Milk.png");
    }
    updateFoodStock(foodstock){
        this.foodstock = foodstock;
    }
    getFeedTime(lastfed){
        this.lastfed = lastfed;
    }
    deductFoodStock(){
        if(this.foodstock>0){
          this.foodstock=this.foodstock-1;
        }
    }
    getFoodStock(){
        return this.foodstock;
    }
    
    
    display(){
        background(46,139,87);

        fill("white");
        textSize(20);
        text("Press UP arrow key to feed Tommy the dog",30,80);
        text("Food left: " + foods ,250,100);

        fill(255,255,254);
        textSize(15);
        if(lastfed>=12){
            text("last Fed: " + lastfed%12 + "PM",50,30);
        }else if(lastfed===0){
            text("last Fed: 12 AM",350,30);
        }else{
            text("last Fed: " + lastfed  + "AM",350,30);
        }

        var x=70,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodstock !== 0){
            for(var i= 0;i<this.foodstock;i++){
                if(i%10===0){
                    x=70;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }

    bedroom(){
        background(bedroom,550,550);
    }
    garden(){
        background(garden,550,550);
    }
    washroom(){
        background(washroom,550,550);
    }
}