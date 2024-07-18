import styled from '@emotion/styled'

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
    
    & input {
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
    }
    
    & button:hover {
        background-color: #721c24;
        color: white;
    }
    
    @media screen and (max-width: 800px) {
        margin: 4rem auto;
        width: 90%;
        
        & input {
            width: 100%;
        }
    }
`

export const MainTitle = styled.h1`
    color: #213547;
    text-align: center;
    margin: 2rem;
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
        color: white;
        font-size: 2.5rem;
        margin-top: 2rem;
    }
    
    & p {
        color: white;
        font-size: 1.25rem;
    }
    
    & input {
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
    }

    & button:hover {
        background-color: #721c24;
        color: white;
    }
    
    @media screen and (max-width: 800px) {
        margin: 4rem auto;
        width: 90%;
        
        & input {
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
    }
    
    & input {
        padding: 0.5rem 0;
    }
`