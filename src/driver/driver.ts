import ApexCharts from '../../node_modules/apexcharts/dist/apexcharts.esm.js';


export class driver implements EventListenerObject
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

      let options = {
        series: [{
          name: "Driver1",
          data: [10, 15, 17, 21, 25, 32, 37, 41, 50]
      },
      {
          name: "Driver2",
          data: [7, 21, 25, 31, 42, 45, 49, 52, 70]
      },
      {
        name: "Driver3",
        data: [2, 5, 8, 14, 19, 14, 21, 26, 30]
    }
    ],
        chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Drivers %',
        align: 'center'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], 
          opacity: 0.5
        },
        
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
      };

      var chart = new ApexCharts(document.querySelector("#driver-grafit"), options);
      chart.render();
   }
   
   private CircleData() : void
   {
  
      let value:{space?:number,name?:string} = this.resutalt.data.cards.drive;

      for(let i = 0; i < 3; i++)
      {
         this.options = {
            chart: {
                height: 200,
                type: 'radialBar',
            },
            series: [value[i].space],
            labels: [value[i].name],
          }
   
         let chart:ApexCharts = new ApexCharts(document.querySelector("#driver" + (i + 1)), this.options);
         console.log(chart);
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

