'use client'
import {useEffect, useState} from "react";
import {WordRow} from "@/app/components/WordRow";
import styled from "styled-components";

export default function Home() {

    const [words, setWords] = useState([]);
    const [word, setWord] = useState('');


    useEffect(() => {
        const fetchWords = async () => {
            const wordsResponse = await fetch('https://challenge.trio.dev/api/v1/wordle-words');
            const words = await wordsResponse.json();
            setWords(words);
        }
        fetchWords();
    }, []);

    const chooseRandomWord = () => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setWord(randomWord);
        console.log(randomWord);
    }

    return (
        <StyledMain>
            <button type={"button"} onClick={chooseRandomWord}>Randomize word</button>
            {word && (<WordRow key={word} word={word}/>)}
        </StyledMain>
    )
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  padding: 1em;
  max-width: 800px;
  margin: 0 auto;
  background-color: cadetblue;
`;
