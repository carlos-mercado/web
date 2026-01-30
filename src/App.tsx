import {useState} from 'react';

//components
import Card from './Card.tsx'
import Weather from './Weather.tsx';
import Window from './Window.tsx';
import Toe from './Toe.tsx';
import Taskbar from './Taskbar.tsx';
import Snake from './Snake.tsx';
import Donut from "./Donut.tsx";
import FileExplorer from "./FileExplorer.tsx"

//images
import info from './assets/info.png'
import resume from './assets/resume_img.png'
import folder from './assets/folder.png'
import weather from './assets/weather.png'
import game from './assets/game.png'
import web from './assets/web.png'
import paint from './assets/paint.png'
import github from './assets/github.gif'
//import snip from './assets/snip.png'
//import toe from './assets/Toe.png'
//import dumbell from './assets/dumbbell2.png'

function App() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [resumeOn, setResumeOn] = useState(false);
  const [weatherOn, setWeatherOn] = useState(false);
  const [toeOn, setToeOn] = useState(false);
  const [snakeOn, setSnakeOn] = useState(false);
  const [donutOn, setDonutOn] = useState(false);
  const [folderOn, setFolderOn] = useState(false);

  const [zIndex, set_zIndex] = useState(1);

  const handleCardClick = (returnedInfo: [string, string]) => {
    setSelectedCard(returnedInfo[0]);
    console.log(returnedInfo[0] + ' icon was clicked ' + returnedInfo[1] + ' times.');

    if(returnedInfo[1] == '2')
    {
      set_zIndex(zIndex + 1);
      if(returnedInfo[0] == "Info")
        setResumeOn(true);
      else if(returnedInfo[0] == "Weather")
        setWeatherOn(true);
      else if(returnedInfo[0] == "Tic-Tac-Toe")
        setToeOn(true);
      else if(returnedInfo[0] == "Snake")
        setSnakeOn(true);
      else if(returnedInfo[0] == "Donut")
        setDonutOn(true);
      else if(returnedInfo[0] == "Projects")
        setFolderOn(true);
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
      window.open("https://metron-alpha.vercel.app/")
    }
    else if (cardID == "Server")
    {
      window.open("https://github.com/carlos-mercado/Broadcast-Server")
    }
    else if (cardID == "Github")
    {
      window.open("https://github.com/carlos-mercado")
    }
  }

  return (
      <div className='screen'>
        <Card 
          icon={info} 
          cardID="Info" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Info"}
        />
        <Card 
          icon={folder} 
          cardID="Projects" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Projects"}
        />
        <Card 
          icon={github}
          cardID="Github"
          onIconClick={handleCardClick}
          isSelected={selectedCard === "Github"}
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
          onIconClick={handleCardClick} isSelected={selectedCard === "Tic-Tac-Toe"} /> <Card 
          icon={game} 
          cardID="Snake" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Snake"}
        />
        <Card 
          icon={paint} 
          cardID="Donut" 
          onIconClick={handleCardClick} 
          isSelected={selectedCard === "Donut"}
        />
        <div className='taskbar'>
          <Taskbar />
        </div>

        {resumeOn == true && (
          <Window 
            windowName='Résumé'
            contentHeight="645px"
            contentWidth="456px"
            content = {
              <img className="resumeImg" src={resume} alt="Resume" />
            }
            contentZ = {100}
            onClose={() => setResumeOn(false)}

          />
        )}

        {weatherOn == true && (
          <Window 
            windowName='Weather'
            contentHeight="281px"
            contentWidth="600px"
            content = {
              <Weather></Weather>
            }
            contentZ = {1}
            onClose={() => setWeatherOn(false)}

          />
        )}

        {toeOn == true && (
          <Window
            windowName='Tic-Tac-Toe'
            contentHeight="331px"
            contentWidth="300px"
            content = 
            {
              <Toe></Toe>
            }
            contentZ = {2}
            onClose={() => setToeOn(false)}
          />
        )}

        {snakeOn == true && (
          <Window
            windowName='Snake'
            contentHeight="531px"
            contentWidth="500px" 
            content = 
            { 
                <Snake></Snake>
            }
            contentZ = {3}
            onClose={() => setSnakeOn(false)}
          />
        )}

        {donutOn == true && (
          <Window
            windowName='Donut'
            contentHeight='500px'
            contentWidth='500px'
            content =
            {
                <Donut></Donut>
            }
            contentZ = {4}
            onClose={() => setDonutOn(false)}
          />
        )}

        {folderOn == true && (
            <FileExplorer closeFunc={() => setFolderOn(false)}>
            </FileExplorer>
        )}


      </div>
  );
}

export default App;
