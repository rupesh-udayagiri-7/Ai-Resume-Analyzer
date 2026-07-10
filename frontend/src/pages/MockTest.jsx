import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiLock, FiUnlock, FiCpu, FiAward, FiArrowRight, FiRotateCcw, FiCheck, FiX, FiInfo, FiBookOpen, FiUserCheck, FiTrendingUp, FiCalendar, FiActivity, FiAlertTriangle } from 'react-icons/fi';
import '../index.css';

// Unified Mock Test Question Pool (includes Aptitude & reasoning directly)
const MOCK_TEST_POOL = {
  aptitude: [
    {
      company: 'TCS',
      question: 'A shopkeeper marked up his goods by 40% and then gave a discount of 25%. What is his overall profit or loss percentage?',
      options: ['5% Profit', '5% Loss', '10% Profit', 'No Profit No Loss'],
      answer: 0,
      explanation: 'Let cost price be 100. Marked Price = 140. With 25% discount, Selling Price = 140 * 0.75 = 105. Hence, Profit = 5%.'
    },
    {
      company: 'Google',
      question: 'A bag contains 5 red, 4 blue, and 3 green marbles. If 3 marbles are drawn at random, what is the probability that they are all of different colors?',
      options: ['3/11', '1/11', '4/11', '5/11'],
      answer: 0,
      explanation: 'Total marbles = 12. Ways to choose 3 = 12C3 = 220. Ways to choose one of each color = 5 * 4 * 3 = 60. Probability = 60 / 220 = 3/11.'
    },
    {
      company: 'Amazon',
      question: 'A container holds 40 liters of milk. 4 liters of milk is taken out and replaced with water. This process is repeated one more time. How much milk is left in the container now?',
      options: ['32.4 liters', '32.0 liters', '36.0 liters', '31.2 liters'],
      answer: 0,
      explanation: 'Using the formula: Milk left = Initial * (1 - replaced/initial)^n = 40 * (1 - 4/40)^2 = 40 * 0.9^2 = 40 * 0.81 = 32.4 liters.'
    },
    {
      company: 'Wipro',
      question: 'A can do a piece of work in 12 days and B can do it in 15 days. They work together for 3 days and then A leaves. How long will B take to finish the remaining work?',
      options: ['8.25 days', '7.75 days', '8.75 days', '9.0 days'],
      answer: 0,
      explanation: 'In 3 days, together they complete: 3 * (1/12 + 1/15) = 3 * (9/60) = 27/60 = 9/20 of the work. Leftover = 11/20. B finishes in: (11/20) / (1/15) = 165/20 = 8.25 days.'
    },
    {
      company: 'Cognizant',
      question: 'Six boys A, B, C, D, E, F are standing in a row facing North. B is sitting between D and F; E is sitting between A and C; A is not standing next to D or F; C is not standing next to D. Who is standing next to F?',
      options: ['A', 'B', 'C', 'D'],
      answer: 1,
      explanation: 'Based on alignment: the sequence is E - A - C - D - B - F or similar fitting the rules. In all valid alignments, B is next to F.'
    },
    {
      company: 'CGI',
      question: 'The average age of a class of 20 students is 15 years. If the teacher\'s age is included, the average increases by 1 year. What is the teacher\'s age?',
      options: ['35 years', '36 years', '37 years', '38 years'],
      answer: 1,
      explanation: 'Total students age = 20 * 15 = 300. Total age with teacher = 21 * 16 = 336. Teacher age = 336 - 300 = 36 years.'
    },
    {
      company: 'Capgemini',
      question: 'In how many different ways can the letters of the word "MATHEMATICS" be arranged?',
      options: ['4,989,600', '19,958,400', '9,979,200', '1,209,600'],
      answer: 0,
      explanation: 'MATHEMATICS has 11 letters: M(2), A(2), T(2). Arrangements = 11! / (2! * 2! * 2!) = 39,916,800 / 8 = 4,989,600.'
    },
    {
      company: 'Accenture',
      question: 'A person walked 20m East, turned Left and walked 15m, turned Left again and walked 20m. How far is he from his starting point?',
      options: ['15m', '20m', '35m', '0m'],
      answer: 0,
      explanation: 'The directions trace three sides of a rectangle. He is 15m North of his starting point.'
    },
    {
      company: 'TCS',
      question: 'What is the unit digit of the number 3^67?',
      options: ['1', '3', '7', '9'],
      answer: 2,
      explanation: 'Cyclicity of 3 is 4. Power 67 = 4 * 16 + 3. So unit digit matches 3^3 = 27, which ends in 7.'
    },
    {
      company: 'Accenture',
      question: 'By selling an article for $270, a shopkeeper loses 10%. At what price should he sell it to gain 15%?',
      options: ['$340', '$345', '$350', '$360'],
      answer: 1,
      explanation: 'Cost Price = 270 / 0.9 = 300. Selling Price for 15% gain = 300 * 1.15 = $345.'
    },
    {
      company: 'Google',
      question: 'A clock shows 4:20. What is the angle between the hour hand and the minute hand?',
      options: ['0 degrees', '10 degrees', '20 degrees', '30 degrees'],
      answer: 1,
      explanation: 'Angle = |30*H - 5.5*M| = |30*4 - 5.5*20| = |120 - 110| = 10 degrees.'
    },
    {
      company: 'Amazon',
      question: 'A boat travels 24 km downstream in 2 hours and 24 km upstream in 4 hours. What is the speed of the boat in still water?',
      options: ['6 km/h', '8 km/h', '9 km/h', '10 km/h'],
      answer: 2,
      explanation: 'Downstream speed = 24/2 = 12 km/h. Upstream speed = 24/4 = 6 km/h. Still water speed = (12 + 6)/2 = 9 km/h.'
    },
    {
      company: 'TCS',
      question: 'A sum of money compounded annually doubles itself in 5 years. In how many years will it become 8 times itself?',
      options: ['10 years', '15 years', '20 years', '25 years'],
      answer: 1,
      explanation: '8 times is 2^3 times. So the time taken will be 3 cycles of 5 years = 15 years.'
    },
    {
      company: 'Wipro',
      question: 'What is the probability of getting a sum of 9 when rolling two fair 6-sided dice?',
      options: ['1/9', '1/12', '1/6', '1/18'],
      answer: 0,
      explanation: 'Favorable outcomes are: (3,6), (4,5), (5,4), (6,3) = 4 outcomes. Total outcomes = 36. Probability = 4/36 = 1/9.'
    },
    {
      company: 'Cognizant',
      question: 'In a group of cows and chickens, the number of legs is 14 more than twice the number of heads. How many cows are there in the group?',
      options: ['5 cows', '7 cows', '9 cows', '10 cows'],
      answer: 1,
      explanation: 'Let cows be C and chickens K. Legs = 4C + 2K. Heads = C + K. 4C + 2K = 2(C+K) + 14 => 2C = 14 => C = 7.'
    }
  ],
  python: [
    {
      question: 'Which built-in function in Python creates an iterator that aggregates elements from each of the iterables?',
      options: ['map()', 'filter()', 'zip()', 'enumerate()'],
      answer: 2,
      explanation: 'zip() returns an iterator of tuples, where the i-th tuple contains the i-th element from each of the argument sequences.'
    },
    {
      question: 'What is the correct syntax to clone a list "my_list" in Python?',
      options: ['my_list.copy()', 'my_list[:]', 'list(my_list)', 'All of the above'],
      answer: 3,
      explanation: 'All three options copy/clone the elements of the list to create a new list instance.'
    },
    {
      question: 'In Python, what is the output of: print("python".find("z"))?',
      options: ['-1', 'False', 'None', 'Error'],
      answer: 0,
      explanation: 'The find() method returns -1 if the substring is not found.'
    },
    {
      question: 'Which of the following creates a generator in Python?',
      options: ['List comprehension', 'Generator expression using ( )', 'Lambda function', 'Decorators'],
      answer: 1,
      explanation: 'Generator expressions are written using parentheses, returning a generator iterator.'
    },
    {
      question: 'What is the output of: print(0.1 + 0.2 == 0.3) in Python?',
      options: ['True', 'False', 'None', 'Error'],
      answer: 1,
      explanation: 'Due to binary floating-point representation, 0.1 + 0.2 is actually 0.30000000000000004, so it does not equal 0.3.'
    },
    {
      question: 'How do you check if a key "name" exists in a dictionary "user" in Python?',
      options: ['user.has_key("name")', '"name" in user', 'user.contains("name")', 'exists("name", user)'],
      answer: 1,
      explanation: 'The "in" keyword checks if a key exists in a dictionary in Python 3.'
    },
    {
      question: 'What does the "nonlocal" keyword do in Python?',
      options: ['Declares a global variable', 'Reference variables in the nearest enclosing scope that is not global', 'Import modules dynamically', 'Locks variables inside functions'],
      answer: 1,
      explanation: 'nonlocal causes the variable to refer to previously bound variables in the nearest enclosing scope (excluding globals).'
    },
    {
      question: 'Which error is raised when trying to divide a number by zero in Python?',
      options: ['ArithmeticError', 'ValueError', 'ZeroDivisionError', 'DivisionError'],
      answer: 2,
      explanation: 'ZeroDivisionError is raised when the second argument of a division or modulo operation is zero.'
    }
  ],
  javascript: [
    {
      question: 'Which of the following is true about "let" and "const" in JavaScript?',
      options: ['They are function-scoped.', 'They are block-scoped.', 'They are hoisted without Temporal Dead Zone.', 'They can be redeclared.'],
      answer: 1,
      explanation: 'let and const are block-scoped declarations introduced in ES6.'
    },
    {
      question: 'What is the output of: console.log(typeof NaN) in JavaScript?',
      options: ['number', 'nan', 'undefined', 'object'],
      answer: 0,
      explanation: 'NaN stands for Not-a-Number, but its programmatic data type is "number".'
    },
    {
      question: 'Which array method removes the first element of an array and returns that element?',
      options: ['pop()', 'shift()', 'unshift()', 'slice()'],
      answer: 1,
      explanation: 'shift() removes the first element from an array and shifts all remaining elements down.'
    },
    {
      question: 'What is the correct way to handle rejected promises using async/await?',
      options: ['Using a resolve block', 'Using try/catch statements', 'Using error boundaries', 'Using callback loops'],
      answer: 1,
      explanation: 'In async functions, you wrap await expressions in try/catch to capture promise rejections.'
    },
    {
      question: 'What does the Object.freeze() method do in JavaScript?',
      options: ['Prevents adding new properties but allows modifying existing ones', 'Prevents adding, removing, or modifying properties of an object', 'Encrypts the object content', 'Saves the object to local storage'],
      answer: 1,
      explanation: 'Object.freeze() makes an object immutable, preventing additions, deletions, or modifications of properties.'
    },
    {
      question: 'What is the output of: console.log([] == ![]) in JavaScript?',
      options: ['true', 'false', 'undefined', 'Error'],
      answer: 0,
      explanation: 'Both sides coerce to 0 during loose comparison: [] becomes 0, ![] becomes false which becomes 0. So 0 == 0 is true.'
    },
    {
      question: 'Which statement exports functions or variables as modules in ES6?',
      options: ['module.exports', 'export default', 'require()', 'module.load'],
      answer: 1,
      explanation: 'ES6 module syntax uses "export" and "export default" to share bindings.'
    },
    {
      question: 'What does Event Bubbling mean in JavaScript DOM events?',
      options: ['Event triggers first on the window and goes down to the element', 'Event triggers first on the element and propagates up to parent elements', 'Event triggers concurrently on all nodes', 'Event triggers only inside loops'],
      answer: 1,
      explanation: 'Event bubbling describes how events propagate upward through ancestral DOM nodes after firing on a target element.'
    }
  ],
  java: [
    {
      question: 'Which of the following is true about abstract classes in Java?',
      options: ['They can be instantiated directly.', 'They cannot contain concrete methods.', 'They can have constructor methods.', 'They can inherit from interfaces directly.'],
      answer: 2,
      explanation: 'Abstract classes can define constructor methods which are executed during instantiation of subclasses.'
    },
    {
      question: 'Which memory allocation area in JVM stores local variables and method execution frames?',
      options: ['JVM Stack', 'Heap', 'Method Area', 'PC Registers'],
      answer: 0,
      explanation: 'Stack memory stores short-lived local variables and execution frames for specific threads.'
    },
    {
      question: 'Which class is the root of the Java class hierarchy?',
      options: ['System', 'Root', 'Object', 'Class'],
      answer: 2,
      explanation: 'The java.lang.Object class is the universal root class of all classes in Java.'
    },
    {
      question: 'What is the purpose of the "volatile" keyword in Java?',
      options: ['To declare dynamic constant variables', 'To signal compiler to read variable value from main memory, not thread cache', 'To lock object methods', 'To prevent memory leak runtime errors'],
      answer: 1,
      explanation: 'volatile variables are read directly from main memory, ensuring visibility across multiple executing threads.'
    },
    {
      question: 'Which garbage collector was introduced as default in Java 9?',
      options: ['Serial GC', 'Parallel GC', 'G1 GC', 'ZGC'],
      answer: 2,
      explanation: 'The G1 (Garbage-First) garbage collector became the default GC starting in Java 9.'
    },
    {
      question: 'Which interfaces do NOT permit duplicate elements?',
      options: ['List', 'Set', 'Map', 'Queue'],
      answer: 1,
      explanation: 'Set collections in Java are designed to contain only unique, non-duplicate elements.'
    },
    {
      question: 'Which keyword executes blocks of code after try-catch, regardless of whether exception occurred?',
      options: ['catch', 'finally', 'finalize', 'throw'],
      answer: 1,
      explanation: 'The finally block executes unconditionally after try/catch blocks execute.'
    },
    {
      question: 'Is string mutable in Java?',
      options: ['Yes', 'No', 'Only inside loops', 'Only through abstract methods'],
      answer: 1,
      explanation: 'Strings in Java are immutable sequences; any edit creates a brand new string instance.'
    }
  ],
  c: [
    {
      question: 'What is the purpose of the "static" keyword when declaring local variables inside a function in C?',
      options: ['It locks the variable from edits.', 'It retains its value between multiple function calls.', 'It registers variables in Stack heap allocations.', 'It forces standard dynamic memory allocation.'],
      answer: 1,
      explanation: 'Static variables preserve their values even after they go out of scope, holding data across function invocations.'
    },
    {
      question: 'Which file opening mode in fopen() clears previous contents and opens for writing in C?',
      options: ['"r"', '"a"', '"w"', '"r+"'],
      answer: 2,
      explanation: 'The write mode ("w") truncates (clears) existing content or creates a new file if it does not exist.'
    },
    {
      question: 'What occurs when memory allocated via malloc() is not released using free() in C?',
      options: ['Stack overflow error', 'Null pointer allocation', 'Memory leak', 'Automatic compiler recovery'],
      answer: 2,
      explanation: 'Failing to release dynamically allocated memory results in memory leaks, wasting heap capacity.'
    },
    {
      question: 'What is the size of a pointer variable on a 64-bit operating system?',
      options: ['2 bytes', '4 bytes', '8 bytes', '16 bytes'],
      answer: 2,
      explanation: 'Pointers store addresses; on 64-bit architectures, address pointers are 8 bytes long.'
    },
    {
      question: 'What is the output of: 5 / 2 in C when using integer division?',
      options: ['2.5', '2', '3', 'Error'],
      answer: 1,
      explanation: 'In C, dividing two integers yields an integer quotient, discarding the decimal fraction (so 5 / 2 = 2).'
    },
    {
      question: 'Which of the following is correct about preprocessor directives in C?',
      options: ['They are executed at runtime.', 'They begin with a hash (#) symbol and are executed before compilation.', 'They declare variables.', 'They define function parameters.'],
      answer: 1,
      explanation: 'Preprocessor directives (e.g. #include) are instructions executed before code is compiled.'
    },
    {
      question: 'How are arrays passed to functions in C?',
      options: ['By value', 'By reference (passing base address pointer)', 'By copy constructors', 'Through global memory blocks'],
      answer: 1,
      explanation: 'Arrays are passed by passing the pointer reference to their first element (base address).'
    },
    {
      question: 'What is the index of the first element in C arrays?',
      options: ['0', '1', '-1', 'Any custom index'],
      answer: 0,
      explanation: 'C arrays use zero-based indexing, so the first element is at index 0.'
    }
  ],
  cpp: [
    {
      question: 'What is the principal difference between a structure and a class in C++?',
      options: [
        'Structures cannot have member functions.',
        'Members of a structure are public by default; class members are private by default.',
        'Classes are stored on heap, structures on stack.',
        'Structures do not support inheritance.'
      ],
      answer: 1,
      explanation: 'The only functional difference is that structure members default to public access, whereas classes default to private.'
    },
    {
      question: 'Which feature in C++ allows operators to be given user-defined meanings?',
      options: ['Operator overloading', 'Polymorphism', 'Function overriding', 'Templates encapsulation'],
      answer: 0,
      explanation: 'Operator overloading enables custom user-defined operations for C++ operators.'
    },
    {
      question: 'What is a pure virtual function in C++?',
      options: ['A virtual function with empty brackets', 'A virtual function set to 0, making the class abstract', 'A helper private function', 'A base copy constructor'],
      answer: 1,
      explanation: 'A pure virtual function is defined as virtual void func() = 0;, forcing subclasses to provide implementation.'
    },
    {
      question: 'Which library header is required to use std::vector in C++?',
      options: ['<array>', '<list>', '<vector>', '<algorithm>'],
      answer: 2,
      explanation: 'The <vector> header is required to instantiate dynamic array vectors in C++.'
    },
    {
      question: 'What is the purpose of the "std::this_thread::sleep_for" method in C++?',
      options: ['Kills thread', 'Suspends execution of the current thread for a specified duration', 'Initializes thread scope', 'Pauses global hardware inputs'],
      answer: 1,
      explanation: 'Blocks the current thread of execution for the specified time interval.'
    },
    {
      question: 'Which C++ keyword prevents implicit conversions when initializing objects?',
      options: ['explicit', 'const', 'mutable', 'static_cast'],
      answer: 0,
      explanation: 'The explicit specifier prevents implicit conversions or copy-initialization from invoking constructors.'
    },
    {
      question: 'What is a copy constructor in C++?',
      options: ['A constructor called to construct a class from another instance of the same class', 'A utility to clone templates', 'A compiler directive', 'A copy assignment helper'],
      answer: 0,
      explanation: 'A copy constructor instantiates a new object as a copy of an existing object of the same class type.'
    },
    {
      question: 'What does the "std::move" function do in C++11?',
      options: ['Copies elements across lists', 'Converts its argument into an rvalue reference to enable move semantics', 'Moves variables to CPU register stacks', 'Clears system cache variables'],
      answer: 1,
      explanation: 'std::move casts its argument to an rvalue reference, signaling that the object can be moved rather than copied.'
    }
  ],
  hr: [
    {
      question: 'What is the primary reason interviewers ask: "Why should we hire you?"',
      options: [
        'To see how much salary you expect.',
        'To evaluate how your skills, experiences, and enthusiasm solve the company\'s problems.',
        'To check if you are overconfident.',
        'To test if you memorized the job description.'
      ],
      answer: 1,
      explanation: 'They want to understand your unique value proposition and confirm you understand their pain points.'
    },
    {
      question: 'If you are asked about a time you failed, what is the best strategy?',
      options: [
        'Say you have never failed to make your record look perfect.',
        'Explain a real setback, take ownership, and explain what you learned from it.',
        'Blame a teammate or client for the project failure.',
        'State a failure that is actually a hidden success.'
      ],
      answer: 1,
      explanation: 'Acknowledge the setback, demonstrate accountability, focus on lessons learned, and show how you applied that learning later.'
    },
    {
      question: 'How should you discuss salary expectations when asked in early interview stages?',
      options: [
        'Demand a high number immediately to establish value.',
        'Research market ranges for the role, state that range, and express flexibility based on benefits.',
        'Refuse to answer and tell them to make an offer.',
        'Say you are willing to work for free to gain experience.'
      ],
      answer: 1,
      explanation: 'Stating a researched range shows professionalism while expressing flexibility keeps negotiation open.'
    },
    {
      question: 'What is the most constructive response when an interviewer asks if you have questions for them?',
      options: [
        'Say "No, I think you covered everything."',
        'Ask about day-to-day responsibilities, team collaboration, or company growth objectives.',
        'Ask how much vacation time you get.',
        'Ask when you will get promoted.'
      ],
      answer: 1,
      explanation: 'Asking thoughtful questions about team, culture, or strategy shows genuine interest and helps you evaluate the role.'
    },
    {
      question: 'What is the best way to explain gaps in your resume?',
      options: [
        'Lie and stretch your employment dates.',
        'Briefly state the reason (e.g. caregiving, learning, upskilling) and pivot to your readiness for this role.',
        'Refuse to discuss it, citing personal reasons.',
        'Acknowledge it was a period of laziness.'
      ],
      answer: 1,
      explanation: 'Be honest and concise about the gap, and quickly redirect focus back to your current skills and career readiness.'
    },
    {
      question: 'What does "cultural fit" mean from an employer\'s perspective?',
      options: [
        'Hiring people who look and think exactly like the existing team.',
        'Aligning with the company\'s core values, mission, and working style while bringing diverse value.',
        'Hiring only people from the same university.',
        'A scale measuring social compliance.'
      ],
      answer: 1,
      explanation: 'Cultural alignment is about shared values, working practices, and mission compatibility, not social homogeneity.'
    },
    {
      question: 'How should you handle an interviewer who is being quiet or unresponsive?',
      options: [
        'Stop talking and wait for them to speak.',
        'Maintain a steady, polite delivery, check in occasionally with clear answers, and don\'t rush.',
        'Ask if they are bored.',
        'Shorten your answers to single words.'
      ],
      answer: 1,
      explanation: 'Stay calm, speak clearly, and deliver structured responses without letting their quiet demeanor disrupt your focus.'
    },
    {
      question: 'What should you do before the interview day?',
      options: [
        'Research the company\'s products, key leadership, news, and read the job specifications carefully.',
        'Nothing, to keep your answers natural and unscripted.',
        'Memorize a script of answers to repeat.',
        'Only check the interview route.'
      ],
      answer: 0,
      explanation: 'Researching the company, their product lines, and matching them to your key projects is the foundation of interview success.'
    }
  ]
};

