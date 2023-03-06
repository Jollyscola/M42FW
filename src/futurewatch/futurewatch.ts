import ApexCharts from '../../node_modules/apexcharts/dist/apexcharts.esm.js';


export class futurewatch implements EventListenerObject
{

   public options:object = null;
   public hoveredlist:NodeListOf<HTMLElement> = null;
   public resutalt:circle_data = null;
   constructor()
   {
      this.hoveredlist = document.querySelectorAll('#main-menu li');  
      this.hoveredlist.forEach((item) => item.addEventListener("mouseover",this))

      this.data();  
   }

   handleEvent(object: Event): void 
   {
      let target = object.target as HTMLElement;
      if (object.type == "mouseover")
          this.activeLink(target.parentElement);
   }

   public activeLink(object: HTMLElement): void
   {
      this.hoveredlist.forEach((item) => item.classList.remove('hovered'));
      
      object.classList.add('hovered');
   }

   private async data () : Promise<boolean>
   {
      this.resutalt = await this.Json();

      this.CircleData();
      this.graficData();
      return (true);
   }

   private graficData() : void
   {
       var labelFormatter = function(value:number) {
        console.log(value);
         let val = Math.abs(value);
         let grafic = "";
         if (val >= 1000000) {
            grafic = (val / 1000000).toFixed(1) + " M";
         }
         return grafic;
       };

       var options = {
         chart: {
           height: 350,
           type: "line",
           zoom: {
             enabled: false
           }
         },
         dataLabels: {
           enabled: false
         },
         stroke: {
           curve: "straight"
         },
         series: [
           {
             name: "first drive",
             data: this.resutalt.data.cards.grafic
           },
           {
             name: "sec drive",
             data: this.resutalt.data.cards.grafic
           }
         ],
       
         title: {
           text: "Drive Scale",
           align: "left"
         },
         markers: {
           size: 0
         },
         xaxis: {
           type: "datetime"
         },
         yaxis: [
           {
             min: 1000000,
             max: 500000000,
             tickAmount: 4,
             logarithmic: true,
             seriesName: "Logarithmic",
             labels: {
               formatter: labelFormatter,
             }
           },
           {
             min: 1000000,
             max: 500000000,
             opposite: true,
             tickAmount: 4,
             seriesName: "Linear",
             labels: {
               formatter: labelFormatter
             }
           }
         ]
       };
       
       let chart:any = new ApexCharts(document.querySelector("#futurewatch-grafit"), options);
       console.log(chart);
       chart.render();
   }
   
   private CircleData() : void
   {
    

      let value:{space?:number,name?:string} = this.resutalt.data.cards.drive;

      for(let i = 0; i < 3; i++)
      {
         this.options = {
            chart: {
                height: 150,
                type: 'radialBar',
            },
            series: [value[i].space],
            labels: [value[i].name],
          }
   
         let chart:ApexCharts = new ApexCharts(document.querySelector("#chart" + (i + 1)), this.options);
         chart.render();
      }
   }

   private async Json(): Promise<circle_data>
   {
      let data:Response = await fetch("http://127.0.0.1:5501/dist/data.json");
      let value = await data.json();
      return value;
   }
}


export interface  circle_data
{
   data:{
      cards:{
         drive?:
         {
            name?:string,
            space?:number
         }

         grafic?:
         {
            x?:number,
            y?:number
         }
      }
   }
}[]

