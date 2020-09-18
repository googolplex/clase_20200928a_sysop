// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter!!!</h1>`;

interface Subject{
  registerObserver(o:Observer);
  removeObserver(o:Observer);
  notifyObservers();
}
interface Observer {
  update(temperatura:number);
}
class WeatherStation implements Subject {
  private temperature:number;
  private observers:Observer[] = [] ;

  setTemperatura(temp:number){
    console.log('WeatherSTATION: nueva medicion de temperatura: '+ temp);
    this.temperature = temp;
    this.notifyObservers();

  }
public registerObserver(o: Observer) {
this.observers.push(o);
}
public removeObserver(o: Observer) {
  let index = this.observers.indexOf(o);
  this.observers.splice(index,1);
}
public notifyObservers() {
  for(let observer of this.observers)
  {observer.update(this.temperature)
  }
}

}
class TemperatureDisplay implements Observer{
  private subject:Subject;
  constructor(weatherStation:Subject){
    this.subject = weatherStation;
    weatherStation.registerObserver(this);
  }
public update(temperatura: number) {
console.log('TemperatureDisplay:Necesito actualizar mi display');
// y algo de logica va aqui
}

}

class Ventilador implements Observer{
  private subject:Subject;
  constructor(weatherStation:Subject){
    this.subject = weatherStation;
    weatherStation.registerObserver(this);
  }
public update(temperatura: number) {
  if(temperatura > 25) {
    console.log('prendo el ventilador');
  } else {
    console.log('apago el ventilador');
  }
}
}

// uso el patron observador

let estacionDeTiempo = new WeatherStation();
let pantallaTemperatura = new TemperatureDisplay(estacionDeTiempo);
let ventiladorFeliz = new Ventilador(estacionDeTiempo);

estacionDeTiempo.setTemperatura(20);

estacionDeTiempo.setTemperatura(30);