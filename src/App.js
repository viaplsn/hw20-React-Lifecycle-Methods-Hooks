import './App.css';
import { Timer } from './components/timer';

function App() {
  return (
    <div className="App">
      <Timer time={5} autostart={false} onTick={(time) => console.log("Залишилось часу: " + time)} step={1000} onTimeEnd={() => console.log("Час вийшов!")} onTimeStart={(timeLeft) => console.log("Таймер запущено! Залишилось часу: " + timeLeft)} onTimePause={() => console.log("Таймер на паузі!")} />
      <Timer time={5962} autostart={true} onTick={(time) => console.log("Залишилось часу: " + time)} step={2000} onTimeEnd={() => console.log("Час вийшов!")} onTimeStart={(timeLeft) => console.log("Таймер запущено! Залишилось часу: " + timeLeft)} onTimePause={() => console.log("Таймер на паузі!")} />
    </div>
  );
}

export default App;
