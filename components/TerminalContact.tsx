import { motion } from "framer-motion";
import { FiCheckCircle, FiCalendar } from "react-icons/fi";
import { Fragment, useEffect, useRef, useState } from "react";
import { useMetaPixel } from "../hooks/useMetaPixel";

const QUESTIONS = [
  {
    key: "name",
    text: "Hi! To get started, what's ",
    postfix: "your name?",
    complete: false,
    value: "",
  },
  {
    key: "phone",
    text: "Perfect! Could you share ",
    postfix: "your phone number?",
    complete: false,
    value: "",
  },
  {
    key: "eventType",
    text: "Awesome! What type of ",
    postfix: "event are you planning?",
    complete: false,
    value: "",
  },
  {
    key: "eventDate",
    text: "Great choice! ",
    postfix: "When is your event? (MM/DD/YYYY)",
    complete: false,
    value: "",
    isDate: true,
  },
  {
    key: "budget",
    text: "Almost done! What is your ",
    postfix: "budget? ($1000-$1500, $1500-$2000, or $2000+)",
    complete: false,
    value: "",
  }
];

const TerminalContact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto"
    >
      <div
        ref={containerRef}
        onClick={() => {
          inputRef.current?.focus();
        }}
        className="h-[80vh] md:h-[60vh] bg-gray-950/90 backdrop-blur rounded-2xl w-full mx-auto overflow-y-scroll shadow-2xl cursor-text font-mono border border-purple-500/20"
      >
        <TerminalHeader />
        <TerminalBody
          inputRef={inputRef}
          containerRef={containerRef}
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </motion.div>
  );
};

const TerminalHeader = () => {
  return (
    <div className="w-full p-3 bg-gray-900/95 flex items-center gap-1 sticky top-0 border-b border-purple-500/20 backdrop-blur">
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div className="w-3 h-3 rounded-full bg-green-500" />
      <span className="text-sm text-gray-200 font-semibold absolute left-[50%] -translate-x-[50%]">
        Book Your Experience
      </span>
    </div>
  );
};

