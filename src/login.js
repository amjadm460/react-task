import React from "react";

import { ethers } from 'ethers';
import axios from "axios";
import './App.css'


// verify if metamask is installed
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
  new ethers.providers.Web3Provider(window.ethereum);
}
//    const [s, a] => React.useState('');
//    const [value, setValue] = React.useState("Partials");




function Login() {
    
     const [ConnectedAccount, setConnectedAccount] = React.useState('');
     const [countriesList, setCountriesList] = React.useState([]);
     const [citiesList,setCitiesList] = React.useState([]);

     const [currentCity, setCurrentCity] = React.useState('');
     const [isSameAccount, setSameAccount] = React.useState('');
     const [currentCountry, setCurrentCountry] = React.useState('');

     const [yesCountry, showCountryDrop] = React.useState(false);

        async function ConnectMetamask() {
            const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
              const prevAddress = localStorage.getItem('currentAddress');
            // Prompt user for account connections
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            console.log('Account:', await signer.getAddress());
            let ConnectedAccount = await signer.getAddress();
            if(prevAddress === ConnectedAccount){
                    setSameAccount(true);
                    window.location.href = '/home';
            }
            setConnectedAccount(ConnectedAccount);
            localStorage.setItem('currentAddress', ConnectedAccount);
            // const balanceBNB = await provider.getBalance(ConnectedAccount);
            // console.log('Balance:', ethers.utils.formatEther(balanceBNB));
        }
        React.useEffect(() => {
            if(
                ConnectedAccount !== ''
            )
        {
            ConnectMetamask();
        }
        getCountryCity();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , []);
        async function getCountryCity() {
          
            axios.get(`https://countriesnow.space/api/v0.1/countries/population`).then(res => {
                const country_List = [];
                for(const item of res.data.data) {
                  
                    country_List.push(item.country);
                
                }
                setCountriesList(country_List);
            });
        }
        async function filterCities(country) {
            axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
                country: country
            }).then(res => {
                const cities_list = [];
                for(const item of res.data.data) {
                    cities_list.push(item);
                }
                setCitiesList(cities_list);
            })
        }
        const chnageKross = (e) => {
            filterCities(e.target.value);
            setCurrentCountry(e.target.value);
            localStorage.setItem('country', e.target.value);
        }
        const chnageCity = (e) => {
            setCurrentCity(e.target.value);
            window.location.href = `/home`;
            localStorage.setItem('city', e.target.value);
        }
        const clickYes =() => {
            showCountryDrop(true);
        }
        const clickNo =() => {
            var x = document.getElementById("demo");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
function showPosition(position) {
    // x.innerHTML = "Latitude: " + position.coords.latitude +
    // "<br>Longitude: " + position.coords.longitude;
    console.log(position);
    console.log(position.coords.longitude);
    if(position) {

    
    localStorage.setItem('city', 'Lahore');
    localStorage.setItem('country', 'Pakistan');
    window.location.href = '/home'
    }

  }
        }
        
    return (
        <div style={{textAlign: 'center'}}>
            
                {!ConnectedAccount  &&   <h1>Metamask Connect :</h1>}
                {!ConnectedAccount  &&   <p>Click to Connect :)</p>
                
                }
                   {!ConnectedAccount &&  <button onClick={ConnectMetamask}>Connect wallet</button> }
        
        
        {
          ConnectedAccount && <p><b>Wallet Address</b> : {ConnectedAccount}</p>
        }
        {
            ConnectedAccount && <h3>Do you want to manualy select you current location</h3>
        }
          {
            ConnectedAccount && !yesCountry && <button onClick={()=> clickYes()}>Yes</button>
        }
          {
            ConnectedAccount && !yesCountry &&  <button onClick={() => clickNo()} style={{marginLeft: '1rem'}}>No</button>
        }
        {
            yesCountry &&
            <select onChange={(e)=> chnageKross(e)}>
                 {countriesList.map(country =><option key={country} value={country} >{country}</option>)};
            </select>
        }
        {
            citiesList.length > 0 &&   <select onChange={(e) => chnageCity(e)} style={{marginLeft: '1rem'}}>
            {citiesList.map(city =><option key={city} value={city} >{city}</option>)};
       </select>
        }
        

      </div>
  
    );
  }

export default Login;
