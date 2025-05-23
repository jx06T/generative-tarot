import { useState, ChangeEvent } from 'react'
import './App.css'
import StreamText from './components/StreamText';
import Aurora from './components/Aurora';
import GradientText from './components/GradientText';
import CardArea from './components/CardArea';
import LoadingAnimation from './components/LoadingAnimation';
import { TablerCardsFilled } from './utils/Icons';

// const testInterpretation: string = "过去（疯狂土豆）：你对午餐有着热切的期待和积极的行动，就像这颗跳舞的土豆一样充满活力。\n\n现在（忧郁章鱼）：你可能会遇到一些小小的阻碍或不确定性，就像忧郁章鱼带来的随机影响，但不要灰心。\n\n未来（彩虹独角兽）：最终，你会得到你想要的午餐！彩虹独角兽的出现预示着好运降临，你会顺利享受到美味的午餐。\n"

// const testCards: CardT[] = [{ 'cardChineseName': '閃電收割者', 'cardEnglishName': 'Lightning Scythed', 'describe': '召喚一排閃電收割的鐮刀，將所有敵人瞬間收割成灰燼！', 'keywords': 'lightning scythe', 'photo_url': 'https://images.unsplash.com/photo-1429552077091-836152271555?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDYzODh8MHwxfHNlYXJjaHwxfHxsaWdodG5pbmclMjBzY3l0aGV8ZW58MHwxfHx8MTczOTI4MjIwMHww&ixlib=rb-4.0.3&q=80&w=1080' }, { 'cardChineseName': '夢幻花園', 'cardEnglishName': 'Dreamy Gardened', 'describe': '創造一個充滿奇花異草的夢幻花園，花園裡的花朵會唱歌跳舞，讓你的敵人沉醉其中，無法動彈。', 'keywords': 'fantasy garden', 'photo_url': 'https://images.unsplash.com/photo-1547391076-c6132ab72010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDYzODh8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZ2FyZGVufGVufDB8MXx8fDE3MzkyODIyMDF8MA&ixlib=rb-4.0.3&q=80&w=1080' }, { 'cardChineseName': '內在活力', 'cardEnglishName': 'Vibrant Internality', 'describe': '釋放你內在的無限活力！你的攻擊力瞬間提升十倍，並能無視一切防禦！', 'keywords': 'inner energy burst', 'photo_url': 'https://images.unsplash.com/photo-1548613053-22087dd8edb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDYzODh8MHwxfHNlYXJjaHwxfHxpbm5lciUyMGVuZXJneSUyMGJ1cnN0fGVufDB8MXx8fDE3MzkyODIyMDJ8MA&ixlib=rb-4.0.3&q=80&w=1080' }]


const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";


function QuestionForm({ onSubmit }: { onSubmit: Function }) {
  const [questionText, setQuestionText] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionText(e.target.value);
  };

  const handleSubmit = () => {
    if (questionText.trim()) {
      onSubmit(questionText);
      setQuestionText('');
    }
  };

  return (
    <div
      className='outline-none bg-white/20 rounded-md  w-full resize-none text-white text-base backdrop-blur-xs flex'
    >

      <textarea
        value={questionText}
        className='outline-none bg-transparent rounded-md py-1 px-4 shrink-0 grow resize-none text-white text-base no-scrollbar'
        onChange={handleChange}
        placeholder='問個問題吧！'
        rows={3}
      />
      <button
        onClick={handleSubmit}
        className='!bg-white/10 inline-block text-white'
      >
        <TablerCardsFilled className='text-2xl  hover:scale-110' />
      </button>
    </div>
  );
}


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
      })
      .catch(err => {
        console.error(err)
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
        // console.log(response.response)
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
          colors={["#3b31ff", "#FF94B4", "#FF3232"]}
          animationSpeed={3}
          showBorder={false}
        >
          <h1 className=' text-center text-5xl my-1 md:text-6xl font-extrabold'>Arcana</h1>
          <h2 className=' text-center text-lg  my-1 md:text-xl tracking-widest'>Generative Tarot</h2>
        </GradientText>

        <div className=' flex flex-col items-center mt-12 space-y-4'>
          <StreamText className=' text-white ' text='Generative Tarot' texts={fortuneTellingQuestions}></StreamText>
          <QuestionForm onSubmit={getRandCards}></QuestionForm>
          <h2 className=' text-center text-sm md:text-lg tracking-wider text-white'>Click <TablerCardsFilled className=' inline-block text-base'/> to generate your own card combination</h2>
        </div>
      </div>

      <div className=' absolute top-0 w-full h-full left-0 right-0 -z-10 pointer-events-none'>
        <Aurora
          colorStops={["#2d0070", "#290099", "#6117ab"]}
          speed={2}
        />
      </div>

      <div className=' absolute top-0 w-full h-full left-0 right-0 -z-10 pointer-events-none overflow-hidden bg-st'>
      </div>
      {
        tarotCards.length > 0 &&
        <>
          < CardArea getCardsinterpretation={getCardsinterpretation} tarotCards={tarotCards}></CardArea>
          {!interpretation &&
            <div className=' w-full px-10 z-[60] absolute top-72'>
              <StreamText className=' text-white h-fit ' text={"滑動卡牌上半部檢視卡牌，點擊卡牌下半部翻開卡牌，選擇 3 張卡牌並翻開！"} texts={[]} speed={100}></StreamText>
            </div>
          }
        </>
      }
      {
        (interpretation) && <> <div className={` ${showI ? "opacity-100 " : "opacity-0 "} fixed top-10 left-10 right-10 max-h-72 bg-white/30 p-4 rounded-md overflow-y-auto no-scrollbar backdrop-blur-xs `}>
          <StreamText className=' text-white h-fit ' text={interpretation} texts={[]} speed={50}></StreamText>
        </div>
          <button className=' !bg-white/90 !text-black inline-block z-50 absolute right-5 top-5 text-xs !py-1 !px-3 ' onClick={() => setShowI(!showI)}>{showI ? "hide" : "show"}</button>
        </>
      }
      {
        loading && <div className=' pt-52 fixed top-0 left-0 right-0 h-screen bg-white/5 backdrop-blur-xs '>
          <LoadingAnimation className=' text-4xl scale-200'></LoadingAnimation>
        </div>
      }
    </div >
  )
}

export default App
