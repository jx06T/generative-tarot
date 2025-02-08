import { useEffect, useCallback, useState, ChangeEvent } from 'react'
import './App.css'
import Card from './Card';

interface CardT {
    cardChineseName: string,
    cardEnglishName: string,
    describe: string,
    keywords: string
}

function App() {
    const [cards, setCards] = useState<CardT[]>([])
    return (
        <div className=' w-full h-screen relative pt-16'>
            <Card imgUrl={"sss"} move={{ x: 400, y: 600 }} englishName={"apple"} chineseName={"蘋果"} describe='哈哈哈'></Card>
        </div>
    )
}

export default App