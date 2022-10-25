import React, { useState } from "react";
import './styles/App.css';
import Web3 from 'web3';


function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [userAdress, setUserAdress] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [getTmyResult,setTmyResultString] = useState("");
  const [getTmyRequest,setTmyRequestBool] = useState(false);
  async function getTmy() {
    var response = await fetch('http://localhost:3000/api/send/?address='+{userAdress}.userAdress);
    var json = await response.json()
    var msg = json['msg']
    setTmyRequestBool(true)
    setTmyResultString(msg)

  };
  
  function openTmyChainSite()
  {
    window.location.href = 'https://wallet.tmychain.org/#';
  }

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;

    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        var balance = await web3.eth.getBalance(userAccount[0])
        var account = userAccount[0]
        setUserAdress(account);
        setUserBalance(balance)
        setIsConnected(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const onDisconnect = () => {
    setIsConnected(false);
  }


  return (
    <div>
      <header style={{
        margin: 80,
      }}>
        <div style={{
          padding: 10,
          borderRadius: 15,
          border: "solid",
          borderInlineColor: "#F7F8FC",
          borderBlockColor: "#F7F8FC",
          backgroundColor: "#F7F8FC",
        }}>

          <div class='wrapper' style={{
            display: 'grid',
            gridTemplateColumns: '10fr  1fr'
          }}>
            <div >
              <img src={process.env.PUBLIC_URL + "img/wallet-logo.svg"} alt=" " />
              <text style={{
                fontSize: 30,
                marginLeft: 10,
                verticalAlign: "baseline"
              }}>
                /:Faucet
              </text>
            </div>

            <button  class='row1' style={{
              backgroundColor: '#283593',
              color: 'white',
              fontSize: '15px',
              borderRadius: '5px',
              padding: '10px 10px',
              cursor: 'pointer',
              
            }} onClick={openTmyChainSite} >
              TMYChain
            </button>
          </div>

        </div>
      </header>
      <body>
        {!isConnected && (
          <div className="appLogin" style={{
            padding: 10,
            marginTop: 10,
            borderRadius: 15,
            border: "solid",
            borderInlineColor: "#F7F8FC",
            borderBlockColor: "#F7F8FC",
            backgroundColor: "#F7F8FC",
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15,
              marginTop: 15,
              fontSize: 25,
            }}>
              <text >
                Connect with metamask
              </text>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '15px'
            }}>


              <button style=
                {{
                  backgroundColor: '#283593',
                  color: 'white',
                  fontSize: '15px',
                  borderRadius: '5px',
                  padding: '10px 10px',
                  cursor: 'pointer',
                }} onClick={onConnect} >
                Connect
              </button>
            </div>
          </div>)}

        {isConnected && (
          <div style={{
            padding: 10,
            borderRadius: 15,
            border: "solid",
            borderInlineColor: "#F7F8FC",
            borderBlockColor: "#F7F8FC",
            backgroundColor: "#F7F8FC",

          }}>
            <div>
              <text style={{
                fontSize: 20,
                verticalAlign: "baseline",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                Address: {userAdress}
              </text>

            </div>
            <div>
              <text style={{
                fontSize: 20,
                verticalAlign: "baseline",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                Balance: {userBalance}
              </text>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {!getTmyRequest && 
              <button style=
                {{
                  backgroundColor: '#283593',
                  color: 'white',
                  fontSize: '15px',
                  borderRadius: '5px',
                  padding: '10px 10px',
                  cursor: 'pointer',
                  margin: 5
                }} onClick={getTmy} >
                Get TMY
              </button>}

              {getTmyRequest && 
              <text style={{
                fontSize: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                Result: {getTmyResult}
              </text>
              }
            </div>
          </div>
        )}

      </body>
    </div>

  );
}

export default App;
