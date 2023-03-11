interface Props {
  guessedLetters: string[]
  wordToGuess: string
}

export const FillWord = ({ guessedLetters, wordToGuess }: Props) => {
  return (
    <div className="flex justify-center">
      {wordToGuess && (
        <div className="my-[16px] uppercase flex font-bold gap-[8px] text-[40px] ">
          {wordToGuess.split('').map((letter, index) => (
            <div key={index} className="w-[40px] border-b-[4px] border-slate-900">
              <div className={`text-center ${guessedLetters.includes(letter) ? '' : 'hidden'}`}>{letter}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
