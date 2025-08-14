import {useState} from 'react';

//components
import Card from './Card.tsx'
import Weather from './Weather.tsx';
import Window from './Window.tsx';
import Toe from './Toe.tsx';

//images
import info from './assets/info.png'
import snake from './assets/snake.jpg'
import Taskbar from './Taskbar.tsx';
import resume from './assets/resume_img.png'
import folder from './assets/folder.png'
import snip from './assets/snip.png'
import weather from './assets/weather.png'
import toe from './assets/toe.png'
import dumbell from './assets/dumbbell2.png'

function App() {

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [resumeOn, setResumeOn] = useState(false);
  const [weatherOn, setWeatherOn] = useState(false);
  const [toeOn, setToeOn] = useState(false);

  const handleCardClick = (returnedInfo: [string, string]) => {
    setSelectedCard(returnedInfo[0]);
    console.log(returnedInfo[0] + ' icon was clicked ' + returnedInfo[1] + ' times.');

    if(returnedInfo[1] == '2')
    {
      if(returnedInfo[0] == "Info")
        setResumeOn(true);
      else if(returnedInfo[0] == "Weather")
        setWeatherOn(true);
      else if(returnedInfo[0] == "Tic-Tac-Toe")
        setToeOn(true);
      else
        handleCardDoubleClick(returnedInfo[0]);
    }
  }
  const handleCardDoubleClick = (cardID: string) => {
    if (cardID == "Snake")
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
    else if (cardID == "Snip")
    {
      window.open("https://github.com/carlos-mercado/snip_and_search")
    }
    else if (cardID == "METRON")
    {
      window.open("https://carlos-mercado.github.io/METRON/")
    }
  }

  return (
    <>
      <div className='screen'>
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
          icon={snip} 
          cardID="Snip" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Snip"}
        />
        <Card 
          icon={weather} 
          cardID="Weather" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Weather"}
        />
        <Card 
          icon={toe} 
          cardID="Tic-Tac-Toe" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Tic-Tac-Toe"}
        />
        <Card 
          icon={dumbell} 
          cardID="METRON" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "METRON"}
        />
        <div className='taskbar'>
          <Taskbar />
        </div>

        {resumeOn == true && (
          <Window 
            contentHeight={787}
            contentWidth={611}
            content = {
              <img src={resume} alt="Resume" />
            }
            onClose={() => setResumeOn(false)}

          />
        )}

        {weatherOn == true && (
          <Window 
            contentHeight={"55vh"}
            contentWidth={"40vh"}
            content = {
              <Weather></Weather>
            }
            onClose={() => setWeatherOn(false)}

          />
        )}

        {toeOn == true && (
          <Window
            contentHeight={300}
            contentWidth={300}
            content = {
              <Toe></Toe>
            }
            onClose={() => setToeOn(false)}
          />
        )}

      </div>
    </>
  );
}

export default App;