// Shuffles and slices questions from a pool
const getRandomQuestions = (pool, count) => {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, pool.length));
};

const MockTest = () => {
  const navigate = useNavigate();

  // No gateway lock block: user lands directly in dashboard state
  const [flowState, setFlowState] = useState('dashboard');

  // Test states
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [activeCategory, setActiveCategory] = useState('aptitude'); // Default category set to Aptitude
  const [activeStage, setActiveStage] = useState('beginner');


  // Daily Progress states (loads from localStorage)
  const [progressLogs, setProgressLogs] = useState(() => {
    const saved = localStorage.getItem('user_mock_progress');
    return saved ? JSON.parse(saved) : [];
  });

  // Helper to log test submissions to progressLogs
  const logProgress = (categoryName, scorePercent) => {
    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: categoryName,
      score: scorePercent
    };
    const updated = [newLog, ...progressLogs].slice(0, 20); // keep last 20 logs
    setProgressLogs(updated);
    localStorage.setItem('user_mock_progress', JSON.stringify(updated));
  };

  // Get active streak days this week
  const getStreakDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const activeDays = new Set();
    progressLogs.forEach(log => {
      const d = new Date(log.date);
      if (!isNaN(d.getTime())) {
        activeDays.add(days[d.getDay()]);
      }
    });
    return activeDays;
  };

  // Submit Mock Test
  const submitMockTest = () => {
    let correctCount = 0;
    currentQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / currentQuestions.length) * 100);
    setScore(finalScore);
    logProgress(`${activeCategory.toUpperCase()} (${activeStage})`, finalScore);
    setFlowState('mock_results');
  };


  // Proctor Lock: Tab Switching Detector
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && flowState === 'mock_test') {
        submitMockTest();
        alert('Proctor Lock: Browser tab switch detected! Your mock test has been submitted immediately.');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [flowState, currentQuestions, selectedAnswers]);

  // Start Mock Test (Randomized count matching difficulty stage)
  const startMockTest = (category, stage) => {
    const pool = MOCK_TEST_POOL[category] || MOCK_TEST_POOL.python;
    let count = 3;
    
    if (stage === 'intermediate') {
      count = 5;
    } else if (stage === 'expert') {
      count = 7;
    }
    
    const randomQuestions = getRandomQuestions(pool, count);
    setCurrentQuestions(randomQuestions);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setActiveCategory(category);
    setActiveStage(stage);
    setFlowState('mock_test');
  };

  const handleSelectOption = (optionIdx) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optionIdx });
  };

  const handleNext = () => {
    if (currentIdx < currentQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleResetHistory = () => {
    localStorage.removeItem('user_mock_progress');
    setProgressLogs([]);
  };


  const currentQ = currentQuestions[currentIdx];
  const progressPercent = currentQuestions.length > 0 
    ? Math.round(((Object.keys(selectedAnswers).length) / currentQuestions.length) * 100) 
    : 0;

  const streakDays = getStreakDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="mock-tests-container fade-in" style={{ paddingBottom: '3rem' }}>

      {/* 1. Active Test Screen */}
      {flowState === 'mock_test' && currentQ && (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
          {/* Header Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <span className="badge-glow" style={{ position: 'relative' }}></span>
              <span className="badge-content" style={{ textTransform: 'uppercase', fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '4px', background: 'rgba(168,85,247,0.12)', color: '#c084fc', fontWeight: '700', marginRight: '1rem' }}>
                {activeCategory.toUpperCase()} - {activeStage.toUpperCase()}
              </span>

            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Question <strong>{currentIdx + 1}</strong> of {currentQuestions.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', marginBottom: '2rem', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(to right, #a855f7, #6366f1)', transition: 'width 0.4s ease' }}></div>
          </div>

          {/* Question Card */}
          <div className="glass-panel main-grid-panel fade-in" style={{ padding: '2.5rem 2rem', marginBottom: '1.5rem' }}>
            {currentQ.company && (
              <span style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: '700', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'white', marginBottom: '1rem' }}>
                🏢 Asked at {currentQ.company}
              </span>
            )}
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.5', marginBottom: '2rem' }}>
              {currentQ.question}
            </h3>

            {/* Options list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentIdx] === idx;
                return (
                  <button
                    key={idx}
                    className={`role-pill-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectOption(idx)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '1.1rem 1.5rem',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: '12px'
                    }}
                  >
                    <span>{opt}</span>
                    <span style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '2px solid rgba(255,255,255,0.15)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isSelected ? 'white' : 'transparent',
                      color: isSelected ? 'var(--primary)' : 'transparent',
                      fontSize: '0.75rem',
                      fontWeight: '800'
                    }}>
                      <FiCheck />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="btn btn-secondary" style={{ padding: '0.65rem 1.5rem' }} disabled={currentIdx === 0} onClick={handlePrev}>
              Previous
            </button>

            {currentIdx < currentQuestions.length - 1 ? (
              <button className="btn btn-secondary" style={{ padding: '0.65rem 1.5rem' }} onClick={handleNext}>
                Next
              </button>
            ) : (
              <button className="btn btn-primary" style={{ padding: '0.65rem 2rem' }} onClick={submitMockTest}>
                Submit Test
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. Mock Tests Dashboard (Land Directly here) */}
      {flowState === 'dashboard' && (
        <div style={{ maxWidth: '1100px', margin: '2rem auto' }}>
          <header className="page-header" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '800' }}>Practice Workspace</h2>
              <p>Assess your programming fundamentals and behavioral logic with fully randomized mock tests.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={handleResetHistory} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', padding: '0.5rem 1.25rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: 'var(--text-muted)' }}>
                <FiRotateCcw /> Reset History
              </button>
            </div>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', alignItems: 'flex-start' }}>
            {/* Left side: Selection Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Category Pills */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.25rem', textAlign: 'left' }}>
                  1. Select Target Assessment Subject
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <button className={`role-pill-btn ${activeCategory === 'aptitude' ? 'active' : ''}`} onClick={() => setActiveCategory('aptitude')} style={{ padding: '1rem 1.25rem', justifyContent: 'flex-start', borderRadius: '12px' }}>
                    🧠 Aptitude & Reasoning
                  </button>
                  <button className={`role-pill-btn ${activeCategory === 'python' ? 'active' : ''}`} onClick={() => setActiveCategory('python')} style={{ padding: '1rem 1.25rem', justifyContent: 'flex-start', borderRadius: '12px' }}>
                    🐍 Python Programming
                  </button>
                  <button className={`role-pill-btn ${activeCategory === 'javascript' ? 'active' : ''}`} onClick={() => setActiveCategory('javascript')} style={{ padding: '1rem 1.25rem', justifyContent: 'flex-start', borderRadius: '12px' }}>
                    🌐 JavaScript
                  </button>
                  <button className={`role-pill-btn ${activeCategory === 'java' ? 'active' : ''}`} onClick={() => setActiveCategory('java')} style={{ padding: '1rem 1.25rem', justifyContent: 'flex-start', borderRadius: '12px' }}>
                    ☕ Java Developer
                  </button>
                  <button className={`role-pill-btn ${activeCategory === 'c' ? 'active' : ''}`} onClick={() => setActiveCategory('c')} style={{ padding: '1rem 1.25rem', justifyContent: 'flex-start', borderRadius: '12px' }}>
                    ⚙️ C Core Basics
                  </button>
                  <button className={`role-pill-btn ${activeCategory === 'cpp' ? 'active' : ''}`} onClick={() => setActiveCategory('cpp')} style={{ padding: '1rem 1.25rem', justifyContent: 'flex-start', borderRadius: '12px' }}>
                    💎 C++ OOP Core
                  </button>
                  <button className={`role-pill-btn ${activeCategory === 'hr' ? 'active' : ''}`} onClick={() => setActiveCategory('hr')} style={{ padding: '1rem 1.25rem', justifyContent: 'flex-start', borderRadius: '12px' }}>
                    👔 HR Behavioral
                  </button>
                </div>
              </div>

              {/* Learning Stage Pills */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.25rem', textAlign: 'left' }}>
                  2. Select Learning Stage / Difficulty
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <button className={`role-pill-btn ${activeStage === 'beginner' ? 'active' : ''}`} onClick={() => setActiveStage('beginner')} style={{ padding: '1rem', flexDirection: 'column', gap: '0.25rem', borderRadius: '12px' }}>
                    <span style={{ fontWeight: '700' }}>Beginner Stage</span>
                    <span style={{ fontSize: '0.75rem', opacity: '0.7' }}>3 Random Questions</span>
                  </button>
                  <button className={`role-pill-btn ${activeStage === 'intermediate' ? 'active' : ''}`} onClick={() => setActiveStage('intermediate')} style={{ padding: '1rem', flexDirection: 'column', gap: '0.25rem', borderRadius: '12px' }}>
                    <span style={{ fontWeight: '700' }}>Intermediate Stage</span>
                    <span style={{ fontSize: '0.75rem', opacity: '0.7' }}>5 Random Questions</span>
                  </button>
                  <button className={`role-pill-btn ${activeStage === 'expert' ? 'active' : ''}`} onClick={() => setActiveStage('expert')} style={{ padding: '1rem', flexDirection: 'column', gap: '0.25rem', borderRadius: '12px' }}>
                    <span style={{ fontWeight: '700' }}>Expert Stage</span>
                    <span style={{ fontSize: '0.75rem', opacity: '0.7' }}>7 Random Questions</span>
                  </button>
                </div>
              </div>

              {/* Start Trigger */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '1.1rem' }} onClick={() => startMockTest(activeCategory, activeStage)}>
                  Start Practice Test <FiArrowRight style={{ marginLeft: '0.5rem' }} />
                </button>
              </div>
            </div>

            {/* Right side: Daily Progress and Activity Tracker */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Daily Streak Card */}
              <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'left' }}>
                <h4 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem' }}>
                  <FiActivity style={{ color: '#c084fc' }} /> Daily Activity Streak
                </h4>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0 1rem' }}>
                  {weekDays.map(day => {
                    const isPracticed = streakDays.has(day);
                    return (
                      <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{day}</span>
                        <div style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: isPracticed ? 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)' : 'rgba(255,255,255,0.03)',
                          border: isPracticed ? 'none' : '1px solid rgba(255,255,255,0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isPracticed ? 'white' : 'var(--text-muted)',
                          fontSize: '0.75rem',
                          fontWeight: '800'
                        }}>
                          {isPracticed ? <FiCheck /> : ''}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0 }}>
                  Practice daily to secure your concepts and optimize candidate scores.
                </p>
              </div>

              {/* Progress Log Feed */}
              <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'left' }}>
                <h4 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem' }}>
                  <FiTrendingUp style={{ color: '#c084fc' }} /> Practice Performance Log
                </h4>

                {progressLogs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <FiCalendar style={{ fontSize: '1.5rem', opacity: '0.3', marginBottom: '0.5rem' }} />
                    <p>No tests taken yet. Practice mock tests to register history log.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '220px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                    {progressLogs.map(log => (
                      <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                        <div>
                          <div style={{ color: 'white', fontSize: '0.8rem', fontWeight: '700' }}>{log.category}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '0.15rem' }}>{log.date} @ {log.time}</div>
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: '800', color: log.score >= 70 ? '#10b981' : '#c084fc', background: log.score >= 70 ? 'rgba(16,185,129,0.1)' : 'rgba(168,85,247,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          {log.score}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Mock Test Results Screen */}
      {flowState === 'mock_results' && (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
          <div className="glass-panel main-grid-panel" style={{ textAlign: 'center', padding: '3rem 2rem', marginBottom: '2rem' }}>
            <div className="feature-icon-wrapper" style={{ margin: '0 auto 1.5rem', background: score >= 70 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(168, 85, 247, 0.12)' }}>
              <FiAward style={{ fontSize: '2.5rem', color: score >= 70 ? '#10b981' : '#c084fc' }} />
            </div>

            <h2 style={{ color: 'white', fontWeight: '800', fontSize: '1.8rem', marginBottom: '0.50rem' }}>
              {score >= 80 ? 'Mastery Achieved!' : score >= 60 ? 'Practicing Stage Complete' : 'Learning Stage Required'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Target Subject: <strong style={{ color: 'white' }}>{activeCategory.toUpperCase()}</strong> | Learning Level: <strong style={{ color: 'white' }}>{activeStage.toUpperCase()}</strong>
            </p>

            {/* Radial Score */}
            <div style={{ width: '120px', height: '120px', margin: '0 auto 2.5rem', position: 'relative' }}>
              <svg viewBox="0 0 36 36" className="circular-chart" style={{ width: '100%', height: '100%' }}>
                <path className="circle-bg" stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle" stroke={score >= 70 ? '#10b981' : '#a855f7'} strokeWidth="3" fill="none" strokeDasharray={`${score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '1.4rem', fontWeight: '800' }}>
                {score}%
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => setFlowState('dashboard')}>
                Practice Dashboard
              </button>
              <button className="btn btn-secondary" style={{ border: '1px solid rgba(255,255,255,0.08)' }} onClick={() => startMockTest(activeCategory, activeStage)}>
                Retake Exam
              </button>
            </div>
          </div>

          {/* Question Review Section */}
          <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'left' }}>
            Answer Analysis & Review:
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {currentQuestions.map((q, idx) => {
              const userAnsIdx = selectedAnswers[idx];
              const isCorrect = userAnsIdx === q.answer;
              return (
                <div key={idx} className="glass-panel" style={{ padding: '1.5rem 2rem', textAlign: 'left', borderLeft: `4px solid ${isCorrect ? '#10b981' : '#ef4444'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
                    <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                      {idx + 1}. {q.question}
                    </h4>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: '700', color: isCorrect ? '#10b981' : '#ef4444' }}>
                      {isCorrect ? <FiCheck /> : <FiX />} {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Your Answer: <strong style={{ color: isCorrect ? '#10b981' : '#ef4444' }}>{q.options[userAnsIdx] || 'Skipped / Unanswered'}</strong> | Correct Answer: <strong style={{ color: '#10b981' }}>{q.options[q.answer]}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <FiInfo style={{ flexShrink: 0, marginTop: '0.15rem', color: '#c084fc' }} />
                    <div>
                      <strong style={{ color: 'white' }}>Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MockTest;
