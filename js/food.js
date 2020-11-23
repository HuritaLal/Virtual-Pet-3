class Food{
    constructor(foodStock,lastFed){
        this.foodStock=0;
        this.image=loadImage("images/Milk.png");
        this.lastFed;
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }

    display(){
   //     background(0);

        if (lastFed>12) {
            text("Last Feed : "+lastFed%12+"PM",350,30);
          } else if(lastFed==0) {
            text("Last Feed : 12:00 AM",160,20)
          }else{
            text("Last Feed : "+lastFed+"AM"+160,20)
          }

        var x=80,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock != 0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
        image(this.image,x,y,50,50);
        x=x+30;
            }
        }
    }

    bedroom(){
        background(bedroom,550,500);
    }

    washroom(){
        background(bathroom,550,500);
    }

    garden(){
        background(garden,550,500);
    }

}