const Calendar = ({
  onSelect,
  onClose,
  selectedDate
}: {
  onSelect: (date: Date) => void;
  onClose: () => void;
  selectedDate: Date | null;
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [viewDate, setViewDate] = useState(currentDate);

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  const handleDateSelect = (day: number) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onSelect(selected);
    onClose();
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute bottom-full mb-2 bg-gray-800 rounded-lg p-4 shadow-xl border border-purple-500/20 w-64"
    >
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))}
          className="text-gray-400 hover:text-white"
        >
          ←
        </button>
        <span className="text-white font-semibold">
          {viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}
        </span>
        <button
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))}
          className="text-gray-400 hover:text-white"
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-gray-500 text-sm">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {padding.map((_, i) => (
          <div key={`padding-${i}`} className="h-8" />
        ))}
        {days.map(day => (
          <button
            key={day}
            onClick={() => handleDateSelect(day)}
            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
              ${new Date(viewDate.getFullYear(), viewDate.getMonth(), day) < new Date()
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-white hover:bg-purple-500 transition-colors'}`}
            disabled={new Date(viewDate.getFullYear(), viewDate.getMonth(), day) < new Date()}
          >
            {day}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const TerminalBody = ({
  containerRef,
  inputRef,
  showCalendar,
  setShowCalendar,
  selectedDate,
  setSelectedDate
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}) => {
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState("");
  const [questions, setQuestions] = useState(QUESTIONS);

  const curQuestion = questions.find((q) => !q.complete);

  const handleSubmitLine = (value: string) => {
    if (curQuestion) {
      if (curQuestion.key === "eventDate" && selectedDate) {
        value = selectedDate.toLocaleDateString();
      }
      setQuestions((pv) =>
        pv.map((q) => {
          if (q.key === curQuestion.key) {
            return {
              ...q,
              complete: true,
              value,
            };
          }
          return q;
        })
      );
      setShowCalendar(false);
    }
  };

  return (
    <div className="p-4 md:p-6 text-gray-100 text-base md:text-lg">
      <InitialText />
      <PreviousQuestions questions={questions} />
      <CurrentQuestion
        curQuestion={curQuestion}
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {curQuestion ? (
        <CurLine
          text={text}
          focused={focused}
          setText={setText}
          setFocused={setFocused}
          inputRef={inputRef}
          command={curQuestion?.key || ""}
          handleSubmitLine={handleSubmitLine}
          containerRef={containerRef}
          isDate={curQuestion.isDate}
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
        />
      ) : (
        <Summary questions={questions} setQuestions={setQuestions} />
      )}
    </div>
  );
};

const InitialText = () => {
  return (
    <>
      <p className="text-purple-400 font-bold">Welcome to Robobooth! 🤖</p>
      <p className="whitespace-nowrap overflow-hidden font-light text-purple-300/50 mb-4">
        ------------------------------------------------------------------------
      </p>
    </>
  );
};

const PreviousQuestions = ({ questions }: { questions: typeof QUESTIONS }) => {
  return (
    <>
      {questions.map((q, i) => {
        if (q.complete) {
          return (
            <Fragment key={i}>
              <p className="text-purple-200">
                {q.text || ""}
                {q.postfix && (
                  <span className="text-purple-400 font-semibold">{q.postfix}</span>
                )}
              </p>
              <p className="text-emerald-300 mb-4">
                <FiCheckCircle className="inline-block mr-2" />
                <span>{q.value}</span>
              </p>
            </Fragment>
          );
        }
        return <Fragment key={i}></Fragment>;
      })}
    </>
  );
};

const CurrentQuestion = ({
  curQuestion,
  showCalendar,
  setShowCalendar,
  selectedDate,
  setSelectedDate
}: {
  curQuestion: (typeof QUESTIONS)[0] | undefined;
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}) => {
  if (!curQuestion) return null;

  return (
    <div className="relative">
      <p className="text-purple-200">
        {curQuestion.text || ""}
        {curQuestion.postfix && (
          <span className="text-purple-400 font-semibold">
            {curQuestion.postfix}
            {curQuestion.isDate && (
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <FiCalendar className="inline-block" />
              </button>
            )}
          </span>
        )}
      </p>
      {showCalendar && curQuestion.isDate && (
        <Calendar
          onSelect={(date) => {
            setSelectedDate(date);
            setShowCalendar(false);
          }}
          onClose={() => setShowCalendar(false)}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

const Summary = ({ questions, setQuestions }: { questions: typeof QUESTIONS, setQuestions: React.Dispatch<React.SetStateAction<typeof QUESTIONS>> }) => {
  const [complete, setComplete] = useState(false);
  const [sending, setSending] = useState(false);
  const { trackFormSubmission } = useMetaPixel();

  const handleReset = () => {
    setQuestions((pv) => pv.map((q) => ({ ...q, value: "", complete: false })));
  };

  const handleSend = async () => {
    setSending(true);
    const formData = questions.reduce((acc, val) => {
      return { ...acc, [val.key]: val.value };
    }, {}) as any;

    // Track form submission
    trackFormSubmission('Terminal Contact Form', 'Toronto', {
      fn: formData.name?.split(' ')[0],
      ln: formData.name?.split(' ').slice(1).join(' '),
      ph: formData.phone,
      ct: 'Toronto',
      country: 'CA'
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log(formData);
    setSending(false);
    setComplete(true);
  };

  return (
    <>
      <p className="text-purple-300 font-semibold mb-4">Perfect! Here's what we've got:</p>
      {questions.map((q) => {
        return (
          <p key={q.key} className="mb-2">
            <span className="text-blue-400">{q.key}:</span>{" "}
            <span className="text-gray-300">{q.value}</span>
          </p>
        );
      })}
      <p className="text-purple-300 mt-4 mb-2">Ready to make it happen?</p>
      {complete ? (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-emerald-300"
        >
          <FiCheckCircle className="inline-block mr-2" />
          <span>Message sent! We'll get back to you ASAP 🎉</span>
        </motion.p>
      ) : (
        <div className="flex gap-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            className="px-4 py-2 text-base hover:opacity-90 transition-all rounded-lg bg-gray-700 text-white"
          >
            Start Over
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSend}
            disabled={sending}
            className="px-4 py-2 text-base transition-all rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Message"}
          </motion.button>
        </div>
      )}
    </>
  );
};

const CurLine = ({
  text,
  focused,
  setText,
  setFocused,
  inputRef,
  command,
  handleSubmitLine,
  containerRef,
  isDate,
  showCalendar,
  setShowCalendar,
}: {
  text: string;
  focused: boolean;
  setText: (text: string) => void;
  setFocused: (focused: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  command: string;
  handleSubmitLine: (text: string) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  isDate?: boolean;
  showCalendar?: boolean;
  setShowCalendar?: (show: boolean) => void;
}) => {
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !isDate) return;
    handleSubmitLine(text);
    setText("");
    setTimeout(() => {
      scrollToBottom();
    }, 0);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    scrollToBottom();
  };

  useEffect(() => {
    return () => setFocused(false);
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          onChange={onChange}
          value={text}
          type="text"
          className="sr-only"
          autoComplete="off"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </form>
      <p className="mt-2">
        <span className="text-emerald-400">➜</span>{" "}
        <span className="text-cyan-300">~</span>{" "}
        {command && <span className="opacity-50">Enter {command}: </span>}
        {text}
        {focused && (
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
              times: [0, 0.5, 0.5, 1],
            }}
            className="inline-block w-2 h-5 bg-purple-400 translate-y-1 ml-0.5"
          />
        )}
      </p>
    </>
  );
};

export default TerminalContact; 