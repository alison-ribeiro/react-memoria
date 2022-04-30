import { GridItemTypes } from '../../types/GridItemTypes';
import * as C from './styles';
import b7Svg from '../../svgs/b7.svg'
import { items } from '../../data/items';


type Props = {
   item:GridItemTypes;
   onClick: () => void;

}

export const GridItem = ({item, onClick}:Props) => {
    return (

        
        <C.Container 
            showBackground={item.permanentShown || item.shown}
            onClick={onClick}
        >
            {!item.permanentShown && !item.shown &&
                <C.Icon src={b7Svg} alt="" opacity={.1}/>
            }
            {(item.permanentShown || item.shown) && item.items !== null &&
                <C.Icon src={items[item.items].icon} alt=""/>
            }
        </C.Container>
    );
}