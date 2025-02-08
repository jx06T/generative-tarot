import { useState, ChangeEvent } from 'react'
import './App.css'
import StreamText from './components/StreamText';
import Aurora from './components/Aurora';
import GradientText from './components/GradientText';
import CardArea from './components/CardArea';
import LoadingAnimation from './components/LoadingAnimation';


// const testInterpretation: string = "过去（疯狂土豆）：你对午餐有着热切的期待和积极的行动，就像这颗跳舞的土豆一样充满活力。\n\n现在（忧郁章鱼）：你可能会遇到一些小小的阻碍或不确定性，就像忧郁章鱼带来的随机影响，但不要灰心。\n\n未来（彩虹独角兽）：最终，你会得到你想要的午餐！彩虹独角兽的出现预示着好运降临，你会顺利享受到美味的午餐。\n"

// const testCards: CardT[] = [
//   {
//     "cardChineseName": "暴走企鹅",
//     "cardEnglishName": "Waddling Fury",
//     "describe": "一只愤怒的企鹅，用它的短翅膀扇动着你，造成1点暴击伤害。",
//     "keywords": "penguin"
//   },
//   {
//     "cardChineseName": "忧郁土豆",
//     "cardEnglishName": "Melancholy Potato",
//     "describe": "一个陷入存在主义危机的土豆，让你失去1点行动力。它真的很忧郁。",
//     "keywords": "potato"
//   },
//   {
//     "cardChineseName": "飞天方便面",
//     "cardEnglishName": "Flying Noodles",
//     "describe": "一包神奇的方便面，让你瞬间飞到游戏地图的另一边！但可能会有点晕。",
//     "keywords": "noodles"
//   }]

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

function App() {
  const fortuneTellingQuestions = [
    "說說你的煩惱？",
    "你對未來有什麼疑慮嗎？",
    "最近有什麼事情讓你感到困惑嗎？",
    "你現在最需要解決的是什麼問題？",
    "最近的心情如何？",
    "你覺得現在的生活有什麼需要改變的地方嗎？",
    "你現在有沒有什麼未解決的問題呢？",
    "有沒有什麼事讓你心情起伏不定？",
    "最近有沒有遇到什麼難以抉擇的情況？",
    "你希望自己能夠成為什麼樣的人？",
    "你最在意的人或事物是什麼？",
    "最近有沒有什麼事情讓你不安？",
    "你對自己的未來有什麼期待？",
    "你覺得現在的生活跟你的預期有什麼不同嗎？",
    "有沒有什麼是你遲疑不決的事？",
    "你最近有沒有什麼值得慶祝的事？",
    "你覺得自己的狀態有沒有什麼需要調整的呢？",
    "你對目前的工作或學業有什麼想法？"
  ];

  const [tarotCards, setTarotCards] = useState<CardT[]>([])
  const [question, setQuestion] = useState<string>("")
  const [interpretation, setInterpretation] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [showI, setShowI] = useState<boolean>(true)

  const getRandCards = (question0: string) => {
    setQuestion(question0)
    setLoading(true)
    const options = { method: 'GET', headers: {} };
    fetch(API_URL + '/randomcard', options)
      .then(response => response.json())
      .then(response => {
        setTarotCards(response.response.cards)
        setLoading(false)
        console.log(response.response.cards)
      })
      .catch(err => {
        console.error(err)
        // alert(err)
      });
  }

  const getCardsinterpretation = () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: question,
        cards: tarotCards,
      })
    };

    fetch(API_URL + '/reader', options)
      .then(response => response.json())
      .then(response => {
        console.log(response.response)
        setInterpretation(response.response)
      })
      .catch(err => {
        console.error(err)
        // alert(err)
      });
  }

  return (
    <div className=' w-full h-screen relative pt-16'>
      <div className=' px-[6%] sm:px-[min(12rem,12%)]'>
        <GradientText
          colors={["#3A29FF", "#FF94B4", "#FF3232"]}
          animationSpeed={3}
          showBorder={false}
        >
          <p className=' text-4xl mx-4 my-1 md:text-5xl font-extrabold'>Generative Tarot</p>
        </GradientText>

        <div className=' flex flex-col items-center mt-12 space-y-4'>
          <StreamText className=' text-white ' text='Generative Tarot' texts={fortuneTellingQuestions}></StreamText>

          <QuestionForm onSubmit={getRandCards}></QuestionForm>
        </div>
        {/* <Card move={{ x: 400, y: 600 }} englishName={"apple"} chineseName={"蘋果"} describe='哈哈哈'></Card> */}
      </div>

      <div className=' absolute top-0 w-full h-full left-0 right-0 -z-10 pointer-events-none'>
        <Aurora
          colorStops={["#2d0070", "#290099", "#6117ab"]}
          speed={2}
        />
      </div>

      <div className=' absolute top-0 w-full h-full left-0 right-0 -z-10 pointer-events-none overflow-hidden bg-st'>
      </div>
      {/* < CardArea getCardsinterpretation={getCardsinterpretation} tarotCards={tarotCards}></CardArea> */}
      {tarotCards.length > 0 &&
        <>
          < CardArea getCardsinterpretation={getCardsinterpretation} tarotCards={tarotCards}></CardArea>
          {!interpretation &&
            <div className=' w-full px-10 z-[60] absolute top-64'>
              <StreamText className=' text-white h-fit ' text={"滑動卡牌上半部檢視所有卡牌，點擊卡牌下方翻開卡牌，你需要翻開 3 張卡牌！"} texts={[]} speed={100}></StreamText>
            </div>
          }
        </>
      }
      {(interpretation) && <> <div className={` ${showI ? "opacity-100 " : "opacity-0 "} fixed top-10 left-10 right-10 max-h-72 bg-white/30 p-4 rounded-md overflow-y-auto no-scrollbar `}>
        <StreamText className=' text-white h-fit ' text={interpretation} texts={[]} speed={50}></StreamText>
      </div>
        <button className=' !bg-white/90 !text-black inline-block z-50 absolute right-5 top-5 text-xs !py-1 !px-3 ' onClick={() => setShowI(!showI)}>{showI ? "hide" : "show"}</button>
      </>}
      {loading && <div className=' pt-52 fixed top-0 left-0 right-0 h-screen bg-white/30 '>
        <LoadingAnimation className=' text-4xl scale-200'></LoadingAnimation>
      </div>}
    </div >
  )
}

export default App

function QuestionForm({ onSubmit }: { onSubmit: Function }) {
  const [questionText, setQuestionText] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionText(e.target.value);
  };

  const handleSubmit = () => {
    // Only submit if there is a non-empty question
    if (questionText.trim()) {
      onSubmit(questionText);
      setQuestionText(''); // Clear the textarea after submitting
    }
  };

  return (
    <>
      <textarea
        value={questionText}
        onChange={handleChange}
        className='outline-none bg-white/30 rounded-md py-1 px-4 w-full resize-none text-white text-base'
        placeholder='問個問題吧！'
        rows={3}
      />
      <div className='w-full text-right'>
        <button
          onClick={handleSubmit}
          className='!bg-white/90 inline-block !text-black'
        >
          產生牌組
        </button>
      </div>
    </>
  );
}