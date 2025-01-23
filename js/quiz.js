const QUESTIONS = [
    {
        label: 'Какую стратегию ты используешь для принятия торговых решений, и насколько она успешна?',
        answers: [
            'Четко прописанную стратегию, которая показывает стабильный результат.',
            'Использую несколько стратегий в зависимости от ситуации.',
            'Торгую интуитивно, без конкретного плана.',
            'Пока еще ищу свою подходящую стратегию.',
        ],
    },
    {
        label: 'Какие инструменты анализа рынка ты применяешь и почему?',
        answers: [
            'Технический анализ — он помогает найти точки входа и выхода.',
            'Фундаментальный анализ — изучаю новости и экономические показатели.',
            'Оба типа анализа, чтобы получить более полную картину.',
            'Не использую анализ — полагаюсь на удачу.',
        ],
    },
    {
        label: 'Как ты справляешься с эмоциональным давлением во время торговли?',
        answers: [
            'Придерживаюсь заранее установленного плана и мани-менеджмента.',
            'Иногда эмоции берут верх, но я учусь их контролировать.',
            'Часто поддаюсь эмоциям, что влияет на результаты.',
            'Не сталкиваюсь с эмоциональным давлением.',
        ],
    },
    {
        label: 'Как ты оцениваешь свои результаты: по прибыли, стабильности или другим показателям?',
        answers: [
            'По стабильности доходов в долгосрочной перспективе.',
            'По количеству прибыльных сделок.',
            'По общей прибыли за определенный период.',
            'Пока не оцениваю — больше концентрируюсь на процессе.',
        ],
    },
    {
        label: 'Есть ли у тебя четкий торговый план, и насколько строго ты ему следуешь?',
        answers: [
            'У меня есть план, и я всегда ему следую.',
            'План есть, но иногда я от него отклоняюсь.',
            'Пока нет четкого плана, но я его разрабатываю.',
            'Торгую без плана, полагаясь на текущую ситуацию.',
        ],
    },
];

const $container = document.getElementById('container');

const startStep = {
    render: () => {
        $container.innerHTML = `
       <div class="container quiz-wrapper">
            <div class="row quiz-content">
                <div class="col-lg-6 col-md-6 col-lg-6">
                    <img class="quiz-img" src="img/quiz.jpg">
                </div>
                <div class="col-lg-6 col-md-6 col-lg-6">
                    <h2 class="title">Оценка ваших трейдерских навыков</h2>
                    <h3>Проверьте, насколько хороши ваши знания в области анализа рынка, риск-менеджмента, торговой дисциплины, психологии трейдинга и управления капиталом.</h3>
                    <button class="btn btn-primary w-50 py-3 first-button" data-action="startQuiz">Начать</button>
                </div>
            </div>
        </div>

      `;
    },
    onClick: (el) => {
        if (el.getAttribute('data-action') === 'startQuiz') {
            quiz.nextStep(questionsStep);
        }
    },
};

const questionsStep = {
    questionIndex: 0,
    answers: {},
    render: () => {
        const question = QUESTIONS[questionsStep.questionIndex];

        $container.innerHTML = `
        <div class="container quiz-wrapper">

            <div class="row quiz-content text-center">

                <h3>${question.label}</h3>

                <div class="row answers">
                    ${question.answers
                        .map(
                            (answer, index) =>
                                `
                                <button class="answer col-md-12 col-lg-6 border rounded" data-action="selectAnswer" data-answer-index="${index}">
                                    ${answer}
                                </button>
                            `,
                        )
                        .join('')}
                </div>
            </div>
        </div>
      `;
    },
    onClick: (el) => {
        switch (el.getAttribute('data-action')) {
            case 'goToNextQuestion':
                return questionsStep.goToNextQuestion();
            case 'goToPreviousQuestion':
                return questionsStep.goToPreviousQuestion();
            case 'selectAnswer':
                return questionsStep.selectAnswer(
                    parseInt(el.getAttribute('data-answer-index'), 10),
                );
        }
    },
    goToPreviousQuestion: () => {
        questionsStep.questionIndex -= 1;
        questionsStep.render();
    },
    selectAnswer: (answerIndex) => {
        const question = QUESTIONS[questionsStep.questionIndex];
        const selectedAnswer = question.answers[answerIndex];

        questionsStep.answers = {
            ...questionsStep.answers,
            [question.label]: selectedAnswer,
        };

        if (questionsStep.isFinalQuestion()) {
            questionsStep.completeStep();
        } else {
            questionsStep.goToNextQuestion();
        }
    },
    isFinalQuestion: () => questionsStep.questionIndex === QUESTIONS.length - 1,
    goToNextQuestion: () => {
        questionsStep.questionIndex += 1;
        questionsStep.render();
    },
    completeStep: () => {
        quiz.setAnswers(questionsStep.answers);
        quiz.nextStep(finalStep);
    },
};

const finalStep = {
    render: () => {
        $container.innerHTML = `
        <div class="container quiz-wrapper">
            <div class="row quiz-content">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <h2 class="title">ТрейдОценка</h2>
                    <h3>Заполни форму, чтобы получить свой бесплатный курс по оценке навыков трейдера!</h3>
                    <form>
                        <input class="form-control" name="name" type="name" placeholder="Имя">
                        <input class="form-control" name="email" id="email2" type="email" placeholder="Email">
                        <div id="validation" style="color: red"></div>
                        <input class="form-control" name="phone" type="number" id="phone" step="0.01" placeholder="Номер">
                        
                        <input name="marketAnalysis" value="Анализ рынка" hidden>
                        <input name="riskManagement" value="Риск-менеджмент" hidden>
                        <input name="tradingDiscipline" value="Торговая дисциплина" hidden>
                        <input name="tradingPsychology" value="Психология трейдинга" hidden>
                        <input name="capitalManagement" value="Управление капиталом" hidden>
                        <input name="tradingTools" value="Торговые инструменты" hidden>
                        <input name="successMetrics" value="Показатели успеха" hidden>
                        
                        <button data-action="submitAnswers" class="btn btn-primary w-50 py-3">Отправить</button>
                    </form>
                </div>
                <div class="col-lg-6 col-md-6 col-lg-6">
                    <img class="quiz-img" src="img/quiz-2.jpg">
                </div>
            </div>
        </div>
      `;
    },
    onClick: (el) => {
        if (el.getAttribute('data-action') === 'submitAnswers') {
            // Get the input value
            const emailInput = document.getElementById('email2').value;

            // Regular expression for basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Test the input against the regular expression
            if (emailRegex.test(emailInput)) {
                document.getElementById('validation').textContent = '';
                window.location.href = 'thanks.html';
                localStorage.setItem('quizDone', true);
                document.getElementById('quiz-page').classList.add('hide');
            } else {
                document.getElementById('validation').textContent =
                    'Неверный адрес электронной почты. Пожалуйста, введите действительный адрес электронной почты.';
            }
        }
    },
};

const quiz = {
    activeStep: startStep,
    answers: {},
    clear: () => ($container.innerHTML = ''),
    init: () => {
        $container.addEventListener('click', (event) =>
            quiz.activeStep.onClick(event.target),
        );
        $container.addEventListener('submit', (event) =>
            event.preventDefault(),
        );
    },
    render: () => {
        quiz.clear();
        quiz.activeStep.render();
    },
    nextStep: (step) => {
        quiz.activeStep = step;
        quiz.render();
    },
    setAnswers: (answers) => (quiz.answers = answers),
};

if (!localStorage.getItem('quizDone')) {
    // document.getElementById('main-page').classList.add('hide');
    quiz.init();
    quiz.render();
}
