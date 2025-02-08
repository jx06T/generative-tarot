import { useEffect, useCallback, useState, ChangeEvent } from 'react'
import './App.css'
import StreamText from './components/StreamText';
import Aurora from './components/Aurora';
import GradientText from './components/GradientText';
import Card from './components/Card';

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

  const [text, setText] = useState<string>("")
  const [questionText, setQuestionText] = useState<string>("")

  const getRandCards = () => {
    const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/10.3.0' } };
    fetch('http://127.0.0.1:5000/randomcard', options)
      .then(response => response.json())
      .then(response => {
        setText(response)
      })
      .catch(err => console.error(err));
  }
  const handleChange = useCallback((e: ChangeEvent) => {
    // @ts-ignore
    setQuestionText(e.target.value);
  }, []);

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

          <QuestionForm onSubmit={() => { }}></QuestionForm>
        </div>
        <Card move={{x:400,y:600}} englishName={"apple"} chineseName={"蘋果"} describe='哈哈哈'></Card>
      </div>

      <div className=' absolute top-0 w-full h-full left-0 right-0 -z-10 pointer-events-none'>
        <Aurora
          colorStops={["#2d0070", "#290099", "#6117ab"]}
          speed={2}
        />
      </div>

      <div className=' absolute top-0 w-full h-full left-0 right-0 -z-10 pointer-events-none overflow-hidden bg-st'>
      </div>
    </div>
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
          className='!bg-white/90 inline-block'
        >
          產生牌組
        </button>
      </div>
    </>
  );
}