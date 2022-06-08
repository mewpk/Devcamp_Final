import { useState } from 'react';
import Input from './components/input';
import Success from './components/success';

function App() {
  const [emails, setEmails] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)

  const newSetup = (n) => {
    setIsSuccess(n)
  }
  const setUp = (values) => {
    setEmails(values)
  }

  return (
    <div className="App bg-green-100 h-screen m-0 p-0 flex justify-center items-center">
      <div className='bg-white p-6  md:mx-auto h-auto rounded shadow'>
        {!isSuccess ? <Input func={newSetup} func2={setUp } /> : <Success isSuccess={newSetup} func2={setUp } data={emails}  />}
      </div>
    </div>
  );
}

export default App;
