import logo from './logo.svg';
import './App.css';
import { useContext, useEffect, useState, useMemo } from 'react';
import { ThemeContext } from './ThemeContext';
import  ShoppingCart  from './cartReducer';
import Search from './search';
import ExpensiveCalculation from './calculate';
import InputWithFocus from './inputUseRef';
import HookEx from './hookEx';
import useToggle from './useHook';
import ToggleButton from './customHookTest';
import Login from './Login';
import Dashboard from './dashboard';
import SwipeableTemporaryDrawer from './drawer';
const App =()=>{

const [isLoggedIn, setIsLoggedIn] = useState(
  () => localStorage.getItem('isLoggedIn') === 'true'
);

const  [data,setData] = useState(null);
const [error,setError] = useState(null);
const [loading,setLoading] = useState(false);
const [count,setCount] = useState(0);
const theme = useContext(ThemeContext);
const result = ExpensiveCalculation({a:2,b:3});
const  fetchSimulateData= ()=>{
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{

        const success =true;
        if(success){
          resolve("success data");
        }
        else{
          reject("error data");
        }
      },2000)

  });

}


useEffect(()=>{

console.log('Frontend sending request to /api/posts');

// fetch('/api/posts', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 })
// }).then((res)=>{
//   console.log('Frontend received response status:', res.status);
//   return res.json();
// }).then((data)=> {
//   console.log('Frontend received API data:', data);
//   setData(data);
// }).catch((err)=>console.log('Frontend API error:', err));
fetchSimulateData().then((res)=>{
  console.log('Frontend received  data',res);
  setData(res);
}).catch((err)=>{
  console.log('Frontend error',err);})  
.finally(()=>{
console.log('Frontend request completed');
})
},[]);

if(loading){
  return <p>Loading...</p>
}

if(error){
  return <p>Error: {error}</p>
}

function increment(){
 setCount(count+1);

}
function decrement(){
  setCount(count-1);
}

function handleLoginSuccess() {
  localStorage.setItem('isLoggedIn', 'true');
  setIsLoggedIn(true);
}

if (isLoggedIn) {
  return <Dashboard />;
}

return(

  <div>
    {isLoggedIn && <SwipeableTemporaryDrawer/>}
    <Login onLoginSuccess={handleLoginSuccess} />
    
    <div style = {{display: 'none'}}>
    <ToggleButton/>
    <HookEx/>
    <InputWithFocus/>
    <button onClick={()=>ExpensiveCalculation({a:2,b:3})}>Calculate</button>
    <Search onSearch={(query) => console.log('Search query:', query)}/>
    <h1>Data from API </h1>
    {/* <ul>
      {Array.isArray(data) && data.map((item)=>(
        <li key={item.id || item.userId}>{item.title}</li>
      ))}
    </ul> */}
    <ShoppingCart/>
    <p>{data}</p>
    <p>Count: {count}</p>
    <p>Theme: {theme}</p>
    <button onClick={increment}  style ={ {background: theme == "red"? "red":"white"}}>Increment</button>
    <button onClick={decrement}>Decrement</button>
    </div>
  </div>
)


}

export default App;
