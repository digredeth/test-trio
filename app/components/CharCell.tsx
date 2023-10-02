import styled from "styled-components";
import {useState} from "react";

type Props = {
    word: string;
    disabled: boolean;
    onChangeHandler: () => void;
    position: number;
}

type Status = 'MATCH' | 'EXIST_IN_WORD' | 'DO_NOT_EXIST';

const STATUS_TO_COLOR: Record<Status, string> = {
    DO_NOT_EXIST: 'grey',
    EXIST_IN_WORD: 'yellow',
    MATCH: 'green'
}

export function CharCell(props: Props) {
    const {word, disabled, onChangeHandler, position} = props;
    const [status, setStatus] = useState<Status>();
    const [value, setValue] = useState('');
    const handleInputChange = (value: string, position: number) => {
        setValue(value);
        if (value) {
            onChangeHandler();
        }
        if (word[position].toLowerCase() === value.toLowerCase()) {
            setStatus('MATCH');
            return;
        }
        if (value && word.toLowerCase().includes(value.toLowerCase())) {
            setStatus('EXIST_IN_WORD');
            return;
        }
        setStatus('DO_NOT_EXIST');
    }

    return <StyledInputCell disabled={disabled} type={'text'} maxLength={1}
                            $statusColor={status && STATUS_TO_COLOR[status]}
                            value={value}
                            onChange={(event) => handleInputChange(event.target.value, position)}/>
}

const StyledInputCell = styled.input<{ $statusColor?: string; }>`
  background: ${props => props?.$statusColor || 'white'};
  color: black;
  width: 50px;
  height: 50px;
  text-align: center;
`;
