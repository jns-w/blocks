import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {authedReq, stringTimeWithText} from "@utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {BlockType} from "@types";
import {formatDistance} from "date-fns";
import {blockHistoryAtom, userAtom} from "@atoms";
import {useAtom} from "jotai";
import {media} from "@styles";


interface Props {
  block: BlockType
  setBlockDescription: Function,
}

export const Block: React.FC<Props> = React.memo((props) => {
  const [showCloseButton, setShowCloseButton] = useState(false)
  const [, setBlockHistory] = useAtom(blockHistoryAtom)
  const [user,] = useAtom(userAtom)

  const removeBlock = useCallback(async (id: string) => {
    if (user._id) {
      const res: Awaited<{
        success: boolean,
        data: { blockHistory: BlockType[] }
      }> = await authedReq.delete(`/api/blocks/history/${id}`)
      if (res.success) {
        setBlockHistory(res.data.blockHistory)
      } else {
        return
      }
    }
    setBlockHistory((prevState: Array<BlockType>) =>
      prevState.filter((block) => block.id !== id)
    );
  }, [])


  return (
    <Wrapper key={props.block.id}>

      <Container
        onClick={() => props.setBlockDescription(props.block.name)}
        onMouseLeave={() => setShowCloseButton(false)}
        onMouseEnter={() => setShowCloseButton(true)}>

        <div>
          {props.block.projectName!! && props.block.projectName} | {props.block.name!! && props.block.name}
        </div>
        {stringTimeWithText(props.block.duration!)}
        <AgoContainer>{props.block.endTimestamp!! && formatDistance(props.block.endTimestamp, Date.now(), {addSuffix: true})}</AgoContainer>
        {showCloseButton &&
            <FontAwesomeIcon
                icon={faXmark}
                onClick={() => removeBlock(props.block.id)}/>}

      </Container>
    </Wrapper>

  );
})

const Wrapper = styled.div`
  display: grid;

`
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 60px 20px;
  justify-content: center;
  align-items: center;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  padding: 0 15px;

  div:nth-child(1) {
    display: flex;
  }


  &:hover {
    background-color: ${({theme}) => theme.color.cardsHover};
  }
  
  ${media.phone} {
    font-size: 12px;
  }
`

const AgoContainer = styled.div`
  color: ${({theme}) => theme.color.mildTextColor};
  font-size: 9px;
  display: flex;

  justify-content: flex-end;
`