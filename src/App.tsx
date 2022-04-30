import { useEffect,useState } from 'react';
import * as C from './App.styles';

import logoImage from './assets/devmemory_logo.png'
import  restartIcon  from './svgs/restart.svg';

import { Button } from './componentes/Button';
import { InfoItem } from './componentes/InfoItem';

import { GridItemTypes } from './types/GridItemTypes';
import { items } from './data/items';
import { GridItem } from './componentes/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';

function App() {

  const [playing,setPlaying] = useState<boolean>(false);
  const [timeElapsed,setTimeElapsed] = useState<number>(0);
  const [moveCount,setMoveCount] = useState<number>(0);
  const [showCount,setshowCount] = useState<number>(0);
  const [gridItems,setGridItems] = useState<GridItemTypes[]>([]);



  useEffect(() => resetAndCreateGrid(),[]);
  useEffect(() => {
    const timer = setInterval(() => {
     if(playing){
      setTimeElapsed(timeElapsed + 1 )
     }
    }, 1000);
    return () => clearInterval(timer);
  },[playing,timeElapsed]);

  useEffect(() => {
    if(showCount === 2){
      let opened = gridItems.filter(item => item.shown === true);
      if(opened.length === 2){
        if(opened[0].items === opened[1].items){
          let tmpGrid = [...gridItems];
          for(let i in tmpGrid){
            if(tmpGrid[i].shown === true){
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setshowCount(0);
        }else{
          setTimeout(() =>{
            let tmpGrid = [...gridItems];
            for(let i in tmpGrid){
            tmpGrid[i].shown = false;
          }
          setGridItems(tmpGrid);
          setshowCount(0);
          }, 1000);
        }
          
          setMoveCount(moveCount => moveCount + 1);
      }
    }
  },[showCount,gridItems]);

  useEffect(() =>{
    if(moveCount > 0 && gridItems.every(item => item.permanentShown ==true)){
      setPlaying(false);
    }
  },[moveCount,gridItems]);

  const resetAndCreateGrid = () => {
    
    setTimeElapsed(0);
    setMoveCount(0);
    setshowCount(0);
    
    let tmpGrid: GridItemTypes[] = [];
    for(let i = 0; i < (items.length * 2); i++) {
      tmpGrid.push({
        items:null,
        shown:false,
        permanentShown:false
      });
    }
    for(let w = 0; w < 2; w++) {
      for(let i = 0; i < items.length; i++){
        let pos = -1;
        while(pos < 0 || tmpGrid[pos].items !== null ){
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        
        tmpGrid[pos].items = i;
      }
    }


    setGridItems(tmpGrid);
    setPlaying(true);
  }

 const handleItemClick = (index:number) => {
  if(playing && index !== null && showCount < 2){
    let tmpGrid = [...gridItems];
    if(!tmpGrid[index].permanentShown && !tmpGrid[index].shown){
      tmpGrid[index].shown = true;
      setshowCount(showCount + 1);
    }
    setGridItems(tmpGrid);
  }
 }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="http://">
          <img src={logoImage} width="200" alt=""/> 
        </C.LogoLink>
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()}/>
        </C.InfoArea>
        <Button  onClick={resetAndCreateGrid} label="Reiniciar" icon={restartIcon} />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item,index) => (
            <GridItem  
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}

            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
}

export default App;
