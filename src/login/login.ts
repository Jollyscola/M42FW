

export class login implements EventListenerObject
{
   private btn:HTMLElement = null;
   private loginDiv:HTMLElement = null;
   private registerDiv:HTMLElement = null;
   public button:HTMLButtonElement = null;
   private toggle:NodeListOf<HTMLButtonElement> = null;

   constructor()
   {
      console.log("login")

      this.btn    =   document.querySelector("#btn");
      this.loginDiv = document.querySelector(".login");
      this.toggle =    document .querySelectorAll("#toggle");
      this.registerDiv = document.querySelector(".register");
      
      this.toggle.forEach((element) => element.addEventListener(("click"), this));
   }
   handleEvent(object: Event): void {

      if (object.type == "click")
         this.loginRegister(object)
   }

   public loginRegister(e: Event) : void
   {
     this.button = e.target as HTMLButtonElement;

     this.toggle[0].classList.remove("active");
     this.toggle[1].classList.remove("active");

     this.button.classList.add("active");
     if (this.button.name == "register")
     {
         this.register();
     } 
     else
     {
       this.login();
     }
   }

   register()
   {
      this.btn.style.left = "100px";
      this.loginDiv.style.cssText = "left: -400px; visibility: hidden;";
      this.registerDiv.style.cssText = "left: 0px; visibility: visible;";
   }

   login()
   {
      this.btn.style.left = "0px";
      this.loginDiv.style.cssText = "left: 0px; visibility: visible;";
      this.registerDiv.style.cssText = "left: 400px; visibility: hidden;";
   }

}