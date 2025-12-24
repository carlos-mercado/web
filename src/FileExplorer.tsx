//COMPONENTS
import Window from './Window.tsx';
import Card from './Card.tsx'

//IMAGES
import folder from './assets/folder.png'
//import weather from './assets/weather.png'
//import game from './assets/game.png'
//import web from './assets/web.png'
//import paint from './assets/paint.png'
//import info from './assets/info.png'
//import resume from './assets/resume_img.png'

const handleCardClick = (returnedInfo: [string, string]) => 
{
    console.log(returnedInfo[0] + ' icon was clicked ' + returnedInfo[1] + ' times.');

    if(returnedInfo[1] == '2') //DOUBLE CLICK
    {
        const cardID = returnedInfo[0];

        if (cardID == "Folder")
        {
            window.open("https://github.com/carlos-mercado/File-Sorter/")
        }
        else if (cardID == "Snip")
        {
            window.open("https://github.com/carlos-mercado/snip_and_search")
        }
        else if (cardID == "Server")
        {
            window.open("https://github.com/carlos-mercado/Broadcast-Server")
        }
    }
}

interface Props {
    closeFunc?: () => void;
}

function FileExplorer({closeFunc} : Props){
    return(
        <>
          <Window
            windowName='Projects'
            contentHeight='50vh'
            contentWidth='30vw'
            content =
            {
                <> 
                    <Card 
                        icon={folder}
                        cardID="Server"
                        onIconClick={handleCardClick}
                        isSelected={!true}
                    />
                    <Card 
                        icon={folder} 
                        cardID="Folder" 
                        onIconClick={handleCardClick}
                        isSelected={!true}
                    />
                    <Card 
                        icon={folder} 
                        cardID="Snip" 
                        onIconClick={handleCardClick}
                        isSelected={!true}
                    />
                </>
                }
            contentZ = {5}
            onClose={closeFunc}
          />
        </>
    )
}

export default FileExplorer;
