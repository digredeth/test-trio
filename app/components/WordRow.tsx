import {CharCell} from "@/app/components/CharCell";
import {useState} from "react";
import styled from "styled-components";

type Props = {
    word: string;
}

const INTENTS_ALLOWED = 6;

export function WordRow(props: Props) {
    const [intentsLeft, setIntentsLeft] = useState(INTENTS_ALLOWED);
    const {word} = props;

    const decreaseIntent = () => {
        if (intentsLeft) {
            setIntentsLeft((prevState) => prevState - 1);
        }
    };


    return <StyledRow>
        <div className={'word'}>
            {Array.from(word).map((_, position) => (
                <CharCell key={position} word={word} disabled={!Boolean(intentsLeft)} onChangeHandler={decreaseIntent}
                          position={position}/>))}
        </div>
        <div className={'info-and-actions'}>
            <p>Remaining intents: {intentsLeft}</p>
            <button type={"button"} onClick={() => setIntentsLeft(INTENTS_ALLOWED)}>Retry!</button>
        </div>


    </StyledRow>
}

const StyledRow = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1em;
  
  .word {
    display: flex;
    gap: .5em;
  }

  .info-and-actions {
    display: flex;
    gap: .5em;
    align-items: center;
    justify-content: space-between;
  }
`;


