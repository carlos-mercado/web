import {useState} from 'react';

//components
import Card from './Card.tsx'
import Weather from './Weather.tsx';
import Window from './Window.tsx';
import Toe from './Toe.tsx';
import Snake from './Snake.tsx';

//images
import info from './assets/info.png'
import Taskbar from './Taskbar.tsx';
import resume from './assets/resume_img.png'
import folder from './assets/folder.png'
import weather from './assets/weather.png'
import game from './assets/game.png'
import web from './assets/web.png'
//import snip from './assets/snip.png'
//import toe from './assets/Toe.png'
//import dumbell from './assets/dumbbell2.png'

function App() {

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [resumeOn, setResumeOn] = useState(false);
  const [weatherOn, setWeatherOn] = useState(false);
  const [toeOn, setToeOn] = useState(false);
  const [snakeOn, setSnakeOn] = useState(false);

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
      else if(returnedInfo[0] == "Snake")
        setSnakeOn(true);
      else
        handleCardDoubleClick(returnedInfo[0]);
    }
  }
  const handleCardDoubleClick = (cardID: string) => {
    if (cardID == "Folder")
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
          icon={folder} 
          cardID="Folder" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Folder"}
        />
        <Card 
          icon={folder} 
          cardID="Snip" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Snip"}
        />
        <Card 
          icon={web} 
          cardID="METRON" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "METRON"}
        />
        <Card 
          icon={weather} 
          cardID="Weather" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Weather"}
        />
        <Card 
          icon={game} 
          cardID="Tic-Tac-Toe" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Tic-Tac-Toe"}
        />
        <Card 
          icon={game} 
          cardID="Snake" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Snake"}
        />
        <div className='taskbar'>
          <Taskbar />
        </div>

        {resumeOn == true && (
          <Window 
            windowName='Résumé'
            contentHeight={720}
            contentWidth={570}
            content = {
              <img className="resumeImg" src={resume} alt="Resume" />
            }
            onClose={() => setResumeOn(false)}

          />
        )}

        {weatherOn == true && (
          <Window 
            windowName='Weather'
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
            windowName='Tic-Tac-Toe'
            contentHeight={300}
            contentWidth={300}
            content = {
              <Toe></Toe>
            }
            onClose={() => setToeOn(false)}
          />
        )}

        {snakeOn == true && (
          <Window
            windowName='Snake'
            contentHeight={500}
            contentWidth={500}
            content = 
            {
              <Snake></Snake>
            }
            onClose={() => setSnakeOn(false)}
          />
        )}


      </div>
    </>
  );
}

export default App;