import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    margin: 4rem auto;
    padding: 2rem;
    background-color: #213547;
    min-height: 60vh;
    border-radius: 10px;
    width: 50%;
    
    & h1 {
        color: white;
        font-size: 2.5rem;
        margin-top: 2rem;
    }
    
    & p {
        color: white;
        font-size: 1.25rem;
    }
    
    & input, & textarea, & select {
        width: 65%;
        padding: 0.5rem;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
    }
    
    & button {
        background-color: #A7B8C7;
        color: #213547;
        font-weight: bold;
        font-size: 1.25rem;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 10px;
        cursor: pointer;
    }
    
    & button:hover {
        background-color: #721c24;
        color: white;
    }
    
    @media screen and (max-width: 800px) {
        margin: 4rem auto;
        width: 90%;
        
        & input, & textarea, & select {
            width: 100%;
        }
    }
`

export const MainTitle = styled.h1`
    color: #213547;
    text-align: center;
    margin: 2rem;
`

export const CreateContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin: 2rem auto;
    width: 70%;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
    @media  screen and (max-width: 800px) {
        width: 100%;
    }
`

export const StyledEditor = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 4rem;
    padding: 2rem;
    background-color: #A7B8C7;
    min-height: 60vh;
    border-radius: 10px;
    width: 80%;
    
    & h1 {
        color: #213547;
        font-size: 2.5rem;
        margin-top: 2rem;
    }
    
    & p {
        color: #213547;
        font-size: 1.25rem;
    }
    
    & input, & textarea, & select {
        width: 60%;
        padding: 0.5rem;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
    }
    
    & button {
        background-color: #213547;
        color: #A7B8C7;
        font-weight: bold;
        font-size: 1.25rem;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 10px;
        width: 200px;
        align-self: center;
        cursor: pointer;
    }

    & button:hover {
        background-color: #721c24;
        color: white;
    }
    
    @media screen and (max-width: 800px) {
        margin: 4rem auto;
        width: 90%;
        
        & input, & textarea, & select {
            width: 100%;
        }
    }
`

export const StyledFormElement = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    & label {
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    
    & input, & textarea, & select {
        padding: 0.5rem 0;
    }
`

export const StyledLink = styled(Link)`
    align-self: center;
`

export const StyledButton = styled.button`
    text-decoration: none;
    color: #fff;
    background-color: #213547;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    border: 1px solid transparent;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);

    &:hover {
        background-color: #721c24;
        color: white;
    }
    
    @media screen and (max-width: 1000px) {
        font-size: 1.2rem;
    }
`

export const CharactersLeft = styled.p`
    font-size: 1rem !important;
    font-weight: bold;
    font-style: italic;
    margin-top: 0.4rem;
`

export const InputError = styled.p`
    font-size: 16px !important;
    font-weight: bold;
    font-style: italic;
    color: white !important;
    background-color: rgba(230, 0, 0, 0.6);
    margin-top: 0.5rem;
    padding: 0.4rem;
    border-radius: 5px;
    border: 1px solid transparent;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`