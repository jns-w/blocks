import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {BlockType} from "@types";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {authedReq, wait} from "@utils";


import {Block} from './Block';
import {Button, BlocksOverview} from "@components";
import {blockHistoryAtom, blocksOverviewModalAtom, userActionTimestampAtom, userAtom} from "@atoms";
import {useAtom} from "jotai";
import {showBlocksAtom} from "@atoms";
import {useIsomorphicLayoutEffect} from "@hooks";
import {media} from "@styles";

interface Props {
  setBlockDescription: Function,
}


export const Blocks: React.FC<Props> = React.memo((props) => {
  const [show, setShow] = useAtom(showBlocksAtom)
  const [mount, setMount] = useState(false)
  const [blocksOverviewModal, setBlocksOverviewModal] = useAtom(blocksOverviewModalAtom)
  const [blockHistory, setBlockHistory] = useAtom(blockHistoryAtom)
  const [user,] = useAtom(userAtom)
  const [userActionTimestamp,] = useAtom(userActionTimestampAtom)

  async function toggleShowSessions() {
    if (!mount) {
      setMount(true)
      await wait(20)
      setShow(true)
    } else {
      setShow(false)
      await wait(300)
      setMount(false)
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (show) setMount(true)
  })

  const getBlocks = async () => {
    const res: Awaited<{success: boolean, data: {blockHistory: BlockType[]}}> = await authedReq.get("/api/blocks/history")
    console.log("here", res)
    if (res.success) {
      setBlockHistory(res.data.blockHistory)
    }
  }

  useEffect(() => {
    if (user._id && show) getBlocks();
  }, [user._id, show])

  return (
    <Wrapper>
      {blocksOverviewModal &&
        <BlocksOverview setOpen={setBlocksOverviewModal}/>
      }
      <Container>
        <ArrowContainer>
          <div style={show ? {rotate: "180deg"} : {rotate: "0deg"}} onClick={() => toggleShowSessions()}>
            <FontAwesomeIcon icon={faAngleDown}/>
          </div>
        </ArrowContainer>
        {
          mount &&
          <>
              <SessionsContainer style={show ? {opacity: 1} : {opacity: 0}}>
                  <Button onClick={() => setBlocksOverviewModal(true)}>Overview</Button>
                {blockHistory &&
                  blockHistory.map(block => (
                    <Block block={block} key={block.id}
                           setBlockDescription={props.setBlockDescription}/>
                  )).reverse()

                }

                  {/*<ClearHistoryButton>Clear history</ClearHistoryButton>*/}
              </SessionsContainer>
          </>

        }

      </Container>
    </Wrapper>
  );
})

const Wrapper = styled.div`
  margin-top: 30px;
  user-select: none;
`

const Container = styled.div`
  display: grid;

`

const ArrowContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;

  div {
    display: grid;
    grid-template-rows: 1fr 1fr;
    font-size: 20px;
    cursor: pointer;
    transition: rotate 300ms ease-in-out 0s;
  }
`


const SessionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
  justify-content: center;
  align-items: center;
  opacity: 0;
  background-color: ${({theme}) => theme.color.cardsBg};
  box-shadow: ${({theme}) => theme.color.boxShadow} 1px 1px 20px;
  border-radius: 20px;
  padding: 25px 18px;
  transition: opacity 200ms ease 10ms;
`


// const ClearHistoryButton = styled.div`
//   display: flex;
//   margin: 15px auto 0 auto;
//   justify-content: center;
//   color: ${({theme}) => theme.color.warning};
//   cursor: pointer;
// `

