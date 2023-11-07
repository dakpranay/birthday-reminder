import { useEffect, useState } from 'react';
import './App.css';



function CardList({el}) {
  const [years,setYears]=useState(0)

  useEffect(()=>{
    const todayYear=new Date().getFullYear()
    const userBirthyear=(el.dateOfBirth).slice(0,4)
    setYears(todayYear-userBirthyear)
  },[el])

  return (
    <li className='cardList'>
      <div className='imageDiv'>
        <img src="" alt="" title='User profile'/>
      </div>
      <div className='text'>
        <p>{el.name}</p>
        <p>{years} years</p>
      </div>
    </li>
  )
}


function App() {
  const [users,setUsers]=useState([])

  useEffect(()=>{
    try{
      async function fetchData(){
        const res=await fetch('http://localhost:3001')
        const data=await res.json()
        console.log(data)
        setUsers(data.allUsersHaveTodayBirthday)
      }
      fetchData()
    }catch(err){
      console.log("error in fetching the data")
    }
  },[])
  
  function handleClearAll(){
    setUsers([])
  }
  

  return (
    <div className="card">
      <p>{users.length} birthdays today</p>
      <ul>
        {users.map((el,i)=>{
          return <CardList el={el} key={i}/>
        })}
      </ul>
      <button onClick={handleClearAll}>Clear all</button>
    </div>
  );
}

export default App;
