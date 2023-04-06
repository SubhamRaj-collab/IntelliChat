import './App.css';
import './normalize.css'

function App() {
  return (
    <div className="App">
      <aside className="sideMenu">
        <div className="sideMenuButton">
          <span>+</span>
          New Chat
        </div>
      </aside>
      
      <section className="chatBox">
        <div className="chat-log">
          <div className="chat-message">
            <div className="chat-message-center">
              <div className="avatar">
                
                </div>
                <div className="message">
                  Hello World
                </div>
              </div>
          </div> 
        </div>
        <div className="chat-input-holder">
          <textarea className="chat-input-textarea" rows='1' placeholder="Send a message..."></textarea>
        </div>
      </section>
      
    </div>
  );
}

export default App;
