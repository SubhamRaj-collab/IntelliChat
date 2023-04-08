import './App.css';
import './normalize.css';
import ChatMessage from './Components/ChatMessage';
import { useState, useEffect } from 'react';

function App() {

  useEffect(() => {
    getEngines();
  }, [])
  
  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("text-davinci-003");
  const [chatLog, setChatLog] = useState([
    {
      user: "me",
      message: "I want to use chatgpt today."
    },
    {
    user: "gpt",
    message: "How can I help you today?"
    }
  ]);

  const clearChat = () => {
    setChatLog([]);
  }

  const getEngines = () => {
    fetch("http://localhost:3080/models")
    .then(res => res.json())
    .then(data => {
      // console.log(data.models.data)
      setModels(data.models)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }]
    setInput("");
    setChatLog(chatLogNew);

    const messages = chatLogNew.map((message) => message.message).join("\n")

    const response = await fetch("http://localhost:3080/" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages,
        currentModel: currentModel,
      })
    });

    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }])
    // console.log(data.message);

  }

  return (
    <div className="App">
      <aside className="sideMenu">
        <div className="sideMenuButton" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
        <div className="models">
          <select className = "options" onChange={(e)=>{setCurrentModel(e.target.value)}}>
            {models.map((model, index) => (
                <option key={model.id} value={model.id}>{model.id}
                </option>
            ))}
          </select>
        </div>
      </aside>
      
      <section className="chatBox">
        <div className="chat-log">
          {
          chatLog.map((message, index) => (
              <ChatMessage key={index} message = {message}/>
          ))}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input 
            className="chat-input-textarea" rows='1' placeholder="Send a message..." value={input} onChange={(e) => setInput(e.target.value)}></input>
          </form>
        </div>
      </section>
      
    </div>
  );
}

export default App;
