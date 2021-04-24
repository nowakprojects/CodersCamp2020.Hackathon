import { FC, memo, useState, useCallback } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import Dustbin from './DustBin'
import Box from './Box'
import { ItemTypes } from './ItemTypes'
import update from 'immutability-helper'
import ClickButton from '../atoms/Button/ClickButton'
import { THEME } from '../atoms/constants/ThemeMUI'

interface DustbinState {
  accepts: string[]
  lastDroppedItem: any
}

interface BoxState {
  name: string
  type: string
}

export interface DustbinSpec {
  accepts: string[]
  lastDroppedItem: any
}
export interface BoxSpec {
  name: string
  type: string
}

export interface QuizState {
  droppedBoxNames: string[]
  dustbins: DustbinSpec[]
  boxes: BoxSpec[]
}

export const Quiz: FC = memo(function Quiz() {
  const [dustbins, setDustbins] = useState<DustbinState[]>([
    { accepts: [ItemTypes.ANSWER], lastDroppedItem: null },
    { accepts: [ItemTypes.ANSWER], lastDroppedItem: null },
    { accepts: [ItemTypes.ANSWER],lastDroppedItem: null},
    { accepts: [ItemTypes.ANSWER, NativeTypes.FILE], lastDroppedItem: null },
  ])

  const [boxes] = useState<BoxState[]>([
    { name: 'Jan Nowak', type: ItemTypes.ANSWER },
    { name: 'Beata Szydło', type: ItemTypes.ANSWER },
    { name: 'Magazine', type: ItemTypes.ANSWER },
    { name: 'Dupa', type:ItemTypes.ANSWER}
  ])

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  const handleDrop = useCallback(
    (index: number, item: { name: string }) => {
      const { name } = item
      if(!isDropped(name)){
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
      )
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      )
    }},
    [droppedBoxNames, dustbins],
  )

  return (
    <div style={{marginTop:'5%', marginBottom:'5%', display: 'flex', flexDirection:'row', width:'90%', marginLeft:'5%', justifyContent: 'center' }}>
      <div style={{ overflow: 'hidden', clear: 'both' , display:'flex', flexDirection:'column', justifyContent: 'center'}}>
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <Dustbin
            accepts={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
            answer={'Ulubiony kolor?'}
          />
        ))}
      </div>

      <div style={{ overflow: 'hidden', clear: 'both' , display:'flex', flexDirection:'column', justifyContent:'center'}}>
        {boxes.map(({ name, type }, index) => (
          <Box
            name={name}
            type={type}
            isDropped={isDropped(name)}
            key={index}
          />
        ))}
      </div>
  
    </div>
    
  )
})
