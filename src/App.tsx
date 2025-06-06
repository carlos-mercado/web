//comps
import Card from './Card.tsx'

//images
import bin from './assets/recycle.png'
import info from './assets/info.png'
import snake from './assets/snake.jpg'
import Taskbar from './Taskbar.tsx';
import resume from './assets/resume_img.png'
import folder from './assets/folder.png'
import wordle from './assets/wordle.png'

import {useState} from 'react';



function App() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleCardClick = (returnedInfo: [string, string]) => {
    setSelectedCard(returnedInfo[0]);
    console.log(returnedInfo[0] + ' icon was clicked ' + returnedInfo[1] + ' times.');

    if(returnedInfo[1] == '2')
    {
      handleCardDoubleClick(returnedInfo[0]);
    }
  }

  const handleCardDoubleClick = (cardID: string) => {
    if(cardID == "Info")
    {
      console.log("overlay ON");
      setShowOverlay(true);
    }
    else if (cardID == "Snake")
    {
      window.open("https://github.com/carlos-mercado/snake-vim/")
    }
    else if (cardID == "Folder")
    {
      window.open("https://github.com/carlos-mercado/File-Sorter/")
    }
    else if (cardID == "Wordle")
    {
      window.open("https://github.com/carlos-mercado/Wordle")
    }
  }

  return (
    <>
      <div className='screen'>
        <Card 
          icon={bin} 
          cardID="Recycle Bin" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Recycle Bin"}
        />
        <Card 
          icon={info} 
          cardID="Info" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Info"}
        />
        <Card 
          icon={snake} 
          cardID="Snake" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Snake"}
        />
        <Card 
          icon={folder} 
          cardID="Folder" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Folder"}
        />
        <Card 
          icon={wordle} 
          cardID="Wordle" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Wordle"}
        />
        <div className='taskbar'>
          <Taskbar />
        </div>
        {showOverlay && (
          <div className = "overlay" onClick={() => setShowOverlay(false)}>
            <img src={resume} alt="Resume" />
          </div>
        )}
      </div>
    </>
  );
}

export default App;